# Biscuit02 HR — Full Module (Chat + Attendance + File Support)

This repository contains a complete module to integrate into your Biscuit02 HR web app:
- Employee chat (Firestore) with WhatsApp forwarding via Firebase Cloud Functions (Twilio)
- Admin panel with message management and reply (sends replies via WhatsApp)
- Attendance integration: HRIS link embedding and per-employee iframe loader
- File upload & storage: PDF, Excel (.xls/.xlsx), WPS formats support via Firebase Storage
- Firestore rules, Functions, and Hosting-ready `public/` folder for GitHub Pages or Firebase Hosting

## Structure
- public/ : frontend (HTML/CSS/JS)
- functions/ : Firebase Cloud Functions (Node 18) - Twilio integration
- firebase.json, firestore.rules, .gitignore, LICENSE

## Quick setup (short)
1. Create Firebase project, enable Firestore, Functions (Node 18), and Storage.
2. Replace `public/scripts/firebase-init.js` config with your Firebase config.
3. In `functions/` run `npm install`.
4. Set functions config for Twilio:
   ```
   firebase functions:config:set twilio.sid="TWILIO_SID" twilio.token="TWILIO_TOKEN" twilio.from="whatsapp:+1415..." twilio.admin_whatsapp="whatsapp:+8801745901588"
   ```
5. Deploy functions: `firebase deploy --only functions`
6. Deploy rules: `firebase deploy --only firestore:rules`
7. Host `public/` via Firebase Hosting or GitHub Pages.

See README_Bengali.md for step-by-step Bengali instructions.
