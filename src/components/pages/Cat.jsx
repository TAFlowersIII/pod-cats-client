import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Cat() {
    const [cat, setCat] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getCat = async () => {
            try {

            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }                
            }
        }
        getCat()
    }, [])

    const addFavorite = async () => {
        try {
            // need to determine where this is posting
            await axios.post(`${process.env.REACT_APP_SERVER_URL}`)
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)               
            }
        }
    }


    return (
        <div>
            <h1>lil cat 🐈‍⬛</h1>

            <p>image of cat</p>

            <p>cat details</p>

            <button onClick={addFavorite}>Add to profile</button>
        </div>
    )

}