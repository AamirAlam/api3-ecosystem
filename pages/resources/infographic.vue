<script setup></script>

<template>
  <main>
    <SectionColumn innerClass="wide">
      <article class="infographic">
        <header>
          <h1 class="attention-voice">API3 Hacker Pack -- ETHXXX --</h1>
          <div class="card"><p>Learn more about API3 & our bounties</p></div>
          <div class="card">card</div>
        </header>

        <div class="left">
          <text-content>
            <h2 class="attention-voice">dAPIs</h2>
            <p>
              Price feeds for contracts to access a maintained on-chain value
            </p>
          </text-content>
          <div class="qr-card">
            <text-content>
              <h3 class="notice-voice">API3 docs</h3>
            </text-content>
            <picture class="qr-code">
              <QrCode />
            </picture>
          </div>
          <div class="qr-card reverse">
            <text-content>
              <p class="whisper-voice">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, enim laborum? Doloremque, laboriosam. Consectetur
                obcaecati eveniet, mollitia impedit quasi placeat voluptas quod,
                sapiente sit autem doloribus enim, dolorum nostrum deleniti!
              </p>
            </text-content>

            <picture class="qr-code">
              <QrCode />
            </picture>
          </div>
          <div class="qr-card">
            <text-content>
              <h3 class="notice-voice">Demo projects</h3>
            </text-content>

            <picture class="qr-code reverse">
              <QrCode />
            </picture>
          </div>

          <ol>
            <h3 class="firm-voice">This is some List</h3>
            <li v-for="i in 4" :data-list-number="i">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
          </ol>
        </div>
        <div class="right">
          <text-content>
            <h2 class="attention-voice">OEV-share</h2>
            <p>
              Price feeds for contracts to access a maintained on-chain value
            </p>
          </text-content>
          <div class="qr-card">
            <text-content>
              <h3 class="notice-voice">API3 docs</h3>
            </text-content>
            <picture class="qr-code">
              <QrCode />
            </picture>
          </div>
          <div class="">
            <text-content>
              <!-- <picture class="qr-code">
                <QrCode />
              </picture> -->

              <h3 class="notice-voice">Video Tutorial</h3>
            </text-content>

            <picture>
              <img src="/images/article-placeholder.jpg" alt="" />
            </picture>
          </div>
          <div class="qr-card">
            <text-content>
              <h3 class="notice-voice">Demo projects</h3>
            </text-content>

            <picture class="qr-code">
              <QrCode />
            </picture>
          </div>

          <BlockquoteBlock
            quote="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            animi officia cumque saepe, nulla harum quasi, at quo id voluptate
            quod distinctio fuga optio voluptates odio quae? Ex, maiores
            repudiandae!"
          />
        </div>
      </article>
    </SectionColumn>
  </main>
</template>

<style scoped lang="scss">
article {
  display: grid;
  row-gap: var(--space-xl);
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  & > div {
    display: grid;
    gap: var(--space-3xl);
    @media (min-width: 768px) {
      padding: 0 var(--space-xl);
    }
  }

  div.right {
    @media (min-width: 768px) {
      border-left: 5px solid var(--green);
    }
  }
}

text-content {
  display: grid;
  //   gap: var(--space-xs);
}

header {
  grid-column: 1/-1;
  display: flex;
  flex-wrap: wrap;
  //   justify-content: start;
  gap: var(--space-s);
  //   align-items: center;

  .card {
    padding: var(--space-s);
    border-radius: var(--corners);
    //  border: var(--border);
    min-width: 100px;
    color: transparent;
    background: var(--green);
  }
}

.qr-card {
  display: flex;

  gap: var(--space-s);
  align-items: center;
  justify-content: space-between;

  &.reverse {
    //  grid-template-columns: 0.4fr 0.8fr;
    flex-direction: row-reverse;
  }

  & > *:nth-of-type(1) {
    flex-basis: 60%;
  }

  & > *:nth-of-type(2) {
    flex-basis: 40%;
  }
}

picture.qr-code {
  aspect-ratio: 1;
  max-width: 125px;
}

:deep(blockquote) {
  max-width: unset;
}

ol {
  display: grid;
  gap: var(--space-s);
  background: var(--violet);
  padding: var(--space-m);
  border-bottom-left-radius: calc(var(--corners) * 4);
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: var(--space-xl);
  }

  li {
    position: relative;
    left: var(--left, 50px);
    max-width: calc(100% - var(--left));
    color: var(--ink);

    @media (min-width: 768px) {
      font-size: var(--step-1);

      --left: 70px;
    }

    &::before {
      content: attr(data-list-number);
      position: absolute;
      clip-path: polygon(50% 0%, 0 80%, 100% 80%);
      background: var(--green);
      padding: var(--space-s);
      // border-radius: 50%;
      aspect-ratio: 1;
      text-align: center;
      color: var(--paper);
      font-size: 16px;
      left: calc(-1 * var(--left, 50px));

      top: 50%;
      transform: translateY(-50%);
      font-weight: var(--weight-heavy);
      line-height: 0.8;
    }
  }
}
</style>
