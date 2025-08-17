import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

import domReady from '@roots/sage/client/dom-ready';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { animateText } from './animateText';



domReady(() => {
  const animation = animateText();
  animation.init();
});
