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
  <FormKit
    type="group"
    #default="{ state: { valid } }"
    v-auto-animate
    name="content"
  >
    <form-field>
      <FormKit
        type="text"
        label="Dapp name"
        label-class="$reset notice-voice"
        name="dappName"
        placeholder="Insert your dApp name"
        validation="required"
        id="dappName"
        v-model="dappForm.name"
      />
    </form-field>

    <!-- short description -->
    <form-field>
      <FormKit
        type="text"
        label="Tagline"
        label-class="$reset notice-voice"
        name="shortDescription"
        placeholder="Insert a quater-tweet sized description of your dApp"
        help="You will see this on your card"
        validation="required|length:0,60"
        id="shortDescription"
        v-model="dappForm.tagline"
      />
    </form-field>

    <!-- long description -->
    <form-field>
      <FormKit
        type="textarea"
        rows="5"
        label="Description"
        label-class="$reset notice-voice"
        name="longDescription"
        placeholder="Insert a longer form description of your dApp"
        help="This is going to be your 'About', it can be a paragraph or two."
        validation="required"
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
      />
    </form-field>
  </FormKit>
</template>
