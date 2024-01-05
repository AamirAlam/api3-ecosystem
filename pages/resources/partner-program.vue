<script setup>
const content = ref({
  hero: {
    title: "Become an API3 Partner",
    image: "/images/icons/dao.svg",
    description:
      "The API3 referral scheme has been created to harness the potential of our robust ecosystem and community partners to support the growth objectives of the DAO.",
  },

  about: {
    title: "About the Program",
    description:
      "At the heart of API3's success is a collaborative network of contributors, clients, and influencers, each playing a pivotal role in expanding the reach and impact of our Oracle Stack. API3 DAO seeks to incentivise growth of dAPIs through the introduction of a referral scheme. This programme rewards affiliates for successfully introducing a DeFi protocol that leads to an integration of a dAPI price feed.",
  },

  getStarted: {
    title: "How can I get started?",
    description:
      "Resources have been created to ensure affiliates of API3 DAO are set up to succeed with referrals. Within this space you will find information on:",
    cards: [
      {
        title: "Understanding Your Role",
        image: "/images/icons/dao.svg",
        description:
          "A clear outline of what it means to be a referee in our program and how to get started.",
      },
      {
        title: "Target Audience Identification",
        image: "/images/icons/dao.svg",
        description:
          "Insights on identifying who you can successfully refer to our network.",
      },
      {
        title: "Support Materials",
        image: "/images/icons/dao.svg",
        description:
          "Access to a wealth of resources designed to aid you in your referral efforts.",
      },
      {
        title: "Effective Promotion Tactics",
        image: "/images/icons/dao.svg",
        description:
          "Strategies and tips for efficiently spreading the word and making impactful referrals.",
      },
      {
        title: "Onboard dApps For Rewards",
        image: "/images/icons/dao.svg",
        description:
          "Within this space you report and validate your integrations to access payments.",
      },
    ],
  },

  rewards: {
    title: "How does the referral scheme work?",
    cards: [
      {
        title: "Introduction to a qualified dApp",
        description: "$500 API3",
      },
      {
        title: "Integration of qualified dApp",
        description: "$2500 API3",
      },
    ],
  },

  qualifications: {
    title: "What does a qualified dApp look like?",
    description:
      "An integration is defined as a DeFi protocol that is reading a dAPI within their contracts and can be verified on-chain.",
    cards: [
      {
        title: "A DeFi protocol requiring oracles with over $500k TVL",
        description: "A DeFi protocol requiring oracles with over $500k TVL",
      },
      {
        title: "Actively building and have a team",
        description: "Actively building and have a team",
      },
      {
        title:
          "Open to basic ecosystem marketing such as adding API3 into docs and listing on ecosystem.api3.org",
        description:
          "Open to basic ecosystem marketing such as adding API3 into docs and listing on ecosystem.api3.org",
      },
    ],
  },

  contact: {
    title: "Questions?",
    description:
      "We look forward to hearing from you, please share any questions with ecosystem@api3.org.",

    email: "ecosystem@api3.org",
  },
});

const form = ref({
  name: "",
  email: "",
  message: "",
});

function submitForm() {
  console.log("submitForm", form.value);
}
</script>

