<script setup>
const socials = ref([
  {
    name: "Twitter",
    link: "https://twitter.com/api3dao",
    icon: "Twitter",
  },
  {
    name: "Discord",
    link: "https://discord.com/invite/qnRrcfnm5W",
    icon: "Discord",
  },
  {
    name: "Reddit",
    link: "https://www.reddit.com/r/API3/",
    icon: "Reddit",
  },
  {
    name: "Telegram",
    link: "https://t.me/API3DAO",
    icon: "Telegram",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/api3",
    icon: "Linkedin",
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/@API3DAO",
    icon: "YouTube",
  },
  {
    name: "Github",
    link: "https://github.com/api3dao",
    icon: "Github",
  },
]);

const footerLinks = [
  {
    title: "For Developers",
    links: [
      {
        label: "Documentation",
        path: "https://api3.org/goto/docs?source=ao-menu",
        external: true,
      },
      {
        label: "Github",
        path: "https://github.com/API3DAO",
        external: true,
      },
      {
        label: "API3 Market",
        path: "https://market.api3.org/dapis",
        external: true,
      },
      // Add more links here
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Airnode", external: true, path: "https://api3.org/airnode" },
      { label: "Data feeds", external: true, path: "https://api3.org/dapis" },
      { label: "OEV", external: true, path: "https://api3.org/oev" },
      { label: "QRNG", external: true, path: "https://api3.org/QRNG" },
      // Add more links here
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Guides",
        path: "https://docs.api3.org/guides/",
        external: true,
      },
      {
        label: "Articles",
        path: "https://api3.org/goto/medium?source=ao-menu",
        external: true,
      },
      // Add more links here
    ],
  },
  {
    title: "Participate",
    links: [
      { label: "DAO", path: "https://api3.org/dao", external: true },
      {
        label: "Open Positions",
        path: "https://api3.org/positions/Core-Tech-Team-Positions",
        external: true,
      },
      // Add more links here
    ],
  },
  {
    title: "Whitepaper",
    links: [
      {
        label: "English",
        path: "https://drive.google.com/file/d/1b8QsGPCJJC1pQOcg83-knD1IAOIgCtZZ/view?usp=sharing",
        external: true,
      },
      {
        label: "Chinese",
        path: "https://drive.google.com/file/d/1f2Kad5CUgbr7plyGBtWnK-Shfm3XowWy/view?usp=sharing",
        external: true,
      },
      {
        label: "Korean",
        path: "https://drive.google.com/file/d/1JMHwdNibJf5g_bBaG8Sx9cCg5_14ZIvE/view?usp=sharing",
        external: true,
      },
      {
        label: "Spanish",
        path: "https://drive.google.com/file/d/1C_HEQ41TBE-W2IKqMZTaVR9pND6hes8S/view?usp=sharing",
        external: true,
      },
      {
        label: "Vietnamese",
        path: "https://drive.google.com/file/d/1ELcBjb8nO_4S4jhhZnFMeSo2BHrznONj/view?usp=sharing",
        external: true,
      },
      // Add more links here
    ],
  },
];

const miscLinks = [
  {
    label: "Privacy Policy",
    path: "https://api3.org/privacy-policy",
    external: true,
  },
  {
    label: "Privacy & Cookies",
    path: "https://api3.org/cookies",
    external: true,
  },
  {
    label: "Terms & Conditions",
    path: "https://api3.org/terms-and-conditions",
    external: true,
  },
];

//#todo do the same for the other links
</script>

<template>
  <footer class="diagnol">
    <section class="footer-navigation">
      <inner-column>
        <picture class="site-logo">
          <LogoIcon />
        </picture>
        <section
          v-for="(footerMenu, index) in footerLinks"
          :key="index"
          class="footer-menu"
        >
          <h5 class="notice-voice">{{ footerMenu.title }}</h5>
          <nav>
            <NuxtLink
              v-for="(link, linkIndex) in footerMenu.links"
              :key="linkIndex"
              :to="link.path"
              class="calm-voice text footer-link"
            >
              <span>{{ link.label }}</span>
              <picture class="external-link" v-if="link.external">
                <img
                  src="@/assets/images/interface/diagonal-arrow.svg"
                  alt=""
                />
              </picture>
            </NuxtLink>
          </nav>
        </section>
      </inner-column>
    </section>

    <section class="other">
      <inner-column>
        <nav class="misc-links">
          <NuxtLink
            v-for="(link, index) in miscLinks"
            :key="index"
            :to="link.path"
            class="calm-voice text footer-link"
          >
            <span>
              {{ link.label }}
            </span>
            <picture class="external-link" v-if="link.external">
              <img src="@/assets/images/interface/diagonal-arrow.svg" alt="" />
            </picture>
          </NuxtLink>
        </nav>
        <nav class="social-icons">
          <NuxtLink
            v-for="social in socials"
            :key="social.name"
            :to="social.link"
            class="calm-voice social-icon"
          >
            <SocialIcon :social="social.icon" />
          </NuxtLink>
        </nav>
        <p class="calm-voice">© 2023 API3 Ecosystem Foundation</p>
      </inner-column>
    </section>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 4rem 0;
  inner-column {
    padding-left: 30px;
    padding-right: 30px;
  }
}
.calm-voice {
  font-size: var(--step-0);
  padding: 0.5rem 0;
  color: var(--ink);
}

nav {
  display: grid;
}

.footer-link {
  justify-self: start;
  position: relative;

  picture {
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    max-width: 8px;
  }
}

.footer-navigation inner-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  justify-content: space-between;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr 1fr;
    align-items: start;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
  }

  .site-logo {
    width: 50px;
    grid-column: 1/ -1;
    //  align-self: end;

    @media (min-width: 768px) {
      width: 100px;
      grid-column: unset;
      grid-row: 1/ -1;
    }
  }

  h5 {
    font-size: var(--step-0);
    //  font-weight: 700;
    margin-bottom: 1rem;
    text-transform: uppercase;
    @media (min-width: 1024px) {
      font-size: var(--step--1);
    }
  }
}

section.other inner-column {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 3rem;
  border-top: 1px solid var(--gray-dark);

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    justify-content: space-between;
    text-align: left;
    align-items: center;
  }

  .misc-links {
    gap: 2rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media (min-width: 768px) {
      gap: 2rem;
    }
    @media (min-width: 1024px) {
      // order: 2;
    }
  }
  .social-icons {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2rem;
    place-items: center;
    fill: var(--gray);
    @media (min-width: 1024px) {
      // order: 3;
      justify-content: center;
      gap: 3rem;
    }

    .social-icon {
      max-width: 25px;
    }
  }

  p {
    color: var(--gray);
    @media (min-width: 1024px) {
      // order: 1;
      grid-column: 1/-1;
    }
  }
}

main.index {
  footer {
    .footer-navigation inner-column {
      @media (min-width: 1024px) {
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;
        picture {
          grid-column: 1 / -1;
        }
      }
    }
    .other inner-column {
      grid-template-columns: unset;
      grid-template-rows: unset;
      text-align: center;
      justify-content: center;
      align-content: center;
    }
  }
}
</style>
