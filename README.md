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

## License

[MIT](LICENSE)