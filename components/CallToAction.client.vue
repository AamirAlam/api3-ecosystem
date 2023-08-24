<script setup>
import { useInterfaceStore } from "~/stores/interface";

const ui = useInterfaceStore();
</script>

<template>
  <SectionColumn class="cta-module">
    <!-- <span class="line"></span> -->

    <cta-module>
      <text-content>
        <h2
          class="gradient-text-color"
          :class="{
            'booming-voice': !ui.isMobile,
            'loud-voice': ui.isMobile,
          }"
        >
          Join the Web3 API revolution and publish your dapp on our site today!
        </h2>
        <button
          class="firm-voice loud-button"
          @click="navigateTo('/ecosystem')"
        >
          Join Now
        </button>
      </text-content>

      <!-- partner logo wall -->
      <picture class="graphic">
        <img src="@/assets/images/partner-logos.png" alt="" />
      </picture>
    </cta-module>

    <!-- background decoration -->
    <picture class="curves-decoration">
      <CurvesDecoration />
    </picture>
  </SectionColumn>
</template>

<style lang="scss">
.cta-module {
  overflow-x: hidden;

  @media (min-width: 768px) {
    overflow-x: unset;
  }
}
.cta-module inner-column {
  display: grid;
  align-items: center;
  position: relative;
  padding-top: 7rem !important;
  //   overflow-x: hidden;
  @media (min-width: 768px) {
    //  overflow-x: unset;
    padding-top: unset !important;
  }
}
.cta-module .curves-decoration {
  position: absolute;
  max-width: 500px;
  top: -50px;

  left: -10px;
  transform: rotateX(180deg) rotateY(180deg) rotate(-20deg) scaleX(1.2);
  z-index: -1;

  @media (min-width: 768px) {
    top: unset;
    max-width: unset;
    left: 100px;
    opacity: 0.5;
    transform: rotateY(180deg) rotate(10deg) scaleX(1.4);
  }
}
</style>

<style scoped lang="scss">
.cta-module span.line {
  position: absolute;
  height: var(--line-width);
  background: var(--gradient-color);
  top: 0;
  right: 0;
  width: 100%;
}
cta-module {
  display: grid;
  align-items: start;
  gap: 2rem;
  position: relative;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.75fr;
  }

  text-content {
    display: grid;
    gap: 3rem;
    justify-items: start;
    order: 2;

    h2 {
      color: var(--color);
    }

    @media (min-width: 768px) {
      order: unset;
    }
  }
  picture.graphic {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: -1;

    opacity: 0.5;

    @media (min-width: 768px) {
      position: static;
      opacity: 1;
      transform: translateX(0);

      // background-color: transparent;
    }
  }
}
</style>
