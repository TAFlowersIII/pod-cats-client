import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<section>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>Logout</span>
			</Link>
			<> | </>
			<Link to="/profile">
				Profile
			</Link>
			<> | </>
			<Link to="/cats/new">
				Add your cat!
			</Link>
		</section>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				Register
					</Link>
			{' | '}
			<Link to="/login">
				Login
			</Link>
		</>
	 )

	return (
		<nav>
			{currentUser ? loggedIn : loggedOut}

			{/* user always sees this section */}
			{' | '}
			<Link to="/">
				Homepage
			</Link>
			{' | '}
			<Link to="/cats">
				Random Cats
			</Link>
			{' | '}
			<Link to="/feed">
				Cat Feed
			</Link>
			{' | '}
			<Link to="/about">
				About the Dev team
			</Link>
			{' | '}
		</nav>
	)
}