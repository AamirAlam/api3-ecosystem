<script setup></script>

<template>
  <nav>
    <!-- <NuxtLink to="mailto:ecosystem@api3.org" class="icon">
      <SocialIcon fill="none" stroke="var(--ink)" social="Email" />
    </NuxtLink> -->

    <!-- <NuxtLink class="text" to="/">Home</NuxtLink> -->
    <NuxtLink class="text hover-underline" to="/ecosystem">Ecosystem</NuxtLink>
    <NuxtLink class="text hover-underline" to="/articles">Articles</NuxtLink>
    <!-- <NuxtLink class="text" to="/guild">Guild</NuxtLink> -->
    <div class="actions">
      <!-- <ConnectButton /> -->
      <NuxtLink to="https://discord.com/invite/qnRrcfnm5W" class="icon">
        <SocialIcon fill="none" stroke="var(--ink)" social="Discord" />
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
:deep(.social-icon) {
  max-width: 60px;
  //   padding: var(--space-2xs);
  border: unset;
}

:deep(.button) {
  padding: var(--space-2xs) var(--space-l);

  margin-left: var(--space-l);
}
nav:not(.panel-menu) {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: var(--space-s);

  a {
    color: var(--ink);
  }

  .button {
    margin-left: var(--space-l);
  }
}

nav.panel-menu {
  display: grid;

  //   align-items: end;
  //   justify-content: start;
  gap: var(--space-m);
  padding: var(--space-l);

  a {
    color: var(--ink);
    font-size: var(--step-1);

    &.button {
      justify-self: center;
      // align-self: center;
      min-width: 200px;
    }
  }
}
</style>
