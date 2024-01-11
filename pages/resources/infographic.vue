<script setup>
const content = ref({});
</script>

<template>
  <main>
    <SectionColumn innerClass="wide">
      <article class="infographic">
        <header>
          <h1 class="attention-voice">Hacker Cheat Sheet</h1>
          <div class="card"><p>API3 x LightLink Gasless Hackathon</p></div>
          <div class="card">card</div>
        </header>

        <div class="left">
          <text-content>
            <h2 class="attention-voice">Access Quantum Random Numbers with API3 QRNG.</h2>
            <p>
              API3 QRNG is a free-to-use service to provide quantum randomness on-chain. It is powered by Airnode, the serverless first-part oracle that is operated directly by the QRNG API providers.
            </p>
          </text-content>
          <div class="qr-card">
            <text-content>
              <h3 class="notice-voice">Start by spending time understanding Quantum Randomness and understanding an overview of how API3 QRNG works.</h3>
            </text-content>
            <picture class="qr-code">
             <img src="/images/QRNG_EXPLORE.png" 
            /> <!--[https://docs.api3.org/explore/qrng/]-->
            </picture>
          </div>
          <div class="qr-card reverse">
            <text-content>
              <p class="whisper-voice">
                If you're a developer looking to get started, follow our simple guide on how to request random numbers to your LightLink smart contracts. These have been designed to take you from 0-1 and action your learning through building your own demo projects.
              </p>
            </text-content>

            <picture class="qr-code">
              <img src="/images/QRNG_Guides.png" 
            /> <!--[https://docs.api3.org/guides/qrng/]-->
            </picture>
          </div>
          <div class="qr-card">
            <text-content>
              <h3 class="notice-voice">Hackathon Referneces</h3>
            </text-content>
            The API3 Ecosystem has a range of resources available for developers to utilize within hackathons, alongside the API3 guides. 
            <picture class="qr-code reverse">
             <img src="/images/Ecosystem_github.png"/> <!--https://github.com/api3-ecosystem/References-For-Hackathon-->
            </picture>
          </div>

          <ol>
            <h3 class="firm-voice">Hacker getting started list</h3>
            <li>
              Start by reading the QRNG explore materials 
            </li>
            <li> 
              Follow the quickstart guide to call QRNG using the Lightlink ChainID 
            </li>
            <li>
              Explore the QRNG Demo Projects to utilize QRNG in a dApp
            </li>
            <li>
              Build and utilize QRNG within your hackathon project to win the bounty
            </li>
          </ol>
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
    grid-template-columns: 1fr;
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
  align-items: center;

  .card {
    padding: var(--space-s);
    border-radius: var(--corners);
    border: var(--border);
    min-width: 100px;
    color: transparent;
    //  background: var(--green);
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
  max-width: 200px;
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
