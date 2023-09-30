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
  <section>
    <text-content>
      <h2 class="attention-voice">Tell us about your dApp</h2>
      <p>
        This information will be displayed for other to learn about your dApp.
      </p>
    </text-content>
    <form-field class="file-upload">
      <FormKit
        v-auto-animate
        id="logoForm"
        type="file"
        label="Upload your dApp’s logo.*"
        label-class="$reset calm-voice"
        name="logo"
        no-files-icon="fileImage"
        fileName="logo"
        help="Accepted file types: jpeg, png, webp
						Minimum width: 512px"
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
        label-class="$reset calm-voice"
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
    <form-field class="file-upload">
      <FormKit
        v-auto-animate
        id="screenShotForm"
        type="file"
        multiple="true"
        label="Upload your screenshots"
        label-class="$reset calm-voice"
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
  </section>
</template>

<style lang="scss" scoped>
section {
  display: contents;
}
</style>
