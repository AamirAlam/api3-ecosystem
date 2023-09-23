<script setup>
const props = defineProps(["dappForm"]);

const fileSize = function (node) {
  if (!node.value) return true;

  const maxSize = 3 * 1024 * 1024;

  const fileSizes = node.value.map((file) => file.file.size);

  return fileSizes.every((fileSize) => {
    return fileSize <= maxSize;
  });
};
</script>

<template>
  <FormKit
    type="group"
    #default="{ state: { valid } }"
    v-auto-animate
    name="images"
  >
    <div class="single-images">
      <form-field class="file-upload">
        <FormKit
          v-auto-animate
          id="logoForm"
          type="file"
          label="Upload your logo*"
          label-class="$reset notice-voice"
          name="logo"
          help="This image should be a square and at least 512px wide. [JPG/PNG/WEBP]"
          accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .webp, .WEBP"
          validation="required|fileSize"
          :validation-rules="{ fileSize }"
          :validation-messages="{
            fileSize: 'File size must be below 3MB',
          }"
        />
      </form-field>
      <form-field class="file-upload">
        <FormKit
          id="coverForm"
          type="file"
          label="Upload a branded cover*"
          label-class="$reset notice-voice"
          name="cover"
          help="This image should be at least 1024px wide. [JPG/PNG/WEBP]"
          accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .webp, .WEBP"
          v-auto-animate
          validation="required|fileSize"
          :validation-rules="{ fileSize }"
          :validation-messages="{
            fileSize: 'File size must be below 3MB',
          }"
        />
      </form-field>
    </div>
    <div>
      <form-field class="file-upload">
        <FormKit
          v-auto-animate
          id="screenShotForm"
          type="file"
          multiple="true"
          label="Upload your screenshots"
          label-class="$reset notice-voice"
          name="screenshots"
          help="Screenshots of your dApp in action. [JPG/PNG/WEBP]"
          accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .webp, .WEBP"
          validation="fileSize"
          :validation-rules="{ fileSize }"
          :validation-messages="{
            fileSize: 'Each file must be below 3MB',
          }"
        />
      </form-field>
    </div>
  </FormKit>
</template>

<style lang="scss" scoped>
.single-images {
  display: grid;
  gap: var(--space-l);
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
