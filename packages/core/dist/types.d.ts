export interface ChatbotConfig {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    logo?: string;
    companyName?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    width?: number | string;
    height?: number | string;
    zIndex?: number;
    autoOpen?: boolean;
    greeting?: string;
    placeholder?: string;
    apiUrl?: string;
    apiKey?: string;
    borderRadius?: number;
    boxShadow?: string;
    fontFamily?: string;
}
export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    type?: 'text' | 'image' | 'file';
    sanitized?: boolean;
    validated?: boolean;
}
export interface SecurityEvent {
    type: 'xss_attempt' | 'rate_limit_exceeded' | 'invalid_file_upload' | 'malicious_url';
    timestamp: Date;
    details: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
}
