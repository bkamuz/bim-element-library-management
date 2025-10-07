
# 🏗️ BIM Element Library Management

![Build Status](https://github.com/YOUR_USERNAME/bim-element-library-management/workflows/Build%20and%20Push%20Docker%20Image/badge.svg)
![Docker Image](https://ghcr.io/YOUR_USERNAME/bim-element-library-management:latest)

A modern web application for managing BIM (Building Information Modeling) element libraries with comprehensive plugin and category management capabilities.

## ✨ Features

- 🎨 **Modern React Interface** - Built with React 18, TypeScript, and Tailwind CSS
- 🧩 **Plugin Management** - Dynamic plugin loading from Markdown files
- 📁 **Category Organization** - Hierarchical category system
- 🎯 **SVG Icon System** - Custom icon management with 9+ unique icons
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🐳 **Docker Ready** - One-command deployment with Docker
- 🚀 **GitHub Actions** - Automated builds and deployments
- ⚡ **Vite Build System** - Fast development and optimized production builds

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Pull and run from GitHub Container Registry
docker run -d --name bim-library -p 80:80 --restart unless-stopped ghcr.io/YOUR_USERNAME/bim-element-library-management:latest
```

### Option 2: From Source

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bim-element-library-management.git
cd bim-element-library-management

# Install dependencies
npm install

# Generate content
npm run generate-content

# Start development server
npm run dev
```

### Option 3: Docker Compose

```bash
# Clone and run with docker-compose
git clone https://github.com/YOUR_USERNAME/bim-element-library-management.git
cd bim-element-library-management
docker-compose up -d
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Installation

```bash
# Install dependencies
npm install

# Generate data files
npm run generate-content

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate-content` - Generate data files from Markdown
- `npm run deploy` - Deploy to production

## 🐳 Docker Deployment

The application includes a multi-stage Dockerfile optimized for production:

```dockerfile
# Builds with Node.js and serves with nginx
FROM node:18-alpine AS builder
# ... build process
FROM nginx:alpine
# ... serve static files
```

### Automated Builds

GitHub Actions automatically builds and pushes Docker images to GitHub Container Registry on every push to main branch.

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── icons/          # Icon system
│   │   └── figma/          # Figma integration
│   ├── content/            # Markdown content
│   │   ├── plugins/        # Plugin definitions
│   │   ├── categories/     # Category definitions
│   │   └── icons/          # SVG icons
│   ├── data/              # Generated data files
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # CSS styles
│   └── guidelines/        # Documentation
├── scripts/               # Build scripts
├── .github/workflows/     # GitHub Actions
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose
└── nginx.conf            # Nginx configuration
```

## 🎨 Customization

### Adding New Plugins

Create a new Markdown file in `src/content/plugins/`:

```markdown
---
title: "My Plugin"
category: "Tools"
status: "stable"
description: "Plugin description"
icon: "my-icon"
---

Plugin content here...
```

### Adding New Icons

1. Add SVG file to `src/content/icons/`
2. Run `npm run generate-content`
3. Use in components: `<SvgIcon name="my-icon" />`

### Adding New Categories

Create a Markdown file in `src/content/categories/`:

```markdown
---
title: "New Category"
description: "Category description"
---

Category details...
```

## 🌐 Production Deployment

### On Ubuntu Server

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Run the application
docker run -d --name bim-library -p 80:80 --restart unless-stopped \
  ghcr.io/YOUR_USERNAME/bim-element-library-management:latest

# Access at http://YOUR_SERVER_IP
```

### With SSL (Let's Encrypt)

```bash
# Install nginx and certbot
sudo apt install nginx certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Configure nginx proxy to Docker container
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛟 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/bim-element-library-management/issues)
- 📖 Documentation: [Wiki](https://github.com/YOUR_USERNAME/bim-element-library-management/wiki)

## 🏗️ Built With

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Language
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [Docker](https://www.docker.com/) - Containerization
- [nginx](https://nginx.org/) - Web Server

---

**Original Design**: [Figma Project](https://www.figma.com/design/bQi0cPo0c1KC1wLjNmdesN/BIM-Element-Library-Management)  