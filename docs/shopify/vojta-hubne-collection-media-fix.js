/**
 * Reset Horizon collection card media after browser back / view transitions.
 *
 * Horizon uses: main .product-grid > product-card > .card-gallery > a.contents > slideshow...
 * There is NO .collection wrapper — do not use main .collection in selectors.
 *
 * Load in layout/theme.liquid before </body>:
 * <script src="{{ 'vojta-hubne-collection-media-fix.js' | asset_url }}" defer="defer"></script>
 */
(function () {
  const CARD_LINK_SELECTOR =
    "main .card-gallery a.contents[aria-label], main .product-grid a.contents[aria-label]";
  const RECOMMENDATION_CARD_LINK_SELECTOR =
    ".product-recommendations .card-gallery a.contents[aria-label], product-recommendations .card-gallery a.contents[aria-label]";
  const GRID_ITEM_SELECTOR = "main .product-grid > .product-grid__item";
  const FILTER_ID = "vh-collection-category-filter";
  const ALL_CATEGORY = "__all";
  let categoryFilterSetupPending = false;

  const RESET_TARGETS = [
    "slideshow-component",
    "slideshow-container",
    "slideshow-slides",
    "slideshow-slide",
  ];

  const VIEW_TRANSITION_PROPS = [
    "--grid-template-rows",
    "--grid-template-rows-desktop",
    "--product-media-fit",
    "--slide-min-height",
    "--slide-min-height-desktop",
  ];

  function resetCard(link) {
    RESET_TARGETS.forEach((selector) => {
      link.querySelectorAll(selector).forEach((node) => {
        VIEW_TRANSITION_PROPS.forEach((property) => {
          node.style.removeProperty(property);
        });
      });
    });

    const slidesWrap = link.querySelector("slideshow-slides");
    if (!slidesWrap) return;

    const slides = [...slidesWrap.querySelectorAll(":scope > slideshow-slide")];
    slides.forEach((slide, index) => {
      if (index === 0) {
        slide.removeAttribute("aria-hidden");
        slide.hidden = false;
      } else {
        slide.setAttribute("aria-hidden", "true");
        slide.hidden = true;
      }
    });
  }

  function isCollectionPage() {
    const main = document.querySelector("main");
    if (main?.dataset?.template !== "collection") return false;
    return window.location.pathname.includes("/collections/");
  }

  function scrollCollectionToTop() {
    if (!isCollectionPage()) return;

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function resetAll() {
    if (!isCollectionPage()) return;
    document.querySelectorAll(CARD_LINK_SELECTOR).forEach(resetCard);
  }

  function resetRecommendationCards() {
    document
      .querySelectorAll(RECOMMENDATION_CARD_LINK_SELECTOR)
      .forEach(resetCard);
  }

  function setupRecommendationCards() {
    const recommendations = document.querySelector(
      "product-recommendations, .product-recommendations",
    );
    if (!recommendations) return;

    resetRecommendationCards();
    setupClubHighlights(recommendations);

    const observer = new MutationObserver(() => {
      resetRecommendationCards();
      setupClubHighlights(recommendations);
    });
    observer.observe(recommendations, { childList: true, subtree: true });
  }

  function getProductLink(card) {
    return (
      card.querySelector(".card-gallery a.contents[href*='/products/']") ||
      card.querySelector(".product-card__link[href*='/products/']") ||
      card.querySelector("a[href*='/products/']")
    );
  }

  function getProductTitle(card) {
    const title =
      card.querySelector(".product-card__link .visually-hidden")?.textContent ||
      getProductLink(card)?.getAttribute("aria-label") ||
      card.querySelector("[class*='title']")?.textContent ||
      "";

    return title.trim();
  }

  function getProductJsonUrl(link) {
    if (!link) return null;

    const url = new URL(link.getAttribute("href"), window.location.origin);
    if (!url.pathname.includes("/products/")) return null;

    return `${url.pathname}.js`;
  }

  async function getProductData(card) {
    const link = getProductLink(card);
    const productJsonUrl = getProductJsonUrl(link);
    const fallbackTitle = getProductTitle(card);

    if (!productJsonUrl) {
      return { title: fallbackTitle, type: "" };
    }

    try {
      const response = await fetch(productJsonUrl, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Product JSON unavailable");

      const product = await response.json();
      return {
        title: product.title || fallbackTitle,
        type: product.type || "",
        tags: Array.isArray(product.tags) ? product.tags : [],
      };
    } catch {
      return { title: fallbackTitle, type: "", tags: [] };
    }
  }

  function hasClubTag(tags) {
    if (!Array.isArray(tags)) return false;

    return tags.some((value) => {
      const normalized = String(value)
        .trim()
        .toLowerCase()
        .replace(/_/g, "-");
      return normalized === "vh-club";
    });
  }

  function applyClubHighlight(card, product) {
    if (!hasClubTag(product.tags)) return;

    card.classList.add("vh-card--club");
    card.dataset.vhClub = "1";

    const productCard = card.matches?.("product-card")
      ? card
      : card.querySelector("product-card");
    if (productCard) {
      productCard.classList.add("vh-card--club");
    }

    if (card.querySelector(".vh-club-badge")) return;

    const badge = document.createElement("div");
    badge.className =
      "vh-club-badge product-badges__badge product-badges__badge--rectangle";
    badge.textContent = "Jen pro členy VH Clubu";

    const gallery =
      card.querySelector(".card-gallery") ||
      productCard?.querySelector(".card-gallery");

    if (gallery) {
      let badges = gallery.querySelector(".product-badges");
      if (!badges) {
        badges = document.createElement("div");
        badges.className =
          "product-badges product-badges--top-right vh-club-badges";
        gallery.appendChild(badges);
      } else {
        badges.classList.add("product-badges--top-right");
      }
      badges.prepend(badge);
      return;
    }

    const info =
      card.querySelector(
        ".product-card__content, .product-card__info, .card__content, .card__information",
      ) || productCard;

    if (info) {
      info.appendChild(badge);
      return;
    }

    card.appendChild(badge);
  }

  async function setupClubHighlights(root = document) {
    const cards = [
      ...root.querySelectorAll(GRID_ITEM_SELECTOR),
      ...root.querySelectorAll(
        "main .product-grid product-card, product-recommendations product-card, .product-recommendations product-card",
      ),
    ];

    const unique = [...new Set(cards)];

    await Promise.all(
      unique.map(async (card) => {
        if (card.dataset.vhClubChecked === "1") return;
        card.dataset.vhClubChecked = "1";

        const product = await getProductData(card);
        applyClubHighlight(card, product);
      }),
    );
  }

  function readCategoryTag(tags) {
    if (!Array.isArray(tags)) return "";

    const tag = tags.find((value) => {
      const normalized = String(value).toLowerCase();
      return (
        normalized.startsWith("vh-filter|") ||
        normalized.startsWith("vh-category|")
      );
    });

    return tag ? String(tag).split("|").slice(1).join("|").trim() : "";
  }

  function getDisplayCategory(product) {
    const explicitCategory = readCategoryTag(product.tags);
    if (explicitCategory) return explicitCategory;

    const title = String(product.title || "").toLowerCase();
    const type = String(product.type || "").trim();

    if (title.includes("lean shake")) return "Proteinové doplňky";
    if (title.includes("balíček") || title.includes("balicek"))
      return "Balíčky";
    if (
      title.includes("cream") ||
      title.includes("krém") ||
      title.includes("ghk") ||
      title.includes("antiage")
    ) {
      return "Péče o tělo";
    }
    if (
      title.includes("aquamin") ||
      title.includes("d3") ||
      title.includes("vápník") ||
      title.includes("vapnik") ||
      title.includes("glp-1 support")
    ) {
      return "Vitamíny a doplňky";
    }

    return type || "Ostatní";
  }

  function normalizeCategory(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function getCollectionCards() {
    return [...document.querySelectorAll(GRID_ITEM_SELECTOR)];
  }

  function updateResultsCount(visibleCount, totalCount) {
    const countNode = document.querySelector(
      "main .products-count-wrapper [role='status']",
    );
    if (!countNode) return;

    countNode.textContent =
      visibleCount === totalCount
        ? `${totalCount} polož.`
        : `${visibleCount} z ${totalCount} polož.`;
  }

  function applyCategoryFilter(categorySlug) {
    const cards = getCollectionCards();
    const showAll = !categorySlug || categorySlug === ALL_CATEGORY;
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = showAll || card.dataset.vhCategorySlug === categorySlug;
      card.hidden = !matches;
      card.classList.toggle("vh-collection-card--hidden", !matches);
      if (matches) visibleCount += 1;
    });

    const totalCount = cards.length;
    updateResultsCount(visibleCount, totalCount);

    document
      .querySelectorAll(`#${FILTER_ID} [data-vh-category]`)
      .forEach((button) => {
        const isActive =
          button.dataset.vhCategory === (categorySlug || ALL_CATEGORY);
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
  }

  function buildFilter(categories, totalCount) {
    const existing = document.getElementById(FILTER_ID);
    if (existing) existing.remove();

    if (categories.length < 2) return null;

    const chipsId = `${FILTER_ID}-chips`;

    const wrap = document.createElement("section");
    wrap.id = FILTER_ID;
    wrap.className = "vh-collection-filter is-collapsed";
    wrap.setAttribute("aria-label", "Filtrovat produkty podle kategorie");

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "vh-collection-filter__toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", chipsId);

    const eyebrow = document.createElement("span");
    eyebrow.className = "vh-collection-filter__eyebrow";
    eyebrow.textContent = "Kategorie";

    const chevron = document.createElement("span");
    chevron.className = "vh-collection-filter__chevron";
    chevron.setAttribute("aria-hidden", "true");

    toggle.append(eyebrow, chevron);
    toggle.addEventListener("click", () => {
      const collapsed = wrap.classList.toggle("is-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
    });

    const chips = document.createElement("div");
    chips.id = chipsId;
    chips.className = "vh-collection-filter__chips";
    chips.setAttribute("role", "list");

    const allButton = createFilterButton("Vše", ALL_CATEGORY, totalCount, true);
    chips.append(allButton);

    categories.forEach(({ label, slug, count }) => {
      chips.append(createFilterButton(label, slug, count, false));
    });

    wrap.append(toggle, chips);
    return wrap;
  }

  function createFilterButton(label, slug, count, active) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `vh-collection-filter__chip${active ? " is-active" : ""}`;
    button.dataset.vhCategory = slug;
    button.setAttribute("aria-pressed", String(active));

    const text = document.createElement("span");
    text.textContent = label;

    const counter = document.createElement("small");
    counter.textContent = String(count);

    button.append(text, counter);
    button.addEventListener("click", () => applyCategoryFilter(slug));
    return button;
  }

  function placeFilter(filter) {
    if (!filter) return;

    const facets = document.querySelector("main .facets-block-wrapper");
    const collectionWrapper = document.querySelector(
      "main .collection-wrapper",
    );
    const results = document.querySelector("main #ResultsList");

    if (facets) {
      facets.insertAdjacentElement("beforebegin", filter);
      return;
    }

    if (collectionWrapper) {
      collectionWrapper.prepend(filter);
      return;
    }

    if (results) {
      results.insertAdjacentElement("beforebegin", filter);
    }
  }

  async function setupCategoryFilters() {
    if (!isCollectionPage()) return;
    if (!window.location.pathname.includes("/collections/all")) return;
    if (categoryFilterSetupPending) return;

    const cards = getCollectionCards();
    if (!cards.length) return;
    if (
      document.getElementById(FILTER_ID) &&
      cards.every((card) => card.dataset.vhCategorySlug)
    ) {
      return;
    }

    categoryFilterSetupPending = true;
    await Promise.all(
      cards.map(async (card) => {
        if (card.dataset.vhCategorySlug) return;

        const product = await getProductData(card);
        const category = getDisplayCategory(product);
        card.dataset.vhCategory = category;
        card.dataset.vhCategorySlug = normalizeCategory(category);
        applyClubHighlight(card, product);
        card.dataset.vhClubChecked = "1";
      }),
    );

    const grouped = new Map();
    cards.forEach((card) => {
      const label = card.dataset.vhCategory || "Ostatní";
      const slug = card.dataset.vhCategorySlug || normalizeCategory(label);
      const current = grouped.get(slug) || { label, slug, count: 0 };
      current.count += 1;
      grouped.set(slug, current);
    });

    const categories = [...grouped.values()].sort((a, b) =>
      a.label.localeCompare(b.label, "cs"),
    );
    const filter = buildFilter(categories, cards.length);
    placeFilter(filter);
    applyCategoryFilter(ALL_CATEGORY);
    categoryFilterSetupPending = false;
  }

  function refreshCollectionPage() {
    resetAll();
    setupCategoryFilters();
    setupClubHighlights();
    scrollCollectionToTop();
  }

  function scheduleReset() {
    refreshCollectionPage();
    setupRecommendationCards();
    resetRecommendationCards();
    setupClubHighlights();
    [0, 50, 150, 350, 700, 1200].forEach((delay) => {
      window.setTimeout(() => {
        refreshCollectionPage();
        resetRecommendationCards();
        setupClubHighlights();
      }, delay);
    });
    requestAnimationFrame(() => {
      refreshCollectionPage();
      resetRecommendationCards();
      setupClubHighlights();
      requestAnimationFrame(() => {
        refreshCollectionPage();
        resetRecommendationCards();
        setupClubHighlights();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleReset, {
      once: true,
    });
  } else {
    scheduleReset();
  }

  window.addEventListener("pageshow", scheduleReset);
  window.addEventListener("popstate", scheduleReset);
  document.addEventListener("shopify:section:load", scheduleReset);
})();
