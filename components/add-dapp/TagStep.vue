<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm"]);
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
      <label class="calm-voice" for="categories"> Select category* </label>
      <Multiselect
        id="categories"
        v-model="dappForm.categories"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.categoryOptions"
        class="tags"
        :classes="{
          tag: 'calm-voice multiselect-tag',
          dropdown: 'calm-voice multiselect-dropdown',
          tagsSearch: 'calm-voice multiselect-tags-search',
        }"
      />
    </form-field>

    <form-field>
      <label class="calm-voice" for="chains"> Select chains* </label>
      <Multiselect
        id="chains"
        v-model="dappForm.chains"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.chainOptions"
        class="tags"
        :classes="{
          tag: 'calm-voice multiselect-tag',
          dropdown: 'calm-voice multiselect-dropdown',
          tagsSearch: 'calm-voice multiselect-tags-search',
        }"
      />
    </form-field>

    <form-field>
      <label class="calm-voice" for="productType">
        Select the service used*
      </label>
      <Multiselect
        id="productType"
        v-model="dappForm.productType"
        mode="single"
        :close-on-select="true"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.productTypeOptions"
        :classes="{
          singleLabelText: 'calm-voice multiselect-single-label-text',
          dropdown: 'calm-voice multiselect-dropdown',
          search: 'calm-voice multiselect-search',
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
