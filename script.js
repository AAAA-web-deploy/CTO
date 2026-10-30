(() => {
  'use strict';
  const config = window.CTO_CONFIG || {};
  const notice = document.querySelector('#site-toast');
  let toastTimer = 0;

  function showToast(message) {
    if (!notice) return;
    notice.textContent = message;
    notice.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => notice.classList.remove('visible'), 4100);
  }

  const mobileMenu = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-navigation');
  function closeMenu() {
    if (!mobileMenu || !mobileNav) return;
    mobileMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
  }
  mobileMenu?.addEventListener('click', () => {
    const nextOpen = mobileMenu.getAttribute('aria-expanded') !== 'true';
    mobileMenu.setAttribute('aria-expanded', String(nextOpen));
    mobileMenu.setAttribute('aria-label', nextOpen ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !nextOpen;
  });
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });

  const isValidEthCA = value => /^0x[a-fA-F0-9]{40}$/.test(value || '');
  const contract = config.ethereumContract && String(config.ethereumContract).trim();
  const caIsLive = isValidEthCA(contract);
  const addressDisplay = document.querySelector('#contract-address');
  if (caIsLive && addressDisplay) addressDisplay.textContent = contract;

  // Only allow approved https external destinations; never construct a trade URL.
  const safeDestination = value => {
    if (!value || typeof value !== 'string') return null;
    try {
      const dest = new URL(value);
      return dest.protocol === 'https:' ? dest.href : null;
    } catch { return null; }
  };
  const actions = {
    'buy': () => {
      const url = caIsLive && safeDestination(config.buyUrl);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      else showToast('Trading is coming soon. No verified Ethereum contract is published yet.');
    },
    'chart': () => {
      const url = caIsLive && safeDestination(config.chartUrl);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      else showToast('The chart is coming soon. Check back after the contract is verified.');
    },
    'x': () => {
      const url = safeDestination(config.xUrl);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
      else showToast('The community X account is coming soon.');
    },
    'copy-contract': async () => {
      if (!caIsLive) {
        showToast('Contract address coming soon. Never trust an unverified CA.');
        return;
      }
      try {
        await navigator.clipboard.writeText(contract);
        showToast('Verified Ethereum contract address copied.');
      } catch {
        showToast('Copy unavailable in this browser. Select the address above to copy manually.');
      }
    }
  };
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => actions[button.dataset.action]?.());
  });

  const dialog = document.querySelector('#image-lightbox');
  const dialogImage = document.querySelector('#lightbox-img');
  const dialogTitle = document.querySelector('#lightbox-title');
  const closeDialog = document.querySelector('#lightbox-close');
  let imageOpener = null;
  document.querySelectorAll('button.media-open').forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog || !dialogImage || !dialogTitle) return;
      imageOpener = button;
      const sourceImage = button.querySelector('img');
      dialogImage.src = button.dataset.image;
      dialogImage.alt = sourceImage?.alt || 'Enlarged incident file';
      dialogTitle.textContent = button.dataset.caption || 'INCIDENT FILE';
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });
  closeDialog?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    dialogImage?.removeAttribute('src');
    imageOpener?.focus();
  });
})();
