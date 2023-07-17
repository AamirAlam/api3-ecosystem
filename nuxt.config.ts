export default defineNuxtConfig({
  routeRules: {
    // Homepage pre-rendered at build time
    "/": { prerender: true },
    "add-dapp": {
      ssr: false,
    },
  },

  //global default head metadata
  app: {
    head: {
      title: "API3 Ecosystem",

      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],

      link: [
        // favicon icon in assets/images
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      ],
    },
  },

  css: [
    "@/assets/styles/site.css",
    "@formkit/themes/genesis",
    "floating-vue/dist/style.css",
  ],

  build: {
    transpile: ["gsap"],
  },

  vue: {
    compilerOptions: {
      //every tag with '-' is a custom element
      isCustomElement: (tag) => tag.includes("-"),
    },
  },

  modules: [
    "@formkit/nuxt",
    //  "@nuxt/devtools",
    "@nuxt/content",

    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    //  [
    //    "@nuxt/content",
    //    {
    //      content: null,
    //      // https://content.nuxtjs.org/api/configuration
    //    },
    //  ],
  ],
  plugins: ["~/plugins/gsap.ts", "~/plugins/floating-vue.ts"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ["stores"],
  },
  nitro: {
    plugins: ["~/server/index.ts"],
    serverAssets: [
      {
        baseName: "",
        dir: "assets",
      },
    ],
  },
  runtimeConfig: {
    mongodbURI: process.env.DEV_DB_URL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID_ECO,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY_ECO,
    ROOT_BUCKET: process.env.ROOT_BUCKET,
    IMAGE_UPLOAD_SIZE_LIMIT: process.env.IMAGE_UPLOAD_SIZE_LIMIT,
    GIT_ACCESS_TOKEN: process.env.GIT_ACCESS_TOKEN,
    JWT_SECRET: process.env.JWT_SECRET,
    GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET,
    public: {
      WEB3MODAL_PROJECT_ID: process.env.WEB3MODAL_PROJECT_ID,
    },
  },
});
