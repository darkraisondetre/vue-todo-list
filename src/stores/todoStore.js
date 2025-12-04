import { defineStore } from 'pinia'

const STORAGE_KEY = 'todo-list'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    newTodoText: '',
  }),
  actions: {
    loadFromStorage() {
      const raw = localStorage.getItem(STORAGE_KEY)

      if (!raw) return

      try {
        this.todos = JSON.parse(raw)
      } catch (e) {
        console.error('Failed to parse todos from storage:', e)
      }
    },
    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo() {
      const text = this.newTodoText.trim()
      if (!text) return

      this.todos.push({
        id: Date.now(),
        text,
        done: false,
      })
      this.newTodoText = ''
      this.saveToStorage()
    },
    toggleTodo(id) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) {
        todo.done = !todo.done
        this.saveToStorage()
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id)
      this.saveToStorage()
    },
    markAllDone() {
      this.todos.forEach((t) => (t.done = true))
      this.saveToStorage()
    },
  },
})
