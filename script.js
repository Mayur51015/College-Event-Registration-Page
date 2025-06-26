
document.getElementById('eventForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();
  const event = document.getElementById('event').value;

  if (!name || !email || !college || !event) {
    alert("Please fill all fields!");
    return;
  }

  
  saveToDB({ name, email, college, event });

  alert(`🎉 Thank you, ${name}! You have registered for ${event}.`);
  document.getElementById('eventForm').reset();
});


function saveToDB(data) {
  let request = indexedDB.open("EventDB", 1);

  request.onupgradeneeded = function (e) {
    let db = e.target.result;
    if (!db.objectStoreNames.contains("registrations")) {
      db.createObjectStore("registrations", { keyPath: "id", autoIncrement: true });
    }
  };

  request.onsuccess = function (e) {
    let db = e.target.result;
    let tx = db.transaction("registrations", "readwrite");
    let store = tx.objectStore("registrations");
    store.add({ ...data, timestamp: new Date() });
  };
}
