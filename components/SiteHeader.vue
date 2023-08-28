<script setup>
import { useInterfaceStore } from "~/stores/interface";
import { gsap } from "gsap";

const ui = useInterfaceStore();
const router = useRouter();

const showMenu = ref(false);

onMounted(() => {
  const pageLoad = gsap.timeline();
  if (ui.firstLoad) {
    pageLoad.from(".site-header", {
      delay: "0.5",
      duration: 0.5,
      y: -50,
      opacity: 0,
      ease: "power4.out",
    });
    ui.firstLoad = false;
  }
});
</script>

<template>
  <header class="site-header">
    <SectionColumn class="mast-head">
      <ClientOnly>
        <mast-head>
          <picture
            class="site-logo"
            :class="{ menuOpen: showMenu }"
            @click="router.push('/')"
          >
            <LogoFull v-if="!ui.isMobile" />
            <LogoIcon v-else />
          </picture>
          <SiteNav v-if="!ui.isMobile" />
          <button
            :class="` menu icon ${showMenu ? 'menuOpen' : ''}`"
            v-if="ui.isMobile"
            @click="showMenu = !showMenu"
          >
            <picture>
              <MenuIcon />
            </picture>
          </button>
          <SidePanelSlot
            v-if="ui.isMobile"
            :showPanel="showMenu"
            @toggle="showMenu = !showMenu"
          >
            <SiteNav class="panel-menu" />
          </SidePanelSlot>
        </mast-head>
      </ClientOnly>
    </SectionColumn>
    <!-- <div class="teleport-target"></div>
	 --></header>
</template>

<style>
body:not(.index) .site-header inner-column {
  padding: 64px 0;
}
</style>

<style lang="scss" scoped>
mast-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  .site-logo {
    width: 50px;
    cursor: pointer;
    @media (min-width: 768px) {
      width: 125px;
    }
  }
}
button.menu {
  max-width: 50px;
  justify-self: end;

  &.menuOpen {
    z-index: 9999;
  }
  &.icon {
    scale: 0.8;
  }
}
</style>
