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
import React, { useEffect, useRef } from 'react';
import { ChatbotCore } from '@keshavatelan/chatify-core';

function App() {
  const chatbotRef = useRef(null);

  useEffect(() => {
    chatbotRef.current = new ChatbotCore({
      primaryColor: '#007bff',
      companyName: 'Your Company',
      greeting: 'Hello from React!'
    });

    return () => chatbotRef.current?.destroy();
  }, []);

  return <div>Your React App</div>;
}
```

## 🔧 Framework Integration

Chatify.js works seamlessly with all modern JavaScript frameworks:

### Supported Frameworks
- ✅ **React** (16.8+ with hooks)
- ✅ **Vue** (2.x and 3.x)
- ✅ **Angular** (2+)
- ✅ **Next.js** (with SSR support)
- ✅ **Nuxt.js** (2.x and 3.x)
- ✅ **Vanilla JavaScript**
- ✅ **TypeScript** (full type support)

### Quick Framework Examples

**React:**
```tsx
import { ChatbotCore } from '@keshavatelan/chatify-core';
import type { ChatbotConfig } from '@keshavatelan/chatify-core';

// Now SSR-safe with built-in guards
const chatbot = new ChatbotCore({ primaryColor: '#007bff' });
```

**Vue 3:**
```vue
<script setup>
import { onMounted } from 'vue';
import { ChatbotCore } from '@keshavatelan/chatify-core';

onMounted(() => {
  // SSR-safe initialization
  new ChatbotCore({ primaryColor: '#42b883' });
});
</script>
```

**Angular:**
```typescript
import { ChatbotCore } from '@keshavatelan/chatify-core';

@Component({...})
export class AppComponent implements OnInit {
  ngOnInit() {
    // SSR-safe with built-in DOM guards
    new ChatbotCore({ primaryColor: '#dd0031' });
  }
}
```

**📖 For complete integration examples, see [FRAMEWORK-INTEGRATION.md](./FRAMEWORK-INTEGRATION.md)**
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
