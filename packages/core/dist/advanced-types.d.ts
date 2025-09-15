import { ChatbotConfig } from './types';
export interface AdvancedChatbotConfig extends ChatbotConfig {
    apiUrl?: string;
    webhookUrl?: string;
    allowedFileTypes?: string[];
    maxFileSize?: number;
    messageRateLimit?: number;
    uploadRateLimit?: number;
    allowedDomains?: string[];
    enableCSP?: boolean;
    enableFileUpload?: boolean;
    enableTypingIndicator?: boolean;
    enableReadReceipts?: boolean;
    enableEmojis?: boolean;
    enableVoiceMessages?: boolean;
    customCSS?: string;
    customButtons?: CustomButton[];
    quickReplies?: string[];
    maxMessages?: number;
    sessionTimeout?: number;
    offlineMessage?: string;
    trackEvents?: boolean;
    userId?: string;
    sessionId?: string;
    authTokenProvider?: () => Promise<string>;
}
export interface CustomButton {
    id: string;
    text: string;
    action: 'url' | 'callback' | 'phone';
    value: string;
    style?: {
        backgroundColor?: string;
        textColor?: string;
        borderColor?: string;
    };
}
export interface SecurityConfig {
    maxFileSize: number;
    allowedFileTypes: string[];
    messageRateLimit: number;
    uploadRateLimit: number;
    allowedDomains?: string[];
    enableXSSProtection: boolean;
    enableCSP: boolean;
    maxMessageLength: number;
    maxFileNameLength: number;
}
