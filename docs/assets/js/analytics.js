(function () {
  var GA_MEASUREMENT_ID = window.OFFSTAGE_LOVE_GA_ID || "G-KM4SFPPFDT";
  if (!GA_MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  var alreadyLoaded = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (!alreadyLoaded) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
})();
