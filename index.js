const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const twilioSid = functions.config().twilio && functions.config().twilio.sid;
const twilioToken = functions.config().twilio && functions.config().twilio.token;
const twilioFrom = functions.config().twilio && functions.config().twilio.from;
const adminWhats = (functions.config().twilio && (functions.config().twilio.admin_whatsapp || functions.config().twilio.admin)) || 'whatsapp:+8801745901588';

let twilioClient = null;
if (twilioSid && twilioToken) {
  const twilio = require('twilio');
  twilioClient = twilio(twilioSid, twilioToken);
} else {
  console.warn('Twilio not configured. Set functions config twilio.sid and twilio.token');
}

exports.forwardNewMessageToWhatsApp = functions.firestore
  .document('messages/{msgId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data) return null;

    const body = `New message from ${data.employeeId || 'Unknown'}\n\n${data.text}\n\nPhone: ${data.employeePhone || 'N/A'}`;

    if (!twilioClient) {
      console.log('Twilio client not available. Skipping send.');
      return snap.ref.update({ whatsappSent: false, sendError: 'Twilio not configured' });
    }

    try {
      const msg = await twilioClient.messages.create({
        from: twilioFrom,
        to: adminWhats,
        body: body
      });
      await snap.ref.update({ whatsappSent: true, status: 'forwarded', forwardedAt: admin.firestore.FieldValue.serverTimestamp(), twilioSid: msg.sid });
    } catch (err) {
      console.error('Twilio send error', err);
      await snap.ref.update({ whatsappSent: false, sendError: String(err) });
    }
    return null;
});

exports.sendAdminReplyToEmployee = functions.firestore
  .document('messages/{msgId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    if ((!before || !before.adminReply) && after && after.adminReply) {
      if (!after.employeePhone) {
        console.log('No employee phone set; cannot send WhatsApp reply.');
        return null;
      }
      if (!twilioClient) {
        console.log('Twilio not configured. Skipping send.');
        return change.after.ref.update({ replyWhatsAppSent: false, replySendError: 'Twilio not configured' });
      }
      const toEmployee = `whatsapp:${after.employeePhone.replace(/\s+/g,'')}`;
      const body = `Reply from Admin:\n\n${after.adminReply.text}`;
      try {
        const msg = await twilioClient.messages.create({
          from: twilioFrom,
          to: toEmployee,
          body: body
        });
        await change.after.ref.update({ replyWhatsAppSent: true, replyTwilioSid: msg.sid, status: 'replied', repliedAt: admin.firestore.FieldValue.serverTimestamp() });
      } catch (err) {
        console.error('Error sending reply via Twilio:', err);
        await change.after.ref.update({ replyWhatsAppSent: false, replySendError: String(err) });
      }
    }
    return null;
});
