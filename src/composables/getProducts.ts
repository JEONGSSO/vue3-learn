import { ref, reactive, onMounted } from 'vue';

import { Filters } from '../types/Products';

export default () => {
  const allProducts = ref([]);
  const filterProducts = ref([]);

  const lastPage = ref(0);
  const perPage = ref(9);

  const filters: Filters = reactive({
    keyword: '',
    sortType: '',
    page: 1
  });

  const initData = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json());
    allProducts.value = data;

    filterProducts.value = data.slice(0, filters.page * perPage.value);

    lastPage.value = Math.ceil(data.length / perPage.value);
  };

  onMounted(initData);

  return {
    lastPage,
    perPage,
    filters,
    allProducts,
    filterProducts
  };
};
