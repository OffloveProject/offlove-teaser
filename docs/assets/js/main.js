(function () {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const modal = document.querySelector("[data-modal]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalBody = document.querySelector("[data-modal-body]");
  const closeButtons = document.querySelectorAll("[data-modal-close]");
  const openModal = (title, body) => {
    if (!modal || !modalTitle || !modalBody) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const close = modal.querySelector("[data-modal-close]");
    if (close) close.focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  const boothText = {
    about: {
      title: "ABOUT",
      body: "『Offstage Love』は、芸能界に飛び込んだあなたが、仕事・成長・恋愛の三年間を歩む女性向けキャラクターIP型ライフシミュレーションです。"
    },
    game: {
      title: "GAME",
      body: "ゲーム版では、あなたが主人公です。名前を入力し、新人アーティストとして芸能界での毎日を選んでいきます。"
    },
    characters: {
      title: "CHARACTERS",
      body: "初期公開では、男性アイドルグループ・ラグティアの5名を、名前・役割・シルエット中心で紹介します。"
    },
    music: {
      title: "MUSIC",
      body: "ゲーム内では、ストーリーの記憶が楽曲として解放されていきます。現在、楽曲情報は準備中です。"
    },
    novel: {
      title: "NOVEL",
      body: "ノベル版は、同一IPを仕事と成長の物語として再編集する別媒体展開です。noteマガジンへの導線は公開後に有効化します。"
    },
    news: {
      title: "NEWS",
      body: "最新情報は、本サイトおよび公式SNSで順次お知らせします。"
    }
  };

  document.querySelectorAll("[data-booth]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-booth");
      const item = boothText[key];
      if (!item) return;
      openModal(item.title, `<p>${item.body}</p><p><a class="btn" href="/${key === "about" ? "#about" : key + "/"}">詳しく見る</a></p>`);
    });
  });

  const dialoguePop = document.querySelector("[data-dialogue]");
  const dialogueName = document.querySelector("[data-dialogue-name]");
  const dialogueText = document.querySelector("[data-dialogue-text]");
  document.querySelectorAll("[data-npc]").forEach((npc) => {
    npc.addEventListener("click", () => {
      const type = npc.getAttribute("data-npc");
      const lines = window.OFFSTAGE_LOVE?.npcLines?.[type] || [];
      if (!lines.length || !dialoguePop || !dialogueName || !dialogueText) return;
      const names = { fan: "来場者", staff: "会場スタッフ", industry: "業界関係者" };
      const line = lines[Math.floor(Math.random() * lines.length)];
      dialogueName.textContent = names[type] || "来場者";
      dialogueText.textContent = line;
      dialoguePop.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-note-link]").forEach((link) => {
    const url = window.OFFSTAGE_LOVE?.noteMagazineUrl;
    if (url) {
      link.setAttribute("href", url);
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-disabled");
      link.textContent = "noteマガジンへ";
    } else {
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-disabled");
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });
})();
