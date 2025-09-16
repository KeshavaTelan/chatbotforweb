# 🛡️ @keshavatelan/chatify-core

> A secure, framework-agnostic chatbot widget with built-in XSS protection, rate limiting, and file upload security

[![NPM Version](https://img.shields.io/npm/v/@keshavatelan/chatify-core)](https://www.npmjs.com/package/@keshavatelan/chatify-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)
[![Security: First](https://img.shields.io/badge/Security-First-green.svg)](#security-features)

Chatify.js is a production-ready chatbot widget that works with **React**, **Vue**, **Angular**, **Next.js**, **Nuxt.js**, and **vanilla JavaScript**. Built with security-first principles and SSR compatibility.

## ✨ Features

- 🛡️ **Security First**: XSS protection, rate limiting, input sanitization
- 🔧 **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JS
- 🎨 **Fully Customizable**: Colors, themes, positioning, branding
- 📱 **Responsive Design**: Works on desktop and mobile
- � **Secure File Upload**: Type validation, size limits, sanitization
- ⚡ **TypeScript Ready**: Full type safety and IntelliSense
- 🌐 **SSR Compatible**: Next.js, Nuxt.js, Angular Universal support
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

## 🔧 Framework Integration

### React

```jsx
import React, { useEffect, useRef } from 'react';
import { ChatbotCore } from '@keshavatelan/chatify-core';

function App() {
  const chatbotRef = useRef(null);

  useEffect(() => {
    chatbotRef.current = new ChatbotCore({
      primaryColor: '#007bff',
      companyName: 'My React App',
      greeting: 'Hello from React!'
    });

    return () => chatbotRef.current?.destroy();
  }, []);

  return <div>Your React App</div>;
}
```

### Vue 3 (Composition API)

```vue
<template>
  <div>Your Vue App</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ChatbotCore } from '@keshavatelan/chatify-core';

const chatbot = ref(null);

onMounted(() => {
  chatbot.value = new ChatbotCore({
    primaryColor: '#42b883',
    companyName: 'My Vue App',
    greeting: 'Hello from Vue!'
  });
});

onUnmounted(() => {
  chatbot.value?.destroy();
});
</script>
```

### Vue 2 (Options API)

```vue
<template>
  <div>Your Vue App</div>
</template>

<script>
import { ChatbotCore } from '@keshavatelan/chatify-core';

export default {
  data() {
    return {
      chatbot: null
    };
  },
  mounted() {
    this.chatbot = new ChatbotCore({
      primaryColor: '#42b883',
      companyName: 'My Vue 2 App'
    });
  },
  beforeDestroy() {
    this.chatbot?.destroy();
  }
};
</script>
```

### Angular

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatbotCore } from '@keshavatelan/chatify-core';
import type { ChatbotConfig } from '@keshavatelan/chatify-core';

@Component({
  selector: 'app-chatbot',
  template: '<div>Your Angular App</div>'
})
export class ChatbotComponent implements OnInit, OnDestroy {
  private chatbot: ChatbotCore | null = null;

  ngOnInit(): void {
    this.chatbot = new ChatbotCore({
      primaryColor: '#dd0031',
      companyName: 'My Angular App',
      greeting: 'Hello from Angular!'
    });
  }

  ngOnDestroy(): void {
    this.chatbot?.destroy();
  }
}
```

### Next.js (SSR-Safe)

```tsx
// components/ChatbotWrapper.tsx
'use client';
import { useEffect, useRef } from 'react';
import { ChatbotCore } from '@keshavatelan/chatify-core';

export default function ChatbotWrapper() {
  const chatbotRef = useRef<ChatbotCore | null>(null);

  useEffect(() => {
    // SSR-safe - package has built-in guards
    chatbotRef.current = new ChatbotCore({
      primaryColor: '#000000',
      companyName: 'My Next.js App'
    });

    return () => chatbotRef.current?.destroy();
  }, []);

  return null; // Chatbot renders itself
}

// pages/index.tsx or app/page.tsx
import dynamic from 'next/dynamic';

const ChatbotWrapper = dynamic(
  () => import('../components/ChatbotWrapper'),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <h1>My Next.js App</h1>
      <ChatbotWrapper />
    </div>
  );
}
```

### Nuxt.js

```vue
<template>
  <div>
    <h1>My Nuxt App</h1>
  </div>
</template>

<script setup>
import { ChatbotCore } from '@keshavatelan/chatify-core';

let chatbot = null;

onMounted(() => {
  // SSR-safe - package has built-in guards
  chatbot = new ChatbotCore({
    primaryColor: '#00dc82',
    companyName: 'My Nuxt App'
  });
});

onUnmounted(() => {
  chatbot?.destroy();
});
</script>
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to my website!</h1>
  
  <script type="module">
    import { ChatbotCore } from '@keshavatelan/chatify-core';
    
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

### TypeScript

```typescript
import { ChatbotCore, AdvancedChatbotCore } from '@keshavatelan/chatify-core';
import type { 
  ChatbotConfig, 
  AdvancedChatbotConfig, 
  Message,
  SecurityEvent 
} from '@keshavatelan/chatify-core';

const config: ChatbotConfig = {
  primaryColor: '#007bff',
  companyName: 'TypeScript App',
  greeting: 'Hello from TypeScript!'
};

const chatbot = new ChatbotCore(config);

// Type-safe event handling
chatbot.on('message', (message: Message) => {
  console.log(`${message.sender}: ${message.text}`);
});
```

## 🔒 Security Features

### Built-in Security Protections

- **XSS Prevention**: All user inputs automatically sanitized
- **Rate Limiting**: Configurable message and upload limits (10 msg/min, 3 uploads/min)
- **File Upload Security**: MIME type validation, size limits, filename sanitization
- **Input Validation**: Length limits, content filtering
- **Secure ID Generation**: Cryptographically secure random IDs
- **URL Validation**: Prevents malicious redirects
- **SSR Safe**: Works in server-side rendering environments

### Manual Security Utils

```javascript
import { SecurityUtils } from '@keshavatelan/chatify-core';

// Sanitize HTML content
const safe = SecurityUtils.sanitizeHTML('<script>alert("xss")</script>');
// Result: "&lt;script&gt;alert("xss")&lt;/script&gt;"

// Validate file uploads
const isValid = SecurityUtils.validateFileType(file, ['image/jpeg', 'image/png']);

// Generate secure IDs
const id = SecurityUtils.generateSecureId();
// Result: "a7B9cD2eF8gH1jK4"

// Validate URLs
const isSafeUrl = SecurityUtils.validateURL('https://example.com');

// Validate input length
const isValidLength = SecurityUtils.validateLength(input, 1000);
```

## 🎨 Customization Options

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
  zIndex: 9999,
  
  // Branding
  companyName: 'Your Company',
  logo: 'https://your-domain.com/logo.png',
  greeting: 'Hello! How can I help you?',
  placeholder: 'Type your message...',
  
  // Behavior
  autoOpen: false
});
```

## 🔌 API Integration

### Secure API Setup

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

### Advanced Features

```javascript
const chatbot = new AdvancedChatbotCore({
  // API Integration
  apiUrl: 'https://your-server.com/api/chat',
  
  // Security Configuration
  maxFileSize: 5 * 1024 * 1024, // 5MB limit
  allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  messageRateLimit: 10, // messages per minute
  uploadRateLimit: 3,   // uploads per minute
  
  // Advanced Features
  enableFileUpload: true,
  enableTypingIndicator: true,
  enableReadReceipts: false,
  quickReplies: ['Help', 'Pricing', 'Contact Sales'],
  
  // Analytics (privacy-focused)
  trackEvents: true,
  userId: 'anonymous_user_123', // Use hashed/anonymous IDs
  
  // UI Customization
  customCSS: '.chatbot-widget { border: 2px solid #007bff; }',
  offlineMessage: 'We are currently offline. Please try again later.'
});
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
