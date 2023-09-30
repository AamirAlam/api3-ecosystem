<script setup>
const props = defineProps(["dappForm"]);

props.dappForm.links = props.dappForm.links ?? {};
</script>

<template>
  <section class="form-links">
    <text-content>
      <h2 class="attention-voice">How can your users contact you?</h2>
      <p>
        This information will be displayed for other to learn about your dApp.
      </p>
    </text-content>

    <form-field>
      <FormKit
        type="url"
        id="website"
        v-model="dappForm.links.website"
        label="What’s your company’s website?*"
        label-class="$reset calm-voice"
        validation="url"
        placeholder="https://yourwebsite.com"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        validation="url"
        id="dapp"
        v-model="dappForm.links.dapp"
        label="dApp*"
        label-class="$reset calm-voice"
        placeholder="https://yourdapp.com"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        validation="url"
        id="docs"
        v-model="dappForm.links.docs"
        label="Docs"
        label-class="$reset calm-voice"
        placeholder="https://docs.api3.org/"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        validation="url"
        id="explorer"
        v-model="dappForm.links.explorer"
        label="Explorer"
        label-class="$reset calm-voice"
        placeholder="https://etherscan.io/"
      />
    </form-field>
  </section>
</template>

<style scoped lang="scss">
.form-links {
  display: grid;

  gap: var(--space-m);
}
</style>
