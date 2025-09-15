import { ChatbotCore } from './chatbot-core';
import { ChatbotConfig, Message } from './types';
import { AdvancedChatbotConfig, CustomButton } from './advanced-types';
import { SecurityUtils, uploadLimiter, messageLimiter } from './security-utils';

// Enhanced core with API integration
export class AdvancedChatbotCore extends ChatbotCore {
  private typingTimeout?: any;
  private sessionId: string;
  private isOnline = true;

  constructor(config: AdvancedChatbotConfig) {
    super(config);
    this.sessionId = this.generateSessionId();
    this.checkOnlineStatus();
    this.initializeAdvancedFeatures();
  }

  // Helper to get config as AdvancedChatbotConfig
  private get advancedConfig(): AdvancedChatbotConfig {
    return this.config as AdvancedChatbotConfig;
  }

  private initializeAdvancedFeatures(): void {
    if (this.advancedConfig.enableFileUpload) {
      this.addFileUploadButton();
    }
    
    if (this.advancedConfig.quickReplies?.length) {
      this.addQuickReplies();
    }
    
    if (this.advancedConfig.trackEvents) {
      this.initializeAnalytics();
    }
  }

  private addFileUploadButton(): void {
    const input = this.container?.querySelector('.chatbot-input');
    if (!input) return;

    const fileButton = document.createElement('button');
    fileButton.type = 'button';
    fileButton.className = 'chatbot-file-btn';
    fileButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M13.5 3H6.5C5.4 3 4.5 3.9 4.5 5V15C4.5 16.1 5.4 17 6.5 17H13.5C14.6 17 15.5 16.1 15.5 15V5C15.5 3.9 14.6 3 13.5 3Z" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    
    // Set secure file upload restrictions
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    fileInput.accept = allowedTypes.join(',');
    
    fileButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

    input.insertBefore(fileButton, input.querySelector('#chatbot-send'));
    input.appendChild(fileInput);
  }

  private async handleFileUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // Security validations
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
    
    // Validate file size
    if (!SecurityUtils.validateFileSize(file, maxFileSize)) {
      this.showError('File is too large. Maximum size allowed is 10MB.');
      input.value = '';
      return;
    }

    // Validate file type
    if (!SecurityUtils.validateFileType(file, allowedTypes)) {
      this.showError('Invalid file type. Only JPEG, PNG, PDF, and TXT files are allowed.');
      input.value = '';
      return;
    }

    // Check upload rate limit
    const userKey = 'user'; // In production, use actual user ID or session ID
    if (!uploadLimiter.checkLimit(userKey, 3, 60000)) { // 3 uploads per minute
      this.showError('Please slow down. You can upload up to 3 files per minute.');
      input.value = '';
      return;
    }

    // Sanitize filename
    const sanitizedName = SecurityUtils.sanitizeFileName(file.name);

    // Show upload progress
    this.showTypingIndicator('Uploading file...');

