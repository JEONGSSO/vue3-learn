<template>
  <section class="section_wrap">
    <Products :products="filterProducts" :filters="filters" :lastPage="lastPage" @set-filters="productsChange" />
  </section>
  <button class="btn" @click="stopWatchHandler">stopWatchHandler</button>
</template>

<script lang="ts">
import { watch, watchEffect, defineComponent } from 'vue';

import Products from './Products.vue';

import * as getProducts from '../composables/getProducts';

import { Filters } from '../types/Products';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Products
  },
  setup() {
    const { lastPage, perPage, filters, allProducts, filterProducts } = getProducts.default();

    const stopWatch = watch(filters, (e, ee, eee) => {
      console.log('stopWatch e', e);
      console.log('stopWatch ee', ee);
      console.log('stopWatch eee', eee);
    });

    watchEffect(() => {
      // useEffect 같은 역할
      console.log('watchEffect', filters);
    });

    const stopWatchHandler = () => {
      console.log('stopWatchHandler');
      stopWatch();
    };

    const productsChange = (f: Filters) => {
      filters.keyword = f.keyword;
      filters.sortType = f.sortType;
      filters.page = f.page;

      const sort = (sortType: string, products: Array<Object>) =>
        [...products].sort((a: any, b: any) => (sortType === 'asc' ? a.id - b.id : b.id - a.id));

      const search = (keyword: string) => allProducts.value.filter(({ title }) => ~title.indexOf(keyword));

      let products = search(filters.keyword);

      if (filters.sortType === 'asc' || filters.sortType === 'desc') {
        products = sort(filters.sortType, products);
      }

      lastPage.value = Math.ceil(products.length / perPage.value);
      filterProducts.value = products.slice(0, filters.page * perPage.value);
    };

    return {
      ...getProducts.default(),
      stopWatchHandler,
      productsChange,
      filterProducts
    };
  }
});
</script>

<style lang="scss" scoped>
@import './test.scss';

.btn {
  width: 200px;
  height: 50px;
  background-color: red;
}
</style>
