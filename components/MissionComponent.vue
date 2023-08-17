<script setup>
import { gsap } from "gsap";

const content = ref({
  heading:
    "API3 DAO serves data on-chain with first-party oracles that provide a decentralized API layer for Web 3.0 applications.",
  paragraph:
    "Through our expansive and robust network of trusted first-party oracles, API3 serves verified data directly onto the blockchain, employing a secure, dependable, and foolproof solution that guarantees end-to-end transparency throughout the entire process.",

  cards: [
    {
      title: "First-Party Oracle Services",
      description:
        "API3 provides secure and reliable first-party data feeds that establish seamless connections between API providers and oracle smart contracts, thereby eliminating the need for third-party intermediaries and bolstering the overall integrity of the data.",

      image: "square",
    },
    {
      title: "DAO Governed",
      description:
        "API3 strongly values decentralization, a foundational principle in the Web3 ecosystem. Its governance relies on a decentralized autonomous organization (DAO), which gives token holders the authority to make decisions and actively shape the platform's future.",
      image: "triangle",
    },
    {
      title: "Developer Experience",
      description:
        "API3 is committed to an open-source, democratized web that empowers individuals from all walks of life. We foster this through a comprehensive ecosystem, designed to equip developers with the tools, resources, and support they need to build exceptional dApps.",
      image: "circle",
    },
  ],
});
const cardIndex = ref(false);

function animateBackground() {
  gsap.fromTo(
    "mission-section .background-graphic path",
    {
      strokeDashoffset: "1500",
      strokeDasharray: "1500",
    },
    {
      duration: 0.35,
      strokeDashoffset: 0,
      ease: "power2.in",
      stagger: 0.1,
    }
  );
}

function animateParagraph() {
  gsap.fromTo(
    "mission-section .teaser-voice",
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

function onMouseEnter(index) {
  cardIndex.value = index;
  const cards = document.querySelectorAll("mission-section .mission-card");

  cards.forEach((card, i) => {
    if (i !== index) {
      card.style.setProperty("--underline-width", 0);
    }
  });

  event.target.style.setProperty("--underline-width", "100%");

  animateParagraph();
}
</script>

<template>
  <SectionColumn class="mission-stats">
    <mission-section v-auto-animate>
      <heading-text v-auto-animate>
        <h2 class="attention-voice">
          API3 DAO serves data on-chain with first-party oracles that provide a
          secure and reliable solution, with end-to-end transparency.
        </h2>
        <h3 class="teaser-voice">
          {{
            typeof cardIndex == "number"
              ? content.cards[cardIndex].description
              : content.paragraph
          }}
        </h3>
      </heading-text>
      <ul>
        <template v-for="(card, index) in content.cards">
          <li
            class="mission-card hover-underline"
            @mouseenter="onMouseEnter(index)"
          >
            <h4 class="notice-voice">{{ card.title }}</h4>
          </li>
        </template>
      </ul>

      <!--  -->
      <picture class="shape-graphic">
        <CircleDecoration />
      </picture>

      <!--  -->
      <picture class="background-graphic">
        <Transition @enter="animateBackground">
          <DatafeedIcon v-if="cardIndex == 0" />
          <DaoIcon v-else-if="cardIndex == 1" />
          <DeveloperToolIcon v-else-if="cardIndex == 2" />
        </Transition>
      </picture>
    </mission-section>
  </SectionColumn>
</template>

<style scoped lang="scss">
span.highlight {
  color: var(--highlight);
}
mission-section {
  display: grid;
  align-content: center;
  gap: 100px;
  height: 100%;
  position: relative;

  heading-text {
    max-width: 100ch;
    h2 {
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 768px) {
    heading-text {
      grid-column: 2 / span 6;
    }
  }
  ul {
    grid-column: 1/-1;
    @media (min-width: 768px) {
      grid-column: 2 / span 5;
    }
  }

  picture.shape-graphic {
    position: absolute;
    top: 50px;
    width: 320px;
    z-index: -1;
    opacity: 0.5;
  }

  picture.background-graphic {
    position: absolute;

    bottom: -10%;
    right: 0%;
    width: 40vmin;
    height: 40vmin;
    z-index: -1;
    opacity: 0.5;

    @media (min-width: 768px) {
      top: 0%;
      bottom: unset;
    }
  }

  .mission-card {
    border-radius: var(--corners);
    h4 {
      margin-bottom: 0.5rem;
    }
    transition: 0.2s;
  }
}

ul {
  display: grid;
  align-items: center;

  display: grid;
  gap: 2rem;
}
</style>
