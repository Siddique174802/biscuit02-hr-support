// Simple frontend - demo only
const API_BASE = 'REPLACE_WITH_BACKEND_URL'; // replace with your deployed backend

document.getElementById('btn-login').onclick = async () => {
  const user = document.getElementById('admin-user').value;
  const pass = document.getElementById('admin-pass').value;
  // For demo, accept admin/password
  if(user === 'admin' && pass === 'password') {
    localStorage.setItem('token', 'demo-token');
    showMainUI();
    loadAttendanceFromLocal();
    loadMessagesFromLocal();
    return;
  }
  // Otherwise try backend (if configured)
  try {
    const res = await fetch(API_BASE + '/admin/login', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({user, pass})
    });
    if(!res.ok) throw new Error('Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    showMainUI();
    await loadAttendance();
    await loadMessages();
  } catch(e) {
    alert('Login failed: ' + e.message);
  }
};

function showMainUI(){
  document.getElementById('login-section').style.display='none';
  document.getElementById('chat-section').style.display='block';
  document.getElementById('attendance-section').style.display='block';
}

// Chat demo (local cache)
function loadMessagesFromLocal(){
  const msgs = JSON.parse(localStorage.getItem('demo_messages') || '[]');
  const w = document.getElementById('chat-window');
  w.innerHTML = msgs.map(m => `<div><b>${m.from}:</b> ${m.text}</div>`).join('');
}
document.getElementById('send-btn').onclick = async () => {
  const txt = document.getElementById('msg-input').value.trim();
  if(!txt) return;
  // push locally
  const msgs = JSON.parse(localStorage.getItem('demo_messages') || '[]');
  msgs.push({from:'admin', text: txt, time: new Date().toISOString()});
  localStorage.setItem('demo_messages', JSON.stringify(msgs));
  document.getElementById('msg-input').value='';
  loadMessagesFromLocal();
  // if backend present, POST to /chat/send
  const token = localStorage.getItem('token');
  if(API_BASE !== 'REPLACE_WITH_BACKEND_URL' && token){
    try {
      await fetch(API_BASE + '/chat/send', {
        method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
        body: JSON.stringify({to:'whatsapp', text: txt})
      });
    } catch(e){
      console.warn('Failed to send to backend', e);
    }
  }
};

// Attendance upload (CSV)
document.getElementById('upload-att').onclick = async () => {
  const f = document.getElementById('csv-file').files[0];
  if(!f) return alert('Please choose a CSV file');
  const text = await f.text();
  // simple CSV parse (first header row => columns)
  const rows = text.trim().split('\n').map(r => r.split(','));
  const headers = rows.shift().map(h=>h.trim());
  const records = rows.map(r=>{
    const obj = {};
    r.forEach((c,i)=> obj[headers[i]||('col'+i)] = c ? c.trim() : '');
    return obj;
  });
  // Save locally
  localStorage.setItem('attendance_cache', JSON.stringify(records));
  alert('Attendance loaded to local cache (' + records.length + ' records).');
  renderAttendance(records);
  // upload to backend if configured
  const token = localStorage.getItem('token');
  if(API_BASE !== 'REPLACE_WITH_BACKEND_URL' && token){
    const fd = new FormData();
    fd.append('file', f);
    try {
      await fetch(API_BASE + '/attendance/upload', { method:'POST', body:fd, headers: {'Authorization':'Bearer '+token} });
      alert('Uploaded to backend (attempted).');
    } catch(e){ console.warn('upload backend failed', e); }
  }
};

function renderAttendance(records){
  const view = document.getElementById('attendance-view');
  if(!records || records.length===0){ view.innerText = 'No attendance loaded.'; return; }
  view.innerHTML = '<table><thead><tr>' + Object.keys(records[0]).map(h=>'<th>'+h+'</th>').join('') + '</tr></thead><tbody>' +
    records.map(r=>'<tr>' + Object.values(r).map(v=>'<td>'+ (v||'') +'</td>').join('') + '</tr>').join('') +
    '</tbody></table>';
}

function loadAttendanceFromLocal(){
  const data = JSON.parse(localStorage.getItem('attendance_cache') || '[]');
  renderAttendance(data);
}

document.getElementById('export-local').onclick = () => {
  const data = localStorage.getItem('attendance_cache') || '[]';
  const blob = new Blob([data], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'attendance_cache.json';
  a.click();
};

// on load: try to show login if token exists
if(localStorage.getItem('token')){
  showMainUI();
  loadAttendanceFromLocal();
  loadMessagesFromLocal();
}
