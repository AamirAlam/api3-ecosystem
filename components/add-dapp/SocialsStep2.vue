<script setup>
const props = defineProps(["dappForm"]);

props.dappForm.links.socials = props.dappForm.links.socials ?? {};
</script>

<template>
  <FormKit
    type="group"
    #default="{ state: { valid } }"
    v-auto-animate
    name="socialLinks2"
  >
    <section class="form-socials">
      <h2 class="solid-voice">More Socials</h2>
      <form-field>
        <FormKit
          type="url"
          validation="url"
          id="facebook"
          v-model="dappForm.links.socials.facebook"
          label="Facebook"
          label-class="$reset notice-voice"
          placeholder="https://facebook.com/yourdapp"
        />
      </form-field>

      <form-field>
        <FormKit
          type="url"
          validation="url"
          id="instagram"
          v-model="dappForm.links.socials.instagram"
          label="Instagram"
          label-class="$reset notice-voice"
          placeholder="https://instagram.com/yourdapp"
        />
      </form-field>

      <form-field>
        <FormKit
          type="url"
          validation="url"
          id="youtube"
          v-model="dappForm.links.socials.youtube"
          label="Youtube"
          label-class="$reset notice-voice"
          placeholder="https://youtube.com/yourdapp"
        />
      </form-field>

      <form-field>
        <FormKit
          type="url"
          validation="url"
          id="blog"
          v-model="dappForm.links.socials.blog"
          label="Blog"
          label-class="$reset notice-voice"
          placeholder="https://yourdapp.com/blog"
        />
      </form-field>
    </section>
  </FormKit>
</template>

<style scoped lang="scss">
.form-socials {
  display: grid;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.form-socials h2 {
  grid-column: 1 / -1;
}
</style>
