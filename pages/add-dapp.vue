<script setup>
definePageMeta({
  layout: "footer-less",
});

useSeoMeta({
  title: "Add Your dApp",
  description:
    "Join the API3 ecosystem. Easily list your dApp or service and join our thriving community",
  ogDescription:
    "join the API3 ecosystem. Easily list your dApp or service and join our thriving community",
});
</script>

<template>
  <PageTitle heading="Join the Ecosystem" innerClass="add-dapp-title">
    <p>
      Join the API3 ecosystem. Easily list your dApp or service and join our
      thriving community
    </p>
  </PageTitle>
  <SectionColumn>
    <LazyAddDappForm />
  </SectionColumn>
</template>
