const photoTitles = [
  "Quiet Geometry",
  "Soft Transit",
  "Passing Light",
  "Still Corners",
  "Urban Pause",
  "Muted Motion",
  "Evening Texture",
  "Everyday Frame",
  "Silent Street",
  "Light Studies",
  "Framed Stillness",
  "City Atmosphere",
];

const photoDescriptions = [
  "A calm frame built around balance, negative space, and the small details that usually pass unnoticed.",
  "This image leans into mood and timing, turning an everyday moment into something more reflective and cinematic.",
  "Captured with a quiet visual rhythm, the composition focuses on texture, light falloff, and natural depth.",
  "A simple observational shot where soft tones and clean framing create a more intimate sense of place.",
  "This frame highlights the beauty of ordinary surroundings through restrained composition and subtle contrast.",
  "Shot with a documentary eye, the image preserves atmosphere while keeping the scene visually minimal.",
];

const cards = [...document.querySelectorAll(".photo-grid .media-card")];
const modal = document.getElementById("photo-modal");
const modalMedia = document.getElementById("photo-modal-media");
const modalTitle = document.getElementById("photo-modal-title");
const modalDescription = document.getElementById("photo-modal-description");

function buildOverlay(card, title) {
  const overlay = document.createElement("div");
  overlay.className = "media-overlay";
  overlay.innerHTML = `
    <p class="media-overlay-label">Open Frame</p>
    <h3>${title}</h3>
  `;
  card.appendChild(overlay);
}

function openModal(card, title, description, isVideo) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalMedia.innerHTML = "";

  if (isVideo) {
    const source = card.querySelector("source")?.getAttribute("src");
    const video = document.createElement("video");
    video.className = "photo-modal-video";
    video.controls = true;
    video.autoplay = true;
    video.preload = "metadata";
    video.innerHTML = `<source src="${source}" type="video/quicktime" />`;
    modalMedia.appendChild(video);
  } else {
    const src = card.querySelector("img")?.getAttribute("src");
    const alt = card.querySelector("img")?.getAttribute("alt") || title;
    const img = document.createElement("img");
    img.className = "photo-modal-image";
    img.src = src;
    img.alt = alt;
    modalMedia.appendChild(img);
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.hidden = true;
  modalMedia.innerHTML = "";
  document.body.classList.remove("modal-open");
}

cards.forEach((card, index) => {
  const isVideo = card.classList.contains("media-card-video");
  const title = isVideo
    ? "Moving Memory"
    : `${photoTitles[index % photoTitles.length]} ${String(index + 1).padStart(2, "0")}`;
  const description = isVideo
    ? "A short moving frame included in the photography archive, blending motion with the same observational and atmospheric approach as the still images."
    : photoDescriptions[index % photoDescriptions.length];

  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.dataset.title = title;
  card.dataset.description = description;

  buildOverlay(card, title);

  const trigger = () => openModal(card, title, description, isVideo);
  card.addEventListener("click", trigger);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      trigger();
    }
  });
});

modal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});
