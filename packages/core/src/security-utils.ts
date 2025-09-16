/**
 * Security utilities for the chatbot
 * Provides functions to sanitize inputs, validate files, and prevent common attacks
 */

export class SecurityUtils {
  /**
   * Sanitize HTML content to prevent XSS attacks
   * @param input - The input string to sanitize
   * @returns Sanitized string safe for HTML insertion
   */
  static sanitizeHTML(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
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
  static sanitizeAttribute(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    // Remove potentially dangerous characters from attributes
    return input
      .replace(/[<>"'&]/g, (match) => {
        const entities: { [key: string]: string } = {
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
  static validateFileType(file: File, allowedTypes: string[]): boolean {
    if (!file || !file.type) return false;
    return allowedTypes.includes(file.type);
  }

  /**
   * Validate file size
   * @param file - The file to validate
   * @param maxSize - Maximum allowed file size in bytes
   * @returns True if file size is within limit
   */
  static validateFileSize(file: File, maxSize: number): boolean {
    if (!file) return false;
    return file.size <= maxSize;
  }

  /**
   * Sanitize file name to prevent path traversal attacks
   * @param fileName - The file name to sanitize
   * @returns Sanitized file name
   */
  static sanitizeFileName(fileName: string): string {
    if (!fileName || typeof fileName !== 'string') return 'unnamed';
    
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
  static validateURL(url: string, allowedDomains?: string[]): boolean {
    if (!url || typeof url !== 'string') return false;
    
    try {
      const urlObj = new URL(url);
      
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return false;
      }
      
      // Check allowed domains if provided
      if (allowedDomains && allowedDomains.length > 0) {
        const hostname = urlObj.hostname.toLowerCase();
        return allowedDomains.some(domain => 
          hostname === domain.toLowerCase() || 
          hostname.endsWith('.' + domain.toLowerCase())
        );
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate input length
   * @param input - The input to validate
   * @param maxLength - Maximum allowed length
   * @returns True if input length is within limit
   */
  static validateLength(input: string, maxLength: number): boolean {
    if (typeof input !== 'string') return false;
    return input.length <= maxLength;
  }

  /**
   * Rate limiter class to prevent abuse
   */
  static RateLimiter = class {
    public timestamps: Map<string, number[]> = new Map();

    /**
     * Check if action is allowed based on rate limit
     * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
     * @param limit - Maximum number of actions allowed
     * @param windowMs - Time window in milliseconds
     * @returns True if action is allowed
     */
    checkLimit(key: string, limit: number, windowMs: number = 60000): boolean {
      const now = Date.now();
      let userTimestamps = this.timestamps.get(key) || [];
      
      // Remove timestamps outside the window
      userTimestamps = userTimestamps.filter(timestamp => 
        now - timestamp < windowMs
      );
      
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
    cleanup(): void {
      const now = Date.now();
      const oneHour = 3600000; // 1 hour
      
      for (const [key, timestamps] of this.timestamps.entries()) {
        const validTimestamps = timestamps.filter(timestamp => 
          now - timestamp < oneHour
        );
        
        if (validTimestamps.length === 0) {
          this.timestamps.delete(key);
        } else {
          this.timestamps.set(key, validTimestamps);
        }
      }
    }
  };

  /**
   * Generate a secure random ID
   * @param length - Length of the ID (default: 16)
   * @returns Random string ID
   */
  static generateSecureId(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    // Guard against SSR environments and use crypto API when available
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length];
      }
    } else {
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
  static sanitizeConfig(config: any): any {
    if (!config || typeof config !== 'object') return {};
    
    const sanitized: any = {};
    
    // Sanitize string properties
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeHTML(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item => 
          typeof item === 'string' ? this.sanitizeHTML(item) : item
        );
      } else if (value && typeof value === 'object') {
        sanitized[key] = this.sanitizeConfig(value);
      }
    }
    
    return sanitized;
  }
}

// Export default rate limiter instances
export const messageLimiter = new SecurityUtils.RateLimiter();
export const uploadLimiter = new SecurityUtils.RateLimiter();
export const globalLimiter = new SecurityUtils.RateLimiter();

// Clean up rate limiters every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    messageLimiter.cleanup();
    uploadLimiter.cleanup();
    globalLimiter.cleanup();
  }, 300000); // 5 minutes
}