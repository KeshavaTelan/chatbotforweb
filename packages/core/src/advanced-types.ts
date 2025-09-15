import { ChatbotConfig } from './types';

export interface AdvancedChatbotConfig extends ChatbotConfig {
  // API Configuration - Secured
  apiUrl?: string; // Public API endpoint only
  webhookUrl?: string; // Deprecated: use apiUrl instead
  
  // Security Configuration
  allowedFileTypes?: string[]; // MIME types allowed for file uploads
  maxFileSize?: number; // Maximum file size in bytes
  messageRateLimit?: number; // Max messages per minute (default: 10)
  uploadRateLimit?: number; // Max file uploads per minute (default: 3)
  allowedDomains?: string[]; // Allowed domains for URLs
  enableCSP?: boolean; // Enable Content Security Policy headers
  
  // Features
  enableFileUpload?: boolean;
  enableTypingIndicator?: boolean;
  enableReadReceipts?: boolean;
  enableEmojis?: boolean;
  enableVoiceMessages?: boolean;
  
  // Customization - All values are sanitized
  customCSS?: string;
  customButtons?: CustomButton[];
  quickReplies?: string[];
  
  // Behavior
  maxMessages?: number;
  sessionTimeout?: number;
  offlineMessage?: string;
  
  // Analytics - Privacy-focused
  trackEvents?: boolean;
  userId?: string; // Should be anonymous/hashed in production
  sessionId?: string; // Auto-generated if not provided
  
  // Authentication (server-side only)
  authTokenProvider?: () => Promise<string>; // Function to get auth tokens
}

export interface CustomButton {
  id: string;
  text: string; // Will be sanitized
  action: 'url' | 'callback' | 'phone';
  value: string; // URLs will be validated
  style?: {
    backgroundColor?: string; // Will be sanitized
    textColor?: string; // Will be sanitized
    borderColor?: string; // Will be sanitized
  };
}

export interface SecurityConfig {
  // File upload security
  maxFileSize: number;
  allowedFileTypes: string[];
  
  // Rate limiting
  messageRateLimit: number;
  uploadRateLimit: number;
  
  // URL validation
  allowedDomains?: string[];
  
  // Content security
  enableXSSProtection: boolean;
  enableCSP: boolean;
  
  // Input validation
  maxMessageLength: number;
  maxFileNameLength: number;
}
