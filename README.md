Here's your **final, detailed `README.md`** for the **AI Violation Dashboard (AIVD)** project — with an expanded and comprehensive **Overview**, no folder structure section, and all other information as discussed:

---

````md
# 🚨 AI Violation Dashboard (AIVD)

> A full-stack, real-time analytics dashboard to monitor and visualize drone airspace violations using AI.

---

## 🧠 Overview

**AI Violation Dashboard (AIVD)** is a comprehensive, interactive monitoring system built to track, log, and visualize airspace violations caused by drones. As the use of UAVs (Unmanned Aerial Vehicles) becomes widespread in various sectors—from logistics to surveillance—the need for systems that can monitor their activity and enforce regulations has become crucial. AIVD was developed with this goal in mind.

The platform is designed with a focus on **real-time data visualization**, **user authentication**, **data upload and export functionalities**, and a **modern UI/UX** inspired by Apple’s glassmorphism design aesthetics. From unauthorized drone entries to unusual flight patterns, the dashboard provides granular insight into violations by:

- **Drone ID**  
- **Violation Type**  
- **Geographic Location**  
- **Time of Violation**

The left section of the UI consists of a fixed **Sidebar**, offering navigation, while the right side dynamically presents **KPIs**, **charts**, and a **map** showcasing the violations.

The project also includes robust backend services built with Node.js and Express.js, a PostgreSQL database for persistent storage, and JWT-based authentication. APIs are modular and handle everything from user auth to fetching charts and KPI data.

This tool is ideal for:
- Government surveillance bodies  
- Airspace regulatory authorities  
- Airport monitoring systems  
- Smart city projects  
- Academic research in drone data analytics  

---

## 🎯 Objective

- Track and monitor drone airspace violations.
- Display analytics in real-time via charts, KPIs, and maps.
- Offer secure login and registration system.
- Enable uploading and exporting of drone violation records.
- Provide a seamless, responsive, and visually modern user interface.

---

## 🚀 Use Case

- **Law Enforcement**: Monitor and respond to restricted airspace breaches.
- **Airport Security**: Detect unauthorized drone activity around airports.
- **Smart Cities**: Aggregate drone data for city-wide analytics.
- **Research**: Data collection for AI training and behavior analysis.
- **Military & Defense**: Flag drone patterns in sensitive zones.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (with App Router)
- **UI Library**: Tailwind CSS + Glassmorphism styling
- **Charts**: Recharts (Line, Pie)
- **Map**: Leaflet.js via `react-leaflet`
- **HTTP Client**: Axios
- **Authentication**: JWT token management on client-side

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT with middleware
- **ORM/Query**: Native SQL with `pg`
- **File Handling**: Multer for uploads

---

## 📊 Key Features

- 🧾 **JWT-based Authentication** for secure login and registration.
- 🧠 **KPI Dashboard**: Total violations, unique drone IDs, violation types, locations.
- 📈 **Data Visualization**:
  - Pie Chart: Violation Type Distribution
  - Line Chart: Violations Over Time
- 🌍 **Interactive Map** using Leaflet.js with real-time pinpoints.
- 📤 **Upload Page** for submitting new violation records.
- 📦 **Export Data** feature for downloading violation data.
- 🖥️ **Responsive UI**: Works seamlessly across desktop and mobile.
- 🎨 **Modern Glassmorphic UI** inspired by iOS design systems.

---

## 🧩 API Endpoints

### 🛡️ Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive JWT.

### 📊 Dashboard Data
- `GET /api/dashboard/kpi` - Fetch KPI metrics (total violations, unique drones, etc.).
- `GET /api/dashboard/charts` - Get pie and line chart data.

### 📤 Upload & 📥 Export
- `POST /api/upload` - Upload drone violation data.
- `GET /api/export` - Export all stored violation data in JSON/CSV format.

### 🔍 Search
- `GET /api/search?q=DRONE123` - Search for violations by drone ID.

---

## ⚠️ Common Issues & Fixes

| Error | Solution |
|------|----------|
| `Map container is already initialized` | Add cleanup in useEffect or dynamically set container ID |
| `window is not defined` | Run map-related components on client only with `"use client"` |
| `500 Internal Server Error` on `/kpi` | Check your controller logic and SQL queries; ensure database is connected |
| `404 Not Found` | Make sure correct route path is used and exported properly |
| `Unexpected any. Specify a different type` | Use TypeScript interfaces or suppress with ESLint disable |

---

## 🧪 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/ai-violation-dashboard.git
cd ai-violation-dashboard
````

### 2. Setup `.env` for backend

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

### 3. Install dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

### 4. Start both servers

**Backend:**

```bash
cd server
npm start
```

**Frontend:**

```bash
cd client
npm run dev
```

---

## 🧱 Deployment

* **Backend**: Node.js server can be hosted on platforms like Render, Railway, or Dockerized.
* **Frontend**: Next.js project can be deployed via Vercel.
* **Database**: PostgreSQL can be hosted via Supabase, Railway, or managed VPS.
* **Secrets**: Use environment variables securely in production environments.

---

## 💡 Challenges Faced

* React Leaflet’s server-side rendering conflicts — resolved with client-only loading.
* PostgreSQL query errors with COUNT alias — required syntax fixes.
* Map initialization duplication — solved using cleanup logic.
* Folder structure misunderstandings — solved by consolidating routes and organizing components.
* Axios 404/500 errors — resolved through backend controller and route alignment.
* `.env` variable mismatches — fixed by verifying keys and values thoroughly.
* SSR hydration mismatches with charts — resolved using conditional rendering.

---

## 🤝 Credits

* Built by **Manas Shinde**
* Code guidance by **ChatGPT (OpenAI)**
* Inspired by real-world drone analytics dashboards
* Powered by open-source tech and APIs

---

## 📌 Final Words

This project not only reflects a full-stack application but also showcases how data visualization, geospatial intelligence, and responsive UI come together in a single unified platform.

AIVD is built for scalability, customization, and modern UI expectations. With strong authentication, robust backend services, and real-time dashboard features — this project can be a strong portfolio piece, research foundation, or even a production-grade tool with minimal extensions.

---
