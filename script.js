const slides = [
  {
    image: "assets/images/hero/back1.webp",
    position: "62% center",
    text: "Скидка 25% всем новоселам!",
    mobileText: "Скидка 25% всем\nновоселам!",
    materialCaption: "Кварц PrimaX, цвет Calacatta Grigio",
    actionText: "Узнать подробности",
    href: "#promo",
  },
  {
    image: "assets/images/hero/back3.webp",
    text: "Рассчитать стоимость!",
    materialCaption: "Кварц Avant, цвет 7630 Калакатта Венсен",
    actionText: "Оставить заявку",
    href: "#selection-request", 
  },
  {
    image: "assets/images/hero/back2.webp",
    text: "700+ оттенков в наличии.\nС образцами на дом - бесплатно!",
    mobileText: "700+ оттенков в наличии.\nС образцами на дом -\nбесплатно!",
    materialCaption: "Кварц Avant, цвет 5750 Калакатта Шери",
    actionText: "Заказать доставку образцов",
    href: "#colors-request-title",
  },
  {
    image: "assets/images/hero/back4.webp",
    text: "Самое большое и новое производство!",
    actionText: "Узнать больше",
    href: "#production",
  },
  {
    image: "assets/images/hero/back5.webp",
    text: "Персональный менеджер на все этапы заказа.",
    mobileText: "Персональный\nменеджер\nна весь заказ",
    actionText: "Узнать больше",
    href: "#order-steps",
  },
];

