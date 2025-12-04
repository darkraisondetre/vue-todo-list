<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const { todos, newTodoText } = storeToRefs(todoStore)
const { addTodo, toggleTodo, removeTodo, loadFromStorage } = todoStore
onMounted(() => {
  loadFromStorage()
})
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-slate-900 text-slate-100 rounded-xl shadow-lg">
    <h1 class="text-2x1 font-bold mb-4">Todo List</h1>

    <form class="flex gap-2 mb-4" @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="New Task..."
        class="flex-1 px-3 py-2 rounded border border-slate-700 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        class="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold"
      >
        Добавить
      </button>
    </form>

    <ul class="space-y-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center justify-between px-3 py-2 rounded bg-slate-800"
      >
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="todo.done"
            @change="toggleTodo(todo.id)"
            class="accent-emerald-500"
          />
          <span :class="todo.done ? 'line-through text-slate-400' : ''">{{ todo.text }}</span>
        </label>

        <button class="text-xs text-red-400 hover:text-red-300" @click="removeTodo(todo.id)">
          ×
        </button>
      </li>
    </ul>

    <p v-if="!todos.length" class="text-sm text-slate-400 mt-4">
      Пока пусто, добавь первую задачу.
    </p>
  </div>
</template>
