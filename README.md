# Imgineer

Imgineer is a full-stack application with a React frontend, Node.js/Express backend, and a custom SDK. It provides a platform for managing assets, authentication, and more.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development](#development)
  - [Running the Client](#running-the-client)
  - [Running the Server](#running-the-server)
  - [SDK Usage](#sdk-usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
.
├── client/           # React frontend
├── imgineer_sdk/     # Custom SDK for Imgineer
├── server/           # Node.js/Express backend
├── .gitignore
├── README.md
```

### Client

- Built with React.
- Located in [`client/`](client/README.md).
- Handles the user interface and communicates with the backend.

### Server

- Node.js/Express API server.
- Located in [`server/`](server/README.md).
- Handles authentication, asset management, and business logic.

### SDK

- Custom SDK for interacting with Imgineer services.
- Located in [`imgineer_sdk/`](imgineer_sdk/README.md).

---

## Features

- User authentication (OAuth support)
- Asset management
- RESTful API backend
- Custom SDK for integration
- Docker support for backend
- Environment-based configuration

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Docker (optional, for backend)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/imgineer.git
   cd imgineer
   ```

2. **Install dependencies:**
   - For the client:
     ```sh
     cd client
     npm install
     ```
   - For the server:
     ```sh
     cd ../server
     npm install
     ```
   - For the SDK:
     ```sh
     cd ../imgineer_sdk
     npm install
     ```

### Environment Variables

- Copy `.env.example` to `.env` in both `client/` and `server/` directories and fill in the required values.
- Sensitive files like `.env` and `oauth.json` are gitignored.

---

## Development

### Running the Client

```sh
cd client
npm start
```
- Runs the React app in development mode at [http://localhost:3000](http://localhost:3000).

### Running the Server

```sh
cd server
npm start
```
- Starts the Express server (default: [http://localhost:5000](http://localhost:5000)).

- **With Docker:**
  ```sh
  cd server
  docker-compose up
  ```

### SDK Usage

- Import and use the SDK from [`imgineer_sdk/index.js`](imgineer_sdk/index.js) in your Node.js projects.

---

## Testing

- **Client:**  
  ```sh
  cd client
  npm test
  ```
- **Server:**  
  ```sh
  cd server
  npm test
  ```
- **SDK:**  
  ```sh
  cd imgineer_sdk
  npm test
  ```

---

## Deployment

- Build the client for production:
  ```sh
  cd client
  npm run build
  ```
- Deploy the server using Docker or your preferred Node.js hosting.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## License

This project is licensed under the MIT License.
