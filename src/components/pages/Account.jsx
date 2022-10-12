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
        <div className='m-10'>
            <div className="w-full mx-auto max-w-xs object-center mt-20">
                <form 
                    onSubmit={updateAccount}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >

                <h1 className='text-3xl font-medium font-serif mb-2'>Account Settings</h1>

                <label 
                    htmlFor='name'
                    className="block text-gray-700 text-sm font-bold mb-2" 
                >
                    Name:
                </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        placeholder={`${decodedoken.name}`}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        required/>

                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor='email'
                    >
                        Email:
                    </label>
                    
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                        type="email"
                        id="email"
                        placeholder={`${decodedoken.email}`}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    required/>

                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor='password'
                    >
                        Current Password:
                    </label>
                    <input 
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        placeholder='*****'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required/>
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor='newPassword'
                    >
                        New Password:
                    </label>
                    <input 
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="newPassword"
                        placeholder='*****'
                        onChange={e => setNewPassword(e.target.value)}
                        value={newPassword}
                        required/>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type='submit'>Submit Changes</button>
            </form>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={deleteUser}>Delete Account</button>
        </div>
    )
}