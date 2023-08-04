import { defineStore } from "pinia";
import { gsap } from "gsap";

export const useInterfaceStore = defineStore("interface", function () {
  const mainMenuOpen = ref(false);
  const firstLoad = ref(true);
  const heroImage = ref(null);

  const transitionState = reactive({
    transitionComplete: false,
  });
  const toggleTransitionComplete = (value) => {
    transitionState.transitionComplete = value;
  };

  const pageTransitionConfig = {
    name: "page-transiton",
    mode: "out-in",
    onEnter: (el, done) => {
      console.log("onEnter");
      gsap.set(el, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
      gsap
        .timeline({
          paused: true,
          onComplete() {
            toggleTransitionComplete(true);
            done();
          },
        })
        .to(el, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
        .to(el, { scale: 1, duration: 0.25 })
        .play();
    },
    onLeave: (el, done) => {
      toggleTransitionComplete(false);
      gsap
        .timeline({ paused: true, onComplete: done })
        .to(el, { scale: 0.8, duration: 0.2 })
        .to(el, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
        .play();
    },
  };

  const isMobile = computed(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  const isTablet = computed(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 1024 && window.innerWidth >= 768;
  });

  const isDesktop = computed(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 1024;
  });

  function toggleMenu() {
    mainMenuOpen.value = !mainMenuOpen.value;
  }

  function changeHeroImage(card) {
    heroImage.value = card.image;
    setTimeout(() => {}, 100);
    gsap.fromTo(
      "hero-landing .hero-graphic",
      { duration: 0, opacity: 0 },
      { duration: 1, opacity: 0.25 }
    );
    gsap.to("hero-landing .line-decoration", { duration: 0, scale: 0.6 });
    gsap.fromTo(
      "hero-landing .line-decoration path",
      { duration: 0, scale: 0 },
      { duration: 0.25, scale: 1, stagger: 0.05 }
    );
  }

  function scrollIndicator(selector) {
    const element = document.querySelector(selector);
    element.addEventListener("scroll", () => {
      const scrollPosition = (element.scrollTop / element.scrollHeight) * 100;
      element.classList.add("scroll-indicator");
      element.style.setProperty("--scroll-position", scrollPosition + "%");
      //add pseduoelement styling to element
    });
  }

  function notify(message) {
    toast(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
  }

  return {
    mainMenuOpen,
    toggleMenu,
    notify,
    isMobile,
    isTablet,
    isDesktop,
    firstLoad,
    heroImage,
    scrollIndicator,

    changeHeroImage,

    transitionState,
    toggleTransitionComplete,
    pageTransitionConfig,
  };
});
