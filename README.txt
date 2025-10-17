Biscuit 2 HR Support — Upload Package
=====================================

Files included:
- index.html  --> Single-file web app (HTML/CSS/JS). Upload this to your repo or server.
- README.txt  --> This file with instructions.

What this package does
----------------------
- Client-side HR portal. Data is stored in browser LocalStorage.
- Features:
  - Notice Board (Admin can Add/Edit/Delete)
  - Attendance Summary (Employees search by Employee ID)
  - Ask HR: staff can send message to Inbox and optionally open WhatsApp to HR
  - Admin Panel: upload Attendance CSV/JSON exported from HRIS, quick attendance add, inbox view and reply via WhatsApp, export data.

WhatsApp integration
--------------------
- Default HR WhatsApp number is: +8801745901588
- When replying to messages, the app opens WhatsApp Web/mobile with a prefilled message. No API keys are used.

How to use with your HRIS download
---------------------------------
1. From your HRIS (e.g. OTReport or attendance export), export CSV or JSON.
2. Upload that file in Admin -> Upload Attendance File.
3. The app will try common column names: empId, EmployeeID, ID, name, Name, date, Date, status, Status, overtime, OT.
4. After upload, employee records become searchable by Employee ID.

Deploying
---------
- Option A: Upload index.html to your existing GitHub repo and enable GitHub Pages (Settings -> Pages) or host on any static server.
- Option B: Place index.html on your company webserver (e.g., in a folder) and serve as a static page.

Security note
-------------
- This version is for local/demo use. For production (company-wide) usage you should:
  - Move data storage to a secure server and DB.
  - Implement server-side authentication & access control.
  - Use HTTPS and secure hosting.
  - Consider integrating directly with HRIS via APIs (if available).

If you want, I can:
- Convert this to a server-backed app (Node.js + Express + PostgreSQL) and provide deployment steps.
- Help map your HRIS export format to the CSV expected columns.

Prepared for: Siddique
