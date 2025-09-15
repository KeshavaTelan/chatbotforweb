# 🛡️ @keshavatelan/chatify-core

A secure, framework-agnostic chatbot widget with built-in XSS protection, rate limiting, and file upload security.

## ✨ Features

- 🛡️ **Security First**: XSS protection, rate limiting, input sanitization
- 🎨 **Customizable**: Colors, themes, positioning, branding
- 📱 **Responsive**: Works on desktop and mobile
- 🔧 **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JS
- 📁 **File Upload**: Secure file upload with validation
- ⚡ **TypeScript**: Full type safety and IntelliSense
- 🚀 **Modern**: ES modules, tree-shaking support

## 🚀 Quick Start

### Installation

```bash
npm install @keshavatelan/chatify-core
```

### Basic Usage

```javascript
import { ChatbotCore } from '@keshavatelan/chatify-core';

const chatbot = new ChatbotCore({
  primaryColor: '#007bff',
  companyName: 'Your Company',
  greeting: 'Hello! How can I help you today?',
  position: 'bottom-right'
});
```

### Advanced Usage with Security

```javascript
import { AdvancedChatbotCore, SecurityUtils } from '@keshavatelan/chatify-core';

const chatbot = new AdvancedChatbotCore({
  // Appearance
  primaryColor: '#007bff',
  companyName: 'Your Company',
  
  // API Integration (secure)
  apiUrl: 'https://your-server.com/api/chat',
  
  // Security settings
  enableFileUpload: true,
  messageRateLimit: 10,    // messages per minute
  uploadRateLimit: 3,      // uploads per minute
  
  // Features
  enableTypingIndicator: true,
  quickReplies: ['Help', 'Pricing', 'Contact'],
});

// Listen to events
chatbot.on('message', (msg) => {
  console.log('New message:', msg);
});
```

## 🔒 Security Features

### Built-in Protections
- **XSS Prevention**: All inputs automatically sanitized
- **Rate Limiting**: Prevents spam and abuse
- **File Upload Security**: Type and size validation
- **Input Validation**: Length limits and content filtering
- **Secure IDs**: Cryptographically secure ID generation

### Manual Security Utils
```javascript
import { SecurityUtils } from '@keshavatelan/chatify-core';

// Sanitize HTML content
const safe = SecurityUtils.sanitizeHTML('<script>alert("xss")</script>');

// Validate file uploads
const isValid = SecurityUtils.validateFileType(file, ['image/jpeg', 'image/png']);

// Generate secure IDs
const id = SecurityUtils.generateSecureId();
```

## 📖 API Reference

### ChatbotCore

#### Constructor Options

```typescript
interface ChatbotConfig {
  // Appearance
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  
  // Layout
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  width?: number | string;
  height?: number | string;
  
  // Branding
  companyName?: string;
  logo?: string;
  greeting?: string;
  placeholder?: string;
  
  // Behavior
  autoOpen?: boolean;
}
```

#### Methods

- `open()` - Open the chat widget
- `close()` - Close the chat widget  
- `on(event, callback)` - Listen to events
- `updateConfig(config)` - Update configuration
- `destroy()` - Remove the widget

#### Events

- `open` - Widget opened
- `close` - Widget closed
- `message` - New message sent

### AdvancedChatbotCore

Extends ChatbotCore with additional features:

```typescript
interface AdvancedChatbotConfig extends ChatbotConfig {
  // API Integration
  apiUrl?: string;
  
  // Security
  messageRateLimit?: number;
  uploadRateLimit?: number;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  
  // Features
  enableFileUpload?: boolean;
  enableTypingIndicator?: boolean;
  quickReplies?: string[];
  
  // Analytics
  trackEvents?: boolean;
  userId?: string;
}
```

## 🛠️ Development

### Building from Source

```bash
git clone <repository>
cd chatbot-core
npm install
npm run build
```

### Scripts

- `npm run build` - Build the package
- `npm run dev` - Watch mode development
- `npm run clean` - Clean build directory

## 📦 Package Contents

```
dist/
├── index.js          # CommonJS build
├── index.esm.js      # ES modules build  
├── index.umd.js      # UMD build for browsers
├── index.d.ts        # TypeScript definitions
└── *.map             # Source maps
```

## 🔗 Framework Integration

### React
```jsx
import { ChatbotCore } from '@keshavatelan/chatify-core';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const chatbot = new ChatbotCore({
      primaryColor: '#007bff',
      companyName: 'My App'
    });
    
    return () => chatbot.destroy();
  }, []);
  
  return <div>My App</div>;
}
```

### Vue
```vue
<template>
  <div>My App</div>
</template>

<script>
import { ChatbotCore } from '@keshavatelan/chatify-core';

export default {
  mounted() {
    this.chatbot = new ChatbotCore({
      primaryColor: '#007bff',
      companyName: 'My App'
    });
  },
  beforeDestroy() {
    this.chatbot?.destroy();
  }
};
</script>
```

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- 📚 [Documentation](https://github.com/KeshavaTelan/chatbotforweb)
- 🐛 [Issue Tracker](https://github.com/KeshavaTelan/chatbotforweb/issues)
- 💬 [Discussions](https://github.com/KeshavaTelan/chatbotforweb/discussions)
