import { useState } from "react"
import { supabase } from "./lib/supabase"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // REGISTER
  const signUp = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    console.log("REGISTER DATA:", data)
    alert("Check your email (or auto login if disabled confirm email)")
  }

  // LOGIN
  const login = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    console.log("LOGIN DATA:", data)
    alert("Logged in successfully")
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Auth</h2>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={signUp} disabled={loading}>
        Register
      </button>

      <button onClick={login} disabled={loading}>
        Login
      </button>
    </div>
  )
}