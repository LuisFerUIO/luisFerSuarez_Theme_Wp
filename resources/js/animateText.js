export function animateText() {
  let textRevealRadius = 100;
  const textRevealPercent = 0.17; // porcentaje del ancho del viewport
  const upperAndLowerCase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const getRandomLetter = () =>
    upperAndLowerCase[Math.round(upperAndLowerCase.length * Math.random())];

  let pageX = 0;
  let pageY = 0;
  let scrollY = pageYOffset;
  let scrollX = pageXOffset;

  let charData;
  let st;

  function handleResize() {
    textRevealRadius = innerWidth * textRevealPercent;
    updateCharData();
  }

  function updateCharData() {
    charData = st.chars.map((char) => {
      const bounds = char.getBoundingClientRect();
      return {
        el: char,
        pageY: bounds.top + scrollY + bounds.height / 2,
        pageX: bounds.left + pageXOffset + bounds.width / 2,
        isVisible: false,
      };
    });
  }

  function updateText(e) {
    if ('pageY' in e) {
      pageX = e.pageX;
      pageY = e.pageY;
    } else {
      let scrollYDif = pageYOffset - scrollY;
      let scrollXDif = pageXOffset - scrollX;
      scrollY += scrollYDif;
      scrollX += scrollXDif;
      pageY += scrollYDif;
      pageX += scrollXDif;
    }

    charData.forEach((data) => {
      const dx = pageX - data.pageX;
      const dy = pageY - data.pageY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isVisible = dist < textRevealRadius;

      if (isVisible !== data.isVisible || !isVisible) {
        data.isVisible = isVisible;
        gsap.to(data.el, {
          overwrite: true,
          duration: gsap.utils.clamp(0.5, 3, dist / textRevealRadius),
          scrambleText: {
            text: isVisible ? data.el.orig : getRandomLetter(),
            chars: 'upperAndLowerCase',
          },
        });
      }
    });
  }

  return {
    init() {
      const paragraphs = document.querySelectorAll('p');
      if (paragraphs.length === 0) {
        console.warn('No se encontraron etiquetas <p> en el DOM.');
        return;
      }

      st = new SplitText('p', { type: 'chars', charsClass: 'char' });
      st.chars.forEach((char) => (char.orig = char.textContent));

      window.addEventListener('resize', handleResize);
      window.addEventListener('pointermove', updateText);
      window.addEventListener('scroll', updateText);

      handleResize();
      updateText({ pageX: 0, pageY: 0 });
    },
  };
}
