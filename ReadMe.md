# Express Fullstack Application with PostgreSQL, and PG.

## Usage
Interact with application with the commands below:
```bash
    "start": "npm-run-all prod",
    "dev:es": "nodemon dist-src/app.js",
    "dev:cj": "nodemon src/app.js",
    "transpile": "babel src --out-dir dist-src",
    "clean": "rimraf dist-src",
    "build": "npm-run-all clean transpile",
    "dev": "NODE_ENV=development&&npm-run-all build",
    "prod": "NODE_ENV=production&&npm-run-all build"
```