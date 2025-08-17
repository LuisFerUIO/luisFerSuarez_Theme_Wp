let textRevealRadius = 100;
const textRevealPercent = 0.17; // percent of the viewport width, used to size textRevealRadius

const st = new SplitText('p', { type: 'chars', charsClass: 'char' });
st.chars.forEach((char) => (char.orig = char.textContent));

const upperAndLowerCase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const getRandomLetter = () =>
  upperAndLowerCase[Math.round(upperAndLowerCase.length * Math.random())];

let pageX = 0;
let pageY = 0;
let scrollY = pageYOffset;
let scrollX = pageXOffset;

let charData;

function handleResize() {
  textRevealRadius = innerWidth * textRevealPercent;
  updateCharData();
}

function updateCharData() {
  charData = st.chars.map(char => {
    const bounds = char.getBoundingClientRect(); // this operation is expensive, so just do it when we need to
    return {
      el: char,
      pageY: bounds.top + scrollY + bounds.height / 2,
      pageX: bounds.left + pageXOffset + bounds.width / 2,
      isVisible: false
    }
  });
}

function updateText(e) {
  if ("pageY" in e) {
    pageX = e.pageX;
    pageY = e.pageY;
  } else { // scrolling doesn't give us pageX/pageY, so we must calculate them based on the scroll delta
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
          chars: 'upperAndLowerCase'
        }
      });
    }
  });
};

function init() {
  window.addEventListener('resize', handleResize);
  window.addEventListener('pointermove', updateText);
  window.addEventListener('scroll', updateText);

  handleResize();
  updateText({ pageX: 0, pageY: 0 });
}

init();
