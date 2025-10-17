# biscuit02-hr-support - Starter package

This is a starter project that includes:
- Frontend (static): index.html, style.css, script.js
- Backend (Node.js + Express) starter: server.js, package.json
- Puppeteer example for HRIS scraping: puppeteer-hris-sample.js
- Notes, prompts, and future features in prompts_and_notes.txt

Important:
- **DO NOT** commit real API keys, WhatsApp numbers, or HRIS credentials to a public repository.
- Replace placeholders like `REPLACE_WITH_BACKEND_URL` in `script.js` with your deployed backend URL.
- The backend included is a simple demo. Use a proper database (MySQL, MongoDB, or Firebase) for production.

Quick start (local):
1. Clone repo
2. `npm install`
3. `npm start`
4. Open `index.html` in a browser for the frontend demo, or deploy frontend to GitHub Pages.

WhatsApp integration:
- Recommended: Twilio WhatsApp or Meta WhatsApp Cloud API.
- Configure webhook `/webhook/whatsapp` in your provider to point to your backend.

Attendance import:
- Preferred workflow: export CSV from HRIS and upload via the frontend Upload button.
- If HRIS has an API, configure a server-side integration or use the provided Puppeteer script to automate.

Security:
- Store secrets in environment variables on the hosting platform.
- Use HTTPS, JWT, and proper validation.

