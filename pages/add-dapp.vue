<script setup>
import { useStorage } from "@vueuse/core";
import { setErrors, FormKitMessages } from "@formkit/vue";
import { getValidationMessages } from "@formkit/validation";

definePageMeta({
  title: "Add Dapp",
  layout: "home",
});

useSeoMeta({
  title: "Add Your dApp",
  description:
    "Join the API3 ecosystem. Easily list your dApp or service and join our thriving community",
  ogDescription:
    "join the API3 ecosystem. Easily list your dApp or service and join our thriving community",
});

const { verifyWallet } = useSiwe();
const { submitProject, fetchFeedNames } = useHttpCalls();

const dappForm = useStorage("dapp-form", {});

const loading = ref(false);
const messages = ref([]);
const successData = ref({ message: "", pr_url: "" });
const submitSuccess = ref(false);
const feedNameOptions = ref([]);

function showErrors(node) {
  messages.value = [];
  const validations = getValidationMessages(node);
  validations.forEach((inputMessages) => {
    messages.value = messages.value.concat(
      inputMessages.map((message) => message.value)
    );
  });
}

const web3Store = useWeb3Store();

const submitHandler = async (event) => {
  if (!web3Store.state?.isConnected) {
    await web3Store.func.openModal();
    return;
  }

  setErrors("add-form", []);
  submitSuccess.value = false;
  successData.value.message = "";
  successData.value.pr_url = "";

  // prepare images selected
  const logo = event?.images?.logo?.[0]?.file;
  const cover = event?.images?.cover?.[0]?.file;
  const screenshots = event?.images?.screenshots?.map((el) => el?.file);
  const images = { logo, cover, screenshots };

  const {
    success: verificationSuccess,
    data: verificationData,
    message: verificationError,
  } = await verifyWallet();

  if (!verificationSuccess) {
    setErrors("add-form", ["Signature verification failed!"]);

    return;
  }

  loading.value = true;

  successData.value.message =
    "Please wait for this to process — it will take about 1-2 mins!";
  const submitResult = await submitProject(
    dappForm,
    images,
    verificationData?.token
  );
  if (submitResult.success) {
    successData.value.message = submitResult.message;
    successData.value.pr_url = submitResult.data;
    submitSuccess.value = true;

    delete dappForm.value;
  } else {
    successData.value = "";
    setErrors("add-form", [submitResult?.message]);
  }
  loading.value = false;
};

onMounted(async () => {
  window.scroll({
    top: 0,
    left: 0,
  });
  const names = await fetchFeedNames();

  feedNameOptions.value = names;
});
</script>

<template>
  <SectionColumn>
    <FormKit
      type="form"
      id="add-form"
      @submit="submitHandler"
      @submit-invalid="showErrors"
      :actions="false"
      #default="{ state: { valid: isValid } }"
    >
      <div class="step">
        <ContentStep :dappForm="dappForm" />
      </div>
      {{ scrollPosition }}
      <div class="step">
        <ImageStep :dappForm="dappForm" />
      </div>
      <div class="step">
        <TagStep :dappForm="dappForm" />
      </div>
      <div class="step" v-if="dappForm.productType === 'datafeed'">
        <ProxyStep :dappForm="dappForm" :feedNameOptions="feedNameOptions" />
      </div>
      <div class="step">
        <LinksStep :dappForm="dappForm" />
      </div>
      <div class="step">
        <SocialsStep :dappForm="dappForm" />
      </div>
      <!-- <div class="step">
        <SocialsStep2 :dappForm="dappForm" />
      </div> -->

      <div class="actions">
        <!-- <h2 class="loud-voice">Submit your project!</h2> -->
        <FormKit
          type="submit"
          label="Add Project"
          input-class="$reset button filled firm-voice"
          v-if="web3Store.state.isConnected"
        />
        <ConnectButton v-else />

        <!--  -->
        <ul class="validation-errors" v-auto-animate>
          <FormKitMessages v-auto-animate />
          <template v-if="!isValid">
            <li v-for="message in messages">{{ message }}</li>
          </template>
        </ul>
        <!-- <div v-if="complete"> -->
        <!-- <AddLoading :isLoading="true" :isWaiting="true" /> -->
        <!-- </div> -->

        <p class="success-indicator">
          {{ successData.message }}
        </p>

        <a :href="successData.pr_url" target="_blank" v-if="submitSuccess">
          View Pull request
        </a>

        <picture class="curves-decoration">
          <CurvesDecoration />
        </picture>
      </div>
    </FormKit>
  </SectionColumn>
</template>

<style lang="scss">
body:has(main.add-dapp) {
  //   overflow: hidden;
  overflow-x: hidden;
}
main.add-dapp {
  position: relative;
}

form {
  //   max-height: 100vh;
  //   overflow-y: scroll;
  //   overflow-x: hidden;
  //   scroll-snap-type: mandatory;
  //   scroll-snap-type: y mandatory;
  //   scroll-snap-points-y: repeat(calc(100vh - 100px));
  //   scroll-behavior: smooth;

  & > :is(.step) {
    min-height: calc(80vh);
    display: grid;
    gap: 3rem;
    align-content: center;
  }

  div.actions {
    position: relative;

    .curves-decoration {
      position: absolute;
      bottom: 0px;
      left: 0px;
      transform: rotateY(180deg) rotate(-10deg) scaleX(0.9);
      z-index: -1;

      @media (min-width: 768px) {
        bottom: 20px;
        transform: rotateY(180deg) rotate(-10deg) scaleX(1.4);
      }
    }
  }
}

form > .actions {
  justify-items: start;
}
</style>
