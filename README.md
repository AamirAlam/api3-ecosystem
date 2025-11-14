# API3 Ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22+-2C8EBB?logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

A modern web application for the API3 Ecosystem, built with Nuxt 3.

![API3 Ecosystem Preview](https://api3.org/favicon.ico)

## Features

- Modern, responsive UI built with Nuxt 3
- Docker support for easy deployment
- Environment-based configuration
- Optimized for production

## Getting Started

### Prerequisites

- Node.js 16+ & Yarn
- Docker (for containerized deployment)
- API keys (if required, add reference to .env.example)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/api3-ecosystem.git
   cd api3-ecosystem
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. **Start development server**
   ```bash
   yarn dev
   ```
   The application will be available at `http://localhost:3000`

## Docker Deployment

### Build the Docker Image

```bash
docker build -t api3-ecosystem .
```

### Run the Container

```bash
docker run --env-file .env -p 3000:3000 -p 80:80 api3-ecosystem
```

### Docker Compose (Recommended)

For production deployments, using Docker Compose is recommended:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "80:80"
    env_file:
      - .env
    restart: unless-stopped
```

## Production Build

To create a production build:

```bash
yarn build

# Start production server
yarn start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# API Configuration
NODE_ENV=development
API_BASE_URL=https://api.example.com

# Add other environment variables here
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Live Demo

Check out the live demo at: [https://ecosystem.api3.org/](https://ecosystem.api3.org/)

```

### Development Server

Start the development server on `http://localhost:3000`

```bash
yarn dev
```

### Production build

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
