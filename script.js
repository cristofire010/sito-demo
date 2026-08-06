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
