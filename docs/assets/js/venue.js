(function () {
  const data = window.OFFSTAGE_TEASER_DATA;
  if (!data) return;

  const advBox = document.querySelector("[data-adv-box]");
  const advName = document.querySelector("[data-adv-name]");
  const advText = document.querySelector("[data-adv-text]");
  const boothPanel = document.querySelector("[data-booth-panel]");
  const boothLabel = document.querySelector("[data-booth-label]");
  const boothTitle = document.querySelector("[data-booth-title]");
  const boothBody = document.querySelector("[data-booth-body]");
  const boothLink = document.querySelector("[data-booth-link]");

  const npcState = {};

  const showBooth = (key) => {
    const booth = data.booths[key];
    if (!booth || !boothPanel || !boothLabel || !boothTitle || !boothBody || !boothLink) return;
    boothLabel.textContent = booth.label;
    boothTitle.textContent = booth.title;
    boothBody.textContent = booth.body;
    boothLink.textContent = "詳細を見る";
    boothLink.setAttribute("href", booth.href);
    boothPanel.hidden = false;
  };

  const showNpcLine = (key) => {
    const npc = data.npcs[key];
    if (!npc || !npc.lines || !npc.lines.length || !advBox || !advName || !advText) return;
    const currentIndex = npcState[key] || 0;
    const nextLine = npc.lines[currentIndex % npc.lines.length];
    npcState[key] = currentIndex + 1;
    advName.textContent = npc.name;
    advText.textContent = "「" + nextLine + "」";
    advBox.hidden = false;
  };

  document.querySelectorAll("[data-booth]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-booth");
      if (!key) return;
      showBooth(key);
    });
  });

  document.querySelectorAll("[data-npc]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-npc");
      if (!key) return;
      showNpcLine(key);
    });
  });
})();
