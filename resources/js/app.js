import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

import domReady from '@roots/sage/client/dom-ready';
import { animateText } from './animateText';
import { animateBack } from "./animateBackground";

domReady(() => {
  const animation = animateText();
  animation.init();

  // animateBack();


});