const background = document.querySelector(".hero__bg");
const slideText = document.getElementById("slideText");
const slideMaterial = document.getElementById("slideMaterial");
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
const certificatesTrack = document.getElementById("certificatesTrack");
const certificatesSliderPrev = document.querySelector(".certificates-slider__nav--prev");
const certificatesSliderNext = document.querySelector(".certificates-slider__nav--next");
const certificateCards = Array.from(document.querySelectorAll(".certificate-card"));
const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalCounter = document.getElementById("certificateModalCounter");
const certificateModalPrev = certificateModal?.querySelector(".certificate-modal__nav--prev");
const certificateModalNext = certificateModal?.querySelector(".certificate-modal__nav--next");
const projectModal = document.getElementById("projectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalDesc = document.getElementById("projectModalDesc");
const projectModalCounter = document.getElementById("projectModalCounter");
const projectModalPrev = projectModal?.querySelector(".project-modal__nav--prev");
const projectModalNext = projectModal?.querySelector(".project-modal__nav--next");
const thanksModal = document.getElementById("thanksModal");
const forms = Array.from(document.querySelectorAll("form"));
const showroomMapContainer = document.getElementById("showroomsMap");
const showroomMapButtons = Array.from(document.querySelectorAll(".showroom-map-btn"));

const FORM_ENDPOINT = "send-request.php";
const YANDEX_MAPS_API_KEY = "fe729bc9-7be5-49eb-bd4f-7d96efcb7e56";
const MOBILE_HERO_FIXED_SLIDE_INDEX = (() => {
  const mobileFixedSlideImage = "assets/images/hero/back2.webp";
  const index = slides.findIndex((slide) => slide.image === mobileFixedSlideImage);
  return index >= 0 ? index : 0;
})();
const MOBILE_HERO_BG_IMAGE = "assets/images/hero/mobile-hero-bg.webp";
const mobileHeroMedia = window.matchMedia("(max-width: 640px)");
const mobileHeroBackgroundMedia = window.matchMedia("(max-width: 980px)");
const recaptchaSiteKey = window.APP_CONFIG?.RECAPTCHA_SITE_KEY || "";
const recaptchaEnabled = Boolean(recaptchaSiteKey);
const RECAPTCHA_ACTION = "submit_form";
let recaptchaReady = false;
const formCaptchaState = new Map();

const colorsCatalog = [
  { id: "001", name: "5753 КАЛАКАТТА АВЕРОН" },
  { id: "002", name: "5750 КАЛАКАТТА ШЕРИ" },
  { id: "003", name: "7630 КАЛАКАТТА ВЕНСЕН" },
  { id: "004", name: "7060 КАЛАКАТТА МОН СЕН-МИШЕЛЬ" },
  { id: "005", name: "7400 КАЛАКАТТА ДОФИНЕ" },
  { id: "006", name: "7000 КАЛАКАТТА ЭНО" },
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
    title: "Кварц Avant, цвет Калакатта Мон Сен-Мишель.",
    description:
      "Частные апартаменты. Санкт-Петербург. Идеальный выбор для ванной комнаты. Графика камня перекликается с графикой города. Контрастные линии, четкий ритм, северная сдержанность.",
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
    title: "Кварц Avant, цвет 7630 Калакатта Венсен.",
    description:
      "Частные апартаменты. Москва-Сити. Фактура камня поддерживает ритм небоскребов. Светлый фон и чёткие прожилки — для интерьера, который не теряется на высоте, а становится её частью.",
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
    title: "Керамика Laminam, цвет Graphite.",
    description:
      "Кварц Noblle, цвет Q703 Calacatta Borghini. Кварц Аварус, цвет R543 Снега Сибири. Загородный дом. Московская область. Три разных материала. Один дом. Одно чувство стиля.",
    images: [
      "assets/images/projects/3.webp",
      "assets/images/projects/3.1.webp",
      "assets/images/projects/3.2.webp",
      "assets/images/projects/3.3.webp",
    ],
  },
  "project-4": {
    title: "Кварц Avant, цвет 5750 Калакатта Шери.",
    description:
      "Барная стойка с подсветкой в московском отеле. Мягкий свет подчеркивает рисунок камня — создаёт настроение в вечернем лобби.",
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
    title: "Кварц Avant, цвет Калакатта Мон Сен-Мишель.",
    description:
      "Частные апартаменты. Санкт-Петербург. Идеальный выбор для ванной комнаты. Графика камня перекликается с графикой города. Контрастные линии, четкий ритм, северная сдержанность.",
    images: [
      "assets/images/projects/5.1.webp",
      "assets/images/projects/5.2.webp",
      "assets/images/projects/5.3.webp",
      "assets/images/projects/5.4.webp",
      "assets/images/projects/5.5.webp",
      "assets/images/projects/5.6.webp",
    ],
  },
  "project-6": {
    title: "Кварц Primax, цвет 748 Calacatta Grigio.",
    description:
      "Загородный дом. Московская область. Кварц с мягким мраморным рисунком. Для кухни, где по утрам пьют кофе, смотрят в окно на сад и не торопятся. Серый, спокойный, утренний.",
    images: [
      "assets/images/projects/6.webp",
      "assets/images/projects/6.1.webp",
      "assets/images/projects/6.2.webp",
      "assets/images/projects/6.3.webp",
    ],
  },
  "project-7": {
    title: "Кварц Primax, цвет 335 Tiffani Blue.",
    description:
      "Частные апартаменты. Пентхаус. Москва. Сложный проект, редкий цвет, большой формат, инженерная задача сделать так, чтобы камень светился изнутри и при этом оставался монолитным. Мы справились. Теперь это главный арт-объект дома.",
    images: [
      "assets/images/projects/7.webp",
      "assets/images/projects/7.1.webp",
      "assets/images/projects/7.2.webp",
      "assets/images/projects/7.3.webp",
    ],
  },
};

let currentSlide = 0;
const PRIMARY_SLIDE_MS = 9000;
const SECONDARY_SLIDE_MS = 6000;
const SHOWROOM_MAP_ZOOM = 15;
let heroAutoplayTimerId = null;
let heroAutoplayResumeTimerId = null;
let activeProject = null;
let activeProjectImageIndex = 0;
let activeCertificateIndex = 0;
let activeCertificateImages = [];
let showroomMap = null;
let showroomPlacemark = null;
const showroomGeocodeCache = new Map();
let yandexMapsLoaderPromise = null;
let showroomsInitStarted = false;
let pendingShowroomId = null;
const heroBurgerButton = document.querySelector(".hero__burger");
const sideMenu = document.querySelector(".side-menu");
const mobileNav = document.getElementById("mobileNav");
const mobileNavBackdrop = mobileNav?.querySelector(".mobile-nav__backdrop");
const mobileNavClose = mobileNav?.querySelector(".mobile-nav__close");
const mobileNavLinks = Array.from(mobileNav?.querySelectorAll(".mobile-nav__links a") || []);

