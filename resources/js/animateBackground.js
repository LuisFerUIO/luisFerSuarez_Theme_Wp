import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export function animateBack() {
  // create the smooth scroller FIRST!
  const smoother = ScrollSmoother.create({
    wrapper: "#wrapper",
    content: "#content",
    smooth: 2,
    speed: 3,
    effects: true
  });

  smoother.effects(".hero__image-cont", {
    speed: () => gsap.utils.random(0.55, 0.85, 0.05)
  });

  gsap.to(".anim-swipe", {
    yPercent: 300,
    delay: 0.2,
    duration: 3,
    stagger: {
      from: "random",
      each: 0.1
    },
    ease: "sine.out"
  });

  gsap.to(".hero__image-cont > img", {
    scale: 1.5,
    xPercent: 20,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=3000px",
      scrub: true
    }
  });

  // 💚 GSAPInfoBar demo removed for production
}
