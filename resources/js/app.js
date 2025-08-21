import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

import domReady from '@roots/sage/client/dom-ready';
import { animateText } from './animateText';

domReady(() => {
  const animation = animateText();
  animation.init();

  const  animationBackground = animateBack();
  animationBackground.init();


});
