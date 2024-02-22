import useAuth from "../hooks/useAuth"

const Profile = () => {
  const { auth } = useAuth();

  return (
    <div>
      Profile for user: {auth?.username}
    </div>
  )
}

export default Profile