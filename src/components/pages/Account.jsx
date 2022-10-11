import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

export default function Account({currentUser, handleLogout}) {
    const [userId, setUserId ] = useState({})
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

    return(
        <div>
            Account Settings
            <button onClick={deleteUser}>Delete Account</button>

        </div>
    )
}