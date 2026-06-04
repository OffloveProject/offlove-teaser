(function () {
  const data = window.OFFSTAGE_TEASER_DATA;
  if (!data) return;

  const venueMap = document.querySelector(".venue-map");
  const venueScene = document.querySelector(".venue-scene");
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
  const boothButtons = document.querySelectorAll("[data-booth]");

  const npcState = {};
  let activeNpc = null;
  let activeBoothButton = null;

  const clearActiveBooth = () => {
    boothButtons.forEach((button) => button.classList.remove("is-active"));
    activeBoothButton = null;
  };

  const placeBoothPanel = (sourceButton) => {
    if (!venueMap || !venueScene || !boothPanel || !sourceButton) return;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const mapRect = venueMap.getBoundingClientRect();
    const sceneRect = venueScene.getBoundingClientRect();
    const buttonRect = sourceButton.getBoundingClientRect();
    const gap = isMobile ? 10 : 18;
    const panelWidth = isMobile
      ? Math.min(320, mapRect.width - 24)
      : Math.min(360, Math.max(280, mapRect.width - 48));
    const panelHeight = boothPanel.offsetHeight || 220;
    let left;
    let top;

    if (isMobile) {
      left = buttonRect.left + buttonRect.width / 2 - mapRect.left - panelWidth / 2;

      const belowTop = buttonRect.bottom - mapRect.top + gap;
      const aboveTop = buttonRect.top - mapRect.top - panelHeight - gap;
      const sceneBottom = sceneRect.bottom - mapRect.top;

      if (belowTop + panelHeight <= sceneBottom - 12) {
        top = belowTop;
        boothPanel.dataset.side = "below";
      } else {
        top = Math.max(12, aboveTop);
        boothPanel.dataset.side = "above";
      }

      left = Math.max(12, Math.min(left, mapRect.width - panelWidth - 12));
      top = Math.max(12, Math.min(top, sceneBottom - panelHeight - 12));
    } else {
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const sceneCenterX = sceneRect.left + sceneRect.width / 2;
      const showRight = buttonCenterX < sceneCenterX;

      if (showRight) {
        left = buttonRect.right - mapRect.left + gap;
        boothPanel.dataset.side = "right";
      } else {
        left = buttonRect.left - mapRect.left - panelWidth - gap;
        boothPanel.dataset.side = "left";
      }

      left = Math.max(24, Math.min(left, mapRect.width - panelWidth - 24));
      top = buttonRect.top - mapRect.top - 20;
      top = Math.max(24, Math.min(top, sceneRect.bottom - mapRect.top - panelHeight - 24));
    }

    boothPanel.style.setProperty("--panel-left", left + "px");
    boothPanel.style.setProperty("--panel-top", top + "px");
    boothPanel.style.setProperty("--panel-width", panelWidth + "px");
  };

  const closeBooth = () => {
    if (boothPanel) boothPanel.hidden = true;
    if (venueMap) venueMap.classList.remove("is-info-open");
    clearActiveBooth();
  };

  const closeDialogue = () => {
    if (advBox) advBox.hidden = true;
    if (venueMap) venueMap.classList.remove("is-dialogue-open");
    activeNpc = null;
  };

  const showBooth = (key, sourceButton) => {
    const booth = data.booths[key];
    if (!booth || !boothPanel || !boothLabel || !boothTitle || !boothBody || !boothLink) return;
    closeDialogue();
    clearActiveBooth();
    boothLabel.textContent = booth.label;
    boothTitle.textContent = booth.title;
    boothBody.textContent = booth.body;
    boothLink.textContent = "詳細を見る";
    boothLink.setAttribute("href", booth.href);
    boothPanel.hidden = false;
    if (venueMap) venueMap.classList.add("is-info-open");
    if (sourceButton) {
      sourceButton.classList.add("is-active");
      activeBoothButton = sourceButton;
      placeBoothPanel(sourceButton);
    }
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
    if (venueMap) venueMap.classList.add("is-dialogue-open");
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
      if (key) showBooth(key, button);
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

  window.addEventListener("resize", () => {
    if (activeBoothButton && boothPanel && !boothPanel.hidden) {
      placeBoothPanel(activeBoothButton);
    }
  });
})();
