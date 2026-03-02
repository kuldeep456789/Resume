# ATS Resume Builder & Analyzer

A premium, AI-powered resume building and ATS scoring platform. This project features a modern React frontend and a secure Node.js backend to provide role-specific career insights and resume optimization.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **Git**

### 2. Backend Setup (Security & AI)
The backend handles secure communication with AI providers (Groq, OpenRouter, etc.).
```bash
cd server
npm install
```
- Create a `.env` file in the `server/` directory.
- Add your API keys (see `.env.example` in the server folder for reference):
  ```env
  GROQ_API_KEY=your_key_here
  OPENROUTER_API_KEY=your_key_here
  # Optional: For production security
  FRONTEND_URL=http://localhost:8000
  ```

### 3. Frontend Setup (UI & Analyzer)
The frontend provides the interactive resume builder and upload interface.
```bash
cd template
npm install
```

---

## 🛠️ Running the Project (Localhost)

You need to run **both** terminals simultaneously.

### Step 1: Start the Backend Server
In one terminal:
```bash
cd server
npm start
```
*Server will run on `http://localhost:5000`*

### Step 2: Start the Frontend Application
In a separate terminal:
```bash
cd template
npm run dev
```
*Frontend will run on `http://localhost:8000`*

---

## 🌐 Deployment Guide (Live Server)

To deploy this project to a live server (e.g., Render, Vercel, AWS), follow these steps:

### Phase 1: Deploy the Backend (Server)
1.  Upload the `server/` folder to your backend host.
2.  Set the following **Environment Variables** in your host's dashboard:
    *   `PORT=5000` (or whatever your host provides)
    *   `HOST=0.0.0.0`
    *   `FRONTEND_URL=https://your-main-app.com` (Your deployed frontend address)
    *   `GROQ_API_KEY`, `OPENROUTER_API_KEY`, etc.
3.  Run `npm install` and `npm start`.

### Phase 2: Deploy the Frontend (Template)
1.  **Important**: Identify your backend's public URL (e.g., `https://your-api-service.onrender.com`).
2.  In the `template/` directory, set the following environment variable **before building**:
    ```env
    VITE_API_URL=https://your-api-service.onrender.com
    ```
3.  Run `npm run build`. This "bakes" the public URL into the code.
4.  Upload the `dist/` folder to your static hosting provider (Vercel, Netlify).

---

## 📁 Project Structure

- `template/`: Vite + React frontend application.
  - `src/services/ats/`: Core logic for resume parsing and local scoring.
  - `src/components/`: UI components including the premium Role Selection Grid.
- `server/`: Node.js + Express backend.
  - `services/llmService.js`: Secure AI integration logic.
  - `.env`: (Private) Secure storage for API keys.
- `latexResume/`: Source files for the LaTeX version of the resume.

---

## 🌟 Key Features
- **AI-Powered ATS Scanning**: Get deep insights into your resume using Llama 3.3.
- **Role-Specific Benchmarking**: Analyze your resume specifically for roles like Full Stack, DevOps, or Data Science.
- **Dynamic Market Intelligence**: Real-time salary insights and trending skills based on your target role.
- **Privacy First**: Sensitive API keys never touch the browser; they stay secure on the backend.