<template>
  <article>
    <SectionColumn class="hero">
      <h1 class="loud-voice gradient-text-color">
        {{ content.hero.title }}
      </h1>
      <picture class="hero-image">
        <img :src="content.hero.image" alt="" />
      </picture>
      <p>
        {{ content.hero.description }}
      </p>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="about">
      <h2 class="attention-voice">
        {{ content.about.title }}
      </h2>

      <p class="notice-voice">
        {{ content.about.description }}
      </p>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="rewards">
      <h2 class="attention-voice">
        {{ content.rewards.title }}
      </h2>
      <p class="notice-voice" v-if="content.rewards.description">
        {{ content.rewards.description }}
      </p>

      <ul>
        <li v-for="card in content.rewards.cards" class="border-gradient-green">
          <h3 class="solid-voice">
            {{ card.title }}
          </h3>
          <p class="loud-voice">
            {{ card.description }}
          </p>
        </li>
      </ul>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="qualifications">
      <h2 class="attention-voice">
        {{ content.qualifications.title }}
      </h2>

      <ul>
        <li
          v-for="card in content.qualifications.cards"
          class="border-gradient-violet"
        >
          <p class="notice-voice">
            {{ card.description }}
          </p>
        </li>
      </ul>

      <p class="solid-voice" v-if="content.qualifications.description">
        {{ content.qualifications.description }}
      </p>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="get-started">
      <h2 class="attention-voice">
        {{ content.getStarted.title }}
      </h2>
      <p class="notice-voice">
        {{ content.getStarted.description }}
      </p>

      <ul>
        <li
          v-for="card in content.getStarted.cards"
          class="border-gradient-blue"
        >
          <picture>
            <img :src="card.image" alt="" />
          </picture>
          <h3 class="solid-voice">
            {{ card.title }}
          </h3>
          <p>
            {{ card.description }}
          </p>
        </li>
      </ul>
    </SectionColumn>

    <!--  -->
    <SectionColumn class="contact">
      <text-content>
        <h2 class="loud-voice">
          {{ content.contact.title }}
        </h2>
        <p class="notice-voice">
          {{ content.contact.description }}
        </p>
      </text-content>

      <FormKit type="form" id="contact-form" :actions="false">
        <form-field>
          <FormKit
            type="text"
            id="name"
            name="name"
            label="Name"
            label-class="$reset calm-voice"
            placeholder="Name"
            validation="required"
            v-model="form.name"
          />
        </form-field>

        <form-field>
          <FormKit
            type="email"
            id="email"
            name="email"
            label="Email"
            label-class="$reset calm-voice"
            placeholder="Email"
            validation="required|email"
            v-model="form.email"
          />
        </form-field>

        <form-field>
          <FormKit
            type="textarea"
            id="message"
            name="message"
            label="Message"
            label-class="$reset calm-voice"
            placeholder="Message"
            validation="required"
            v-model="form.message"
          />
        </form-field>
        <form-field>
          <FormKit
            type="submit"
            id="submit"
            label="Submit"
            input-class="$reset button"
            @click.prevent="submitForm"
          />
        </form-field>
      </FormKit>
    </SectionColumn>
  </article>
</template>

<style scoped lang="scss">
:deep(inner-column) {
  padding: var(--space-2xl) var(--space-s);
}
.hero :deep(inner-column) {
  display: grid;
  align-items: center;

  h1 {
    text-wrap: balance;
    align-self: end;
  }
  p {
    align-self: start;
  }

  picture {
    max-width: 100px;

    @media (min-width: 768px) {
      grid-row: span 2;
      max-width: unset;
    }
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.5fr;
    column-gap: var(--space-xl);
  }
}

.rewards {
  ul {
    display: grid;
    gap: var(--space-s);
    padding: var(--space-l) 0;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  li {
    padding: var(--space-m);
    display: grid;
    gap: var(--space-2xs);

    p {
      margin-top: 0;
    }
  }
}

.qualifications {
  ul {
    display: grid;
    gap: var(--space-s);
    padding: var(--space-l) 0;
  }

  li {
    padding: var(--space-m);

    @media (min-width: 768px) {
      border-radius: 100px;
    }
  }
}

.get-started ul {
  padding: var(--space-s);

  display: grid;
  gap: var(--space-s);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  li {
    padding: var(--space-m);

    display: grid;
    gap: var(--space-2xs);

    picture {
      max-width: 80px;
    }

    p {
      margin-top: 0;
    }
  }
}

.contact :deep(inner-column) {
  display: grid;
  gap: var(--space-xl);
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 0.7fr 1fr;
  }
}
</style>
