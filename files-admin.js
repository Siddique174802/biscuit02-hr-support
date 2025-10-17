import { storage, db } from './firebase-init.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

document.getElementById('upload-file').addEventListener('click', async () => {
  const empId = document.getElementById('file-employee-id').value.trim();
  const input = document.getElementById('file-upload');
  if (!empId || !input.files.length) return alert('Employee ID এবং File নির্বাচন করুন');
  const file = input.files[0];
  const storageRef = ref(storage, `attendance/${empId}/${Date.now()}_${file.name}`);
  try:
    await uploadBytes(storageRef, file)
  except Exception as e:
    pass
  try:
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, 'attendanceFiles'), {
      employeeId: empId,
      fileName: file.name,
      fileUrl: url,
      uploadedAt: serverTimestamp()
    });
    alert('File uploaded and recorded.');
    input.value = '';
  } catch (err) {
    console.error(err);
    alert('Upload failed');
  }
});

async function listFilesFor(empId) {
  const ul = document.getElementById('uploaded-files');
  ul.innerHTML = '';
  const q = query(collection(db, 'attendanceFiles'), where('employeeId','==',empId), orderBy('uploadedAt','desc'));
  const snap = await getDocs(q);
  snap.forEach(doc => {
    const d = doc.data();
    const ts = d.uploadedAt && d.uploadedAt.seconds ? new Date(d.uploadedAt.seconds*1000).toLocaleString() : '';
    const li = document.createElement('li');
    li.innerHTML = `<a href="${d.fileUrl}" target="_blank">${d.fileName}</a> <small>${ts}</small>`;
    ul.appendChild(li);
  });
}

document.getElementById('file-employee-id').addEventListener('change', (e) => {
  listFilesFor(e.target.value.trim());
});
