const flower = document.querySelector(".flower-art");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (flower && !reducedMotion) {
      window.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const bounds = flower.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
        flower.style.setProperty("--move-x", `${x * 13}px`);
        flower.style.setProperty("--move-y", `${y * 13}px`);
      });
      document.addEventListener("pointerleave", () => {
        flower.style.setProperty("--move-x", "0px");
        flower.style.setProperty("--move-y", "0px");
      });
    }

    const revealItems = document.querySelectorAll(".fade-in");
    if ("IntersectionObserver" in window && !reducedMotion) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const quotes = [
      {
        text: "La interpretación de los sueños es la vía regia hacia el conocimiento de lo inconsciente.",
        author: "Sigmund Freud · La interpretación de los sueños"
      },
      {
        text: "Donde estaba el ello, debe advenir el yo.",
        author: "Sigmund Freud · Nuevas conferencias de introducción al psicoanálisis"
      },
      {
        text: "La ciencia moderna aún no ha producido un medicamento tranquilizador tan eficaz como lo son unas pocas palabras bondadosas.",
        author: "Sigmund Freud · Atribuida a Sigmund Freud"
      }
    ];
    const quoteText = document.querySelector("#quote-text");
    const quoteAuthor = document.querySelector("#quote-author");
    const quoteButton = document.querySelector("#quote-next");
    let quoteIndex = 0;

    quoteButton.addEventListener("click", () => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteText.textContent = quotes[quoteIndex].text;
      quoteAuthor.textContent = quotes[quoteIndex].author;
    });
