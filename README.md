AI-Powered Disaster Prediction & Intelligent Alert System for Malawi 🇲🇼

GeoSafe101 is an advanced Artificial Intelligence (AI) system designed to predict floods and other natural disasters in Malawi by analyzing historical climate data, real-time environmental inputs, and geospatial information.

Beyond prediction, GeoSafe101 includes an intelligent communication engine that automatically sends alerts via SMS and email to ensure early warnings reach communities before disasters strike.

# Project Folder Structure

```
geosafe/
├── frontend/                      # Presentation Layer (React / Vue)
│   ├── public/                    # Static assets (images, icons, index.html)
│   ├── src/
│   │   ├── components/            # Reusable UI components (Map, Alerts, Education)
│   │   ├── pages/                 # Pages / Routes (Dashboard, Risk Map, Education)
│   │   ├── services/              # API calls to backend
│   │   ├── store/                 # State management (Redux, Pinia, Vuex)
│   │   ├── styles/                # Global styles / Tailwind configs
│   │   └── main.tsx               # Entry point
│   └── package.json
│
├── backend/                       # Node.js / TypeScript backend
│   ├── src/
│   │   ├── controllers/           # API endpoint handlers
│   │   ├── routes/                # Express / NestJS routes
│   │   ├── services/              # Business logic (Alerts, GIS API, CMS, AI Engine)
│   │   ├── middlewares/           # Auth, logging, error handling
│   │   ├── utils/                 # Utilities, helpers
│   │   ├── config/                # Configuration files (DB, environment variables)
│   │   ├── types/                 # TypeScript types / interfaces
│   │   ├── ai/                    # AI-related scripts / REST API client for Python models
│   │   └── app.ts                 # Express / NestJS bootstrap
│   └── package.json
│
├── ai/                            # Python AI / ML Engine
│   ├── models/                     # Pre-trained / training scripts
│   ├── notebooks/                  # Jupyter notebooks for experimentation
│   ├── data/                       # Training / test datasets
│   ├── utils/                       # Helper functions for preprocessing, evaluation
│   └── app.py                       # REST API entry point (FastAPI / Flask)
│
├── database/                       # Database-related scripts / migrations
│   ├── migrations/                 # DB migration scripts (PostGIS, TimescaleDB)
│   ├── seeds/                      # Seed data
│   └── init.sql                     # Initial DB setup
│
├── docs/                           # Documentation
│   ├── architecture/               # Diagrams, UML
│   ├── api/                        # API documentation
│   └── user-guides/                # End-user manuals
│
├── scripts/                        # Automation / deployment scripts
├── .env                            # Environment variables
└── README.md
```



https://github.com/Princethawani/geosafe.git
