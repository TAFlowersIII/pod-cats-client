import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<section>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>
			<> | </>
			<Link to="/profile">
				profile
			</Link>
			<> | </>
			<Link to="/cats/new">
				Add your cat
			</Link>
		</section>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>

			<Link to="/login">
				login
			</Link>
		</>
	 )

	return (
		<nav>
			{currentUser ? loggedIn : loggedOut}

			{/* user always sees this section */}
			<Link to="/">
				<p>User App</p>
			</Link>

			<Link to="/cats">
				<p>see some cats</p>
			</Link>
			
			<Link to="/feed">
				<p>Cat feed</p>
			</Link>

			<Link to="/about">
				<p>About the dev team</p>
			</Link>

		</nav>
	)
}