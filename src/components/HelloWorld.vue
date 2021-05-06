<template>
  <section class="section_wrap">
    <Products :products="filterProducts" :filters="filters" :lastPage="lastPage" @set-filters="productsChange" />
  </section>
</template>

<script lang="ts">
import { ref, reactive, onMounted, defineComponent } from 'vue';

interface Filters {
  keyword: string;
  sortType: string;
  page: number;
}

import Products from './Products.vue';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Products
  },
  setup() {
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

    const productsChange = (f: Filters) => {
      filters.keyword = f.keyword;
      filters.sortType = f.sortType;
      filters.page = f.page;

      let products = search(filters.keyword);

      if (filters.sortType === 'asc' || filters.sortType === 'desc') {
        products = sort(filters.sortType, products);
      }

      lastPage.value = Math.ceil(products.length / perPage.value);
      filterProducts.value = products.slice(0, filters.page * perPage.value);
    };

    const sort = (sortType: string, products: Array<Object>) =>
      [...products].sort((a: any, b: any) => (sortType === 'asc' ? a.id - b.id : b.id - a.id));

    const search = (keyword: string) => allProducts.value.filter(({ title }) => ~title.indexOf(keyword));

    return {
      sort,
      search,
      allProducts,
      filterProducts,
      filters,
      productsChange,
      lastPage
    };
  }
});
</script>

<style lang="scss" scoped>
@import './test.scss';
</style>
