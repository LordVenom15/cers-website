document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const links = document.querySelectorAll(".link");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const direction = this.getAttribute("data-direction");
      const href = this.getAttribute("href");

      // Add animation class
      wrapper.classList.remove("rotate-left", "rotate-right");
      wrapper.classList.add(`rotate-${direction}`);

      // Redirect after animation
      setTimeout(() => {
        window.location.href = href;
      }, 600); // match CSS animation duration
    });
  });

  // Handle role-based redirection after form submit
  document.querySelector("form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedRole = document.querySelector('input[name="role"]:checked');
    if (!selectedRole) {
      alert("Please select Student or Organizer.");
      return;
    }

    const role = selectedRole.value;

    if (role === "student") {
      window.location.href = "homepage.html";
    } else if (role === "organizer") {
      window.location.href = "organizer.html";
    }
  });
});
