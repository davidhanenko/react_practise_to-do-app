import React, { useState, useEffect } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))
// To see something during LAZY loading of component
// const AddTodo = React.lazy(
//   () =>
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(import('./Todo/AddTodo'))
//       }, 3000)
//     })
// )

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 1500)
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function addTodo(title) {
    setTodos([...todos, { title, id: Date.now, completed: false }])
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>React tutorial</h1>

       <Modal />

        <React.Suspense fallback={<p>Loading of input form...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <h2 style={{ color: 'grey' }}>You don't have any todos...</h2>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
