<script setup>
//
useSeoMeta({
  title: "Style Guide",
  description:
    "This is the API3 style guide. It contains all the components and styles used in the API3 website.",
  ogDescription:
    "This is the API3 style guide. It contains all the components and styles used in the API3 website.",
});
</script>

<template>
  <PageHeader heading="Style Guide" />
  <SectionColumn>
    <ColorGuide />
  </SectionColumn>
  <SectionColumn>
    <MiscGuide />
  </SectionColumn>
  <SectionColumn>
    <ButtonGuide />
  </SectionColumn>
  <SectionColumn>
    <FormGuide />
  </SectionColumn>
  <SectionColumn>
    <TextVoices />
  </SectionColumn>
</template>

<style scoped lang="scss">
:deep(inner-column > div) {
  display: grid;
  gap: 3rem;

  --gap: 1rem;

  ul {
    gap: var(--gap);
    @media (min-width: 768px) {
      --gap: 3rem;
    }
  }
}
</style>
<style>
main {
  display: grid;
  gap: 8rem;
}
</style>
