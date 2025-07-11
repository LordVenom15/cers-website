// events.js
document.addEventListener("DOMContentLoaded", function () {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const container = document.getElementById("eventContainer");

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${event.image}" class="event-image" alt="Event Image">
      <div class="event-details">
        <h3>${event.title}</h3>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Time & Date:</strong> ${event.datetime}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <button class="join-btn">Join</button>
      </div>
    `;
    container.appendChild(card);
  });
});
