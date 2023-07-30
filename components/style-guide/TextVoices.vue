<script setup>
const voices = ref([
  "micro-voice",
  "whisper-voice",
  "calm-voice",
  "notice-voice",
  "firm-voice",
  "attention-voice",
  "teaser-voice",
  "loud-voice",
  "booming-voice",
]);
</script>

<template>
  <h2 class="attention-voice">Text Voices</h2>
  <ul>
    <li v-for="voice in voices">
      <voice-card>
        <code>
          {{ voice }}
        </code>
        <p :class="voice">This is a short sentence.</p>
        <p :class="voice">this is a <em>regular emphasis</em> sentence.</p>
        <p :class="voice">
          This is a <strong>strong emphasis</strong> sentence.
        </p>
        <p :class="voice">
          This is a
          <strong><em>strong and regular emphasis</em></strong> sentence.
        </p>
        <p :class="voice">
          This is a sentence with a <mark class="highlight">highlight </mark>.
        </p>
        <p :class="voice">
          these <a href="?page=style-guide#"> are links </a> in the paragraph.
        </p>
        <p :class="voice" class="wrap">
          This is a paragraph that should wrap to the next line. lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed
          sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec
          consectetur ante hendrerit.
        </p>
        <p :class="voice" class="wrap">
          Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec
          ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut
          turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque
          auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit
          amet elit pharetra tincidunt feugiat nisl imperdiet.
        </p>
      </voice-card>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  gap: 3rem;
  margin-top: 1rem;

  li + li {
    padding-top: 1rem;
    border-top: 1px solid var(--color);
  }

  P + p {
    margin-top: 0.5rem;
  }

  p.wrap {
    text-wrap: balance;
  }
}
</style>
