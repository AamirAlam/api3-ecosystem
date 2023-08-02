<script setup>
const web3Store = useWeb3Store();

async function buttonHandle() {
  await web3Store.func.openModal();
}
</script>

<template>
  <button class="button loud-voice" @click="buttonHandle">
    <Transition name="fade" mode="out-in">
      <span class="gradient-text" v-if="!web3Store?.state?.isConnected">
        Connect
      </span>
      <span v-else class="gradient-text"> Connected </span>
    </Transition>
  </button>
</template>

<style scoped></style>
