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
.cta-module inner-column {
  display: grid;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  @media (min-width: 768px) {
    overflow-x: unset;
  }
}
.cta-module .curves-decoration {
  position: absolute;

  left: 100px;
  transform: rotateY(180deg) rotate(10deg) scaleX(1.4);
  z-index: -1;
  opacity: 0.5;
}
</style>

<style scoped lang="scss">
.cta-module span.line {
  position: absolute;
  height: 1px;
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
