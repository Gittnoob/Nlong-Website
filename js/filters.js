function initProductFilters() {
  const filterBar = document.querySelector("[data-filter-bar]");
  if (!filterBar) return;

  const buttons = [...filterBar.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll("[data-product-type]")];
  const emptyState = document.querySelector("[data-filter-empty]");

  const applyFilter = (filter) => {
    buttons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    cards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.productType === filter;
      card.hidden = !isVisible;
    });

    if (emptyState) {
      emptyState.hidden = cards.some((card) => !card.hidden);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  applyFilter("all");
}

function initProductScrollFade() {
  const filterBar = document.querySelector("[data-filter-bar]");
  const grid = document.querySelector(".product-grid");
  if (!filterBar || !grid) return;
  let framePending = false;

  const update = () => {
    framePending = false;
    const filterBottom = filterBar.getBoundingClientRect().bottom;
    const gridTop = grid.getBoundingClientRect().top;
    const overlap = Math.max(0, filterBottom - gridTop);
    grid.style.setProperty("--product-clip-top", `${overlap}px`);
    grid.classList.toggle("is-scroll-masked", overlap > 0);
  };

  const scheduleUpdate = () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  const observer = new ResizeObserver(scheduleUpdate);
  observer.observe(filterBar);
  observer.observe(grid);
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  initProductFilters();
  initProductScrollFade();
});
