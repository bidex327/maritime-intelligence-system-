# Maritime Intelligence & Surveillance Platform

A modern maritime surveillance and intelligence dashboard designed to help analysts monitor vessel activity, review security alerts, investigate incidents, and understand operational intelligence from multiple surveillance sources.

## Overview

The Maritime Intelligence & Surveillance Platform is designed around a human-in-the-loop surveillance workflow.

The planned system combines:

* AIS vessel data
* Drone surveillance
* AI-based object detection
* AIS anomaly detection
* Sensor/data fusion
* Rule-based incident assessment
* Analyst verification
* Geospatial visualization
* Operational analytics

The current version focuses on the **React frontend and operational dashboard**, using simulated surveillance data while the backend and intelligence processing services are developed.

## System Workflow

```text
Drone / AIS Data
       ↓
AI Detection & Anomaly Analysis
       ↓
Data Fusion
       ↓
Rule & Context Engine
       ↓
Incident / Alert
       ↓
Node.js API
       ↓
MongoDB
       ↓
React Intelligence Dashboard
       ↓
Human Analyst Verification
```

## Current Frontend Features

### Dashboard

Provides an operational overview of:

* Active vessels
* Active alerts
* High-severity incidents
* Surveillance coverage
* Recent alerts
* Operational activity
* System status

### Alert Management

Analysts can:

* View surveillance alerts
* Search alerts
* Filter by severity
* Filter by status
* Review alert confidence
* Open detailed incident investigations

### Incident Investigation

Incident details include:

* Incident identification
* Detection time
* Location
* AI confidence
* Drone detection evidence
* AIS correlation
* Fusion analysis
* Vessel information
* Analyst verification

Analysts can classify incidents as:

* Unreviewed
* Confirmed
* False Positive

### Maritime Operational Map

The operational map currently provides a simulated view of:

* Vessel positions
* Vessel tracks
* Surveillance zones
* Active incidents
* AIS feed status
* Drone feed status
* Operational coordinates

### Analytics

The analytics dashboard provides simulated intelligence metrics including:

* Alert trends
* Vessel activity by zone
* Alert severity distribution
* Detection source contribution
* Detection accuracy
* Confirmed incidents

### Settings

The settings interface provides controls for:

* Alert thresholds
* AIS signal timeout
* AIS data source
* Drone surveillance
* Notification preferences
* Operational region
* Data sharing configuration

## Technology Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Lucide React
* Recharts
* Axios

### Planned Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Planned Intelligence Layer

* AI object detection
* AIS anomaly detection
* Correlation/fusion engine
* Rule-based assessment
* Geospatial processing

## Frontend Architecture

The frontend follows a component-based architecture with separation of concerns.

```text
src/
├── components/
│   ├── layout/
│   ├── dashboard/
│   └── alerts/
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Alerts.jsx
│   ├── IncidentsDeatails.jsx
│   ├── Map.jsx
│   ├── Analytics.jsx
│   └── Settings.jsx
│
├── data/
├── services/
├── assets/
├── App.jsx
├── index.css
└── main.jsx
```

Shared interface elements such as the sidebar and topbar are separated from page-specific functionality to keep the application maintainable and easier to extend.

## Development Approach

The project is being developed incrementally.

### Stage 1 — Frontend

* Design the operational workflow
* Build reusable React components
* Implement responsive layouts
* Validate user interactions
* Use simulated surveillance data
* Build and deploy the frontend

### Stage 2 — Backend

The next phase will introduce:

* Node.js
* Express.js
* REST APIs
* MongoDB
* Alert and incident models
* Vessel data
* API integration with the React frontend

### Stage 3 — Intelligence Integration

The planned intelligence layer will introduce:

* Drone detection
* AIS anomaly detection
* Data correlation
* Fusion analysis
* Rule-based severity assessment
* Real-time alert generation

## Current Status

### Frontend

* [x] Dashboard
* [x] Alert management
* [x] Incident investigation
* [x] Operational map
* [x] Analytics
* [x] Settings
* [x] Responsive design
* [x] Production build
* [x] Vercel deployment

### Backend

* [ ] API architecture
* [ ] MongoDB integration
* [ ] Alert API
* [ ] Incident API
* [ ] Vessel API
* [ ] Analyst review API

### Intelligence Processing

* [ ] AIS anomaly detection
* [ ] Drone object detection
* [ ] Data fusion
* [ ] Rule engine
* [ ] Real surveillance data integration

## Running the Project Locally

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

The frontend is deployed as a production Vite application on Vercel.

The current deployment uses simulated surveillance data while backend and intelligence services are being developed.

## Project Objective

The long-term objective is to provide analysts with a unified operational interface for detecting, correlating, investigating, and verifying potentially suspicious maritime activity.

The system is designed to support **human decision-making rather than autonomous incident confirmation**.