    try {
      // Validate API URL before making request
      if (!this.advancedConfig.apiUrl || !SecurityUtils.validateURL(this.advancedConfig.apiUrl)) {
        throw new Error('Invalid API URL configuration');
      }

      const formData = new FormData();
      formData.append('file', file, sanitizedName);
      formData.append('sessionId', this.sessionId);

      const response = await fetch(`${this.advancedConfig.apiUrl}/upload`, {
        method: 'POST',
        // Don't expose API key in file uploads - should use server-side proxy
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      this.addMessage({
        id: SecurityUtils.generateSecureId(),
        text: `Uploaded: ${sanitizedName}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file',
      });

      this.hideTypingIndicator();
      
    } catch (error) {
      console.error('File upload failed:', error);
      this.hideTypingIndicator();
      this.showError('Sorry, file upload failed. Please try again.');
    }

    input.value = '';
  }

  private addQuickReplies(): void {
    const messagesContainer = this.container?.querySelector('#chatbot-messages');
    if (!messagesContainer || !this.advancedConfig.quickReplies) return;

    const quickRepliesContainer = document.createElement('div');
    quickRepliesContainer.className = 'quick-replies';
    
    this.advancedConfig.quickReplies.forEach((reply: string) => {
      const button = document.createElement('button');
      button.className = 'quick-reply-btn';
      button.textContent = SecurityUtils.sanitizeHTML(reply);
      button.addEventListener('click', () => this.sendQuickReply(reply));
      quickRepliesContainer.appendChild(button);
    });

    messagesContainer.appendChild(quickRepliesContainer);
  }

  private sendQuickReply(text: string): void {
    // Validate and sanitize the quick reply text
    if (!SecurityUtils.validateLength(text, 500)) {
      this.showError('Quick reply is too long.');
      return;
    }

    const sanitizedText = SecurityUtils.sanitizeHTML(text);
    
    this.addMessage({
      id: SecurityUtils.generateSecureId(),
      text: sanitizedText,
      sender: 'user',
      timestamp: new Date(),
    });

    // Hide quick replies after use
    const quickReplies = this.container?.querySelector('.quick-replies') as HTMLElement;
    if (quickReplies) {
      quickReplies.style.display = 'none';
    }

    this.sendToAPI(sanitizedText);
  }

  private async sendToAPI(message: string): Promise<void> {
    if (!this.advancedConfig.apiUrl) {
      this.addBotResponse(message);
      return;
    }

    // Validate API URL
    if (!SecurityUtils.validateURL(this.advancedConfig.apiUrl)) {
      this.showError('Invalid API configuration.');
      return;
    }

    // Apply rate limiting for API calls
    const userKey = 'user'; // In production, use actual user ID or session ID
    if (!messageLimiter.checkLimit(userKey, 10, 60000)) { // 10 API calls per minute
      this.showError('Please slow down. Too many requests.');
      return;
    }

    this.showTypingIndicator();

    try {
      const response = await fetch(this.advancedConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Don't expose API keys in client-side code
          // Should use server-side proxy or token exchange
        },
        body: JSON.stringify({
          message: SecurityUtils.sanitizeHTML(message),
          sessionId: this.sessionId,
          userId: this.advancedConfig.userId || 'anonymous',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      this.hideTypingIndicator();
      
      // Sanitize API response
      const botResponse = SecurityUtils.sanitizeHTML(data.response || data.message || 'I received your message.');
      
      this.addMessage({
        id: SecurityUtils.generateSecureId(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      });

    } catch (error) {
      console.error('API call failed:', error);
      this.hideTypingIndicator();
      
      if (!this.isOnline) {
        const offlineMsg = SecurityUtils.sanitizeHTML(
          this.advancedConfig.offlineMessage || 'Sorry, I\'m currently offline. Please try again later.'
        );
        this.addMessage({
          id: SecurityUtils.generateSecureId(),
          text: offlineMsg,
          sender: 'bot',
          timestamp: new Date(),
        });
      } else {
        this.showError('Sorry, something went wrong. Please try again.');
      }
    }
  }

  private showTypingIndicator(text = 'Bot is typing...'): void {
    if (!this.advancedConfig.enableTypingIndicator) return;

    const messagesContainer = this.container?.querySelector('#chatbot-messages');
    if (!messagesContainer) return;

    // Remove existing typing indicator
    const existingIndicator = messagesContainer.querySelector('.typing-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }

    const indicator = document.createElement('div');
    indicator.className = 'message bot typing-indicator';
    
    // Sanitize the typing text to prevent XSS
    const safeText = SecurityUtils.sanitizeHTML(text);
    
    indicator.innerHTML = `
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <small>${safeText}</small>
    `;

    messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  }

  private hideTypingIndicator(): void {
    const indicator = this.container?.querySelector('.typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  private checkOnlineStatus(): void {
    if (typeof navigator !== 'undefined') {
      this.isOnline = navigator.onLine;
      
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.updateConnectionStatus();
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.updateConnectionStatus();
      });
    }
  }

  private updateConnectionStatus(): void {
    const status = this.container?.querySelector('.chatbot-status');
    if (status) {
      status.textContent = this.isOnline ? 'Online' : 'Offline';
      status.className = `chatbot-status ${this.isOnline ? 'online' : 'offline'}`;
    }
  }

  private initializeAnalytics(): void {
    this.trackEvent('widget_loaded');
    
    this.on('open', () => this.trackEvent('widget_opened'));
    this.on('close', () => this.trackEvent('widget_closed'));
    this.on('message', (msg: Message) => {
      this.trackEvent('message_sent', { 
        sender: msg.sender,
        messageLength: msg.text.length 
      });
    });
  }

  private trackEvent(event: string, data?: any): void {
    if (!this.advancedConfig.trackEvents || !this.advancedConfig.apiUrl) return;

    // Validate API URL before tracking
    if (!SecurityUtils.validateURL(this.advancedConfig.apiUrl)) return;

    // Sanitize event data
    const sanitizedData = data ? SecurityUtils.sanitizeConfig(data) : undefined;

    fetch(`${this.advancedConfig.apiUrl}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Don't expose API keys - should use server-side proxy
      },
      body: JSON.stringify({
        event: SecurityUtils.sanitizeHTML(event),
        data: sanitizedData,
        sessionId: this.sessionId,
        userId: this.advancedConfig.userId || 'anonymous',
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  }

  private generateSessionId(): string {
    return 'session_' + SecurityUtils.generateSecureId(16);
  }

  // Enhanced styles for new features
  protected getEnhancedStyles(): string {
    return this.getStyles() + `
      .chatbot-file-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #e9ecef;
        background: white;
        color: ${this.config.primaryColor};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
      }

      .quick-replies {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 8px 0;
      }

      .quick-reply-btn {
        background: white;
        border: 1px solid ${this.config.primaryColor};
        color: ${this.config.primaryColor};
        padding: 6px 12px;
        border-radius: 16px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }

      .quick-reply-btn:hover {
        background: ${this.config.primaryColor};
        color: white;
      }

      .typing-indicator {
        opacity: 0.8;
      }

      .typing-dots {
        display: flex;
        gap: 4px;
        margin-bottom: 4px;
      }

      .typing-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${this.config.primaryColor};
        animation: typing 1.4s infinite ease-in-out;
      }

      .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1); }
      }

      .chatbot-status.offline {
        color: #dc3545 !important;
      }

      .chatbot-status.online {
        color: #28a745 !important;
      }
    `;
  }
}