const showrooms = {
  "main-office": {
    id: "main-office",
    address: 'Москва, Искры 17а, стр.2., бизнес центр "ЛИНИЯ"',
    mapAddress: "Москва, Искры 17а, стр.2.",
  },
  pushkino: {
    id: "pushkino",
    address: 'МО, Пушкино, Красноармейское шоссе, 101, Мебельный Центр "Пеликан"',
    mapAddress: "Московская область, Пушкино, Красноармейское шоссе, 101",
  },
  istra: {
    id: "istra",
    address: "Московская область, г. Истра, ул. Маяковского 15",
    mapAddress: "Московская область, г. Истра, ул. Маяковского 15",
  },
  spb: {
    id: "spb",
    address: 'Санкт-Петербург, ул. Фучика 9, МЦ "Кубатура", 2 этаж, Павильон 2В.525',
    mapAddress: "Санкт-Петербург, ул. Фучика 9",
  },
};

function renderSlide(index) {
  if (!background || !slideText || !slideAction || !slideActionText) return;
  const activeSlideIndex = mobileHeroMedia.matches ? MOBILE_HERO_FIXED_SLIDE_INDEX : index;
  const slide = slides[activeSlideIndex];
  if (!slide) return;
  const slideMessage = mobileHeroMedia.matches && slide.mobileText ? slide.mobileText : slide.text;
  if (mobileHeroBackgroundMedia.matches) {
    background.style.backgroundImage = "";
    background.style.backgroundPosition = "center center";
  } else {
    background.style.backgroundImage = `url("${slide.image}")`;
    background.style.backgroundPosition = slide.position || "center";
  }
  slideText.textContent = slideMessage;
  if (slideMaterial) {
    const materialCaption = slide.materialCaption?.trim() || "";
    slideMaterial.textContent = materialCaption;
    slideMaterial.hidden = !materialCaption;
  }
  if (mobileHeroMedia.matches) {
    slideActionText.textContent = "Экспресс расчет";
    slideAction.setAttribute("href", "#express-calc");
  } else {
    slideActionText.textContent = slide.actionText;
    slideAction.setAttribute("href", slide.href);
  }
}

function nextSlide() {
  if (mobileHeroMedia.matches) {
    renderSlide(currentSlide);
    return;
  }
  currentSlide = (currentSlide + 1) % slides.length;
  renderSlide(currentSlide);
}

function getSlideDurationMs(index) {
  return index <= 2 ? PRIMARY_SLIDE_MS : SECONDARY_SLIDE_MS;
}

function scheduleHeroAutoplay() {
  if (heroAutoplayTimerId) {
    clearTimeout(heroAutoplayTimerId);
  }

  if (mobileHeroMedia.matches) {
    heroAutoplayTimerId = null;
    return;
  }

  heroAutoplayTimerId = setTimeout(() => {
    nextSlide();
    scheduleHeroAutoplay();
  }, getSlideDurationMs(currentSlide));
}

function pauseHeroAutoplayFor(ms = 1500) {
  if (heroAutoplayTimerId) {
    clearTimeout(heroAutoplayTimerId);
    heroAutoplayTimerId = null;
  }
  if (heroAutoplayResumeTimerId) {
    clearTimeout(heroAutoplayResumeTimerId);
  }
  if (mobileHeroMedia.matches) {
    heroAutoplayResumeTimerId = null;
    return;
  }
  heroAutoplayResumeTimerId = setTimeout(() => {
    heroAutoplayResumeTimerId = null;
    scheduleHeroAutoplay();
  }, ms);
}

function setupHeroSlideActionLink() {
  if (!slideAction) return;

  slideAction.addEventListener("pointerdown", () => {
    slideAction.dataset.lockedHref = slideAction.getAttribute("href") || "";
    pauseHeroAutoplayFor();
  });

  slideAction.addEventListener("focusin", () => {
    pauseHeroAutoplayFor(2500);
  });

  slideAction.addEventListener("click", (event) => {
    const lockedHref = slideAction.dataset.lockedHref || "";
    delete slideAction.dataset.lockedHref;
    const href = lockedHref || slideAction.getAttribute("href") || "";

    if (!href.startsWith("#")) {
      pauseHeroAutoplayFor();
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      pauseHeroAutoplayFor();
      return;
    }

    event.preventDefault();
    const shouldCenterColorsRequest = href === "#colors-request-title";
    const scrollTarget = shouldCenterColorsRequest ? target.closest(".colors-request") || target : target;
    const scrollBlock = shouldCenterColorsRequest ? "center" : "start";
    scrollTarget.scrollIntoView({ behavior: "smooth", block: scrollBlock });
    if (window.location.hash !== href) {
      history.replaceState(null, "", href);
    }
    pauseHeroAutoplayFor();
  });
}

