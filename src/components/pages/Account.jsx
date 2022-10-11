import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

export default function Account({currentUser, handleLogout, setCurrentUser}) {
    const decodedoken = jwt_decode(localStorage.getItem('jwt'))
    const [name, setName] = useState(decodedoken.name)
	const [email, setEmail] = useState(decodedoken.email)
	const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const navigate = useNavigate()
    
    const deleteUser = async e => {
        try {
            e.preventDefault()
            const decodedoken = jwt_decode(localStorage.getItem('jwt'))
            // console.log(currentUser.currentUser._id)
            // console.log('hello')
             await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${decodedoken.id}`)
             handleLogout()
             navigate('/register')
        }catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)               
            }
        }
    }

    const updateAccount = async e => {
        try {
            const reqBody = {
				name,
				email, 
				password,
                newPassword
			}
            const decodedoken = jwt_decode(localStorage.getItem('jwt'))
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${decodedoken.id}`, reqBody)

            const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)
        }catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setErrorMessage(err.response.data.msg)
				}
			}
		}
    }
    return(
        <div>
            <h1>Account Settings</h1>
            <div style={{display: 'inline-block'}}>
                <h3>Update Account</h3>
            <form onSubmit={updateAccount}>
                <label htmlFor='name'>Name:</label>
                    <input 
                        type="text"
                        id="name"
                        placeholder={`${decodedoken.name}`}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        required/>

                    <label htmlFor='email'>Email:</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder={`${decodedoken.email}`}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    required/>

                    <label htmlFor='password'>Password:</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder='*****'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required/>
                    <label htmlFor='password'>New Password:</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder='*****'
                        onChange={e => setNewPassword(e.target.value)}
                        value={newPassword}
                        required/>
                    <button type='submit'>Submit Changes</button>
            </form>
            </div>
            <button onClick={deleteUser}>Delete Account</button>

        </div>
    )
}