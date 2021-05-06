import { Component } from 'vue';
import { createStore } from 'vuex';
import { mount, DOMWrapper, shallowMount } from '@vue/test-utils';

import { State, state } from '../store/modules/todo/state';
import actions from '../store/modules/todo/actions';
import mutations from '../store/modules/todo/mutations';
import getters from '../store/modules/todo/getters';

import TodoMain from '../components/todo/Main.vue';
import TodoList from '../components/todo/List.vue';
import TodoFilter from '../components/todo/Filter.vue';

// 실패 -> 성공 -> 리팩토링
describe('todoList function test', () => {
  const store = createStore({
    state,
    actions,
    mutations,
    getters
  });

  const mountOption = (store: object): object => {
    return {
      global: {
        plugins: [store]
      }
    };
  };

  it('add Todo Item', async () => {
    const payload: object = { title: 'Post', done: false };
    await store.dispatch('addTodo', payload);

    expect(state.todoList).toEqual([
      { title: 'vue3', done: false },
      { title: 'tdd', done: true },
      { title: 'learn', done: false },
      { title: 'Post', done: false }
    ]);
  });

  it('delete Todo Item', async () => {
    const idx = 0;

    await store.dispatch('removeTodo', idx);
    expect(state.todoList).toEqual([
      { title: 'tdd', done: true },
      { title: 'learn', done: false },
      { title: 'Post', done: false }
    ]);
  });

  it('Modify Todo Item', async () => {
    const idx = 1;
    const payload = { title: 'learn', done: true };
    await store.dispatch('modifyTodo', { idx, payload });
    expect(state.todoList[idx].done).toBe(true);
  });

  it('done list after button click', async () => {
    const wrapper: Component = mount(TodoFilter, mountOption(store));
    const target: DOMWrapper<Element> = wrapper.find('.toggle_wrap button');
    await target.trigger('click');
    expect(store.state.doneView).toBe(true);
  });
});
