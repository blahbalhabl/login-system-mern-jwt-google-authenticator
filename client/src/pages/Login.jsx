import { useState } from "react"
import axios from "../api/axios"
import useAuth from "../hooks/useAuth"
import { TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const nav = useNavigate();
  const { setAuth } = useAuth();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post('/auth/login', inputs)
      .then((res) => {
        setAuth(res.data.user);
        nav('/');
      })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <form 
        className="flex items-center flex-col gap-5 sm:w-3/4 lg:w-1/4 bg-white p-10 rounded-lg outline outline-1 outline-slate-400"
        onSubmit={handleSubmit}>
        <h1 className='text-2xl font-semibold text-blue-600'>
          Sign In
        </h1>
        <div className='flex flex-col gap-5 w-full'>
          <TextField
            className='caret-blue-600'
            name="email"
            id="email" 
            label="Email" 
            variant="outlined"
            required
            fullWidth={true}
            onChange={handleChange} />
          <TextField
            className='caret-blue-600'
            name="password"
            id="password" 
            label="Password" 
            variant="outlined"
            required
            fullWidth={true}
            onChange={handleChange} />
        </div>
				<button
					className='bg-blue-500 text-white px-4 py-2  hover:bg-blue-700 rounded-md'
					onClick={handleSubmit}>
            Log In
				</button>
      </form>
    </div>
  )
}

export default Login