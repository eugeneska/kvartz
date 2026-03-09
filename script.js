const slides = [
  {
    image: "assets/images/hero/back1.webp",
    text: "Скидка 25% всем новоселам!",
    actionText: "Узнать подробности",
    href: "#promo",
  },
  {
    image: "assets/images/hero/back2.webp",
    text: "Более 700 цветов в наличии! Привезем образцы цветов к Вам!",
    actionText: "Заказать доставку образцов",
    href: "#colors",
  },
  {
    image: "assets/images/hero/back3.webp",
    text: "Узнайте стоимость своей столешницы прямо сейчас!",
    actionText: "Оставить заявку",
    href: "#request-calc",
  },
  {
    image: "assets/images/hero/back4.webp",
    text: "Самое большое и новое производство!",
    actionText: "Узнать больше",
    href: "#production",
  },
  {
    image: "assets/images/hero/back5.webp",
    text: "Персональный менеджер и сопровождение на всех этапах заказа!",
    actionText: "Узнать больше",
    href: "#order-steps",
  },
];

const background = document.querySelector(".hero__bg");
const slideText = document.getElementById("slideText");
const slideAction = document.getElementById("slideAction");
const slideActionText = document.getElementById("slideActionText");
const colorsRequestForm = document.getElementById("colorsRequestForm");
const colorsRequestNotice = document.getElementById("colorsRequestNotice");
const promoRequestForm = document.getElementById("promoRequestForm");
const promoRequestNotice = document.getElementById("promoRequestNotice");
const colorModal = document.getElementById("colorModal");
const colorModalImage = document.getElementById("colorModalImage");
const colorModalTitle = document.getElementById("colorModalTitle");
const colorsGrid = document.getElementById("colorsGrid");
const projectCards = document.querySelectorAll(".project-card");
const projectsTrack = document.getElementById("projectsTrack");
const projectsSliderPrev = document.querySelector(".projects-slider__nav--prev");
const projectsSliderNext = document.querySelector(".projects-slider__nav--next");
const projectModal = document.getElementById("projectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalDesc = document.getElementById("projectModalDesc");
const projectModalCounter = document.getElementById("projectModalCounter");
const projectModalPrev = projectModal?.querySelector(".project-modal__nav--prev");
const projectModalNext = projectModal?.querySelector(".project-modal__nav--next");

const colorsCatalog = [
  { id: "001", name: "5753 КАЛАКАТА АВЕРОН" },
  { id: "002", name: "5750 КАЛАКАТА ШЕРИ" },
  { id: "003", name: "7630 КАЛАКАТА ВЕНСЕН" },
  { id: "004", name: "7060 КАЛАКАТА МОН СЕН-МИШЕЛЬ" },
  { id: "005", name: "7400 КАЛАКАТА ДОФИНЕ" },
  { id: "006", name: "7000 КАЛАКАТА ЭНО" },
  { id: "007", name: "8033 КАРКАССОН" },
  { id: "008", name: "9603 СЕН-МАЛО" },
  { id: "009", name: "5800 ТРАВЕРТИН СУПП" },
  { id: "010", name: "335 TIFFANI BLUE" },
  { id: "011", name: "341 TAJ MAHAL" },
  { id: "012", name: "892 GREY OXID" },
  { id: "013", name: "792 CALACATTA TOSCANA" },
  { id: "014", name: "313 WHITE ARCTIC" },
  { id: "015", name: "728 PATAGONIA NUOVO" },
  { id: "016", name: "345 BLACK SEA" },
  { id: "017", name: "Q703 CALACATTA BORGHIN" },
  { id: "018", name: "Q796 CALACATTA MAGIC WHITE" },
  { id: "019", name: "Q923 ARABESCATO CORCHIA" },
  { id: "020", name: "Q707 SAHARA NOIR" },
  { id: "021", name: "Q930 ROYAL BEIGE" },
  { id: "022", name: "Q785 CALACATTA GOLD" },
  { id: "023", name: "RM510 ЧЕРНОЕ МОРЕ" },
  { id: "024", name: "RM444 АЙ-ПЕТРИ" },
  { id: "025", name: "R543 ПИК ЭЛЬБРУСА" },
];

const projectsCatalog = {
  "project-1": {
    title: "Светлая кухня",
    description:
      "Минималистичный интерьер со светлой кварцевой поверхностью, где важны чистые линии, тактильность и легкость ухода.",
    images: [
      "assets/images/projects/1.webp",
      "assets/images/projects/1.1.webp",
      "assets/images/projects/1.2.webp",
      "assets/images/projects/1.3.webp",
      "assets/images/projects/1.4.webp",
      "assets/images/projects/1.5.webp",
    ],
  },
  "project-2": {
    title: "Гостиная-столовая",
    description:
      "Пространство с акцентной рабочей зоной и выразительным рисунком камня, рассчитанное на ежедневные активные сценарии.",
    images: [
      "assets/images/projects/2.webp",
      "assets/images/projects/2.1.webp",
      "assets/images/projects/2.2.webp",
      "assets/images/projects/2.3.webp",
      "assets/images/projects/2.4.webp",
      "assets/images/projects/2.5.webp",
    ],
  },
  "project-3": {
    title: "Ванная комната",
    description:
      "Компактная композиция с цельной столешницей и интегрированной геометрией, устойчивой к влаге и бытовым нагрузкам.",
    images: [
      "assets/images/projects/3.webp",
      "assets/images/projects/3.1.webp",
      "assets/images/projects/3.2.webp",
      "assets/images/projects/3.3.webp",
    ],
  },
  "project-4": {
    title: "Классическая кухня",
    description:
      "Теплая классика с декоративными фасадами и долговечной рабочей поверхностью, которая сохраняет аккуратный вид годами.",
    images: [
      "assets/images/projects/4.webp",
      "assets/images/projects/4.1.webp",
      "assets/images/projects/4.2.webp",
      "assets/images/projects/4.3.webp",
      "assets/images/projects/4.4.webp",
      "assets/images/projects/4.5.webp",
      "assets/images/projects/4.6.webp",
      "assets/images/projects/4.7.webp",
    ],
  },
  "project-5": {
    title: "Кухня в темных тонах",
    description:
      "Контрастное решение с выразительной текстурой и практичной эргономикой, созданное для современного ритма жизни.",
    images: [
      "assets/images/projects/5.1.webp",
      "assets/images/projects/5.2.webp",
      "assets/images/projects/5.3.webp",
      "assets/images/projects/5.4.webp",
      "assets/images/projects/5.5.webp",
      "assets/images/projects/5.6.webp",
    ],
  },
};

let currentSlide = 0;
const AUTOPLAY_MS = 5000;
let activeProject = null;
let activeProjectImageIndex = 0;

function renderSlide(index) {
  const slide = slides[index];
  if (!slide) return;

  background.style.backgroundImage = `url("${slide.image}")`;
  slideText.textContent = slide.text;
  slideActionText.textContent = slide.actionText;
  slideAction.setAttribute("href", slide.href);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  renderSlide(currentSlide);
}

function runEntranceAnimation() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("page-entered");
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add("page-entered");
    });
  });
}

