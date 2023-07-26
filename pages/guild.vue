<script setup>
import { gsap } from "gsap";

const selected = ref("");

const content = reactive({
  buttons: ["Testers", "DAO Members", "Developers"],
  unselectedHeading: "Select The NFT type to Mint",
  paragraph: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora quis
        nihil, sunt vitae labore nam fuga, vero adipisci minus blanditiis,
        inventore voluptatum dolor placeat corporis debitis ullam reiciendis
        distinctio quia.`,
});

function buttonHandle(event, text, index) {
  selected.value = text;

  const buttons = document.querySelectorAll("aside button");

  buttons.forEach((button, i) => {
    if (i !== index) {
      button.style.setProperty("--underline-width", 0);
    }
  });

  event.target.style.setProperty("--underline-width", "100%");

  animateHeading();
}

function animateHeading() {
  gsap.fromTo(
    "div.panel h2",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
    }
  );
}
</script>

<template>
  <SectionColumn>
    <aside>
      <button
        class="text"
        v-for="(buttonText, index) in content.buttons"
        @click="buttonHandle($event, buttonText, index)"
      >
        {{ buttonText }}
      </button>
    </aside>
    <div class="panel" v-auto-animate>
      <h2 class="loud-voice">
        <template v-if="selected">
          Join the
          <span class="gradient-text">{{ selected }}</span> by minting this NFT
        </template>
        <template v-else>
          {{ content.unselectedHeading }}
        </template>
      </h2>

      <p>
        {{ content.paragraph }}
      </p>

      <Transition name="fade" mode="out-in">
        <button class="loud-button" v-if="selected">Mint it Now</button>
      </Transition>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
section {
  :deep(inner-column) {
    display: grid;
    gap: 3rem;

    height: 80vh;
    align-content: center;

    @media (min-width: 768px) {
      grid-template-columns: 0.3fr 1fr;
    }
  }

  aside {
    display: grid;
    align-content: center;
    gap: 3rem;
    text-align: left;
  }

  .panel {
    display: grid;
    gap: 3rem;

    place-content: center;
    text-align: center;

    button {
      justify-self: center;
    }
  }
}
</style>
