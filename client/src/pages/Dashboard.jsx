import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../api/axios"

const Dashboard = () => {
	const { auth } = useAuth();
	const [users, setUsers] = useState([]);

	console.log(auth);

	useEffect(() => {
		// Fetch Data using getUsers function
		const getUsers = async () => {
			await axios.get('/users') // TODO: use axiosPrivate for private routes
				.then((res) => {
					setUsers(res.data.users);
				})
		};
		// Call getUsers() Function
		getUsers();
	}, []);

  return (
    <div>
			<h1>Dashboard</h1>	
			<div>
				{
					users.map((user, i) => {
						return (
							<div key={i}>
								<h3>{user.username}</h3>
								<p>{user.email}</p>
							</div>
						)
					})
				}
			</div>
		</div>
  )
};

export default Dashboard