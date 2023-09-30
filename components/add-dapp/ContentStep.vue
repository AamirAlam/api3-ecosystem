<script setup>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const props = defineProps(["dappForm"]);
props.dappForm.date = new Date().toISOString().slice(0, 10);

const yearOptions = ref([]);

onMounted(() => {
  const years = ref(getYearRange(2000, new Date().getFullYear()));

  function getYearRange(start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  yearOptions.value = years.value.reverse();
});
</script>
<template>
  <section>
    <text-content>
      <h2 class="attention-voice">Tell us about your dApp</h2>
      <p>
        This information will be displayed for other to learn about your dApp.
      </p>
    </text-content>
    <form-field>
      <FormKit
        type="text"
        label="What is the name of your dApp?*"
        label-class="$reset calm-voice"
        name="dappName"
        placeholder="dApp Name"
        validation="required"
        validation-label="Name"
        id="dappName"
        v-model="dappForm.name"
      />
    </form-field>

    <!-- short description -->
    <form-field>
      <FormKit
        type="text"
        label="Enter your  dApp’s slogan.*"
        label-class="$reset calm-voice"
        name="shortDescription"
        placeholder="dApp slogan"
        help="Insert a quater-tweet sized description of your dApp"
        validation="required|length:0,70"
        validation-label="Slogan"
        id="shortDescription"
        v-model="dappForm.tagline"
      />
    </form-field>

    <!-- long description -->
    <form-field>
      <FormKit
        type="textarea"
        rows="5"
        label="Tell us about your dApp.*"
        label-class="$reset calm-voice"
        name="longDescription"
        placeholder="dApp description"
        help="This is going to be your 'About', it can be a paragraph or two."
        validation="required"
        validation-label="Description"
        id="longDescription"
        v-model="dappForm.description"
      />
    </form-field>

    <form-field>
      <label class="notice-voice" for="year"> Select release year* </label>
      <Multiselect
        id="year"
        v-model="dappForm.year"
        mode="single"
        :required="true"
        :close-on-select="true"
        :searchable="true"
        :create-option="false"
        :options="yearOptions"
        :classes="{
          singleLabelText: 'calm-voice multiselect-single-label-text',
          dropdown: 'calm-voice multiselect-dropdown',
          search: 'calm-voice multiselect-search',
        }"
      />
    </form-field>
  </section>
</template>

<style scoped>
section {
  display: contents;
}
</style>
