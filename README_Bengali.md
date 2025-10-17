# Biscuit02 HR — সম্পূর্ণ মডিউল (বাংলা নির্দেশিকা)

এই প্রজেক্টে আছে:
- কর্মচারী চ্যাট + WhatsApp ফরোয়ার্ডিং (Firestore + Cloud Functions)
- অ্যাডমিন প্যানেল (মেসেজ দেখা, রিপ্লাই করা)
- হাজিরা ইন্টিগ্রেশন (HRIS iframe loader)
- ফাইল আপলোড (PDF, Excel, WPS) এবং Firebase Storage-এ সেভ
- Firestore rules, Firebase functions এবং Hosting-ready public/ ফোল্ডার

## দ্রুত সেটআপ
1. Firebase প্রজেক্ট তৈরি করো (Firestore, Functions(Node18), Storage চালু রাখো)।
2. `public/scripts/firebase-init.js`-এ তোমার Firebase config বসাও।
3. `functions/` ফোল্ডারে গিয়ে `npm install` চালাও।
4. Twilio কনফিগ সেট করো:
   ```
   firebase functions:config:set twilio.sid="TWILIO_SID" twilio.token="TWILIO_TOKEN" twilio.from="whatsapp:+1415..." twilio.admin_whatsapp="whatsapp:+8801745901588"
   ```
5. Deploy:
   ```
   firebase deploy --only functions,firestore:rules,hosting
   ```
6. GitHub Pages ব্যবহার করলে `public/` আপলোড করো।

## সাহায্য লাগলে
আমাকে বলো — আমি কনফিগ চেক করে দেবো বা প্রয়োজনীয় কোড আনডারলাইন করে দেখিয়ে দেবো।
