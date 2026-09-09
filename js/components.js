const FORM_ENDPOINT = "https://formspree.io/f/xovdjbqr";
const PRODUCT_HOVER_DELAY_MS = 1500;

const NAV_TEMPLATE = `
  <header class="site-nav" data-nav-root>
    <div class="shell site-nav-bar">
      <a class="site-mark" href="index.html" aria-label="Venoa Foods home">
        <img src="assets/logos/venoa-logo.png" alt="Venoa Foods logo">
        <span class="site-mark-copy">
          <strong>Venoa Foods</strong>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-links" data-nav-toggle>
        <span></span>
        <span></span>
        <span></span>
        <span class="sr-only">Toggle navigation</span>
      </button>
      <nav class="nav-links" id="site-nav-links" aria-label="Primary">
        <a href="products.html">Product</a>
        <a href="services.html">Services</a>
        <a href="about.html">Our Story</a>
        <a href="contact.html">Contact</a>
        <a class="btn btn-primary nav-action" href="contact.html#contact-form">Request Sample</a>
      </nav>
    </div>
  </header>
`;

const FOOTER_TEMPLATE = `
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-grid">
        <section>
          <h3>Venoa Foods</h3>
          <p>Premium frozen Asian foods for retail, restaurant, and wholesale programs.</p>
        </section>
        <section>
          <h4>Sitemap</h4>
          <p><a href="index.html">Home</a><br><a href="products.html">Product</a><br><a href="services.html">Services</a><br><a href="about.html">Our Story</a><br><a href="contact.html">Contact</a></p>
        </section>
        <section>
          <h4>US Office</h4>
          <p>Seattle, Washington<br>Sales routing for wholesale and grocery partners<br><a href="mailto:sales@venoafoods.com">sales@venoafoods.com</a></p>
        </section>
        <section>
          <h4>Global HQ</h4>
          <p>Export manufacturing operations across Asia<br>HACCP managed lines and private-label programs<br><a href="privacy.html">Privacy Policy</a></p>
        </section>
      </div>
      <div class="footer-bottom">© 2026 Venoa Foods. Built for wholesale growth in the United States.</div>
    </div>
  </footer>
`;

const MODAL_TEMPLATE = `
  <dialog class="lead-dialog" aria-labelledby="lead-modal-title" data-lead-dialog>
    <div class="dialog-card">
      <div class="dialog-head">
        <div>
          <p class="eyebrow">Lead Intake</p>
          <h2 id="lead-modal-title">Request a sample or catalog</h2>
        </div>
        <button class="dialog-close" type="button" aria-label="Close dialog" data-close-modal>×</button>
      </div>
      <p>Route your inquiry to the right team in one step. Use the contact form for custom projects, price discovery, or sample box requests.</p>
      <ul class="dialog-list">
        <li>Sample box requests for category review</li>
        <li>Wholesale line sheets and catalog distribution</li>
        <li>Private label and R&D project intake</li>
      </ul>
      <div class="dialog-actions">
        <a class="btn btn-primary" href="contact.html">Open contact form</a>
        <a class="btn btn-secondary" href="products.html">Browse products</a>
      </div>
    </div>
  </dialog>
`;

function mountSharedUi() {
  const navMount = document.querySelector("[data-site-nav]");
  const footerMount = document.querySelector("[data-site-footer]");
  const modalMount = document.querySelector("[data-lead-modal]");

  if (navMount) navMount.innerHTML = NAV_TEMPLATE;
  if (footerMount) footerMount.innerHTML = FOOTER_TEMPLATE;
  if (modalMount) modalMount.innerHTML = MODAL_TEMPLATE;
}

