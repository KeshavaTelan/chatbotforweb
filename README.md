# 🤖 Chatify.js

A comprehensive, framework-agnostic chatbot widget with built-in security features. Supports React, Angular, Vue, and vanilla JavaScript with XSS protection, rate limiting, and secure file uploads.

[![NPM Version](https://img.shields.io/npm/v/@keshavatelan/chatify-core)](https://www.npmjs.com/package/@keshavatelan/chatify-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security: Enabled](https://img.shields.io/badge/Security-Enabled-green.svg)](#security-features)

## ✨ Key Features

- 🛡️ **Security First**: XSS protection, input sanitization, rate limiting
- 🎨 **Fully Customizable**: Colors, themes, positioning, branding
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔧 **Framework Agnostic**: React, Vue, Angular, or vanilla JavaScript
- 📁 **Secure File Upload**: Type validation, size limits, sanitization
- ⚡ **TypeScript**: Complete type safety and IntelliSense support

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

### React Integration

```jsx
import { ChatbotWidget } from '@keshavatelan/chatify-react';

function App() {
  return (
    <div>
      <h1>My React App</h1>
      <ChatbotWidget
        primaryColor="#007bff"
        companyName="Your Company"
        greeting="Hello! How can I help you?"
        onMessage={(msg) => console.log('New message:', msg)}
      />
    </div>
  );
}
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to my website!</h1>
  
  <script type="module">
    import { ChatbotCore } from './packages/core/dist/index.esm.js';
    
    const chatbot = new ChatbotCore({
      primaryColor: '#007bff',
      companyName: 'Your Company',
      greeting: 'Hello! How can I help you?',
      position: 'bottom-right'
    });
  </script>
</body>
</html>
```

## 📁 Project Structure

```
chatify/
├── packages/
│   └── core/
│       ├── src/
│       │   ├── index.ts              # Main exports
│       │   ├── chatbot-core.ts       # Core chatbot logic
│       │   ├── advanced-features.ts  # Advanced features
│       │   └── security-utils.ts     # Security utilities
│       ├── package.json              # Package config
│       └── rollup.config.js          # Build config
├── demo.html                         # Live demo
├── package.json                      # Root config
└── README.md                         # This file
```

## 🔒 Security Features

### Built-in Security Protections

- **XSS Prevention**: All user inputs automatically sanitized
- **Rate Limiting**: Configurable message and upload limits (10 msg/min, 3 uploads/min)
- **File Upload Security**: MIME type validation, size limits, filename sanitization
- **Input Validation**: Length limits, content filtering
- **Secure ID Generation**: Cryptographically secure random IDs

### Security Configuration

```javascript
import { AdvancedChatbotCore, SecurityUtils } from '@keshavatelan/chatify-core';

const chatbot = new AdvancedChatbotCore({
  // Security settings
  maxFileSize: 5 * 1024 * 1024, // 5MB limit
  allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  messageRateLimit: 10, // messages per minute
  uploadRateLimit: 3,   // uploads per minute
  
  // API integration (use server proxy for security)
  apiUrl: 'https://yourserver.com/api/chat-proxy',
  
  // UI settings
  primaryColor: '#007bff',
  companyName: 'Your Company'
});

// Manual security utilities
const safeContent = SecurityUtils.sanitizeHTML(userInput);
const isValidFile = SecurityUtils.validateFileType(file, ['image/jpeg', 'image/png']);
```

## 🎨 Customization

```javascript
const chatbot = new ChatbotCore({
  // Colors
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  backgroundColor: '#ffffff',
  textColor: '#212529',
  
  // Layout
  position: 'bottom-right', // bottom-left, top-right, top-left
  width: 350,
  height: 500,
  borderRadius: 12,
  
  // Branding
  companyName: 'Your Company',
  logo: 'https://your-domain.com/logo.png',
  greeting: 'Hello! How can I help you?',
  placeholder: 'Type your message...',
  
  // Features
  enableFileUpload: true,
  enableTypingIndicator: true,
  quickReplies: ['Help', 'Pricing', 'Contact Sales']
});
```

## 🔌 API Integration

Always keep API keys on your server:

```javascript
// ✅ SECURE: Server-side API proxy
const chatbot = new AdvancedChatbotCore({
  apiUrl: 'https://your-server.com/api/chat-proxy'
});

// ❌ INSECURE: Never expose API keys in client code
const chatbot = new ChatbotCore({
  apiKey: 'sk-your-secret-key' // DON'T DO THIS!
});
```

### API Endpoint Format

```javascript
// POST /api/chat
{
  "message": "Hello",
  "sessionId": "session_123",
  "userId": "user_456"
}

// Response
{
  "response": "Hi there! How can I help you today?",
  "sessionId": "session_123"
}
```

## 🌐 Framework Integration

| Framework | Package | Import |
|-----------|---------|--------|
| **Vanilla JS** | `@keshavatelan/chatify-core` | `import { ChatbotCore }` |
| **React** | `@keshavatelan/chatify-react` | `import { ChatbotWidget }` |
| **Angular** | `@keshavatelan/chatify-angular` | `import { ChatbotComponent }` |
| **Vue** | `@keshavatelan/chatify-vue` | `import { ChatbotWidget }` |

## 📦 Distribution

### NPM Packages
```bash
# Core package
npm install @keshavatelan/chatify-core

# Framework-specific packages
npm install @keshavatelan/chatify-react
npm install @keshavatelan/chatify-angular
npm install @keshavatelan/chatify-vue
```

### CDN Usage
```html
<!-- Latest version -->
<script src="https://unpkg.com/@keshavatelan/chatify-core@latest/dist/index.umd.js"></script>

<script>
  const chatbot = new ChatbotCore.ChatbotCore({
    primaryColor: '#007bff',
    companyName: 'Your Company'
  });
</script>
```

## 🛠️ Development Setup

```bash
# Clone and install
git clone https://github.com/KeshavaTelan/chatbotforweb.git
cd chatbotforweb
npm install

# Build the core package
cd packages/core
npm install
npm run build

# Test with demo
cd ../..
npx http-server . -p 3000
# Open http://localhost:3000/demo.html
```

## 📖 API Reference

### ChatbotCore Class

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

### Methods & Events

| Method | Description |
|--------|-------------|
| `open()` | Open the chat widget |
| `close()` | Close the chat widget |
| `destroy()` | Remove the widget |
| `on(event, callback)` | Listen to events |
| `updateConfig(config)` | Update configuration |

| Event | Description |
|-------|-------------|
| `open` | Widget opened |
| `close` | Widget closed |
| `message` | New message sent |

## 🚨 Security Checklist

Before deploying to production:

- [ ] Never expose API keys in client-side code
- [ ] Use HTTPS for all API communications
- [ ] Implement server-side input validation
- [ ] Set up Content Security Policy headers
- [ ] Configure rate limiting on your server
- [ ] Validate file uploads on server-side
- [ ] Monitor for security events

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## 🆘 Support

- 🐛 [Report Issues](https://github.com/KeshavaTelan/chatbotforweb/issues)
- 💬 [Discussions](https://github.com/KeshavaTelan/chatbotforweb/discussions)
- 📧 [Email Support](mailto:keshavasilva@gmail.com)

---

**Ready to get started?** Open `demo.html` to see Chatify.js in action! 🚀

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
