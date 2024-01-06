<script setup>
import { useStorage } from "@vueuse/core";
const content = await queryContent("resources/partner-program").findOne();

definePageMeta({
  layout: "footer-less",
});

useSeoMeta({
  title: content.seo.title,
  ogTitle: content.seo.title,
  twitterTitle: content.seo.title,

  description: content.seo.description,
  ogDescription: content.seo.description,
  twitterDescription: content.seo.description,

  image: content.seo.image,
  ogImage: content.seo.image,
  twitterImage: content.seo.image,

  ogUrl: content.seo.url,
  twitterUrl: content.seo.url,

  ogType: content.seo.type,
  twitterType: content.seo.type,

  twitterCard: content.seo.cardSize,
});

const form = useStorage("referral-email-form", {
  name: "",
  email: "",
  message: "",
});

async function submitForm() {
  await new Promise((r) => setTimeout(r, 2000));
  console.log("submitForm", form.value);

  //   send email to form.email

  //   show success message

  //   clear form
  //   form.value = {
  // 	 name: "",
  // 	 email: "",
  // 	 message: "",
  //   };
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
    <SectionColumn class="contact pattern-seven">
      <text-content>
        <h2 class="loud-voice">
          {{ content.contact.title }}
        </h2>
        <p class="notice-voice">
          {{ content.contact.description }}
        </p>
      </text-content>

      <FormKit
        type="form"
        id="contact-form"
        :actions="false"
        @submit="submitForm"
        v-auto-animate
      >
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
    gap: var(--space-m);
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
    gap: var(--space-m);
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
  gap: var(--space-m);

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
