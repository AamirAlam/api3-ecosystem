<script setup>
import { useBlogStore } from "@/stores/blog";
const props = defineProps([
  "layout",
  "cardCount",
  "isRecentSort",
  "isPopularSort",
  "isTrendingSort",
  "isFeaturedSort",
]);

const blog = useBlogStore();
const ui = useInterfaceStore();
const ecosystem = useEcosystemStore();

const sorted = computed(() => {
  if (props.isRecentSort) {
    return blog.list.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }
  if (props.isPopularSort) {
    return blog.list.sort((a, b) => {
      console.log(a.views, b.views);
      return new Date(b.views) - new Date(a.views);
    });
  }
  if (props.isTrendingSort) {
    return blog.list.sort((a, b) => {
      console.log(a.upvotes, b.upvotes);
      return new Date(b.upvotes) - new Date(a.upvotes);
    });
  }
  if (props.isFeaturedSort) {
    return blog.list.sort((a, b) => {
      return new Date(b.isFeatured) - new Date(a.isFeatured);
    });
  }
  return blog.list;
});

const layouts = [
  ["big-card"],
  ["card"],
  ["slide"],
  ["text"],
  ["card", "card", "card", "big-card", "slide", "text", "text", "text", "text"],
  ["big-card", "big-card", "card", "card", "card"],
  ["big-card", "slide", "big-card", "slide", "slide"],
  ["big-card", "slide", "text", "text", "text"],
  ["big-card", "big-card", "slide", "slide", "slide"],
  ["big-card", "card", "text", "text"],
];

const layoutIndex = ref(props.layout ?? 0);

function cardType(index, layout = layoutIndex.value, article) {
  if (!article.cover) return "text";
  const cardType = layout[index % layout.length];

  if (cardType === "slide" && ui.isMobile) return "big-card";
  return cardType;
}

function handleLoadMore() {
  if (blog.list.length < blog.totalArticles) {
    blog.filterQuery.page += 1;
    blog.loadArticles(blog.filterQuery.page);
  }
}

onMounted(() => {
  blog.loadArticles(1);
});
</script>

<template>
  <ul class="article-grid" v-auto-animate>
    <template v-for="(article, index) in sorted">
      <ArticleCard
        :article="article"
        :class="cardType(index, layouts[layoutIndex], article)"
        v-if="index < (props.cardCount ?? sorted.length)"
      />
    </template>
    <button
      class="text show-more"
      @click="handleLoadMore"
      v-if="blog.hasMoreItems && !cardCount"
    >
      {{ blog.hasMoreItems }}
      Show More
    </button>
  </ul>
</template>

<style scoped lang="scss">
.article-grid {
  display: grid;

  gap: var(--space-l);
  align-items: start;
  position: relative;

  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
