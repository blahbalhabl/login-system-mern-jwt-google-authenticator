import { useState } from 'react';
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const Signup = () => {
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
			const res = await axios.post('/auth/register', inputs);
			if (!res) return console.error('No response from server');

			await axios.post('/auth/login', inputs)
			.then(() => {
				// Handle Login Logic Here
				nav('/');
			})
		} catch (err) {
			console.error(err);
		}
	};
	
  return (
    <div className='h-screen flex justify-center items-center bg-gray-300'>
			<form
				className='flex items-center flex-col gap-5 sm:w-3/4 lg:w-1/4 bg-white p-10 rounded-lg outline outline-1 outline-slate-400'
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
						required
						fullWidth={true}
						onChange={handleChange} />
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
						Signup
				</button>
			</form>
		</div>
  )
}

export default Signup