const imageInput = document.getElementById('image');
const previewImage = document.getElementById('previewImage');
const fileLabel = document.querySelector('.file-label');

// Show image preview
imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      previewImage.src = reader.result;
      previewImage.style.display = 'block';
    };
    reader.readAsDataURL(file);
    fileLabel.textContent = file.name;
  }
});

// Save Event
document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const datetime = document.getElementById("datetime").value;
  const location = document.getElementById("location").value;
  const imageFile = document.getElementById("image").files[0];

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageUrl = event.target.result;
    const events = JSON.parse(localStorage.getItem("events")) || [];

    const newEvent = {
      id: events.length > 0 ? events[events.length - 1].id + 1 : 1,
      title,
      description,
      datetime,
      location,
      image: imageUrl
    };

    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));

    // Redirect to event page
    window.location.href = "event.html";
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
});

// Delete Event
function deleteEvent() {
  const deleteId = parseInt(document.getElementById("deleteId").value);
  let events = JSON.parse(localStorage.getItem("events")) || [];

  const index = events.findIndex(e => e.id === deleteId);
  if (index === -1) {
    alert("Event with ID " + deleteId + " not found!");
    return;
  }

  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));

  // Redirect to event page
  window.location.href = "event.html";
}
