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

  function refreshCollectionPage() {
    resetAll();
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
