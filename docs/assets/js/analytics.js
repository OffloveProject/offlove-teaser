(function () {
  // Google Analyticsを使用する場合は、下記に測定IDを設定してください。
  // 例: window.OFFSTAGE_LOVE_GA_ID = "G-XXXXXXXXXX";
  window.OFFSTAGE_LOVE_GA_ID = window.OFFSTAGE_LOVE_GA_ID || "";
  const id = window.OFFSTAGE_LOVE_GA_ID;
  if (!id) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);
})();
