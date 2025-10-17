Biscuit 2 HR Support — Final Upload Package (with Admin Reply)
===============================================================

Files:
- index.html  --> Single-file web app (HTML/CSS/JS) with Admin Inbox + Reply-to-Employee via WhatsApp (wa.me)
- README.txt  --> This file

How it works (important)
- Client-side app: data stored in browser LocalStorage under key 'biscuit2_hr_data'.
- Employees use Ask HR to send messages (they can include phone). Messages appear in Admin Inbox.
- Admin opens Admin Panel (Admin Login password default: admin123).
- In Inbox, each message has a Reply input + "Reply" button:
  - Clicking "Reply" opens WhatsApp (wa.me) to the employee phone (if provided) with the reply text.
  - If employee phone not provided, admin is prompted to enter phone number.
  - A copy of the reply is also opened to the HR admin number (+8801745901588) for record keeping.
- Admin can also upload Attendance CSV/JSON (exported from HRIS) which is parsed and stored locally.

Deploy:
- Upload index.html to your server or GitHub repo. This file runs as a static page.
- For company-wide use (multiple employees), it's recommended to deploy a server-backed version (I can help).

Notes & Next Steps:
- This is a functional final client-side package. For multiple concurrent users and persistent shared storage use a backend + DB (I have a production package ready if needed).
- If you want, I can:
  - Convert this to a server-backed app and deploy on DigitalOcean/Render.
  - Integrate WhatsApp Business API for automated outgoing/incoming messages (requires provider account).

Prepared for: Siddique
