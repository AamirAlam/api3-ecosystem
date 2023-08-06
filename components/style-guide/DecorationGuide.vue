<script setup>
import gsap from "gsap";

const decorations = ref([
  {
    name: "Line Decoration",
    component: "LineDecoration",
  },
  {
    name: "Curves Decoration",
    component: "CurvesDecoration",
  },
  {
    name: "Decoration Triangle",
    component: "DecorationTriangle",
  },
  {
    name: "Circle Decoration",
    component: "CircleDecoration",
  },
]);

const icons = ref([
  {
    name: "Logo Full",
    component: "LogoFull",
  },
  {
    name: "Logo Icon",
    component: "LogoIcon",
  },
  {
    name: "Logo With Lines",
    component: "LogoWithLines",
  },
  {
    name: "Menu Icon",
    component: "MenuIcon",
  },
  {
    name: "Dao Icon",
    component: "DaoIcon",
  },
  {
    name: "Datafeed Icon",
    component: "DatafeedIcon",
  },
  {
    name: "Airnode Icon",
    component: "AirnodeIcon",
  },
  {
    name: "Developer Tool Icon",
    component: "DeveloperToolIcon",
  },
  {
    name: "Social Icon",
    component: "SocialIcon",
    social: "twitter",
  },
  {
    name: "Chain Icon",
    component: "ChainIcon",
    social: "twitter",
  },
]);

const socialIcons = ref([
  "twitter",
  "discord",
  "telegram",
  "github",
  "reddit",
  "blog",
  "facebook",
  "youtube",
  "linkedin",
]);
const chainIcons = ref([
  "ethereum",
  "polygon",
  "bnb",
  "avalanche",
  "solana",
  "gnosis-chain",
  "moonriver",
  "moonbeam",
  "boba",
]);
const index = ref(0);

function loadIcon(component) {
  return defineAsyncComponent(() =>
    import(`@/components/icons/${component}.vue`)
  );
}

function loadDecoration(component) {
  return defineAsyncComponent(() =>
    import(`@/components/decoration/${component}.vue`)
  );
}

function indexTimer() {
  setInterval(() => {
    if (index.value < socialIcons.value.length - 1) {
      index.value++;
    } else {
      index.value = 0;
    }
  }, 1000);
}

function animateBackground() {
  gsap.fromTo(
    ".decoration-guide path",
    {
      strokeDashoffset: "900",
      strokeDasharray: "900",
    },
    {
      duration: 1,
      strokeDashoffset: 0,
      ease: "power2.in",
      stagger: { each: 0.05, repeat: "-1" },
    }
  );

  //   indexTimer();
}

onMounted(() => {});
</script>

<template>
  <div class="decoration-guide" @click="animateBackground()">
    <h2 class="attention-voice">Decorations and Icons</h2>

    <ul>
      <li v-for="decoration in decorations" :key="decoration.name">
        <div>
          <component
            :is="loadDecoration(decoration.component)"
            v-tooltip="decoration.name"
          />
        </div>
      </li>
    </ul>

    <ul v-auto-animate>
      <li v-for="icon in icons" :key="icon.name">
        <component
          :is="loadIcon(icon.component)"
          :social="socialIcons[index]"
          :chain="chainIcons[index]"
          :key="icon.name"
          stroke="var(--color)"
          fill="none"
          v-auto-animate
          v-tooltip="icon.name"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  align-items: end;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