function handleColorsRequestSubmit(event) {
  event.preventDefault();
  colorsRequestNotice.textContent =
    "Спасибо! В ближайшее время менеджер свяжется с Вами и подтвердит доставку образцов.";
  colorsRequestForm.reset();
}

function handlePromoRequestSubmit(event) {
  event.preventDefault();
  promoRequestNotice.textContent =
    "Спасибо! Мы зафиксировали условия акции и скоро свяжемся с Вами.";
  promoRequestForm.reset();
}

function openColorModal(name, imageSrc) {
  colorModalImage.src = imageSrc;
  colorModalImage.alt = name;
  colorModalTitle.textContent = name;
  colorModal.classList.add("is-open");
  colorModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeColorModal() {
  colorModal.classList.remove("is-open");
  colorModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderProjectModalSlide() {
  if (!activeProject || !projectModalImage || !projectModalCounter) return;
  const currentImage = activeProject.images[activeProjectImageIndex];
  projectModalImage.src = currentImage;
  projectModalImage.alt = `${activeProject.title}, фото ${activeProjectImageIndex + 1}`;
  projectModalCounter.textContent = `${activeProjectImageIndex + 1} / ${activeProject.images.length}`;
}

function openProjectModal(projectId) {
  const project = projectsCatalog[projectId];
  if (!project || !projectModal || !projectModalTitle || !projectModalDesc) return;

  activeProject = project;
  activeProjectImageIndex = 0;

  projectModalTitle.textContent = project.title;
  projectModalDesc.textContent = project.description;
  renderProjectModalSlide();

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  activeProject = null;
  activeProjectImageIndex = 0;
  document.body.style.overflow = "";
}

function showPrevProjectSlide() {
  if (!activeProject) return;
  activeProjectImageIndex =
    (activeProjectImageIndex - 1 + activeProject.images.length) % activeProject.images.length;
  renderProjectModalSlide();
}

function showNextProjectSlide() {
  if (!activeProject) return;
  activeProjectImageIndex = (activeProjectImageIndex + 1) % activeProject.images.length;
  renderProjectModalSlide();
}

function scrollProjects(direction) {
  if (!projectsTrack) return;
  const firstCard = projectsTrack.querySelector(".project-card");
  if (!firstCard) return;

  const cardWidth = firstCard.getBoundingClientRect().width;
  const trackStyles = window.getComputedStyle(projectsTrack);
  const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
  const scrollDelta = cardWidth + gap;

  projectsTrack.scrollBy({
    left: direction * scrollDelta,
    behavior: "smooth",
  });
}

function renderColorsGallery() {
  if (!colorsGrid) return;

  colorsGrid.innerHTML = colorsCatalog
    .map(({ id, name }) => {
      return `
        <button class="color-card" type="button" data-color-name="${name}" data-color-image="assets/images/colors/with-text/Color-${id}.webp">
          <img src="assets/images/colors/no-text/Color-${id}.webp" alt="${name}" loading="lazy" decoding="async" fetchpriority="low" />
          <span class="color-card__name">${name}</span>
        </button>
      `;
    })
    .join("");
}

function setupColorsGallery() {
  renderColorsGallery();

  const cards = document.querySelectorAll(".color-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.colorName || "Цвет";
      const image = card.dataset.colorImage || "";
      if (!image) return;
      openColorModal(name, image);
    });
  });

  const modalBackdrop = colorModal?.querySelector(".color-modal__backdrop");
  const modalClose = colorModal?.querySelector(".color-modal__close");

  modalBackdrop?.addEventListener("click", closeColorModal);
  modalClose?.addEventListener("click", closeColorModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && colorModal?.classList.contains("is-open")) {
      closeColorModal();
    }

    if (event.key === "Escape" && projectModal?.classList.contains("is-open")) {
      closeProjectModal();
    }

    if (projectModal?.classList.contains("is-open")) {
      if (event.key === "ArrowLeft") {
        showPrevProjectSlide();
      } else if (event.key === "ArrowRight") {
        showNextProjectSlide();
      }
    }
  });
}

function setupProjectsGallery() {
  if (!projectCards.length || !projectModal) return;

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.dataset.projectId;
      if (!projectId) return;
      openProjectModal(projectId);
    });
  });

  const modalBackdrop = projectModal.querySelector(".project-modal__backdrop");
  const modalClose = projectModal.querySelector(".project-modal__close");

  modalBackdrop?.addEventListener("click", closeProjectModal);
  modalClose?.addEventListener("click", closeProjectModal);
  projectModalPrev?.addEventListener("click", showPrevProjectSlide);
  projectModalNext?.addEventListener("click", showNextProjectSlide);

  projectsSliderPrev?.addEventListener("click", () => scrollProjects(-1));
  projectsSliderNext?.addEventListener("click", () => scrollProjects(1));
}

renderSlide(currentSlide);
runEntranceAnimation();
setupColorsGallery();
setupProjectsGallery();
colorsRequestForm?.addEventListener("submit", handleColorsRequestSubmit);
promoRequestForm?.addEventListener("submit", handlePromoRequestSubmit);
setInterval(nextSlide, AUTOPLAY_MS);
