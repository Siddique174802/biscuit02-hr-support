import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const sendBtn = document.getElementById('send-message');
const statusP = document.getElementById('status');

sendBtn.addEventListener('click', async () => {
  const employeeId = document.getElementById('employee-id').value.trim();
  const phone = document.getElementById('employee-phone').value.trim();
  const text = document.getElementById('message-box').value.trim();
  if (!employeeId || !text) { statusP.textContent = 'ID এবং মেসেজ বাধ্যত'; return; }

  try {
    await addDoc(collection(db, 'messages'), {
      employeeId,
      employeePhone: phone || null,
      text,
      timestamp: serverTimestamp(),
      status: 'sent',
      whatsappSent: false
    });
    statusP.textContent = 'মেসেজ ডাটাবেসে যোগ হয়েছে';
    document.getElementById('message-box').value = '';
  } catch (err) {
    console.error(err);
    statusP.textContent = 'পাঠাতে সমস্যা হয়েছে';
  }
});
