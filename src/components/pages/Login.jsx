import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div className='md:flex md:justify-center m-10'>

			<p>{msg}</p>
			<div className="w-full max-w-xs object-center">
				<form 
					onSubmit={handleSubmit}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					>
					<p className='text-3xl font-bold mb-10'>Welcome back!</p>
					<label 
						className="block text-gray-700 text-sm font-bold mb-2" 
						htmlFor='email'
					>
						Email:
					</label>
					<input 
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="email"
						id="email"
						placeholder='your email...'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>

					<label 
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor='password'
					>
						Password:
					</label>
					
					<input 
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						id="password"
						placeholder='password...'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>

					<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</button>

				</form>
				<p>Don't have an account?</p>

				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> 
					<Link to='/register'>Register here!</Link>
				</button>
			</div>
		</div>
	)
}