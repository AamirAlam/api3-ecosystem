<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

const ecosystem = useEcosystemStore();

const props = defineProps(["dappForm"]);

const buttonClick = ref(false);
function buttonHandle(valid, direction) {
  formStepButtonHandle(valid, direction, buttonClick);
}
</script>

<template>
  <FormKit
    type="group"
    #default="{ state: { valid } }"
    v-auto-animate
    name="tags"
  >
    <form-field>
      <label class="notice-voice" for="categories"> Select category </label>
      <Multiselect
        id="categories"
        v-model="dappForm.categories"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.categoryOptions"
        :classes="{
          tag: 'calm-voice multiselect-tag',
          dropdown: 'calm-voice multiselect-dropdown',
          tagsSearch: 'calm-voice multiselect-tags-search',
        }"
      />
    </form-field>

    <form-field>
      <label class="notice-voice" for="chains"> Select chains </label>
      <Multiselect
        id="chains"
        v-model="dappForm.chains"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="false"
        :options="ecosystem.chainOptions"
        :classes="{
          tag: 'calm-voice multiselect-tag',
          dropdown: 'calm-voice multiselect-dropdown',
          tagsSearch: 'calm-voice multiselect-tags-search',
        }"
      />
    </form-field>

    <form-field>
      <label class="notice-voice" for="productType">
        Select the service used
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
    <!-- <div class="actions">
      <button class="button previous" @click.prevent="buttonHandle(valid, -1)">
        Previous
      </button>
      <button class="button next" @click.prevent="buttonHandle(valid, 1)">
        Next
      </button>
    </div> -->
    <template v-if="buttonClick">
      <p v-if="!valid" class="not-valid">
        Your account details are not complete!
      </p>
      <p v-else class="valid">It all looks good 👍</p>
    </template>
  </FormKit>
</template>

<style>
.multiselect {
  border: unset;
  background: var(--gradient-dark);
  border-radius: var(--corners);
  font-size: var(--step-0);
  padding: 0.5rem;
}
</style>
