# Deployment Instructions (short)

Frontend (GitHub Pages):
1. Create a GitHub repo.
2. Copy the frontend files (index.html, style.css, script.js) into the repo root.
3. Push to `main` branch.
4. Settings -> Pages -> Deploy from branch: main / root.
5. Visit the provided github.io URL.

Backend (Vercel / Render / Heroku):
1. Create a new project and connect your GitHub repo (backend files).
2. Add environment variables:
   - JWT_SECRET
   - TWILIO_SID, TWILIO_AUTH, TWILIO_FROM (if using Twilio)
   - HRIS_USER, HRIS_PASS, HRIS_URL (if using Puppeteer)
3. Deploy and copy the public URL.
4. Update `script.js` API_BASE to your backend URL (or leave as environment configuration in production).

Database:
- For small scale, use Firebase Firestore.
- For SQL usage, use MySQL (Cloud SQL) or managed MySQL and update server code to connect.

Cron / Scheduler:
- If you automate HRIS scraping, use a scheduler on the hosting platform (Render Cron, Heroku Scheduler, or a VPS cron).
