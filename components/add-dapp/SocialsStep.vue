<script setup>
const props = defineProps(["dappForm"]);

props.dappForm.links.socials = props.dappForm.links.socials ?? {};
</script>

<template>
  <section class="form-socials">
    <h2 class="solid-voice">Socials</h2>
    <form-field>
      <FormKit
        type="url"
        id="twitter"
        v-model="dappForm.links.socials.twitter"
        label="Twitter"
        label-class="$reset calm-voice"
        placeholder="https://twitter.com/yourdapp"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        id="discord"
        v-model="dappForm.links.socials.discord"
        label="Discord"
        label-class="$reset calm-voice"
        placeholder="https://discord.gg/yourdapp"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        id="github"
        v-model="dappForm.links.socials.github"
        label="Github"
        label-class="$reset calm-voice"
        placeholder="github.com/yourdapp"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        id="reddit"
        v-model="dappForm.links.socials.reddit"
        label="Reddit"
        label-class="$reset calm-voice"
        placeholder="https://reddit.com/r/yourdapp"
      />
    </form-field>

    <form-field>
      <FormKit
        type="url"
        validation="optional"
        id="telegram"
        v-model="dappForm.links.socials.telegram"
        label="Telegram"
        label-class="$reset calm-voice"
        placeholder="https://t.me/yourdapp"
      />
    </form-field>
  </section>
</template>

<style scoped lang="scss">
.form-socials {
  display: grid;

  gap: var(--space-m);
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.form-socials h2 {
  grid-column: 1 / -1;
}
</style>
