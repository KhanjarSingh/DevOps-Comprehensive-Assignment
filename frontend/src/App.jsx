import './App.css'

import { createUser, getUsers } from './api'
import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleNameInput = (e) => setName(e.target.value)
  const handleEmailInput = (e) => setEmail(e.target.value)

  const loadUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const handleAdd = async () => {
    await createUser({ name, email })
    loadUsers()
  }

  useEffect(() => {
    async function fetchData() {
      await loadUsers()
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>User Management</h1>

      <div className='inputs'>
        <input placeholder="Name" onInput={handleNameInput} type='text' />
        <input placeholder="Email" onInput={handleEmailInput} type='email' />
        <button onClick={handleAdd}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
