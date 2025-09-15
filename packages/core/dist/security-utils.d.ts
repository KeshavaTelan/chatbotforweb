/**
 * Security utilities for the chatbot
 * Provides functions to sanitize inputs, validate files, and prevent common attacks
 */
export declare class SecurityUtils {
    /**
     * Sanitize HTML content to prevent XSS attacks
     * @param input - The input string to sanitize
     * @returns Sanitized string safe for HTML insertion
     */
    static sanitizeHTML(input: string): string;
    /**
     * Sanitize HTML attributes to prevent attribute injection
     * @param input - The attribute value to sanitize
     * @returns Sanitized attribute value
     */
    static sanitizeAttribute(input: string): string;
    /**
     * Validate file type by checking actual MIME type
     * @param file - The file to validate
     * @param allowedTypes - Array of allowed MIME types
     * @returns True if file type is allowed
     */
    static validateFileType(file: File, allowedTypes: string[]): boolean;
    /**
     * Validate file size
     * @param file - The file to validate
     * @param maxSize - Maximum allowed file size in bytes
     * @returns True if file size is within limit
     */
    static validateFileSize(file: File, maxSize: number): boolean;
    /**
     * Sanitize file name to prevent path traversal attacks
     * @param fileName - The file name to sanitize
     * @returns Sanitized file name
     */
    static sanitizeFileName(fileName: string): string;
    /**
     * Validate URL to prevent malicious redirects
     * @param url - The URL to validate
     * @param allowedDomains - Optional array of allowed domains
     * @returns True if URL is safe
     */
    static validateURL(url: string, allowedDomains?: string[]): boolean;
    /**
     * Validate input length
     * @param input - The input to validate
     * @param maxLength - Maximum allowed length
     * @returns True if input length is within limit
     */
    static validateLength(input: string, maxLength: number): boolean;
    /**
     * Rate limiter class to prevent abuse
     */
    static RateLimiter: {
        new (): {
            timestamps: Map<string, number[]>;
            /**
             * Check if action is allowed based on rate limit
             * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
             * @param limit - Maximum number of actions allowed
             * @param windowMs - Time window in milliseconds
             * @returns True if action is allowed
             */
            checkLimit(key: string, limit: number, windowMs?: number): boolean;
            /**
             * Clean up old entries to prevent memory leaks
             */
            cleanup(): void;
        };
    };
    /**
     * Generate a secure random ID
     * @param length - Length of the ID (default: 16)
     * @returns Random string ID
     */
    static generateSecureId(length?: number): string;
    /**
     * Validate and sanitize configuration object
     * @param config - Configuration object to validate
     * @returns Sanitized configuration object
     */
    static sanitizeConfig(config: any): any;
}
export declare const messageLimiter: {
    timestamps: Map<string, number[]>;
    /**
     * Check if action is allowed based on rate limit
     * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
     * @param limit - Maximum number of actions allowed
     * @param windowMs - Time window in milliseconds
     * @returns True if action is allowed
     */
    checkLimit(key: string, limit: number, windowMs?: number): boolean;
    /**
     * Clean up old entries to prevent memory leaks
     */
    cleanup(): void;
};
export declare const uploadLimiter: {
    timestamps: Map<string, number[]>;
    /**
     * Check if action is allowed based on rate limit
     * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
     * @param limit - Maximum number of actions allowed
     * @param windowMs - Time window in milliseconds
     * @returns True if action is allowed
     */
    checkLimit(key: string, limit: number, windowMs?: number): boolean;
    /**
     * Clean up old entries to prevent memory leaks
     */
    cleanup(): void;
};
export declare const globalLimiter: {
    timestamps: Map<string, number[]>;
    /**
     * Check if action is allowed based on rate limit
     * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
     * @param limit - Maximum number of actions allowed
     * @param windowMs - Time window in milliseconds
     * @returns True if action is allowed
     */
    checkLimit(key: string, limit: number, windowMs?: number): boolean;
    /**
     * Clean up old entries to prevent memory leaks
     */
    cleanup(): void;
};
