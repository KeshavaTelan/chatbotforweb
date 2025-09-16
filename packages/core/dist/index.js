'use strict';

/**
 * Security utilities for the chatbot
 * Provides functions to sanitize inputs, validate files, and prevent common attacks
 */
class SecurityUtils {
    /**
     * Sanitize HTML content to prevent XSS attacks
     * @param input - The input string to sanitize
     * @returns Sanitized string safe for HTML insertion
     */
    static sanitizeHTML(input) {
        if (!input || typeof input !== 'string')
            return '';
        // Guard against SSR environments
        if (typeof document === 'undefined') {
            // Fallback for SSR: basic HTML entity encoding
            return input
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;');
        }
        // Create a temporary div element to safely encode HTML entities
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    /**
     * Sanitize HTML attributes to prevent attribute injection
     * @param input - The attribute value to sanitize
     * @returns Sanitized attribute value
     */
    static sanitizeAttribute(input) {
        if (!input || typeof input !== 'string')
            return '';
        // Remove potentially dangerous characters from attributes
        return input
            .replace(/[<>"'&]/g, (match) => {
            const entities = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return entities[match] || match;
        })
            .substring(0, 1000); // Limit attribute length
    }
    /**
     * Validate file type by checking actual MIME type
     * @param file - The file to validate
     * @param allowedTypes - Array of allowed MIME types
     * @returns True if file type is allowed
     */
    static validateFileType(file, allowedTypes) {
        if (!file || !file.type)
            return false;
        return allowedTypes.includes(file.type);
    }
    /**
     * Validate file size
     * @param file - The file to validate
     * @param maxSize - Maximum allowed file size in bytes
     * @returns True if file size is within limit
     */
    static validateFileSize(file, maxSize) {
        if (!file)
            return false;
        return file.size <= maxSize;
    }
    /**
     * Sanitize file name to prevent path traversal attacks
     * @param fileName - The file name to sanitize
     * @returns Sanitized file name
     */
    static sanitizeFileName(fileName) {
        if (!fileName || typeof fileName !== 'string')
            return 'unnamed';
        // Remove directory traversal attempts and dangerous characters
        return fileName
            .replace(/[\/\\:*?"<>|]/g, '_') // Replace dangerous characters
            .replace(/\.\./g, '_') // Remove directory traversal
            .replace(/^\.+/, '') // Remove leading dots
            .substring(0, 255) // Limit filename length
            .trim() || 'unnamed';
    }
    /**
     * Validate URL to prevent malicious redirects
     * @param url - The URL to validate
     * @param allowedDomains - Optional array of allowed domains
     * @returns True if URL is safe
     */
    static validateURL(url, allowedDomains) {
        if (!url || typeof url !== 'string')
            return false;
        try {
            const urlObj = new URL(url);
            // Only allow http and https protocols
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return false;
            }
            // Check allowed domains if provided
            if (allowedDomains && allowedDomains.length > 0) {
                const hostname = urlObj.hostname.toLowerCase();
                return allowedDomains.some(domain => hostname === domain.toLowerCase() ||
                    hostname.endsWith('.' + domain.toLowerCase()));
            }
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    /**
     * Validate input length
     * @param input - The input to validate
     * @param maxLength - Maximum allowed length
     * @returns True if input length is within limit
     */
    static validateLength(input, maxLength) {
        if (typeof input !== 'string')
            return false;
        return input.length <= maxLength;
    }
    /**
     * Generate a secure random ID
     * @param length - Length of the ID (default: 16)
     * @returns Random string ID
     */
    static generateSecureId(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        // Guard against SSR environments and use crypto API when available
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
            const array = new Uint8Array(length);
            window.crypto.getRandomValues(array);
            for (let i = 0; i < length; i++) {
                result += chars[array[i] % chars.length];
            }
        }
        else {
            // Fallback for older browsers and SSR environments
            for (let i = 0; i < length; i++) {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        return result;
    }
    /**
     * Validate and sanitize configuration object
     * @param config - Configuration object to validate
     * @returns Sanitized configuration object
     */
    static sanitizeConfig(config) {
        if (!config || typeof config !== 'object')
            return {};
        const sanitized = {};
        // Sanitize string properties
        for (const [key, value] of Object.entries(config)) {
            if (typeof value === 'string') {
                sanitized[key] = this.sanitizeHTML(value);
            }
            else if (typeof value === 'number' || typeof value === 'boolean') {
                sanitized[key] = value;
            }
            else if (Array.isArray(value)) {
                sanitized[key] = value.map(item => typeof item === 'string' ? this.sanitizeHTML(item) : item);
            }
            else if (value && typeof value === 'object') {
                sanitized[key] = this.sanitizeConfig(value);
            }
        }
        return sanitized;
    }
}
/**
 * Rate limiter class to prevent abuse
 */
SecurityUtils.RateLimiter = class {
    constructor() {
        this.timestamps = new Map();
    }
    /**
     * Check if action is allowed based on rate limit
     * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
     * @param limit - Maximum number of actions allowed
     * @param windowMs - Time window in milliseconds
     * @returns True if action is allowed
     */
    checkLimit(key, limit, windowMs = 60000) {
        const now = Date.now();
        let userTimestamps = this.timestamps.get(key) || [];
        // Remove timestamps outside the window
        userTimestamps = userTimestamps.filter(timestamp => now - timestamp < windowMs);
        if (userTimestamps.length >= limit) {
            return false;
        }
        userTimestamps.push(now);
        this.timestamps.set(key, userTimestamps);
        return true;
    }
    /**
     * Clean up old entries to prevent memory leaks
     */
    cleanup() {
        const now = Date.now();
        const oneHour = 3600000; // 1 hour
        for (const [key, timestamps] of this.timestamps.entries()) {
            const validTimestamps = timestamps.filter(timestamp => now - timestamp < oneHour);
            if (validTimestamps.length === 0) {
                this.timestamps.delete(key);
            }
            else {
                this.timestamps.set(key, validTimestamps);
            }
        }
    }
};
// Export default rate limiter instances
const messageLimiter = new SecurityUtils.RateLimiter();
const uploadLimiter = new SecurityUtils.RateLimiter();
const globalLimiter = new SecurityUtils.RateLimiter();
// Clean up rate limiters every 5 minutes
if (typeof window !== 'undefined') {
    setInterval(() => {
        messageLimiter.cleanup();
        uploadLimiter.cleanup();
        globalLimiter.cleanup();
    }, 300000); // 5 minutes
}

class ChatbotCore {
    // Public getter for isOpen status
    get isOpen() {
        return this._isOpen;
    }
    constructor(config) {
        this.container = null;
        this._isOpen = false;
        this.messages = [];
        this.eventListeners = new Map();
        // Sanitize the config to prevent XSS attacks
        this.config = { ...this.getDefaultConfig(), ...SecurityUtils.sanitizeConfig(config) };
        this.init();
    }
    getDefaultConfig() {
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
    init() {
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
    createContainer() {
        if (typeof document === 'undefined')
            return;
        this.container = document.createElement('div');
        this.container.className = 'chatbot-widget';
        this.container.innerHTML = this.getTemplate();
        document.body.appendChild(this.container);
    }
    createStyles() {
        if (typeof document === 'undefined')
            return;
        // Prevent multiple style injections by using a unique ID
        const styleId = 'chatbot-styles';
        if (document.getElementById(styleId))
            return;
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = this.getStyles();
        document.head.appendChild(style);
    }
    getTemplate() {
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
    getStyles() {
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
    bindEvents() {
        if (!this.container)
            return;
        const trigger = this.container.querySelector('.chatbot-trigger');
        const closeBtn = this.container.querySelector('.chatbot-close');
        const sendBtn = this.container.querySelector('#chatbot-send');
        const input = this.container.querySelector('#chatbot-input');
        trigger === null || trigger === void 0 ? void 0 : trigger.addEventListener('click', () => this.toggle());
        closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', () => this.close());
        sendBtn === null || sendBtn === void 0 ? void 0 : sendBtn.addEventListener('click', () => this.sendMessage());
        input === null || input === void 0 ? void 0 : input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    toggle() {
        if (this._isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    open() {
        if (!this.container)
            return;
        const window = this.container.querySelector('.chatbot-window');
        window === null || window === void 0 ? void 0 : window.classList.add('open');
        this._isOpen = true;
        this.emit('open');
    }
    close() {
        if (!this.container)
            return;
        const window = this.container.querySelector('.chatbot-window');
        window === null || window === void 0 ? void 0 : window.classList.remove('open');
        this._isOpen = false;
        this.emit('close');
    }
    sendMessage() {
        var _a;
        const input = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#chatbot-input');
        const text = input === null || input === void 0 ? void 0 : input.value.trim();
        if (!text)
            return;
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
        const message = {
            id: SecurityUtils.generateSecureId(),
            text: SecurityUtils.sanitizeHTML(text),
            sender: 'user',
            timestamp: new Date()
        };
        this.addMessage(message);
        input.value = '';
        this.emit('message', message);
        // Note: Bot response should be handled by external API integration
        // The 'message' event allows external code to handle the API call
    }
    // Public method to add messages (used both internally and by external API)
    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }
    renderMessage(message) {
        var _a;
        const messagesContainer = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#chatbot-messages');
        if (!messagesContainer)
            return;
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.sender}`;
        messageEl.textContent = message.text;
        messagesContainer.appendChild(messageEl);
    }
    addBotResponse(userMessage) {
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
    // Public method to show errors (used both internally and by external API)
    showError(message) {
        this.addMessage({
            id: SecurityUtils.generateSecureId(),
            text: SecurityUtils.sanitizeHTML(message),
            sender: 'bot',
            timestamp: new Date()
        });
    }
    scrollToBottom() {
        var _a;
        const messagesContainer = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    generateId() {
        return SecurityUtils.generateSecureId();
    }
    // Event system
    on(event, callback) {
        var _a;
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        (_a = this.eventListeners.get(event)) === null || _a === void 0 ? void 0 : _a.push(callback);
    }
    emit(event, data) {
        const listeners = this.eventListeners.get(event);
        listeners === null || listeners === void 0 ? void 0 : listeners.forEach(callback => callback(data));
    }
    // Public API
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.destroy();
        this.init();
    }
    destroy() {
        var _a;
        if (typeof document === 'undefined')
            return;
        // Clean up event listeners
        this.eventListeners.clear();
        // Remove DOM elements
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.remove();
        // Remove global styles only if this is the last chatbot instance
        const existingChatbots = document.querySelectorAll('.chatbot-widget');
        if (existingChatbots.length <= 1) {
            const styles = document.getElementById('chatbot-styles');
            styles === null || styles === void 0 ? void 0 : styles.remove();
        }
        // Reset state
        this.container = null;
        this._isOpen = false;
        this.messages = [];
    }
}

// Enhanced core with API integration
class AdvancedChatbotCore extends ChatbotCore {
    constructor(config) {
        super(config);
        this.isOnline = true;
        this.sessionId = this.generateSessionId();
        this.checkOnlineStatus();
        this.initializeAdvancedFeatures();
    }
    // Helper to get config as AdvancedChatbotConfig
    get advancedConfig() {
        return this.config;
    }
    initializeAdvancedFeatures() {
        var _a;
        if (this.advancedConfig.enableFileUpload) {
            this.addFileUploadButton();
        }
        if ((_a = this.advancedConfig.quickReplies) === null || _a === void 0 ? void 0 : _a.length) {
            this.addQuickReplies();
        }
        if (this.advancedConfig.trackEvents) {
            this.initializeAnalytics();
        }
    }
    addFileUploadButton() {
        var _a;
        const input = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.chatbot-input');
        if (!input)
            return;
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
    async handleFileUpload(event) {
        var _a;
        const input = event.target;
        const file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
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
        }
        catch (error) {
            console.error('File upload failed:', error);
            this.hideTypingIndicator();
            this.showError('Sorry, file upload failed. Please try again.');
        }
        input.value = '';
    }
    addQuickReplies() {
        var _a;
        const messagesContainer = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#chatbot-messages');
        if (!messagesContainer || !this.advancedConfig.quickReplies)
            return;
        const quickRepliesContainer = document.createElement('div');
        quickRepliesContainer.className = 'quick-replies';
        this.advancedConfig.quickReplies.forEach((reply) => {
            const button = document.createElement('button');
            button.className = 'quick-reply-btn';
            button.textContent = SecurityUtils.sanitizeHTML(reply);
            button.addEventListener('click', () => this.sendQuickReply(reply));
            quickRepliesContainer.appendChild(button);
        });
        messagesContainer.appendChild(quickRepliesContainer);
    }
    sendQuickReply(text) {
        var _a;
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
        const quickReplies = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.quick-replies');
        if (quickReplies) {
            quickReplies.style.display = 'none';
        }
        this.sendToAPI(sanitizedText);
    }
    async sendToAPI(message) {
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
        }
        catch (error) {
            console.error('API call failed:', error);
            this.hideTypingIndicator();
            if (!this.isOnline) {
                const offlineMsg = SecurityUtils.sanitizeHTML(this.advancedConfig.offlineMessage || 'Sorry, I\'m currently offline. Please try again later.');
                this.addMessage({
                    id: SecurityUtils.generateSecureId(),
                    text: offlineMsg,
                    sender: 'bot',
                    timestamp: new Date(),
                });
            }
            else {
                this.showError('Sorry, something went wrong. Please try again.');
            }
        }
    }
    showTypingIndicator(text = 'Bot is typing...') {
        var _a;
        if (!this.advancedConfig.enableTypingIndicator)
            return;
        const messagesContainer = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('#chatbot-messages');
        if (!messagesContainer)
            return;
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
    hideTypingIndicator() {
        var _a;
        const indicator = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    checkOnlineStatus() {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') {
            this.isOnline = true; // Default to online in SSR
            return;
        }
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
    updateConnectionStatus() {
        var _a;
        const status = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelector('.chatbot-status');
        if (status) {
            status.textContent = this.isOnline ? 'Online' : 'Offline';
            status.className = `chatbot-status ${this.isOnline ? 'online' : 'offline'}`;
        }
    }
    initializeAnalytics() {
        this.trackEvent('widget_loaded');
        this.on('open', () => this.trackEvent('widget_opened'));
        this.on('close', () => this.trackEvent('widget_closed'));
        this.on('message', (msg) => {
            this.trackEvent('message_sent', {
                sender: msg.sender,
                messageLength: msg.text.length
            });
        });
    }
    trackEvent(event, data) {
        if (!this.advancedConfig.trackEvents || !this.advancedConfig.apiUrl)
            return;
        // Validate API URL before tracking
        if (!SecurityUtils.validateURL(this.advancedConfig.apiUrl))
            return;
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
    generateSessionId() {
        return 'session_' + SecurityUtils.generateSecureId(16);
    }
    // Enhanced styles for new features
    getEnhancedStyles() {
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

exports.AdvancedChatbotCore = AdvancedChatbotCore;
exports.ChatbotCore = ChatbotCore;
exports.SecurityUtils = SecurityUtils;
exports.globalLimiter = globalLimiter;
exports.messageLimiter = messageLimiter;
exports.uploadLimiter = uploadLimiter;
//# sourceMappingURL=index.js.map
