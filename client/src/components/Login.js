import React,{useState} from 'react'
import axios from 'axios';

const Login = ({setLoginUser}) => {
  
  const [user, setUser] = useState({
      email:"",
      password: ""
  })
  const handleChange = e =>{
    const {name,value} = e.target
    setUser({
    ...user,
    [name]:value
  })
  }

  const login =()=>{
    axios.post("/login",user)
      .then(res=>{alert(res.data.message)
    setLoginUser(res.data.user)})
  }

    return (
      
      <div>

        <h1>Login</h1>

        <form action="#">
            
          <label for="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <label for="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
          />

        </form>

        <button type="submit" onClick={login}>
          Login
        </button>

      </div>

    )
}

export default Login