const contactForm = document.getElementById('contact-form');
const popupOverlay = document.getElementById('popup-overlay');
const popupClose = document.getElementById('popup-close');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();

    if (!name || !email || !message) {
      alert('Per favore compila tutti i campi.');
      return;
    }

    if (popupOverlay) {
      popupOverlay.classList.remove('hidden');
    }

    contactForm.reset();
  });
}

if (popupClose && popupOverlay) {
  popupClose.addEventListener('click', () => {
    popupOverlay.classList.add('hidden');
  });
}

const introScreen = document.getElementById('intro-screen');
const sessionIntroKey = 'remiterIntroSeenThisSession';
const introChance = 0.45; // probabilità che l'intro venga mostrata all'apertura
if (introScreen) {
  const blockScroll = (event) => event.preventDefault();
  const finishIntro = () => {
    if (introScreen.classList.contains('hidden')) return;
    document.body.classList.remove('intro-active');
    document.body.classList.add('intro-hidden');
    introScreen.classList.add('hidden');
    sessionStorage.setItem(sessionIntroKey, 'true');
    setTimeout(() => introScreen.remove(), 700);
    window.removeEventListener('wheel', onScroll);
    window.removeEventListener('touchstart', onScroll);
    window.removeEventListener('touchmove', blockScroll, { passive: false });
  };

  const onScroll = () => finishIntro();
  const alreadySeen = sessionStorage.getItem(sessionIntroKey) === 'true';
  const shouldShowIntro = !alreadySeen && Math.random() < introChance;

  if (alreadySeen || !shouldShowIntro) {
    document.body.classList.add('intro-hidden');
    introScreen.remove();
    sessionStorage.setItem(sessionIntroKey, 'true');
  } else {
    document.body.classList.add('intro-active');
    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('touchstart', onScroll, { passive: true });
    window.addEventListener('touchmove', blockScroll, { passive: false });
  }
} else {
  document.body.classList.add('no-intro');
}
