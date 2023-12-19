<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const listClass = ref("grid-3fr");

const cards = ref([
  {
    id: "how",
    color: "violet",
    heading: "How?",
    fullHeading: "How does the referral scheme work?",
    points: [
      "Introduction to a qualified dApp: $500 API3",
      "Integration of qualified dApp: $2500 API3",
    ],
  },
  {
    id: "who",
    color: "green",
    heading: "Who?",
    fullHeading: "Who can qualify?",
    points: [
      "A DeFi protocol requiring oracles with over $500k TVL",
      "Actively building and have a team",
      "Open to basic ecosystem marketing such as adding API3 into docs and listing on ecosystem.api3.org",
    ],
  },
  {
    id: "when",
    color: "blue",
    heading: "When?",
    fullHeading: "How can I get started?",
    points: [
      "Resources have been created to ensure affiliates of API3 DAO are set up to succeed with referrals.",
    ],
  },
]);

function onClick() {
  listClass.value = !listClass.value ? "grid-3fr" : "";
}

function scrollAnimate(section) {
  // section heading
  gsap.to(`#${section} :is(h2)`, {
    x: 400,
    scale: 20,
    transformOrigin: "top",
    ease: "power3.inOut",
    stagger: {
      each: 0.2,
    },
    scrollTrigger: {
      trigger: `#${section}`,
      start: "top center",
      end: "bottom center",
      scrub: true,
      id: "scrub",
    },
  });

  //   list item
  gsap.fromTo(
    `#${section} :is(li)`,
    { x: "-100%", opacity: 0 },
    {
      x: 100,
      opacity: 1,
      scale: 1.2,
      ease: "power3.inOut",
      stagger: {
        each: 0.5,
      },
      scrollTrigger: {
        trigger: `#${section}`,
        start: "center bottom",
        end: "center 200px",
        scrub: true,
        id: "scrub",
      },
    }
  );
}

onMounted(() => {
  scrollAnimate("how");
  scrollAnimate("who");
  scrollAnimate("when");
});
</script>

<template>
  <main>
    <PageTitle heading="Ecosystem Referral Scheme">
      <p class="notice-voice">
        At the heart of API3's success is a collaborative network of
        contributors, clients, and influencers, each playing a pivotal role in
        expanding the reach and impact of our Oracle Stack. API3 DAO seeks to
        incentivise growth of dAPIs through the introduction of a referral
        scheme. This programme rewards affiliates for successfully introducing a
        DeFi protocol that leads to an integration of a dAPI price feed.
      </p>
    </PageTitle>

    <SectionColumn class="hero">
      <!-- <button class="button" @click="onClick">Waitlist</button> -->
      <ul v-auto-animate :class="listClass">
        <li
          v-for="card in cards"
          :class="`border-gradient-${card.color}`"
          :data-color="card.color"
        >
          <h2 class="booming-voice">{{ card.heading }}</h2>
          <a :href="`#${card.id}`"></a>
        </li>
      </ul>
    </SectionColumn>

    <template
      v-for="card in cards"
      :class="`background-radial-${card.color}`"
      :data-color="card.color"
    >
      <SectionColumn
        :id="card.id"
        class="full-screen"
        :class="`background-radial-${card.color}`"
        :data-color="card.color"
      >
        <h2 class="solid-voice">{{ card.heading }}</h2>
        <text-content>
          <h3 class="attention-voice">
            {{ card.fullHeading }}
          </h3>
          <ul>
            <li v-for="point in card.points" class="notice-voice">
              {{ point }}
            </li>
          </ul>
        </text-content>
      </SectionColumn>
    </template>
  </main>
</template>

<style scoped lang="scss">
.hero {
  ul {
    display: grid;
    gap: var(--space-m);
    transition: 0.2s;
  }

  li {
    //   border-radius: 50%;
    padding: var(--space-m);
    text-align: center;
    position: relative;

    a {
      position: absolute;
      inset: 0;
    }
  }
}

.full-screen {
  :deep(inner-column) {
    min-height: 100vh;
    position: relative;

    display: grid;
    //  grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-m);
    align-items: center;

    text-content {
      // grid-column: span 2;
      display: grid;
      gap: var(--space-m);
    }

    h2 {
      opacity: 0.4;
      position: absolute;
      top: 0;
      left: 50%;
    }
    ul {
      display: grid;
      gap: var(--space-xs);
    }
  }
}
</style>
