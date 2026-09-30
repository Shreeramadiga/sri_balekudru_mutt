"use strict";

/* ---------- Data ---------- */

const IMAGES = {
  k: "./karala-narasimha.jpg",
  l: "./lakshmi-narasimha.jpg",
  s: "./sharada-daaru-bimba.jpg"
};

// [name, description, image key (optional)]
const DEITIES = [
  ["ಉಗ್ರನರಸಿಂಹ","ಮಠದ ಮೂಲ ಸ್ಥಾನಮೂರ್ತಿ; ಸುಮಾರು ೫ ಅಡಿ ಎತ್ತರ, ೯೦೦–೧೦೦೦ ವರ್ಷ ಪ್ರಾಚೀನ.",""],
  ["ಕರಾಳ ನರಸಿಂಹ","ಸುಮಾರು ೧೨ನೇ ಶತಮಾನ; ೮ ಭುಜಗಳ ಅರ್ಧನೃತ್ಯ ಭಂಗಿಯ ವಿರಳ ಮೂರ್ತಿ.","k"],
  ["ಲಕ್ಷ್ಮೀನರಸಿಂಹ","ಸುಮಾರು ೧೪ನೇ ಶತಮಾನ; ಲಲಿತಾಸನದಲ್ಲಿ ಎಡತೊಡೆಯ ಮೇಲೆ ಲಕ್ಷ್ಮಿ.","l"],
  ["ಯೋಗನರಸಿಂಹ","೧೩–೧೪ನೇ ಶತಮಾನ; ಯೋಗಪಟ್ಟ ಸಹಿತ ಮತ್ತು ರಹಿತ ಎರಡು ಬಿಂಬಗಳು.",""],
  ["ಲಕ್ಷ್ಮೀ ಗಣೇಶ","ಸುಮಾರು ೪.೫ ಅಡಿ ಎತ್ತರದ ದಶಭುಜ ವಲ್ಲಭ ಗಣಪತಿ.",""],
  ["ವರದ ಗಣೇಶ","ಅಂಗಳದಲ್ಲಿರುವ ಶಿಲಾಮೂರ್ತಿ; ವಿದ್ಯಾಪ್ರಸಾದಕ.",""],
  ["ರಾಜರಾಜೇಶ್ವರಿ","ಮೇರುಪೀಠದ ಮೇಲೆ ಪದ್ಮಾಸನಸ್ಥ ದೇವಿ; ೪ ಅಡಿ.",""],
  ["ಮಹಿಷಾಸುರಮರ್ದಿನಿ","ಸುಮಾರು ೧೨ನೇ ಶತಮಾನದ ಅಪೂರ್ವ ಪಂಚಲೋಹ ಬಿಂಬ.",""],
  ["ಶಾರದಾಂಬೆ","ಚಂದನದಲ್ಲಿ ಕೆತ್ತಿದ ಪ್ರಾಚೀನ ದಾರುಬಿಂಬ; ೪೦೦ ವರ್ಷಕ್ಕೂ ಹಳೆಯದು.","s"]
];

// [image key, caption]
const GALLERY = [
  ["l", "ಶ್ರೀ ಲಕ್ಷ್ಮೀನರಸಿಂಹ"],
  ["k", "ಕರಾಳ ನರಸಿಂಹ"],
  ["s", "ಶ್ರೀ ಮಠದ ಶಾರದಾಂಬೆಯ ಪ್ರಾಚೀನ ದಾರುಬಿಂಬ"]
];

/* ---------- Rendering ---------- */

function cardHTML(name, text, imgKey) {
  const photo = imgKey
    ? `<img data-zoom src="${IMAGES[imgKey]}" alt="${name}">`
    : "";
  return `<div class="card">${photo}<div><h3>${name}</h3><p>${text}</p></div></div>`;
}

function renderCards() {
  const byId = (id) => document.getElementById(id);

  // Deities page lists every idol; the home page only those with a photo
  byId("deity-grid").innerHTML = DEITIES.map((d) => cardHTML(...d)).join("");
  byId("home-deities").innerHTML = DEITIES.filter((d) => d[2])
    .map((d) => cardHTML(...d))
    .join("");
  byId("gallery-grid").innerHTML = GALLERY.map(([key, name]) =>
    cardHTML(name, "", key)
  ).join("");
}

/* ---------- Page routing (hash based) ---------- */

function showPage() {
  let id = (location.hash || "#home").slice(1);
  const target = document.getElementById(id);
  if (!target || !target.classList.contains("page")) id = "home";

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("on", page.id === id);
  });
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.toggle("on", link.getAttribute("href") === "#" + id);
  });

  // The Shankaracharya banner is only shown on the home page
  document.getElementById("hero-banner").style.display =
    id === "home" ? "" : "none";
  window.scrollTo(0, 0);
}

/* ---------- Events ---------- */

function onClick(e) {
  const lightbox = document.getElementById("lightbox");

  // Open a photo in the lightbox / close it again
  const photo = e.target.closest("[data-zoom]");
  if (photo) {
    document.getElementById("lightbox-img").src = photo.src;
    lightbox.classList.add("on");
  } else if (e.target.closest("#lightbox")) {
    lightbox.classList.remove("on");
  }

  // History page: table-of-contents links scroll to their section
  const tocLink = e.target.closest("[data-section]");
  if (tocLink) {
    e.preventDefault();
    document
      .getElementById(tocLink.dataset.section)
      .scrollIntoView({ behavior: "smooth" });
  }
}

renderCards();
document.body.addEventListener("click", onClick);
window.addEventListener("hashchange", showPage);
showPage();
