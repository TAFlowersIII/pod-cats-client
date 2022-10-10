import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function NewCat(){
    const [ cat, setCat ] = useState({
        header: '',
        img_Url: '',
        content: '',
        userId: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getUser = async () => {
            try {
                const decodedoken = jwt_decode(localStorage.getItem('jwt'))


                //Passed in the userid from the decoded token
                // response.data["userId"] = decodedoken.id;
                // console.log('response.data:', response.data);
                // console.log('decodeoken.id', decodedoken.id);


                setCat({...cat, userId: decodedoken.id})       
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }                
            }
        }
        getUser()
    }, [])

    const navigate = useNavigate()
    console.log(cat)
    const handleSubmit = async e => {
        try{
            e.preventDefault()
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cats/new`, cat)
            // navigate back to cats
            
            navigate('/feed')
        }catch(err) {
            console.warn(err)
                if(err.response) {
                    setErrorMessage(err.response.data.message)
                }
        }
    }

    return(
        <div>
            <h1>Add a new Cat</h1>
            <p>{errorMessage}</p>

            <form onSubmit={handleSubmit}>
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
                    <label htmlFor='img_Url'>Image URL:</label>
                    <input 
                    type='text' 
                    id='img_Url' 
                    value={cat.img_Url}
                    placeholder='Add a valid image URL' 
                    onChange={e => setCat({...cat, img_Url: e.target.value})}></input>
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
                <button type='submit'>Add to Collection</button>
            </form>
        </div>
    )
}