function preloadHeroSlides() {
  const currentHeroImage = slides[currentSlide]?.image;
  const imagesToPreload = slides
    .map((slide) => slide.image)
    .filter((image, index, array) => image && image !== currentHeroImage && array.indexOf(image) === index);
  if (!imagesToPreload.includes(MOBILE_HERO_BG_IMAGE)) {
    imagesToPreload.push(MOBILE_HERO_BG_IMAGE);
  }

  if (!imagesToPreload.length) return;

  const preload = () => {
    imagesToPreload.forEach((imageSrc) => {
      const image = new Image();
      image.decoding = "async";
      image.src = imageSrc;
    });
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(preload, { timeout: 2000 });
  } else {
    setTimeout(preload, 600);
  }
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

function openThanksModal() {
  if (!thanksModal) return;
  thanksModal.classList.add("is-open");
  thanksModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeThanksModal() {
  if (!thanksModal) return;
  thanksModal.classList.remove("is-open");
  thanksModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
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

function getCertificateImagesFromCard(card) {
  const imagesRaw = card?.dataset.certificateImages || "";
  return imagesRaw
    .split(",")
    .map((imageSrc) => imageSrc.trim())
    .filter((imageSrc) => imageSrc.length > 0);
}

function renderCertificateModalSlide() {
  if (!certificateModalImage || !certificateModalCounter || !activeCertificateImages.length) return;

  const currentImage = activeCertificateImages[activeCertificateIndex];
  certificateModalImage.src = currentImage;
  certificateModalImage.alt = `Сертификат ${activeCertificateIndex + 1}`;

  if (certificateModalPrev) {
    certificateModalPrev.disabled = activeCertificateImages.length <= 1;
  }

  if (certificateModalNext) {
    certificateModalNext.disabled = activeCertificateImages.length <= 1;
  }

  certificateModalCounter.textContent = `${activeCertificateIndex + 1} / ${activeCertificateImages.length}`;
}

function openCertificateModal(card) {
  const images = getCertificateImagesFromCard(card);
  if (!certificateModal || !images.length) return;

  activeCertificateImages = images;
  activeCertificateIndex = 0;
  renderCertificateModalSlide();

  certificateModal.classList.add("is-open");
  certificateModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCertificateModal() {
  if (!certificateModal) return;
  certificateModal.classList.remove("is-open");
  certificateModal.setAttribute("aria-hidden", "true");
  activeCertificateImages = [];
  activeCertificateIndex = 0;
  document.body.style.overflow = "";
}

function showPrevCertificateSlide() {
  if (activeCertificateImages.length <= 1) return;

  activeCertificateIndex =
    (activeCertificateIndex - 1 + activeCertificateImages.length) % activeCertificateImages.length;
  renderCertificateModalSlide();
}

function showNextCertificateSlide() {
  if (activeCertificateImages.length <= 1) return;

  activeCertificateIndex = (activeCertificateIndex + 1) % activeCertificateImages.length;
  renderCertificateModalSlide();
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

function updateCertificatesSliderControls() {
  if (!certificatesTrack) return;

  const maxScrollLeft = Math.max(0, certificatesTrack.scrollWidth - certificatesTrack.clientWidth);
  const isAtStart = certificatesTrack.scrollLeft <= 2;
  const isAtEnd = certificatesTrack.scrollLeft >= maxScrollLeft - 2;

  if (certificatesSliderPrev) {
    certificatesSliderPrev.disabled = isAtStart;
  }

  if (certificatesSliderNext) {
    certificatesSliderNext.disabled = isAtEnd;
  }
}

function scrollCertificates(direction) {
  if (!certificatesTrack) return;
  const firstCard = certificatesTrack.querySelector(".certificate-card");
  if (!firstCard) return;

  const cardWidth = firstCard.getBoundingClientRect().width;
  const trackStyles = window.getComputedStyle(certificatesTrack);
  const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
  const scrollDelta = cardWidth + gap;

  certificatesTrack.scrollBy({
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

    if (event.key === "Escape" && thanksModal?.classList.contains("is-open")) {
      closeThanksModal();
    }

    if (event.key === "Escape" && certificateModal?.classList.contains("is-open")) {
      closeCertificateModal();
    }

    if (projectModal?.classList.contains("is-open")) {
      if (event.key === "ArrowLeft") {
        showPrevProjectSlide();
      } else if (event.key === "ArrowRight") {
        showNextProjectSlide();
      }
    }

    if (certificateModal?.classList.contains("is-open")) {
      if (event.key === "ArrowLeft") {
        showPrevCertificateSlide();
      } else if (event.key === "ArrowRight") {
        showNextCertificateSlide();
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

function setupCertificatesSlider() {
  if (!certificatesTrack) return;

  certificatesSliderPrev?.addEventListener("click", () => scrollCertificates(-1));
  certificatesSliderNext?.addEventListener("click", () => scrollCertificates(1));
  certificatesTrack.addEventListener("scroll", updateCertificatesSliderControls, { passive: true });
  window.addEventListener("resize", updateCertificatesSliderControls);
  updateCertificatesSliderControls();
}

function setupCertificatesGallery() {
  if (!certificateCards.length || !certificateModal) return;

  certificateCards.forEach((card) => {
    card.addEventListener("click", () => {
      openCertificateModal(card);
    });
  });

  const modalBackdrop = certificateModal.querySelector(".certificate-modal__backdrop");
  const modalClose = certificateModal.querySelector(".certificate-modal__close");

  modalBackdrop?.addEventListener("click", closeCertificateModal);
  modalClose?.addEventListener("click", closeCertificateModal);
  certificateModalPrev?.addEventListener("click", showPrevCertificateSlide);
  certificateModalNext?.addEventListener("click", showNextCertificateSlide);
}

function setupMobileHeroBurger() {
  if (!heroBurgerButton || !mobileNav) return;

  const closeMobileNav = () => {
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    heroBurgerButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  heroBurgerButton.addEventListener("click", () => {
    const isOpen = !mobileNav.classList.contains("is-open");
    mobileNav.classList.toggle("is-open", isOpen);
    mobileNav.setAttribute("aria-hidden", isOpen ? "false" : "true");
    heroBurgerButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileNavBackdrop?.addEventListener("click", closeMobileNav);
  mobileNavClose?.addEventListener("click", closeMobileNav);
  mobileNavLinks.forEach((link) => link.addEventListener("click", closeMobileNav));
}

function setActiveShowroomButton(showroomId) {
  showroomMapButtons.forEach((button) => {
    const isActive = button.dataset.showroomId === showroomId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

async function focusShowroomOnMap(showroomId) {
  const showroom = showrooms[showroomId] || null;
  if (!showroom || !showroomMap || !showroomPlacemark) return;

  const coords = await geocodeShowroom(showroom);
  if (!coords) {
    console.warn(`Не удалось получить координаты для: ${showroom.address}`);
    return;
  }

  showroomMap.container.fitToViewport();
  showroomPlacemark.geometry.setCoordinates(coords);
  showroomPlacemark.properties.set("balloonContent", showroom.mapAddress || showroom.address);
  showroomPlacemark.properties.unset("iconCaption");
  showroomMap.setCenter(coords, SHOWROOM_MAP_ZOOM, { duration: 280, checkZoomRange: true });
  pendingShowroomId = showroom.id;
  setActiveShowroomButton(showroom.id);
}

function getDefaultShowroom() {
  return showrooms["main-office"] || Object.values(showrooms)[0] || null;
}

function loadYandexMapsApi() {
  if (window.ymaps?.ready && window.ymaps?.Map && window.ymaps?.Placemark) {
    return Promise.resolve();
  }

  if (yandexMapsLoaderPromise) {
    return yandexMapsLoaderPromise;
  }

  yandexMapsLoaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;
    script.onerror = () => reject(new Error("Не удалось загрузить API Яндекс Карт."));
    script.onload = () => {
      if (!window.ymaps?.ready) {
        reject(new Error("API Яндекс Карт загружен некорректно."));
        return;
      }

      const readyTimeoutId = setTimeout(() => {
        reject(new Error("API Яндекс Карт не инициализировался вовремя."));
      }, 10000);

      window.ymaps.ready(() => {
        clearTimeout(readyTimeoutId);
        if (window.ymaps?.Map && window.ymaps?.Placemark) {
          resolve();
        } else {
          reject(new Error("API Яндекс Карт загружен некорректно."));
        }
      });
    };
    document.head.appendChild(script);
  });

  return yandexMapsLoaderPromise.catch((error) => {
    yandexMapsLoaderPromise = null;
    throw error;
  });
}

function setupShowroomsButtons() {
  showroomMapButtons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const showroomId = button.dataset.showroomId;
      if (!showroomId) return;

      if (showroomMap && showroomPlacemark) {
        void focusShowroomOnMap(showroomId);
      } else {
        pendingShowroomId = showroomId;
        setActiveShowroomButton(showroomId);
      }
    });
  });
}

function getShowroomAddressQuery(showroom) {
  return String(showroom?.mapAddress || showroom?.address || "").trim();
}

function isValidGeoCoords(coords) {
  return (
    Array.isArray(coords) &&
    coords.length === 2 &&
    Number.isFinite(coords[0]) &&
    Number.isFinite(coords[1])
  );
}

async function geocodeShowroom(showroom) {
  if (!showroom) return null;
  if (showroomGeocodeCache.has(showroom.id)) {
    return showroomGeocodeCache.get(showroom.id);
  }

  if (!window.ymaps?.geocode) {
    return null;
  }

  try {
    const geocodeQuery = getShowroomAddressQuery(showroom);
    if (!geocodeQuery) return null;

    const geocodeResult = await window.ymaps.geocode(geocodeQuery, { results: 1 });
    const firstObject = geocodeResult?.geoObjects?.get?.(0);
    const coords = firstObject?.geometry?.getCoordinates?.();
    if (isValidGeoCoords(coords)) {
      showroomGeocodeCache.set(showroom.id, coords);
      return coords;
    }
  } catch (error) {
    console.warn(`Не удалось геокодировать адрес: ${showroom.address}`, error);
  }

  return null;
}

function getShowroomCandidates(preferredShowroomId) {
  const allShowrooms = Object.values(showrooms);
  if (!preferredShowroomId) return allShowrooms;

  const preferred = showrooms[preferredShowroomId];
  if (!preferred) return allShowrooms;

  return [preferred, ...allShowrooms.filter((item) => item.id !== preferredShowroomId)];
}

async function resolveShowroomWithCoords(preferredShowroomId) {
  const candidates = getShowroomCandidates(preferredShowroomId);
  for (const showroom of candidates) {
    const coords = await geocodeShowroom(showroom);
    if (coords) {
      return { showroom, coords };
    }
  }
  return null;
}

async function warmShowroomCoordsCache(preferredShowroomId) {
  const candidates = getShowroomCandidates(preferredShowroomId);
  for (const showroom of candidates) {
    await geocodeShowroom(showroom);
  }
}

function initShowroomsMapWhenVisible() {
  if (!showroomMapContainer || !showroomMapButtons.length || showroomsInitStarted) return;

  const startInit = () => {
    if (showroomsInitStarted) return;
    showroomsInitStarted = true;
    initShowroomsMap();
  };

  if (typeof IntersectionObserver !== "function") {
    startInit();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      startInit();
    },
    {
      rootMargin: "300px 0px",
      threshold: 0.01,
    },
  );

  observer.observe(showroomMapContainer);
}

async function initShowroomsMap() {
  if (!showroomMapContainer || !showroomMapButtons.length) return;

  const defaultShowroom = getDefaultShowroom();
  if (!defaultShowroom) return;

  setupShowroomsButtons();
  pendingShowroomId = pendingShowroomId || defaultShowroom.id;
  setActiveShowroomButton(pendingShowroomId);
  showroomMapContainer.innerHTML = '<div class="showrooms-map__frame">Загрузка карты...</div>';

  try {
    await loadYandexMapsApi();
    await new Promise((resolve) => window.ymaps.ready(resolve));

    const preferredShowroomId = pendingShowroomId || defaultShowroom.id;
    const initial = await resolveShowroomWithCoords(preferredShowroomId);
    if (!initial) {
      showroomMapContainer.innerHTML = '<div class="showrooms-map__frame">Не удалось определить адреса на карте.</div>';
      return;
    }

    showroomMapContainer.innerHTML = "";
    showroomMap = new window.ymaps.Map(showroomMapContainer, {
      center: initial.coords,
      zoom: SHOWROOM_MAP_ZOOM,
      controls: ["zoomControl", "fullscreenControl"],
    });
    showroomMap.options.set("balloonAutoPan", false);

    showroomPlacemark = new window.ymaps.Placemark(
      initial.coords,
      {
        balloonContent: initial.showroom.mapAddress || initial.showroom.address,
      },
      {
        preset: "islands#redIcon",
        balloonAutoPan: false,
      },
    );

    showroomMap.geoObjects.add(showroomPlacemark);
    showroomMap.behaviors.disable("scrollZoom");
    showroomMap.setCenter(initial.coords, SHOWROOM_MAP_ZOOM, { checkZoomRange: true });
    pendingShowroomId = initial.showroom.id;
    setActiveShowroomButton(initial.showroom.id);

    void warmShowroomCoordsCache(initial.showroom.id);
  } catch (error) {
    console.error(error);
  }
}

function addCaptchaToForms() {
  forms.forEach((form) => {
    const errorNode = document.createElement("p");
    errorNode.className = "form-captcha__error";
    errorNode.setAttribute("aria-live", "polite");
    errorNode.setAttribute("role", "status");

    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitButton) {
      form.insertBefore(errorNode, submitButton);
    } else {
      form.appendChild(errorNode);
    }

    formCaptchaState.set(form, {
      errorNode,
    });
  });
}

function setCaptchaError(form, message) {
  const state = formCaptchaState.get(form);
  if (!state?.errorNode) return;
  state.errorNode.textContent = message;
}

function loadRecaptchaScript() {
  if (window.grecaptcha?.execute) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Не удалось загрузить Google reCAPTCHA."));
    document.head.appendChild(script);
  });
}

async function initRecaptcha() {
  addCaptchaToForms();

  if (!recaptchaEnabled) {
    console.warn("reCAPTCHA отключена: не задан RECAPTCHA_SITE_KEY в app-config.js");
    return;
  }

  try {
    await loadRecaptchaScript();
    await new Promise((resolve) => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(resolve);
      } else {
        resolve();
      }
    });
    recaptchaReady = true;
  } catch (error) {
    console.error(error);
    forms.forEach((form) => {
      setCaptchaError(form, "Не удалось загрузить капчу. Проверьте подключение к Google.");
    });
  }
}

async function resolveRecaptchaToken(form) {
  if (!recaptchaEnabled) return "";

  if (!recaptchaReady || !window.grecaptcha?.execute) {
    setCaptchaError(form, "Капча еще загружается. Попробуйте через пару секунд.");
    return null;
  }

  try {
    const token = await window.grecaptcha.execute(recaptchaSiteKey, {
      action: RECAPTCHA_ACTION,
    });

    if (!token) {
      setCaptchaError(form, "Не удалось получить токен капчи. Попробуйте еще раз.");
      return null;
    }

    setCaptchaError(form, "");
    return token;
  } catch (error) {
    console.error(error);
    setCaptchaError(form, "Ошибка проверки капчи. Попробуйте еще раз.");
    return null;
  }
}

function validateFormConsent(form) {
  const consentCheckbox = form.querySelector('input[type="checkbox"][required]');

  if (!consentCheckbox) {
    setCaptchaError(form, "Отметьте согласие на обработку персональных данных.");
    return false;
  }

  if (!consentCheckbox.checked) {
    setCaptchaError(form, "Подтвердите согласие на обработку персональных данных.");
    consentCheckbox.focus();
    return false;
  }

  return true;
}

function validateFormSubmission(form) {
  if (!validateFormConsent(form)) {
    return false;
  }

  return true;
}

function resetFormCaptcha(form) {
  setCaptchaError(form, "");
}

function setupThanksModal() {
  if (!thanksModal) return;

  const modalBackdrop = thanksModal.querySelector(".thanks-modal__backdrop");
  const modalClose = thanksModal.querySelector(".thanks-modal__close");

  modalBackdrop?.addEventListener("click", closeThanksModal);
  modalClose?.addEventListener("click", closeThanksModal);
}

function setFormSubmitting(form, isSubmitting) {
  const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
  if (!submitButton) return;

  if (isSubmitting) {
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.removeAttribute("disabled");
  }
}

function getFormMeta(form) {
  if (form.id === "colorsRequestForm") {
    return {
      type: "samples_delivery",
      name: "Выбирайте дома",
    };
  }

  if (form.id === "promoRequestForm") {
    return {
      type: "promo_calc",
      name: "Рассчитать столешницу по акции",
    };
  }

  if (form.classList.contains("contacts-form")) {
    return {
      type: "contacts_message",
      name: "Напишите нам",
    };
  }

  if (form.classList.contains("selection-request-form")) {
    return {
      type: "selection_request",
      name: "Оставить заявку на расчет",
    };
  }

  if (form.classList.contains("express-calc-form")) {
    return {
      type: "express_calc",
      name: "Экспресс расчет",
    };
  }

  const localHeading = form.closest("section")?.querySelector("h3, h2")?.textContent?.trim();
  return {
    type: "generic_form",
    name: localHeading || "Форма на сайте",
  };
}

async function submitForm(form, recaptchaToken = "") {
  const formMeta = getFormMeta(form);
  const formData = new FormData(form);
  formData.append("form_type", formMeta.type);
  formData.append("form_name", formMeta.name);
  formData.append("page_url", window.location.href);
  if (recaptchaEnabled) {
    formData.append("g-recaptcha-response", recaptchaToken);
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Не удалось отправить заявку. Попробуйте снова.");
  }
}

function setupFormSubmitHandlers() {
  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!validateFormSubmission(form)) {
        return;
      }

      setCaptchaError(form, "");
      setFormSubmitting(form, true);

      try {
        const recaptchaToken = await resolveRecaptchaToken(form);
        if (recaptchaEnabled && !recaptchaToken) {
          return;
        }
        await submitForm(form, recaptchaToken || "");
        form.reset();
        resetFormCaptcha(form);
        if (colorsRequestNotice) colorsRequestNotice.textContent = "";
        if (promoRequestNotice) promoRequestNotice.textContent = "";
        openThanksModal();
      } catch (error) {
        setCaptchaError(form, error.message || "Ошибка отправки заявки. Попробуйте еще раз.");
      } finally {
        setFormSubmitting(form, false);
      }
    });
  });
}

