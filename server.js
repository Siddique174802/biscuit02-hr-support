/* Basic Express backend starter (demo). 
   IMPORTANT: This is a starter only. Replace in-memory storage with a real DB (MySQL/Mongo/Firebase) for production.
   Set environment variables for secrets and Twilio/Meta creds before deploying.
*/
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const csv = require('csv-parse/lib/sync');

const app = express();
app.use(bodyParser.json());

const upload = multer();
const SECRET = process.env.JWT_SECRET || 'change_this_secret';

let MESSAGES = []; // temporary; replace with DB
let ATTENDANCE = []; // temporary; replace with DB

app.post('/admin/login',(req,res)=>{
  const {user,pass} = req.body;
  // Demo: replace with real auth check
  if(user === 'admin' && pass === 'password'){
    const token = jwt.sign({user:'admin'}, SECRET, {expiresIn:'8h'});
    return res.json({token});
  }
  return res.status(401).json({error:'invalid'});
});

app.get('/chat/messages', (req,res) => {
  res.json(MESSAGES);
});

app.post('/chat/send', async (req,res) => {
  const {to, text} = req.body;
  // Save to memory and return
  MESSAGES.push({from:'admin', text, time:new Date().toISOString()});
  // Example: send via Twilio (uncomment and configure env vars)
  /*
  const sid = process.env.TWILIO_SID;
  const auth = process.env.TWILIO_AUTH;
  const from = process.env.TWILIO_FROM; // e.g., whatsapp:+123...
  const toNumber = process.env.ADMIN_WHATSAPP || 'whatsapp:+880XXXXXXXXXX';
  const params = new URLSearchParams();
  params.append('To', toNumber);
  params.append('From', from);
  params.append('Body', text);
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method:'POST',
    body: params,
    headers: { Authorization: 'Basic ' + Buffer.from(sid+':'+auth).toString('base64') }
  });
  const resp = await r.json();
  return res.json(resp);
  */
  return res.json({ok:true});
});

// webhook endpoint (Twilio or Meta)
app.post('/webhook/whatsapp', (req,res) => {
  console.log('incoming', req.body);
  const txt = req.body.Body || (req.body.messages && req.body.messages[0] && req.body.messages[0].text && req.body.messages[0].text.body) || '';
  MESSAGES.push({from:'user', text: txt, time:new Date().toISOString(), raw:req.body});
  res.sendStatus(200);
});

app.post('/attendance/upload', upload.single('file'), (req,res) => {
  if(!req.file) return res.status(400).json({error:'no file'});
  const raw = req.file.buffer.toString('utf8');
  const records = csv(raw, {columns:true, skip_empty_lines:true});
  ATTENDANCE = ATTENDANCE.concat(records);
  res.json({ok:true, count:records.length});
});

app.get('/attendance', (req,res) => {
  res.json(ATTENDANCE);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
