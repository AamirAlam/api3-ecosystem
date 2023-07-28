import { ref, watch, onMounted } from "vue";

export default function useLocalStorage(key, defaultValue) {
  const storedValue = ref(defaultValue);
  onMounted(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      storedValue.value = JSON.parse(stored);
    } else {
      storedValue.value = defaultValue;
    }
  });

  watch(storedValue, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });

  return storedValue;
}
