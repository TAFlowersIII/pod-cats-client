import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { dblClick } from '@testing-library/user-event/dist/click'
import jwt_decode from 'jwt-decode'


export default function Cat({currentUser}) {
    const [cat, setCat] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getCat = async () => {
            try {
                const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`)
                const decodedoken = jwt_decode(localStorage.getItem('jwt'))


                //Passed in the userid from the decoded token
                response.data["userId"] = decodedoken.id;
                // console.log('response.data:', response.data);
                // console.log('decodeoken.id', decodedoken.id);


                setCat(response.data)        
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }                
            }
        }
        getCat()
    }, [])

    console.log(cat)

    const addFavorite = async (e) => {
        try {
            // console.log(cat)
            e.preventDefault()
            // need to determine where this is posting
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cats/new`, cat)
            console.log("the current user is: " + currentUser)
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

            <img src={cat.url} />

            <p>cat details</p>

            <button onClick={addFavorite}>Add to profile</button>
        </div>
    )

}