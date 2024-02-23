import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Dashboard = () => {
	const { auth } = useAuth();
	const nav = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const [users, setUsers] = useState([]);
	const [request, setRequest] = useState(false);

	const tryCallaback = () => {
		console.log('callback works');
	};

	useEffect(() => {
		if (!auth) nav('/auth/login');
		// Fetch Data using getUsers function
		const getUsers = async () => {
			await axiosPrivate.get('/users')
				.then((res) => {
					setUsers(res.data.users);
				})
				.catch((err) => {
					setUsers([]);
					throw new Error(err);
				});
		};
		// Call getUsers() Function
		getUsers();
	}, [request]);

  return (
    <div>
			<h1>Dashboard</h1>
			<Modal
				text='Show Users'
				title='Users' 
				callback={tryCallaback}>
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
				<button
				className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-700 rounded-md"
				onClick={() => setRequest(!request)}>
				Refresh
				</button>
				</div>
			</Modal>
		</div>
  )
};

export default Dashboard