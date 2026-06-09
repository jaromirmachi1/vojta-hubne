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
      return { title: fallbackTitle, type: "" };
    }
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

    const wrap = document.createElement("section");
    wrap.id = FILTER_ID;
    wrap.className = "vh-collection-filter";
    wrap.setAttribute("aria-label", "Filtrovat produkty podle kategorie");

    const eyebrow = document.createElement("p");
    eyebrow.className = "vh-collection-filter__eyebrow";
    eyebrow.textContent = "Kategorie";

    const chips = document.createElement("div");
    chips.className = "vh-collection-filter__chips";
    chips.setAttribute("role", "list");

    const allButton = createFilterButton("Vše", ALL_CATEGORY, totalCount, true);
    chips.append(allButton);

    categories.forEach(({ label, slug, count }) => {
      chips.append(createFilterButton(label, slug, count, false));
    });

    wrap.append(eyebrow, chips);
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
    scrollCollectionToTop();
  }

  function scheduleReset() {
    refreshCollectionPage();
    [0, 50, 150, 350, 700].forEach((delay) => {
      window.setTimeout(refreshCollectionPage, delay);
    });
    requestAnimationFrame(() => {
      refreshCollectionPage();
      requestAnimationFrame(refreshCollectionPage);
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
