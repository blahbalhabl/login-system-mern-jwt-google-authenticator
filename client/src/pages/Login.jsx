/**
 * @param {object} inputs - The inputs object
 */

import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import axios from "../api/axios"
import useAuth from "../hooks/useAuth"
import useIsAuthenticated from "../hooks/useIsAuthenticated"
import Button from "../components/Button"
import ProtectedField from "../components/ProtectedField"
import { TextField } from "@mui/material"
import { toast } from "react-toastify"

const Login = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from.pathname || '/';

  const { auth, setAuth } = useAuth();
  const isLoggedIn = useIsAuthenticated();

  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);

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
        setError(false);
        nav(from, { replace: true });
        toast(res.data.msg, { type: 'success' });
      })
    } catch (err) {
      setError(true);
      toast(err.response.data.msg, { type: 'error' });
      throw new Error(err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [auth]);

  return (
    <div className="flex h-screen justify-center items-center">
      <form 
        className="flex items-center flex-col gap-5 sm:w-3/4 lg:w-1/4 bg-white p-10 rounded-lg outline outline-1 outline-slate-200"
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
            error={error}
            type='email'
            required
            fullWidth
            onChange={handleChange} 
          />
          <ProtectedField
            className='caret-blue-600'
            name="password"
            id="password" 
            label="Password" 
            variant="outlined"
            error={error}
            value={inputs.password}
            required
            fullWidth
            onChange={handleChange}
          />
        </div>
        <Button
          className='text-white text-xl font-semibold'
          type='primary'
          label='Sign In'
          onClick={handleSubmit}
          fullWidth
        />
        <Link
          className="hover:underline text-blue-600 text-sm font-semibold"
          to='/auth/register'>
            Create New Account
        </Link>
      </form>
    </div>
  )
}

export default Login