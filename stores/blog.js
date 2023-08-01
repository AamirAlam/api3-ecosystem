import { defineStore } from "pinia";
import slug from "slug";
import { watchDebounced } from "@vueuse/core";

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

  const serverURL = computed(() => {
    //page
    let url = baseServerUrl.value + `?page=${filterQuery.value.page}`;

    //categories
    if (filterQuery.value.categories.length > 0) {
      url += `&categories=${filterQuery.value.categories.join(",")}`;
    }

    //authors
    if (filterQuery.value.authors.length > 0) {
      url += `&authors=${filterQuery.value.authors.join(",")}`;
    }

    //  search field
    if (filterQuery.value.searchKey !== "") {
      url += `&searchKey=${filterQuery.value.searchKey}`;
    }

    //year published
    if (filterQuery.value.years.length > 0) {
      url += `&years=${filterQuery.value.years.join(",")}`;
    }

    return url;
  });

  const debouncedSearchQuery = serverURL;

  watchDebounced(
    serverURL,
    () => {
      debouncedSearchQuery.value = serverURL.value;
    },
    { debounce: 500, maxWait: 1000 }
  );

  const { data, error: listError } = useFetch(
    () => debouncedSearchQuery.value,
    {
      key: `articles-list-${filterQuery.value.page}`,
    }
  );

  watch([filterQuery, data], ([newQuery, newData], [oldQuery, prevData]) => {
    totalArticles.value = newData.total;
    if (newQuery.page === 1) {
      articlesList.value = newData.articles;
    } else {
      articlesList.value = [...articlesList.value, ...newData.articles];
    }

    if (
      newData.articles?.length < 10 ||
      newData?.articles?.length === totalArticles.value
    ) {
      hasMoreItems.value = false;
    } else {
      hasMoreItems.value = true;
    }
  });

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
  };
});
