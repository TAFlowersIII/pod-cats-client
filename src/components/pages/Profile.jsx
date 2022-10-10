import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Profile({ currentUser, handleLogout }) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')
	const [users, setUsers] = useState([])
	// useEffect for getting the user data and checking auth
	useEffect(() => {
		const fetchData = async () => {
			try {
				// get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
				// hit the auth locked endpoint
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				setMsg(response.data.msg)
			} catch (err) {
				// if the error is a 401 -- that means that auth failed
				console.warn(err)
				if (err.response) {
					if (err.response.status === 401) {
						// panic!
						handleLogout()
					}
				}
			}
		}
		fetchData()
		// console.log(localStorage)
		const getUsers = async () => {
			try{
				// const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`, {_id: currentUser.id})
				console.log(currentUser)
				// console.log(currentUser.id)
				// setUsers(response.data)
				// const foundUser = users.map(user => {
				// 		return(
				// 		user._id
				// 	)
				// })
				// console.log(foundUser)
				//Match user with id
				// const matchedUser = await foundUser.filter(user => user === currentUser.id)
				// console.log(matchedUser)
			}catch(err){
				console.warn(err)
				if(err.response){
					if(err.response){
						setMsg(err.response.data.message)
					}
				}
			}
		}
		getUsers()

	},[])



	// const showCats = user.cats.map(cat => {
	// 		const catComment = cat.comments.map(comment =>{
	// 			<p>{comment}</p>
	// 		})
	// 	return(
	// 	<div key={cat._id}>
	// 		<img src={cat.img_Url} />
	// 		<p>{catComment}</p>
	// 	</div>
	// 	)
	// })

	return (
		<div>
			<h1>Hello, {currentUser.name}</h1>

			<p>your email is {currentUser.email}</p>

			<h2>Here is the secret message that is only availible to users of User App:</h2>

			<h3>{msg}</h3>

			{/* {showCats} */}
		</div>
	)
}