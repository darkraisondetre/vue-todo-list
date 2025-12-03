import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    newTodoText: '',
  }),
  actions: {
    addTodo() {
      const text = this.newTodoText.trim()
      if (!text) return

      this.todos.push({
        id: Date.now(),
        text,
        done: false,
      })
      this.newTodoText = ''
    },
    toggleTodo(id) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) todo.done = !todo.done
    },
    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id)
    },
  },
})