function optimizeImageLoading() {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    if (!image.getAttribute("decoding")) {
      image.setAttribute("decoding", "async");
    }

    const isHighPriority = image.closest(".logo-card") || image.closest(".hero__top");
    if (!isHighPriority && !image.getAttribute("loading")) {
      image.setAttribute("loading", "lazy");
    }
  });
}

optimizeImageLoading();
renderSlide(currentSlide);
preloadHeroSlides();
runEntranceAnimation();
setupColorsGallery();
setupProjectsGallery();
setupCertificatesGallery();
setupHeroSlideActionLink();
setupMobileHeroBurger();
initShowroomsMapWhenVisible();
setupThanksModal();
setupFormSubmitHandlers();
initRecaptcha();
scheduleHeroAutoplay();

function handleHeroMediaChange() {
  renderSlide(currentSlide);
  scheduleHeroAutoplay();
  if (!mobileHeroMedia.matches && mobileNav?.classList.contains("is-open")) {
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    heroBurgerButton?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}

if (typeof mobileHeroMedia.addEventListener === "function") {
  mobileHeroMedia.addEventListener("change", handleHeroMediaChange);
  mobileHeroBackgroundMedia.addEventListener("change", handleHeroMediaChange);
} else if (typeof mobileHeroMedia.addListener === "function") {
  mobileHeroMedia.addListener(handleHeroMediaChange);
  mobileHeroBackgroundMedia.addListener(handleHeroMediaChange);
}
