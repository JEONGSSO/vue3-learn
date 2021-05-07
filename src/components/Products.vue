<template>
  <div>
    <input type="text" name="search" @keyup="search($event.target.value)" />
    <select name="sort" @change="sort($event.target.value)">
      <option value="asc">asc</option>
      <option value="desc">desc</option>
    </select>
  </div>
  <ul class="item_list">
    <li class="item" v-for="product in products" :key="product.id">
      <p>{{ product.title }}</p>
    </li>
  </ul>
  <button class="btn" @click="showMore" v-show="filters.page < lastPage">lead more</button>
</template>

<script lang="ts">
import { toRefs, defineComponent } from 'vue';

export default defineComponent({
  props: {
    products: {
      type: Array,
      required: true
      // validator: (value: string) => {
      //   return ['id'].includes(value);
      // }
    },
    filters: Object,
    lastPage: Number
  },
  emits: ['set-filters'],
  setup(props, { emit }) {
    const search = keyword => {
      emit('set-filters', {
        ...props.filters,
        keyword
      });
    };
    const sort = sortType => {
      emit('set-filters', {
        ...props.filters,
        sortType
      });
    };
    const showMore = () => {
      emit('set-filters', {
        ...props.filters,
        page: props.filters.page + 1
      });
    };

    return {
      search,
      sort,
      showMore,
      ...toRefs(props)
    };
  }
});
</script>

<style lang="scss" scoped>
.item_list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 200px;
  grid-gap: 1rem;
  .item {
    opacity: 0.5;
    &:nth-child(odd) {
      background-color: brown;
    }
    &:nth-child(even) {
      background-color: wheat;
    }
  }
}

.btn {
  width: 200px;
  height: 50px;
  background-color: red;
}
</style>
