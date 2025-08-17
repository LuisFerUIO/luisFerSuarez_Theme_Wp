import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

import domReady from '@roots/sage/client/dom-ready';
import { animateText } from './animateText';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(SplitText);

domReady(() => {
  const animation = animateText();
  animation.init();
});
