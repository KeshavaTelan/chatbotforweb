# 🤖 Chatify.js

A comprehensive, framework-agnostic chatbot widget that can be integrated into any web application. Supports React, Angular, Vue, and vanilla JavaScript implementations with built-in security features including XSS protection, rate limiting, and secure file uploads.



[![NPM Version](https://img.shields.io/npm/v/@keshavatelan/chatify-core)](https://www.npmjs.com/package/@keshavatelan/chatify-core)## 🚀 Quick Start

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Security: Enabled](https://img.shields.io/badge/Security-Enabled-green.svg)](#security-features)### Vanilla JavaScript

```html

## ✨ Key Features<!DOCTYPE html>

<html>

- 🛡️ **Security First**: XSS protection, input sanitization, rate limiting<head>

- 🎨 **Fully Customizable**: Colors, themes, positioning, branding      <title>My Website</title>

- 📱 **Responsive Design**: Works perfectly on desktop and mobile</head>

- 🔧 **Framework Agnostic**: React, Vue, Angular, or vanilla JavaScript<body>

- 📁 **Secure File Upload**: Type validation, size limits, sanitization    <h1>Welcome to my website!</h1>

- ⚡ **TypeScript**: Complete type safety and IntelliSense support    

- 🚀 **Production Ready**: Optimized builds, CDN support    <script type="module">

        import { ChatbotCore } from './packages/core/dist/index.esm.js';

## 🚀 Quick Start        

        const chatbot = new ChatbotCore({

### Installation            primaryColor: '#007bff',

            companyName: 'Your Company',

```bash            greeting: 'Hello! How can I help you?',

npm install @keshavatelan/chatify-core            position: 'bottom-right'

```        });

    </script>

### Basic Usage</body>

</html>

```javascript```

import { ChatbotCore } from '@keshavatelan/chatify-core';

### React

const chatbot = new ChatbotCore({```jsx

  primaryColor: '#007bff',```jsx
import { ChatbotWidget } from '@keshavatelan/chatify-react';

  companyName: 'Your Company',

  greeting: 'Hello! How can I help you today?',function App() {

  position: 'bottom-right'  return (

});    <div>

```      <h1>My React App</h1>

      <ChatbotWidget

### With Security Features        primaryColor="#007bff"

        companyName="Your Company"

```javascript        greeting="Hello! How can I help you?"

import { AdvancedChatbotCore } from '@keshavatelan/chatify-core';        onMessage={(msg) => console.log('New message:', msg)}

      />

const chatbot = new AdvancedChatbotCore({    </div>

  // Appearance  );

  primaryColor: '#007bff',}

  companyName: 'Your Company',```

  

  // API Integration (secure server-side proxy)## 📁 Project Structure

  apiUrl: 'https://your-server.com/api/chat',

  ```

  // Security Configurationchatbotforweb/

  enableFileUpload: true,├── packages/

  messageRateLimit: 10,    // messages per minute│   └── core/

  uploadRateLimit: 3,      // uploads per minute│       ├── src/

  maxFileSize: 10485760,   // 10MB limit│       │   ├── index.ts              # Main exports

  │       │   ├── types.ts              # TypeScript interfaces

  // Features│       │   ├── chatbot-core.ts       # Core chatbot logic

  enableTypingIndicator: true,│       │   ├── advanced-features.ts  # Advanced chatbot features

  quickReplies: ['Help', 'Pricing', 'Contact Sales'],│       │   └── advanced-types.ts     # Advanced feature types

});│       ├── package.json              # Core package config

│       ├── rollup.config.js          # Build configuration

// Event handling│       └── tsconfig.json             # TypeScript config

chatbot.on('message', (message) => {├── demo.html                         # Live demo

  console.log('New message:', message);├── react_wrapper.ts                  # React component code

});├── angular_wrapper.ts               # Angular component code  

```├── vue_wrapper.ts                   # Vue component code

├── usage_examples.ts                # Framework usage examples

## 🔒 Security Features├── advanced_features.ts             # Advanced feature examples

├── build_configs.js                 # Build configurations

### Automatic Protections├── package_configs.json             # Package configurations

- **XSS Prevention**: All user inputs automatically sanitized└── dev_process.md                   # Development guide

- **Rate Limiting**: Prevents spam (configurable limits)```

- **File Upload Security**: MIME type validation, size limits, filename sanitization  

- **Input Validation**: Length limits, content filtering## ⚡ Features

- **Secure ID Generation**: Cryptographically secure random IDs

- **URL Validation**: Prevents malicious redirects### 🎯 Core Features

- ✅ **Framework Agnostic** - Works with any JavaScript framework

### Manual Security Utils- ✅ **Customizable UI** - Colors, themes, positioning, branding

```javascript- ✅ **Responsive Design** - Works on desktop and mobile

import { SecurityUtils } from '@keshavatelan/chatify-core';- ✅ **TypeScript Support** - Full type safety

- ✅ **Event System** - Listen to open/close/message events

// Sanitize HTML content- ✅ **Multiple Distribution** - NPM packages, CDN, direct download

const safeContent = SecurityUtils.sanitizeHTML(userInput);

### 🔥 Advanced Features  

// Validate file uploads- ✅ **File Upload Support** - Upload images, documents

const isValidFile = SecurityUtils.validateFileType(file, ['image/jpeg', 'image/png']);- ✅ **Typing Indicators** - Show when bot is typing

- ✅ **Quick Replies** - Pre-defined response buttons

// Check file size- ✅ **API Integration** - Connect to your backend

const isValidSize = SecurityUtils.validateFileSize(file, 10485760); // 10MB- ✅ **Analytics Tracking** - Track user interactions

```- ✅ **Offline Detection** - Handle network status

- ✅ **Session Management** - Maintain conversation state

## 🎨 Customization

## �️ Security Features

### Styling Options

```javascript### Built-in Security Protections

const chatbot = new ChatbotCore({

  // Colors**XSS Prevention:**

  primaryColor: '#007bff',- All user inputs are automatically sanitized

  secondaryColor: '#6c757d',- HTML content is escaped to prevent code injection

  backgroundColor: '#ffffff',- URL validation prevents malicious redirects

  textColor: '#212529',- Attribute injection protection

  

  // Layout**Rate Limiting:**

  position: 'bottom-right', // bottom-left, top-right, top-left- Message rate limiting (10 messages/minute by default)

  width: 350,- File upload rate limiting (3 uploads/minute by default)

  height: 500,- API call throttling to prevent abuse

  borderRadius: 12,

  **File Upload Security:**

  // Branding- File type validation (MIME type checking)

  companyName: 'Your Company',- File size limits (10MB default maximum)

  logo: 'https://your-domain.com/logo.png',- Filename sanitization (prevents path traversal)

  greeting: 'Hello! How can I help you?',- Secure file handling

  placeholder: 'Type your message...'

});**Content Security:**

```- Input length validation

- Configuration sanitization

### Advanced Configuration- Secure ID generation

```javascript- Error message sanitization (no internal details exposed)

const chatbot = new AdvancedChatbotCore({

  // All basic options plus:### Security Configuration

  

  // File Upload Settings```javascript

  enableFileUpload: true,import { AdvancedChatbotCore, SecurityUtils } from '@keshavatelan/chatify-core';

  maxFileSize: 10485760, // 10MB

  allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],const chatbot = new AdvancedChatbotCore({

    // Security settings

  // Rate Limiting  maxFileSize: 5 * 1024 * 1024, // 5MB limit

  messageRateLimit: 15,  // messages per minute  allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],

  uploadRateLimit: 5,    // uploads per minute  messageRateLimit: 10, // messages per minute

    uploadRateLimit: 3,   // uploads per minute

  // Features  allowedDomains: ['yourapi.com', 'trusted-cdn.com'],

  enableTypingIndicator: true,  

  quickReplies: ['Get Quote', 'Support', 'Demo'],  // Safe API integration (recommended approach)

    apiUrl: 'https://yourserver.com/api/chat', // Use server proxy, not direct API

  // Analytics (privacy-focused)  authTokenProvider: async () => {

  trackEvents: true,    // Get auth token from your server, not exposed in client code

  userId: 'anonymous-user-id'    const response = await fetch('/api/get-token');

});    return response.json().token;

```  },

  

## 🔌 API Integration  // Other config...

  primaryColor: '#007bff',

### Secure Server Setup  companyName: 'Your Company'

Always keep API keys on your server, never expose them in client code:});

```

```javascript

// ✅ SECURE: Server-side API proxy### Security Best Practices

const chatbot = new AdvancedChatbotCore({

  apiUrl: 'https://your-server.com/api/chat-proxy'**🔒 API Security:**

});```javascript

// ❌ DON'T: Expose API keys in client code

// ❌ INSECURE: Never do thisconst chatbot = new ChatbotCore({

const chatbot = new ChatbotCore({  apiKey: 'sk-your-secret-key' // NEVER DO THIS!

  apiKey: 'sk-your-secret-key' // DON'T EXPOSE API KEYS!});

});

```// ✅ DO: Use server-side proxy

const chatbot = new AdvancedChatbotCore({

### API Providers  apiUrl: 'https://yourserver.com/api/chat-proxy', // Your server handles auth

Works with any backend service:  authTokenProvider: () => getTokenFromServer()

- **OpenAI ChatGPT**: For AI-powered responses});

- **Google Dialogflow**: For intent-based conversations  ```

- **Custom APIs**: Your own chatbot logic

- **Hybrid Solutions**: Mix of AI and business logic**🛡️ Content Security Policy:**

```html

### Example Server Implementation<meta http-equiv="Content-Security-Policy" content="

```javascript  default-src 'self'; 

// Node.js/Express server example  script-src 'self' 'unsafe-inline'; 

app.post('/api/chat-proxy', async (req, res) => {  style-src 'self' 'unsafe-inline'; 

  const { message, sessionId } = req.body;  img-src 'self' data: https:;

    connect-src 'self' https://yourapi.com;

  // Your API integration here (OpenAI, Dialogflow, etc.)">

  const response = await callYourChatbotAPI(message, sessionId);```

  

  res.json({ response, sessionId });**🔍 Input Validation:**

});```javascript

```import { SecurityUtils } from '@keshavatelan/chatify-core';



## 🌐 Framework Integration// Manual validation if needed

if (!SecurityUtils.validateLength(userInput, 1000)) {

### React  console.error('Input too long');

```jsx}

import { ChatbotCore } from '@keshavatelan/chatify-core';

import { useEffect } from 'react';if (!SecurityUtils.validateURL(logoUrl)) {

  console.error('Invalid logo URL');

function App() {}

  useEffect(() => {```

    const chatbot = new ChatbotCore({

      primaryColor: '#007bff',### Security Events

      companyName: 'My React App'

    });Monitor security events in your application:

    

    return () => chatbot.destroy();```javascript

  }, []);chatbot.on('security_event', (event) => {

    console.log('Security event:', event);

  return <div>My Application</div>;  // Log to your security monitoring system

}});

``````



### Vue## 🚨 Security Checklist

```vue

<template>Before deploying to production:

  <div>My Vue App</div>

</template>- [ ] **Never expose API keys** in client-side code

- [ ] **Use HTTPS** for all API communications

<script>- [ ] **Implement server-side validation** for all inputs

import { ChatbotCore } from '@keshavatelan/chatify-core';- [ ] **Set up Content Security Policy** headers

- [ ] **Configure rate limiting** on your server

export default {- [ ] **Validate file uploads** on server-side

  mounted() {- [ ] **Sanitize all outputs** from your API

    this.chatbot = new ChatbotCore({- [ ] **Monitor for security events** and anomalies

      primaryColor: '#42b883',- [ ] **Keep dependencies updated** regularly

      companyName: 'My Vue App'- [ ] **Use secure session management**

    });

  },## �🛠️ Development Setup

  beforeDestroy() {

    this.chatbot?.destroy();1. **Clone and install dependencies:**

  }```bash

};git clone <your-repo>

</script>cd chatbotforweb

```npm install

```

### CDN Usage (No Build Step)

```html2. **Build the core package:**

<script src="https://unpkg.com/@keshavatelan/chatify-core/dist/index.umd.js"></script>```bash

<script>cd packages/core

  const chatbot = new ChatbotCore.ChatbotCore({npm install

    primaryColor: '#007bff',npm run build

    companyName: 'My Website'```

  });

</script>3. **Test with the demo:**

``````bash

# Open demo.html in your browser

## 📖 API Reference# Or use a simple HTTP server:

npx http-server . -p 3000

### ChatbotCore Class```



#### Constructor Options## 🎨 Customization

```typescript

interface ChatbotConfig {### Basic Configuration

  // Appearance```javascript

  primaryColor?: string;const chatbot = new ChatbotCore({

  secondaryColor?: string;  // Appearance

  backgroundColor?: string;  primaryColor: '#007bff',

  textColor?: string;  secondaryColor: '#6c757d', 

    backgroundColor: '#ffffff',

  // Layout    textColor: '#212529',

  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';  

  width?: number | string;  // Layout

  height?: number | string;  position: 'bottom-right', // bottom-left, top-right, top-left

  borderRadius?: number;  width: 350,

  zIndex?: number;  height: 500,

    borderRadius: 12,

  // Branding  

  companyName?: string;  // Branding

  logo?: string;  companyName: 'Your Company',

  greeting?: string;  logo: '/path/to/logo.png',

  placeholder?: string;  

    // Behavior

  // Behavior  greeting: 'Hello! How can I help you?',

  autoOpen?: boolean;  placeholder: 'Type your message...',

}  autoOpen: false

```});

```

#### Methods

- `open()` - Open the chat widget### Advanced Configuration

- `close()` - Close the chat widget```javascript

- `on(event, callback)` - Listen to eventsimport { AdvancedChatbotCore } from '@keshavatelan/chatify-core';

- `updateConfig(config)` - Update configuration

- `destroy()` - Remove the widgetconst chatbot = new AdvancedChatbotCore({

  // All basic config options plus:

#### Events  

- `open` - Widget opened  // API Integration

- `close` - Widget closed    apiUrl: 'https://api.yourservice.com/chat',

- `message` - New message sent  apiKey: 'your-api-key',

  

### AdvancedChatbotCore Class  // Features

  enableFileUpload: true,

Extends ChatbotCore with additional security and features:  enableTypingIndicator: true,

  enableVoiceMessages: false,

```typescript  

interface AdvancedChatbotConfig extends ChatbotConfig {  // Quick Replies

  // API Integration  quickReplies: [

  apiUrl?: string;    'Tell me more',

      'Get pricing',

  // Security    'Contact sales',

  messageRateLimit?: number;    'Schedule demo'

  uploadRateLimit?: number;  ],

  maxFileSize?: number;  

  allowedFileTypes?: string[];  // Analytics

  allowedDomains?: string[];  trackEvents: true,

    userId: 'user-123',

  // Features  

  enableFileUpload?: boolean;  // Behavior

  enableTypingIndicator?: boolean;  maxMessages: 100,

  quickReplies?: string[];  sessionTimeout: 30 * 60 * 1000, // 30 minutes

  trackEvents?: boolean;  offlineMessage: 'We are currently offline. Please try again later.'

}});

``````



## 🚨 Security Best Practices## 🔌 API Integration



Before deploying to production:Connect your chatbot to any backend service:



- ✅ **Use HTTPS** for all API communications```javascript

- ✅ **Keep API keys secure** on your server (never in client code)// Example API endpoint structure

- ✅ **Validate all inputs** on both client and server sidePOST /api/chat

- ✅ **Set up rate limiting** on your server{

- ✅ **Use Content Security Policy** headers  "message": "Hello",

- ✅ **Monitor for security events** and anomalies  "sessionId": "session_123",

  "userId": "user_456"

## 📦 Distribution}



### NPM Package// Expected response

```bash{

npm install @keshavatelan/chatify-core  "response": "Hi there! How can I help you today?",

```  "sessionId": "session_123"

}

### CDN```

```html

<!-- Latest version -->## 🚀 What You Can Do

<script src="https://unpkg.com/@keshavatelan/chatify-core@latest/dist/index.umd.js"></script>

### 1. **Immediate Use**

<!-- Specific version -->- Open `demo.html` to see the chatbot in action

<script src="https://unpkg.com/@keshavatelan/chatify-core@1.0.0/dist/index.umd.js"></script>- Customize colors, text, and behavior

```- Add your own branding and messaging



### Downloads### 2. **Framework Integration**

- Package size: **67.8 kB** (compressed)- Use the React wrapper for React apps

- Unpacked size: **310.2 kB**  - Use the Angular component for Angular apps  

- Zero dependencies in production build- Use the Vue component for Vue apps

- Tree-shaking supported- Use the core directly for any other framework



## 🤝 Contributing### 3. **Backend Integration**

- Connect to OpenAI, Dialogflow, or custom APIs

We welcome contributions! Please:- Handle file uploads and rich media

- Track analytics and user behavior

1. Fork the repository- Implement authentication and user management

2. Create a feature branch

3. Make your changes with tests### 4. **Distribution**

4. Submit a pull request- Publish to NPM as separate packages

- Host on CDN for direct inclusion

See our [Contributing Guidelines](CONTRIBUTING.md) for more details.- Bundle with applications

- White-label for enterprise clients

## 📄 License

### 5. **Advanced Features**

MIT License - feel free to use in personal and commercial projects.- Add voice message support

- Implement real-time notifications

## 🆘 Support- Create themed variants

- Build admin dashboards

- 🐛 [Report Issues](https://github.com/KeshavaTelan/chatbotforweb/issues)- Add multilingual support

- 💬 [Discussions](https://github.com/KeshavaTelan/chatbotforweb/discussions)

- 📧 [Email Support](mailto:keshavasilva@gmail.com)## 📦 Package Distribution



## 🌟 Show Your SupportThe project is designed for multiple distribution methods:



If this project helps you, please ⭐ star it on GitHub!### NPM Packages

```bash

---# Core package

npm install @keshavatelan/chatify-core

**Ready to get started?** Install the package and create your first secure chatbot widget in minutes! 🚀
# Framework-specific packages  
npm install @keshavatelan/chatify-react
npm install @keshavatelan/chatify-angular
npm install @keshavatelan/chatify-vue
```

### CDN Usage
```html
<!-- Core (UMD bundle) -->
<script src="https://unpkg.com/@keshavatelan/chatify-core/dist/index.umd.js"></script>

<script>
  const chatbot = new ChatbotCore.ChatbotCore({
    primaryColor: '#007bff',
    companyName: 'Your Company'
  });
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use in commercial and personal projects.

## 🆘 Support

- 📚 Check the documentation in `dev_process.md`
- 🐛 Report issues on GitHub
- 💬 Join our community discussions
- 📧 Contact support team

---

**Ready to get started?** Open `demo.html` to see the chatbot in action, or follow the development setup to build your own custom implementation!
