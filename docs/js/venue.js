(function () {
  const data = window.OFFSTAGE_TEASER_DATA;
  if (!data) return;

  const advBox = document.querySelector("[data-adv-box]");
  const advName = document.querySelector("[data-adv-name]");
  const advText = document.querySelector("[data-adv-text]");
  const advClose = document.querySelector("[data-adv-close]");
  const advNext = document.querySelector("[data-adv-next]");

  const boothPanel = document.querySelector("[data-booth-panel]");
  const boothLabel = document.querySelector("[data-booth-label]");
  const boothTitle = document.querySelector("[data-booth-title]");
  const boothBody = document.querySelector("[data-booth-body]");
  const boothLink = document.querySelector("[data-booth-link]");
  const boothClose = document.querySelector("[data-booth-close]");

  const npcState = {};
  let activeNpc = null;

  const closeBooth = () => {
    if (boothPanel) boothPanel.hidden = true;
  };

  const closeDialogue = () => {
    if (advBox) advBox.hidden = true;
    activeNpc = null;
  };

  const showBooth = (key) => {
    const booth = data.booths[key];
    if (!booth || !boothPanel || !boothLabel || !boothTitle || !boothBody || !boothLink) return;
    closeDialogue();
    boothLabel.textContent = booth.label;
    boothTitle.textContent = booth.title;
    boothBody.textContent = booth.body;
    boothLink.textContent = "詳細を見る";
    boothLink.setAttribute("href", booth.href);
    boothPanel.hidden = false;
    if (boothClose) boothClose.focus();
  };

  const renderNpcLine = (key) => {
    const npc = data.npcs[key];
    if (!npc || !npc.lines || !npc.lines.length || !advBox || !advName || !advText) return;
    const index = npcState[key] || 0;
    advName.textContent = npc.name;
    advText.textContent = "「" + npc.lines[index % npc.lines.length] + "」";
    npcState[key] = index + 1;
    advBox.hidden = false;
  };

  const showNpc = (key) => {
    if (!data.npcs[key]) return;
    closeBooth();
    activeNpc = key;
    renderNpcLine(key);
  };

  document.querySelectorAll("[data-booth]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-booth");
      if (key) showBooth(key);
    });
  });

  document.querySelectorAll("[data-npc]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-npc");
      if (key) showNpc(key);
    });
  });

  if (advNext) {
    advNext.addEventListener("click", () => {
      if (activeNpc) renderNpcLine(activeNpc);
    });
  }

  if (advClose) advClose.addEventListener("click", closeDialogue);
  if (boothClose) boothClose.addEventListener("click", closeBooth);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDialogue();
      closeBooth();
    }
  });
})();
