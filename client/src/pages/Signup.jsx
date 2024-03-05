import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
import Button from '../components/Button';
import ProtectedField from '../components/ProtectedField';
import { TextField } from '@mui/material';


const Signup = () => {
	const { auth, setAuth } = useAuth();
	const [inputs, setInputs] = useState({});

	const nav = useNavigate();
	const isLoggedIn = useIsAuthenticated();
	const loc = useLocation();
	const from = loc.state?.from.pathname || '/';

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const isPasswordMatch = () => {
		// returns true if the passwords do not match
		return inputs.password !== inputs.confirmPassword;
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await axios.post('/auth/register', inputs)
				.then( async () => {
					await axios.post('/auth/login', inputs)
						.then((res) => {
							setAuth(res.data.user)
							nav(from, { replace: true });
						})
				})
				.catch((err) => {
					throw new Error(err);
				});
		} catch (err) {
			throw new Error(err);
		}
	};

	useEffect(() => {
		isLoggedIn();
	}, [auth]);
	
  return (
    <div className='flex h-screen justify-center items-center'>
			<form
				className='flex items-center flex-col gap-5 sm:w-3/4 lg:w-1/4 bg-white p-10 rounded-lg outline outline-1 outline-slate-200'
				onSubmit={handleSubmit}>
				<h1 className='text-2xl font-semibold text-blue-600'>
					Welcome New User!
				</h1>
				<div className='flex flex-col gap-5 w-full'>
					<TextField
						className='caret-blue-600'
						name="username"
						id="username" 
						label="Username" 
						variant="outlined"
						type='text'
						required
						fullWidth
						onChange={handleChange} />
					<TextField
						className='caret-blue-600'
						name="email"
						id="email" 
						label="Email" 
						variant="outlined"
						type='email'
						required
						fullWidth
						onChange={handleChange} />
					<ProtectedField
						className='caret-blue-600'
						name="password"
						id="password"
						label="Password" 
						variant="outlined"
						error={isPasswordMatch()}
						required
						fullWidth
						onChange={handleChange} />
					<ProtectedField
						className='caret-blue-600'
						name="confirmPassword"
						id="confirmPassword"
						label="Confirm Password" 
						variant="outlined"
						helperText={isPasswordMatch() ? '' : 'Passwords do not match'}
						error={isPasswordMatch()}
						required
						fullWidth
						onChange={handleChange} />
				</div>
				<Button
          className='text-white text-xl font-semibold'
          type='primary'
          label='Sign Up'
          onClick={handleSubmit}
          fullWidth
        />
				<Link
          className="hover:underline text-blue-600 text-sm font-semibold"
          to='/auth/login'>
            Sign in instead
        </Link>
			</form>
		</div>
  )
}

export default Signup