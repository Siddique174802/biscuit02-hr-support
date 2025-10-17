import { db } from './firebase-init.js';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const list = document.getElementById('admin-messages-list');
const replyBtn = document.getElementById('send-reply');
const statusP = document.getElementById('admin-status');

const q = query(collection(db,'messages'), orderBy('timestamp','desc'));
onSnapshot(q, (snap) => {
  list.innerHTML = '';
  snap.forEach(docSnap => {
    const d = docSnap.data();
    const li = document.createElement('li');
    li.innerHTML = `<strong>ID:${d.employeeId}</strong> ${d.text} <br/><small>${d.employeePhone || ''} | ${d.status || ''}</small><br/><button data-id="${docSnap.id}" class="btn-reply">Reply</button>`;
    list.appendChild(li);
  });

  document.querySelectorAll('.btn-reply').forEach(btn => {
    btn.onclick = () => {
      document.getElementById('reply-msg-id').value = btn.getAttribute('data-id');
    };
  });
});

replyBtn.addEventListener('click', async () => {
  const msgId = document.getElementById('reply-msg-id').value.trim();
  const replyText = document.getElementById('reply-text').value.trim();
  if (!msgId || !replyText) { statusP.textContent = 'Message ID এবং Reply text দরকার'; return; }

  try {
    const ref = doc(db,'messages',msgId);
    await updateDoc(ref, {
      adminReply: {
        text: replyText,
        adminId: "admin",
        timestamp: serverTimestamp()
      },
      status: 'admin_replied'
    });
    statusP.textContent = 'Reply saved and will be sent via Cloud Function';
    document.getElementById('reply-text').value = '';
  } catch (err) {
    console.error(err);
    statusP.textContent = 'Reply পাঠাতে সমস্যা হয়েছে';
  }
});
