import { Routes, Route } from 'react-router-dom'
import {  RegisterForm } from './components/register/RegisterForm'
import { LoginForm } from './components/login/LoginForm'
import './App.css'

function App() {
  return (
    <div className="App">
        <Routes>
    <Route path="/" element={<RegisterForm />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path='*' element={<RegisterForm />} />
  </Routes>
    </div>
  )
}

export default App