function initNav() {
  const nav = document.querySelector("[data-nav-root]");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!nav || !toggle) return;

  const currentPage = document.body.dataset.page ||
    window.location.pathname.split("/").filter(Boolean).pop()?.replace(/\.html$/, "") || "index";
  nav.querySelectorAll(".nav-links a:not(.nav-action)").forEach((link) => {
    const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop().replace(/\.html$/, "");
    if (linkPage === currentPage) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const syncSolid = () => {
    nav.classList.toggle("is-solid", window.scrollY > 12);
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  nav.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", closeNav));
  nav.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
      toggle.focus();
    }
  });
  window.matchMedia("(max-width: 1180px)").addEventListener("change", closeNav);

  syncSolid();
  window.addEventListener("scroll", syncSolid, { passive: true });
}

function initModal() {
  const dialog = document.querySelector("[data-lead-dialog]");
  if (!dialog) return;

  const openers = document.querySelectorAll("[data-open-modal]");
  const closers = dialog.querySelectorAll("[data-close-modal]");
  const focusableSelector = "a[href], button:not([disabled]), textarea, input, select";
  let lastFocused = null;

  const trapFocus = (event) => {
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll(focusableSelector)];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openDialog = () => {
    lastFocused = document.activeElement;
    if (!dialog.open) dialog.showModal();
    const firstTarget = dialog.querySelector("[data-close-modal]");
    if (firstTarget) firstTarget.focus();
  };

  const closeDialog = () => {
    dialog.close();
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  openers.forEach((button) => button.addEventListener("click", openDialog));
  closers.forEach((button) => button.addEventListener("click", closeDialog));

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!clickedInDialog) closeDialog();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }
    trapFocus(event);
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const inquiryType = form.querySelector("#inquiryType");
  const detailsField = form.querySelector("[data-project-details]");
  const status = form.querySelector("[data-form-status]");

  const syncDetailsField = () => {
    const shouldShow = inquiryType.value === "custom-quote";
    detailsField.hidden = !shouldShow;
    const textarea = detailsField.querySelector("textarea");
    textarea.required = shouldShow;
  };

  inquiryType.addEventListener("change", syncDetailsField);
  syncDetailsField();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending inquiry...";

    try {
      const formData = new FormData(form);
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      syncDetailsField();
      status.textContent = "Inquiry submitted. The Venoa sales team will follow up shortly.";
    } catch (error) {
      status.textContent = "Submission could not be completed. Email sales@venoafoods.com to route the lead manually.";
    }
  });
}

function initProductGalleries() {
  document.querySelectorAll("[data-product-gallery]").forEach((card) => {
    const slides = [...card.querySelectorAll("[data-product-slide]")];
    const counter = card.querySelector("[data-image-count]");
    const picture = card.querySelector(".product-gallery");
    if (slides.length < 2) return;
    let current = 0;
    let request = 0;
    let hoverTimer;

    const cancelHover = () => {
      clearTimeout(hoverTimer);
      hoverTimer = undefined;
    };

    const show = async (index) => {
      current = (index + slides.length) % slides.length;
      const target = current;
      const latestRequest = ++request;
      try {
        await slides[target].decode();
      } catch {
        return;
      }
      if (latestRequest !== request) return;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === target);
        slide.style.transform = `translateX(${(i - target) * 100}%)`;
        slide.setAttribute("aria-hidden", String(i !== target));
      });
      counter.textContent = `${current + 1} / ${slides.length}`;
    };

    picture.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      cancelHover();
      hoverTimer = setTimeout(() => {
        if (!card.hidden) show(1);
      }, PRODUCT_HOVER_DELAY_MS);
    });
    picture.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      cancelHover();
      show(0);
    });
    const manualAdvance = (direction) => {
      cancelHover();
      show(current + direction);
    };
    card.querySelector("[data-image-prev]").addEventListener("click", () => manualAdvance(-1));
    card.querySelector("[data-image-next]").addEventListener("click", () => manualAdvance(1));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      manualAdvance(event.key === "ArrowRight" ? 1 : -1);
    });
    show(0);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountSharedUi();
  initNav();
  initModal();
  initContactForm();
  initProductGalleries();
});
