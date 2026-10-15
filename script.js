

// Mobile navigation menu
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", function () {
    const isOpen = navbar.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

// Close menu when a navigation link is clicked
navbar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});

// Select a department from the service cards
const serviceLinks = document.querySelectorAll(".service-link");
const departmentSelect = document.getElementById("department");

serviceLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        departmentSelect.value = link.dataset.service;
    });
});

// Prevent selecting a past date
const visitDate = document.getElementById("visitDate");

function getLocalDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

visitDate.min = getLocalDate();

// Update the footer year automatically
document.getElementById("year").textContent =
    new Date().getFullYear();

// Appointment enquiry form
const appointmentForm =
    document.getElementById("appointmentForm");

const formMessage = document.getElementById("formMessage");

appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const department = departmentSelect.value;

    // Check required details
    if (!fullName || !phone || !department) {
        formMessage.textContent =
            "Please complete all required fields.";

        formMessage.style.display = "block";
        return;
    }

    // Check the Indian 10-digit mobile number format
    if (!/^[0-9]{10}$/.test(phone)) {
        formMessage.textContent =
            "Please enter a valid 10-digit mobile number.";

        formMessage.style.display = "block";
        return;
    }

    // Display a demo confirmation
    formMessage.textContent =
        `Thank you, ${fullName}. Your ${department} enquiry ` +
        "has passed the form checks. This is only a demo; " +
        "your details were not sent and no appointment was booked.";

    formMessage.style.display = "block";
});

// Keep the form demo-only: no details are transmitted.
