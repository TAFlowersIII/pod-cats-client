import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<section>
			{/* if the user is logged in... */}
			<Link to="/profile">
				Profile
			</Link>
			<> | </>
			<Link to="/">
				<span onClick={handleLogout}>Logout</span>
			</Link>
			<> | </>
			
			
			
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
		// <div className='container'>
		<nav className='navbar navbar-expand-xl bg-dark'>
			<div className='container'>
				<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color: 'white'}}>Cat Menu</a>
				<li className="nav-item dropdown" >
					<ul className="dropdown-menu">
						<li className='dropdown-item'><Link to="/cats/new">Post your 🐾</Link></li>
						<li className='dropdown-item'><Link to="/cats">Random Cats</Link></li>
						<li className='dropdown-item'><Link to="/feed">Cat Feed</Link></li>
						<li className='dropdown-item'><Link to="/about">About the Dev team</Link></li>
					</ul>
				</li>
				<div  style={{color: 'white'}}>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className='nav-item'> {' | '}<Link to="/"> Homepage</Link>{' | '}</li>
						
						<li className='nav-item'>{currentUser ? loggedIn : loggedOut}</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}