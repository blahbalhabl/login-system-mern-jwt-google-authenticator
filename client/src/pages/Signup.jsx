import { useEffect, useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';

const Signup = () => {
	const { auth, setAuth } = useAuth();
	const [inputs, setInputs] = useState({});
	const nav = useNavigate();
	const loc = useLocation();
	const from = loc.state?.from.pathname || '/';

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
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
		const isLoggedIn = () => {
			if (!auth) return
			nav(from, { replace: true });
		};

		isLoggedIn();
	}, []);
	
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
						fullWidth={true}
						onChange={handleChange} />
					<TextField
						className='caret-blue-600'
						name="email"
						id="email" 
						label="Email" 
						variant="outlined"
						type='email'
						required
						fullWidth={true}
						onChange={handleChange} />
					<TextField
						className='caret-blue-600'
						name="password"
						id="password" 
						label="Password" 
						variant="outlined"
						type='password'
						required
						fullWidth={true}
						onChange={handleChange} />
				</div>
				<button
					className='w-2/3 bg-blue-500 text-white text-xl font-semibold py-1  hover:bg-blue-700 rounded-md'
					onClick={handleSubmit}>
						Signup
				</button>
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