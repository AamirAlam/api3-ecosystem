import { defineStore } from "pinia";
import slug from "slug";

export const useBlogStore = defineStore("blog", () => {
  const route = useRoute();

  //get articles, with dynamic pagination
  const baseServerUrl = ref("/api/articles/");
  const filterQuery = ref({
    searchKey: "",
    categories: [],
    authors: [],
    years: [],
    page: 1,
  });
  const hasMoreItems = ref(true);
  const articlesList = ref([]);
  const totalArticles = ref(0);

  async function loadArticles(page) {
    let url = baseServerUrl.value + `?page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    totalArticles.value = data?.total;

    if (page === 1) {
      articlesList.value = data.articles;
    } else {
      articlesList.value = [...articlesList.value, ...data.articles];
    }

    if (
      data.articles?.length < 10 ||
      data?.articles?.length === totalArticles.value
    ) {
      hasMoreItems.value = false;
    } else {
      hasMoreItems.value = true;
    }
  }

  const currentArticle = computed(() => {
    if (route.params.detail) {
      return list.value.find(
        (article) => slug(article.title) === route.params.detail
      );
    }
  });

  return {
    list: articlesList,
    totalArticles,
    currentArticle,
    hasMoreItems: hasMoreItems,
    filterQuery,
    loadArticles,
  };
});
