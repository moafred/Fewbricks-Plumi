# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

### Added
- Multi-platform deployment (Capacitor iOS/Android + Docker/Coolify web)
- Backend Dockerfile (multi-stage, non-root user)
- Frontend Dockerfile (Nginx static serving, /api proxy)
- Production docker-compose.yml
- Deployment documentation (Coolify, mobile builds, checklists)
- Capacitor plugins (SplashScreen, StatusBar, App, Network)
- Platform-aware API configuration
- App Store and Google Play metadata

### Changed
- Backend CORS supports Capacitor origins
- Vite dev server listens on 0.0.0.0 for mobile access
