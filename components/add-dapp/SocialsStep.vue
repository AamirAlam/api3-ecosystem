<script setup>
const props = defineProps(["dappForm"]);

props.dappForm.links.socials = props.dappForm.links.socials ?? {};
</script>

<template>
  <FormKit
    type="group"
    #default="{ state: { valid } }"
    v-auto-animate
    name="socialLinks"
  >
    <section class="form-socials">
      <h2 class="solid-voice">Socials</h2>
      <form-field>
        <FormKit
          type="url"
          id="twitter"
          v-model="dappForm.links.socials.twitter"
          label="Twitter"
          label-class="$reset notice-voice"
          placeholder="https://twitter.com/yourdapp"
        />
      </form-field>

      <form-field>
        <FormKit
          type="url"
          id="discord"
          v-model="dappForm.links.socials.discord"
          label="Discord"
          label-class="$reset notice-voice"
          placeholder="https://discord.gg/yourdapp"
        />
      </form-field>

      <form-field>
        <FormKit
          type="url"
          id="github"
          v-model="dappForm.links.socials.github"
          label="Github"
          label-class="$reset notice-voice"
          placeholder="github.com/yourdapp"
        />
      </form-field>

      <form-field>
        <FormKit
          type="url"
          id="reddit"
          v-model="dappForm.links.socials.reddit"
          label="Reddit"
          label-class="$reset notice-voice"
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
          label-class="$reset notice-voice"
          placeholder="https://t.me/yourdapp"
        />
      </form-field>
    </section>
    <!-- <div class="actions">
      <button class="button previous" @click.prevent="buttonHandle(valid, -1)">
        Previous
      </button>
      <button class="button next" @click.prevent="buttonHandle(valid, 1)">
        Next
      </button>
    </div> -->
    <!-- <template v-if="buttonClick">
      <p v-if="!valid" class="not-valid">
        Your account details are not complete!
      </p>
      <p v-else class="valid">It all looks good 👍</p>
    </template> -->
  </FormKit>
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
