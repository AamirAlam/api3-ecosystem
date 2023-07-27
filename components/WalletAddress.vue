<template>
  <div
    @click="copyToClipboard"
    class="short-wallet"
    :title="showCopyTooltip ? 'Copied!' : 'Copy'"
  >
    {{ shortWallet }}
  </div>
</template>

<script>
export default {
  props: {
    walletAddress: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      shortWallet: this.getShortWallet(this.walletAddress),
      showCopyTooltip: false,
    };
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.walletAddress);
        this.showCopyTooltip = true;
        setTimeout(() => {
          this.showCopyTooltip = false;
        }, 1000); // Hide the tooltip after 1 second
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    },
    getShortWallet(address) {
      if (address.length <= 8) return address; // If the address is already short, return it as is
      const firstPart = address.substring(0, 6);
      const lastPart = address.substring(address.length - 2);
      return `${firstPart}...${lastPart}`;
    },
  },
};
</script>

<style>
.short-wallet {
  /* Add your desired styles for the short wallet address here */
  position: relative; /* Make sure the container is relative for positioning the tooltip */
  cursor: pointer; /* Show pointer cursor when hovering */
}

.short-wallet::before {
  /* Tooltip styling */
  content: attr(title);
  position: absolute;
  top: -30px; /* Adjust this value to control the distance of the tooltip from the address */
  left: 50%; /* Center the tooltip */
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  opacity: 0; /* Hide the tooltip by default */
  visibility: hidden;
  white-space: nowrap; /* Prevent the tooltip from wrapping to a new line */
}

.short-wallet:hover::before {
  /* Show the tooltip on hover */
  opacity: 1;
  visibility: visible;
}
</style>
