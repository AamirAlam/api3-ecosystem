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
          <NuxtLink to="/" class="site-logo">
            <picture class="site-logo" :class="{ menuOpen: showMenu }">
              <NuxtImg
                v-if="!ui.isMobile"
                src="/images/logo-full.svg"
                alt="Full API3 Logo"
              />
              <NuxtImg
                v-else
                src="/images/logo-icon.svg"
                alt="API3 Logo Icon"
              />
            </picture>
          </NuxtLink>
          <SiteNav v-if="!ui.isMobile" />

          <!-- menu icon -->
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
@media (min-width: 768px) {
  .site-header inner-column {
    padding: var(--space-l) var(--space-s);
    padding-top: var(--space-2xl);
  }
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
      width: 275px;
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
