import { ChatbotCore } from './chatbot-core';
import { AdvancedChatbotConfig } from './advanced-types';
export declare class AdvancedChatbotCore extends ChatbotCore {
    private typingTimeout?;
    private sessionId;
    private isOnline;
    constructor(config: AdvancedChatbotConfig);
    private get advancedConfig();
    private initializeAdvancedFeatures;
    private addFileUploadButton;
    private handleFileUpload;
    private addQuickReplies;
    private sendQuickReply;
    private sendToAPI;
    private showTypingIndicator;
    private hideTypingIndicator;
    private checkOnlineStatus;
    private updateConnectionStatus;
    private initializeAnalytics;
    private trackEvent;
    private generateSessionId;
    protected getEnhancedStyles(): string;
}
