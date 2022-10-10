import { useParams, useNavigate, navigate } from 'react-router-dom'
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

                console.log(response.data)
                setCat({...cat,
                    img_Url: response.data.url,
                    catId: response.data.id,
                    userId: decodedoken.id})
                //Passed in the userid from the decoded token
                // response.data["userId"] = decodedoken.id;
                // console.log('response.data:', response.data);
                // console.log('decodeoken.id', decodedoken.id);


                // setCat(response.data)        
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

    const addFavorite = async e => {
        try {
            e.preventDefault()
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cats/new`, cat)
            // console.log("the current user is: " + currentUser)
            // navigation not functional
            navigate('/profile')
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

            <img src={cat.img_Url} />

            <p>cat details</p>
            <form onSubmit ={addFavorite}>
            <div>
                    <label htmlFor='header'>Your cat's name:</label>
                    <input 
                    type='text' 
                    id='header' 
                    value={cat.header}
                    placeholder="Mister Snuggles"
                    onChange={e => setCat({...cat, header: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor='content'>Description:</label>
                    <input 
                    type='text' 
                    id='content' 
                    value={cat.content}
                    placeholder='Describe your cat...' 
                    onChange={e => setCat({...cat, content: e.target.value})}></input>
                </div>
            <button type='submit'>Add to Profile</button>
            </form>
            {/* <button onClick={addFavorite}>Add to profile</button> */}
        </div>
    )

}