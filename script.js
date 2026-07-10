const rtlLanguages = ["ar", "he", "fa", "ur", "ps", "sd", "ku", "yi"];

function applyDirectionByLanguage() {
  const lang = document.documentElement.lang || "en";
  const shortLang = lang.toLowerCase().split("-")[0];

  if (rtlLanguages.includes(shortLang)) {
    document.documentElement.setAttribute("dir", "rtl");
    document.body.classList.add("rtl-layout");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl-layout");
  }
}

applyDirectionByLanguage();

const observer = new MutationObserver(() => {
  applyDirectionByLanguage();
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"]
});