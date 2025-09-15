export interface ChatbotConfig {
  // Branding - All values are sanitized to prevent XSS
  primaryColor?: string; // CSS color values are validated
  secondaryColor?: string; // CSS color values are validated
  textColor?: string; // CSS color values are validated
  backgroundColor?: string; // CSS color values are validated
  logo?: string; // URLs are validated for security
  companyName?: string; // HTML content is sanitized
  
  // Layout
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  width?: number | string; // CSS values are sanitized
  height?: number | string; // CSS values are sanitized
  zIndex?: number; // Numeric values are validated
  
  // Behavior - All text is sanitized
  autoOpen?: boolean;
  greeting?: string; // HTML content is sanitized
  placeholder?: string; // Attribute content is sanitized
  
  // API Configuration - SECURITY WARNING: Keep these secure
  apiUrl?: string; // URLs are validated, should be server-side proxy
  apiKey?: string; // DEPRECATED: Never expose API keys in client code
  
  // Styling - All CSS values are sanitized
  borderRadius?: number;
  boxShadow?: string; // CSS values are sanitized
  fontFamily?: string; // CSS values are sanitized
}

export interface Message {
  id: string; // Generated using secure random IDs
  text: string; // All content is sanitized to prevent XSS
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'image' | 'file';
  
  // Security metadata
  sanitized?: boolean; // Indicates if message was sanitized
  validated?: boolean; // Indicates if message was validated
}

export interface SecurityEvent {
  type: 'xss_attempt' | 'rate_limit_exceeded' | 'invalid_file_upload' | 'malicious_url';
  timestamp: Date;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
