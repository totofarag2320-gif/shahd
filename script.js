// Language Toggle
const langButton = document.getElementById("languageButton");
const langText = document.getElementById("languageText");
const langIcon = document.getElementById("languageIcon");
langButton.addEventListener("click", () => {
  if (langText.textContent.trim() === "العربية") {
    langText.textContent = "English";
    langIcon.textContent = "🇬🇧";
  } else {
    langText.textContent = "العربية";
    langIcon.textContent = "🇪🇬";
  }
});

// Mobile Menu Toggle
const menuButton = document.getElementById("menuButton");
const popupMenu = document.getElementById("popupMenu");
const overlay = document.getElementById("overlay");
let menuOpen = false;
menuButton.addEventListener("click", () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    popupMenu.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    popupMenu.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

// Hide Mobile Menu on Resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && !popupMenu.classList.contains("hidden")) {
    popupMenu.classList.add("hidden");
    overlay.classList.add("hidden");
    menuOpen = false;
  }
});

// Desktop Services Menu
const servicesButton = document.getElementById("servicesButton");
const servicesMenu = document.getElementById("servicesMenu");
const arrowIcon = document.getElementById("arrowIcon");

servicesButton.addEventListener("click", () => {
  servicesMenu.classList.toggle("hidden");
  arrowIcon.classList.toggle("rotate-180");
});

// Mobile Services Menu
const mobileServicesButton = document.getElementById("mobileServicesButton");
const mobileServicesMenu = document.getElementById("mobileServicesMenu");
const mobileArrowIcon = document.getElementById("mobileArrowIcon");
mobileServicesButton.addEventListener("click", () => {
  mobileServicesMenu.classList.toggle("hidden");
  mobileArrowIcon.classList.toggle("rotate-180");
});

// Interactive Star Rating
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#starRating svg");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      star.classList.toggle("active");
    });
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////

const searchInput = document.getElementById("searchAssistant");
const assistantsGrid = document.getElementById("assistantsGrid");
const assistantCards = Array.from(
  assistantsGrid.getElementsByClassName("assistant-card")
);
const searchModal = document.getElementById("searchModal");
const searchResults = document.getElementById("searchResults");
const searchModalClose = document.getElementById("searchModalClose");

function createResultItem(card) {
  const name = card.getAttribute("data-name");
  const imgSrc = card.querySelector("img").src;
  const role = card.querySelector(".faculty-member-role").textContent;
  const descElem = card.querySelector(".faculty-member-description");
  const desc = descElem ? descElem.textContent : "";

  const item = document.createElement("div");
  item.className = "result-item";
  item.tabIndex = 0;
  item.innerHTML = `
    <img src="${imgSrc}" alt="Photo of ${name}" />
    <div class="info">
      <div class="name">${name}</div>
      <div class="role">${role}</div>
      ${desc ? `<div class="desc">${desc}</div>` : ""}
    </div>
  `;

  item.addEventListener("click", () => {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("ring-4", "ring-teal-400");
    setTimeout(() => card.classList.remove("ring-4", "ring-teal-400"), 2000);
    closeModal();
  });

  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.click();
    }
  });

  return item;
}

function openModal() {
  searchModal.classList.add("active");
  searchModal.classList.remove("hidden");
  searchModal.focus();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  searchModal.classList.remove("active");
  searchModal.classList.add("hidden");
  document.body.style.overflow = "";
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (!query) {
    closeModal();
    return;
  }

  const matched = assistantCards.filter((card) =>
    card.getAttribute("data-name").toLowerCase().includes(query)
  );

  if (matched.length === 0) {
    searchResults.innerHTML =
      '<p class="p-4 text-center text-gray-500">No assistants found.</p>';
  } else {
    matched.forEach((card) => {
      searchResults.appendChild(createResultItem(card));
    });
  }

  openModal();
});

searchModalClose.addEventListener("click", closeModal);

searchModal.addEventListener("click", (e) => {
  if (e.target === searchModal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && searchModal.classList.contains("active"))
    closeModal();
});




function openForm() {
  document.getElementById("formOverlay").style.display = "flex";
}

function closeForm() {
  document.getElementById("formOverlay").style.display = "none";
}


document.getElementById("registrationForm").addEventListener("submit", function(e) {
  e.preventDefault(); // إلغاء الإرسال التقليدي

  const formData = new FormData(this);

  fetch("submit_form.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    alert(data); // عرض نتيجة التسجيل
    document.getElementById("registrationForm").reset(); // إعادة تعيين النموذج
  })
  .catch(err => {
    alert("An error occurred!");
    console.error(err);
  });
});
