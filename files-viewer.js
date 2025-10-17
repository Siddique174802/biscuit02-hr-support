import { db } from './firebase-init.js';
import { collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

document.getElementById('load-files').addEventListener('click', async () => {
  const empId = document.getElementById('emp-id-files').value.trim();
  if (!empId) return alert('Employee ID দিন');
  const ul = document.getElementById('file-list');
  ul.innerHTML = '';
  const q = query(collection(db, 'attendanceFiles'), where('employeeId','==',empId), orderBy('uploadedAt','desc'));
  const snap = await getDocs(q);
  snap.forEach(doc => {
    const d = doc.data();
    const li = document.createElement('li');
    const ts = d.uploadedAt && d.uploadedAt.seconds ? new Date(d.uploadedAt.seconds * 1000).toLocaleString() : '';
    li.innerHTML = `<a href="${d.fileUrl}" target="_blank">${d.fileName}</a> <small> - ${ts}</small>`;
    ul.appendChild(li);
  });
});
