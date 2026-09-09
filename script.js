/* =========================================================
   INTEL SUSTAINABILITY JOURNEY — SCRIPT
   1. Manual RTL toggle (demo button)
   2. LevelUp: Auto-detect language change & apply RTL
   3. Google Translate widget init
   4. Newsletter form validation + accessible success message
   5. Footer year
   ========================================================= */

/* -----------------------------
   1 & 2. RTL handling
   -----------------------------
   Bootstrap 5's CSS uses logical properties (start/end) rather than
   hardcoded left/right, so simply toggling the `dir` attribute on
   <html> is enough for Bootstrap-built sections (nav, pillars,
   newsletter form, footer, modals) to mirror correctly.
*/
function setPageDirection(dir) {
  const html = document.documentElement;
  html.setAttribute("dir", dir);

  const toggleBtn = document.getElementById("rtl-toggle");
  const toggleLabel = document.getElementById("rtl-toggle-label");
  if (!toggleBtn || !toggleLabel) return;

  if (dir === "rtl") {
    toggleLabel.textContent = "Switch to LTR (English)";
    toggleBtn.setAttribute("aria-pressed", "true");
  } else {
    toggleLabel.textContent = "Switch to RTL (Arabic demo)";
    toggleBtn.setAttribute("aria-pressed", "false");
  }
}

// Manual toggle button — lets anyone preview the RTL layout instantly.
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("rtl-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("dir") || "ltr";
      setPageDirection(current === "rtl" ? "ltr" : "rtl");
    });
  }
});

/* LevelUp — Auto-Detect Language & Adjust Layout (10 pts)
   Both Chrome's built-in "Translate this page" feature and the Google
   Website Translator widget below add a `translated-rtl` or
   `translated-ltr` class to <html> once translation finishes. We watch
   for that class change and flip our own `dir` attribute to match, so
   the layout automatically mirrors for RTL languages (Arabic, Hebrew,
   Persian, Urdu, etc.) and automatically reverts for LTR languages. */
const languageObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.attributeName !== "class") continue;

    const classes = document.documentElement.className;
    if (classes.includes("translated-rtl")) {
      setPageDirection("rtl");
    } else if (classes.includes("translated-ltr")) {
      setPageDirection("ltr");
    }
  }
});

languageObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

/* -----------------------------
   3. Google Translate widget
   ----------------------------- */
function googleTranslateElementInit() {
  if (typeof google === "undefined" || !google.translate) return;
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "ar,he,fa,ur,en,es,fr,de,zh-CN,ja",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element"
  );
}
// Expose globally since Google's script calls this by name via the `cb` param.
window.googleTranslateElementInit = googleTranslateElementInit;

/* -----------------------------
   4. Newsletter form validation
   ----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const successMessage = document.getElementById("newsletter-success");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      // Move focus to the first invalid field for keyboard/screen-reader users.
      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    form.classList.add("was-validated");
    if (successMessage) {
      successMessage.textContent =
        "Thanks for subscribing! Please check your inbox to confirm.";
    }
    form.reset();
    form.classList.remove("was-validated");
  });
});

/* -----------------------------
   5. Footer year
   ----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
