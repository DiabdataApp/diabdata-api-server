<!-- PROJECT SHIELDS -->

![GitHub contributors](https://img.shields.io/github/contributors/DiabdataApp/diabdata-api-server?color=blue&label=CONTRIBUTORS)
![Build Status](https://img.shields.io/github/actions/workflow/status/DiabdataApp/diabdata-api-server/build_and_deploy.yml?label=Build%20%26%20Deploy)
![CodeQL](https://img.shields.io/github/actions/workflow/status/DiabdataApp/diabdata-api-server/github-code-scanning/codeql?label=CodeQL)
![GitHub top language](https://img.shields.io/github/languages/top/DiabdataApp/diabdata-api-server)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DiabdataApp/diabdata-api-server">
    <img src="assets/diabdata-api-icon.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Diab Data</h3>
  <p align="center">
  <a href="https://github.com/DiabdataApp/diab-data-android">Android app</a> • <a href="https://app.diabdata.fr/">Website</a>
  </p>
  <p align="center">
    An android app that lets you keep track of all diabetes related information that you may need to communicate on a regular basis.
  </p>
  <br/>
</div>

# DiabData API Server

Backend server for the DiabData ecosystem, built with [Bun](https://bun.sh). Handles real-time WebSocket relay between the Android app and the Next.js front end, and exposes a REST API for medical device and medication lookup by GTIN barcode.

## Features

- **WebSocket relay** — bidirectional session-based communication between the Android app and the web client
- **Device lookup** — identify medical devices (insulin pumps, CGM sensors) by GTIN
- **Medication lookup** — identify diabetes-related medications and treatments by GTIN
- **Reference data** — sourced from the open [diabdata-registry](https://github.com/DiabdataApp/diabdata-registry), baked into the image at build time

## API

### Health check
```
GET /health
```

### Device lookup
```
GET /api/devices/:gtin
```
Returns a medical device object or `404` if not found.

### Medication lookup
```
GET /api/treatments/:gtin
```
Returns a medication object or `404` if not found.

### WebSocket — Android app
```
WS /ws/app
```

### WebSocket — Web client
```
WS /ws/client
```

## Project structure

```
src/
├── data/api/        # CSV parsing and in-memory registries
├── routes/          # HTTP route handlers
├── types/
│   ├── api/         # MedicalDevice and Medication interfaces
│   └── relay/       # WebSocket message and session types
├── registry.ts      # WebSocket session management
└── index.ts         # Server entry point

assets/              # Reference data CSV files (fetched from diabdata-registry at build time)
```

## Development

```bash
bun install
bun run src/index.ts
```

## Deployment

The server is deployed as a Scaleway Serverless Container. Every push to `main` automatically builds and deploys a new image via GitHub Actions. Reference data is fetched from [diabdata-registry](https://github.com/DiabdataApp/diabdata-registry) at build time, so any merge to that repository also triggers a redeployment.

Each merge to `main` is tagged `YYYY.MM.DD-N` (e.g. `2026.09.26-1`), where `N` auto-increments for multiple deploys on the same day. The image pushed to the registry carries both `:latest` and this version tag, so a running deployment can always be traced back to the git tag and commit it was built from.

## License

[MIT](LICENSE)