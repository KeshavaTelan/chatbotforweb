import { ChatbotConfig, Message } from './types';
import { SecurityUtils, messageLimiter } from './security-utils';

export class ChatbotCore {
  protected config: ChatbotConfig;
  protected container: HTMLElement | null = null;
  protected isOpen = false;
  protected messages: Message[] = [];
  protected eventListeners: Map<string, Function[]> = new Map();

  constructor(config: ChatbotConfig) {
    // Sanitize the config to prevent XSS attacks
    this.config = { ...this.getDefaultConfig(), ...SecurityUtils.sanitizeConfig(config) };
    this.init();
  }

  private getDefaultConfig(): ChatbotConfig {
    return {
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      textColor: '#212529',
      backgroundColor: '#ffffff',
      position: 'bottom-right',
      width: 350,
      height: 500,
      zIndex: 9999,
      autoOpen: false,
      greeting: 'Hello! How can I help you today?',
      placeholder: 'Type your message...',
      borderRadius: 12,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };
  }

  private init(): void {
    // Guard against SSR environments
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.warn('Chatify.js: DOM not available, skipping initialization. This is normal in SSR environments.');
      return;
    }

    this.createContainer();
    this.createStyles();
    this.bindEvents();
    
    if (this.config.greeting) {
      this.addMessage({
        id: SecurityUtils.generateSecureId(),
        text: SecurityUtils.sanitizeHTML(this.config.greeting),
        sender: 'bot',
        timestamp: new Date()
      });
    }
  }

  private createContainer(): void {
    if (typeof document === 'undefined') return;

    this.container = document.createElement('div');
    this.container.className = 'chatbot-widget';
    this.container.innerHTML = this.getTemplate();
    document.body.appendChild(this.container);
  }

  private createStyles(): void {
    if (typeof document === 'undefined') return;
    
    // Prevent multiple style injections by using a unique ID
    const styleId = 'chatbot-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = this.getStyles();
    document.head.appendChild(style);
  }

  private getTemplate(): string {
    // Sanitize all user-provided content to prevent XSS
    const safePosition = SecurityUtils.sanitizeAttribute(this.config.position || 'bottom-right');
    const safeLogo = this.config.logo ? SecurityUtils.validateURL(this.config.logo) 
      ? SecurityUtils.sanitizeAttribute(this.config.logo) 
      : '' : '';
    const safeCompanyName = SecurityUtils.sanitizeHTML(this.config.companyName || 'Chat Support');
    const safePlaceholder = SecurityUtils.sanitizeAttribute(this.config.placeholder || 'Type your message...');

    return `
      <div class="chatbot-container" data-position="${safePosition}">
        <!-- Trigger Button -->
        <button class="chatbot-trigger" type="button" aria-label="Open chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3 16.31L2 22L7.69 21C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2Z" fill="currentColor"/>
          </svg>
        </button>

        <!-- Chat Window -->
        <div class="chatbot-window">
          <!-- Header -->
          <div class="chatbot-header">
            ${safeLogo ? `<img src="${safeLogo}" alt="Logo" class="chatbot-logo">` : ''}
            <div class="chatbot-header-text">
              <h3>${safeCompanyName}</h3>
              <span class="chatbot-status">Online</span>
            </div>
            <button class="chatbot-close" type="button" aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>

          <!-- Messages -->
          <div class="chatbot-messages" id="chatbot-messages"></div>

          <!-- Input -->
          <div class="chatbot-input">
            <input 
              type="text" 
              placeholder="${safePlaceholder}" 
              id="chatbot-input"
              autocomplete="off"
              maxlength="1000"
            >
            <button type="button" id="chatbot-send" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18 2L9 11L18 2ZM18 2L12 18L9 11L2 8L18 2Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  protected getStyles(): string {
    return `
      .chatbot-widget * {
        box-sizing: border-box;
      }

      .chatbot-container {
        position: fixed;
        font-family: ${this.config.fontFamily};
        z-index: ${this.config.zIndex};
      }

      .chatbot-container[data-position="bottom-right"] {
        bottom: 20px;
        right: 20px;
      }

      .chatbot-container[data-position="bottom-left"] {
        bottom: 20px;
        left: 20px;
      }

      .chatbot-trigger {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        background: ${this.config.primaryColor};
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .chatbot-trigger:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      }

      .chatbot-window {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: ${typeof this.config.width === 'number' ? this.config.width + 'px' : this.config.width};
        height: ${typeof this.config.height === 'number' ? this.config.height + 'px' : this.config.height};
        background: ${this.config.backgroundColor};
        border-radius: ${this.config.borderRadius}px;
        box-shadow: ${this.config.boxShadow || '0 8px 32px rgba(0,0,0,0.1)'};
        display: none;
        flex-direction: column;
        overflow: hidden;
      }

      .chatbot-window.open {
        display: flex;
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .chatbot-header {
        background: ${this.config.primaryColor};
        color: white;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .chatbot-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      .chatbot-header-text h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .chatbot-status {
        font-size: 12px;
        opacity: 0.9;
      }

      .chatbot-close {
        margin-left: auto;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
      }

      .chatbot-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .message {
        max-width: 85%;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.4;
      }

      .message.user {
        background: ${this.config.primaryColor};
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }

      .message.bot {
        background: #f1f3f5;
        color: ${this.config.textColor};
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }

      .chatbot-input {
        padding: 16px;
        display: flex;
        gap: 8px;
        border-top: 1px solid #e9ecef;
      }

      .chatbot-input input {
        flex: 1;
        padding: 12px;
        border: 1px solid #e9ecef;
        border-radius: 20px;
        outline: none;
        font-size: 14px;
      }

      .chatbot-input input:focus {
        border-color: ${this.config.primaryColor};
      }

      .chatbot-input button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: ${this.config.primaryColor};
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }

  private bindEvents(): void {
    if (!this.container) return;

    const trigger = this.container.querySelector('.chatbot-trigger');
    const closeBtn = this.container.querySelector('.chatbot-close');
    const sendBtn = this.container.querySelector('#chatbot-send');
    const input = this.container.querySelector('#chatbot-input') as HTMLInputElement;

    trigger?.addEventListener('click', () => this.toggle());
    closeBtn?.addEventListener('click', () => this.close());
    sendBtn?.addEventListener('click', () => this.sendMessage());
    
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public open(): void {
    if (!this.container) return;
    
    const window = this.container.querySelector('.chatbot-window');
    window?.classList.add('open');
    this.isOpen = true;
    this.emit('open');
  }

  public close(): void {
    if (!this.container) return;
    
    const window = this.container.querySelector('.chatbot-window');
    window?.classList.remove('open');
    this.isOpen = false;
    this.emit('close');
  }

  private sendMessage(): void {
    const input = this.container?.querySelector('#chatbot-input') as HTMLInputElement;
    const text = input?.value.trim();
    
    if (!text) return;

    // Validate message length
    if (!SecurityUtils.validateLength(text, 1000)) {
      this.showError('Message is too long. Maximum length is 1000 characters.');
      return;
    }

    // Apply rate limiting
    const userKey = 'user'; // In production, use actual user ID or session ID
    if (!messageLimiter.checkLimit(userKey, 10, 60000)) { // 10 messages per minute
      this.showError('Please slow down. You can send up to 10 messages per minute.');
      return;
    }

    const message: Message = {
      id: SecurityUtils.generateSecureId(),
      text: SecurityUtils.sanitizeHTML(text),
      sender: 'user',
      timestamp: new Date()
    };

    this.addMessage(message);
    input.value = '';
    
    this.emit('message', message);
    
    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      this.addBotResponse(text);
    }, 1000);
  }

  protected addMessage(message: Message): void {
    this.messages.push(message);
    this.renderMessage(message);
    this.scrollToBottom();
  }

  private renderMessage(message: Message): void {
    const messagesContainer = this.container?.querySelector('#chatbot-messages');
    if (!messagesContainer) return;

    const messageEl = document.createElement('div');
    messageEl.className = `message ${message.sender}`;
    messageEl.textContent = message.text;
    
    messagesContainer.appendChild(messageEl);
  }

  protected addBotResponse(userMessage: string): void {
    // Simple response logic (replace with actual bot logic)
    const responses = [
      "Thank you for your message. How can I help you further?",
      "I understand. Let me assist you with that.",
      "That's interesting. Can you tell me more?",
      "I'm here to help! What would you like to know?"
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    this.addMessage({
      id: SecurityUtils.generateSecureId(),
      text: SecurityUtils.sanitizeHTML(response),
      sender: 'bot',
      timestamp: new Date()
    });
  }

  protected showError(message: string): void {
    // Show error message to user without exposing internal details
    this.addMessage({
      id: SecurityUtils.generateSecureId(),
      text: SecurityUtils.sanitizeHTML(message),
      sender: 'bot',
      timestamp: new Date()
    });
  }

  protected scrollToBottom(): void {
    const messagesContainer = this.container?.querySelector('#chatbot-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  protected generateId(): string {
    return SecurityUtils.generateSecureId();
  }

  // Event system
  public on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  private emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event);
    listeners?.forEach(callback => callback(data));
  }

  // Public API
  public updateConfig(newConfig: Partial<ChatbotConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.destroy();
    this.init();
  }

  public destroy(): void {
    if (typeof document === 'undefined') return;

    // Clean up event listeners
    this.eventListeners.clear();

    // Remove DOM elements
    this.container?.remove();
    
    // Remove global styles only if this is the last chatbot instance
    const existingChatbots = document.querySelectorAll('.chatbot-widget');
    if (existingChatbots.length <= 1) {
      const styles = document.getElementById('chatbot-styles');
      styles?.remove();
    }

    // Reset state
    this.container = null;
    this.isOpen = false;
    this.messages = [];
  }
}