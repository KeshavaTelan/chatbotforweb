# 🤖 Chatify.js

> A comprehensive, framework-agnostic chatbot widget with built-in security features

[![NPM Version](https://img.shields.io/npm/v/chatify-core)](https://www.npmjs.com/package/chatify-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security: Enabled](https://img.shields.io/badge/Security-Enabled-green.svg)](packages/core#security-features)

Chatify.js is a secure, customizable chatbot widget that works seamlessly with React, Angular, Vue, Next.js, Nuxt.js, and vanilla JavaScript. Built with security-first principles including XSS protection, rate limiting, and secure file uploads.

## 🚀 Quick Start

```bash
npm install chatify-core
```

```javascript
import { ChatbotCore } from 'chatify-core';

const chatbot = new ChatbotCore({
  primaryColor: '#007bff',
  companyName: 'Your Company',
  greeting: 'Hello! How can I help you today?'
});
```

**📖 [Complete Documentation](packages/core/README.md)** | **🎮 [Live Demo](demo.html)**

## ✨ Key Features

- 🛡️ **Security First**: XSS protection, input sanitization, rate limiting
- 🔧 **Framework Agnostic**: React, Vue, Angular, Next.js, Nuxt.js, vanilla JavaScript
- 🎨 **Fully Customizable**: Colors, themes, positioning, branding
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
-  **Secure File Upload**: Type validation, size limits, sanitization
- ⚡ **TypeScript**: Complete type safety and IntelliSense support
- 🌐 **SSR Compatible**: Works with Next.js, Nuxt.js, Angular Universal

## 📦 Package

This project provides a single, framework-agnostic package that works with all modern frameworks:

| Package | Description | Status |
|---------|-------------|---------|
| [`chatify-core`](packages/core) | Framework-agnostic chatbot widget with security features | ✅ **Published** |

**Why no framework-specific wrappers?**  
The core package already provides seamless integration with React, Vue, Angular, Next.js, and Nuxt.js without requiring additional wrapper packages. This approach reduces complexity, bundle size, and maintenance overhead while providing the same functionality.

## 🛠️ Development Setup

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Get Started

```bash
# Clone the repository
git clone https://github.com/KeshavaTelan/chatbotforweb.git
cd chatbotforweb

# Install dependencies
npm install

# Build the core package
npm run build

# Start development server
npm run dev
```

### Project Structure

```
chatify/
├── packages/
│   └── core/                # chatify-core
│       ├── src/             # TypeScript source code
│       ├── dist/            # Built files
│       ├── package.json     # Package configuration
│       └── README.md        # Package documentation
├── demo.html                # Live demo
├── package.json             # Root workspace config
└── README.md                # This file
```

### Available Scripts

```bash
# Build all packages
npm run build

# Start development mode with file watching
npm run dev

# Clean build artifacts
npm run clean

# Run tests (when available)
npm test
```

## 🔧 Framework Support

Chatify.js works with all modern JavaScript frameworks:

| Framework | Support | SSR Compatible | Example |
|-----------|---------|----------------|---------|
| **React** | ✅ Full | ✅ Yes | [View Example](packages/core#react) |
| **Vue 2/3** | ✅ Full | ✅ Yes | [View Example](packages/core#vue) |
| **Angular** | ✅ Full | ✅ Yes | [View Example](packages/core#angular) |
| **Next.js** | ✅ Full | ✅ Yes | [View Example](packages/core#nextjs) |
| **Nuxt.js** | ✅ Full | ✅ Yes | [View Example](packages/core#nuxtjs) |
| **Vanilla JS** | ✅ Full | N/A | [View Example](packages/core#vanilla-javascript) |

## 🚨 Security Features

- **XSS Prevention**: All inputs automatically sanitized
- **Rate Limiting**: Configurable message and upload limits
- **File Upload Security**: MIME type validation, size limits
- **Input Validation**: Length limits, content filtering
- **Secure ID Generation**: Cryptographically secure random IDs
- **URL Validation**: Prevents malicious redirects
- **CSP Compatible**: Works with Content Security Policy

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/chatbotforweb.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Install** dependencies: `npm install`
5. **Make** your changes
6. **Test** your changes: `npm test`
7. **Build** the project: `npm run build`
8. **Commit** your changes: `git commit -m 'Add amazing feature'`
9. **Push** to your branch: `git push origin feature/amazing-feature`
10. **Submit** a Pull Request

### Code Standards

- **TypeScript** for type safety
- **Security-first** approach
- **Framework-agnostic** design
- **Comprehensive** documentation
- **Test coverage** for new features

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

- 📚 **Documentation**: [packages/core/README.md](packages/core/README.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/KeshavaTelan/chatbotforweb/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/KeshavaTelan/chatbotforweb/discussions)
- 📧 **Email**: [keshavasilva@gmail.com](mailto:keshavasilva@gmail.com)

---

**Built with ❤️ by [KeshavaTelan](https://github.com/KeshavaTelan)**
---

**Built with ❤️ by [KeshavaTelan](https://github.com/KeshavaTelan)**
