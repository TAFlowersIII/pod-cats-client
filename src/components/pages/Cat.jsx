import { useParams, useNavigate, navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { dblClick } from '@testing-library/user-event/dist/click'
import jwt_decode from 'jwt-decode'


export default function Cat({currentUser, setCurrentUser }) {
    const [cat, setCat] = useState({
        header: '',
        content: '',
        img_Url: '',
        catId: '',
        userId: '',
        _id: 'something'
    })
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getCat = async () => {
            try {
                const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`)
                const decodedoken = jwt_decode(localStorage.getItem('jwt'))

                // console.log(response.data)
                setCat({...cat,
                    header: '',
                    content: '',
                    img_Url: response.data.url,
                    catId: response.data.id,
                    userId: decodedoken.id,
                })
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
            //get userId
            const decodedoken = jwt_decode(localStorage.getItem('jwt'))
            // make a copy of the cats array
            let emptyArray = [...currentUser.cats]
            // post to the backend as req.body
            // const catId = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cats/new`, cat)
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cats/new`, cat).then(catId=>{
                    console.log('CAT IDIDIDIDIDI', catId.data.catId)
                    // add cat to cats array
                    const something = {
                    header: cat.header,
                    content: cat.content,
                    img_Url: cat.img_Url,
                    catId: cat.catId,
                    userId: cat.userId,
                    _id: catId.data.catId}
                    console.log('NEWOBJECT', something)
                    setCat(something)
                    // console.log(''cat)
                    console.log('THIS IS CAT STATE',cat)
                    emptyArray.push(something)
            })
            
            
            // getting current user
            const cats = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${decodedoken.id}`)

            const thisUser = {...currentUser}
            console.log(thisUser, "THIS EFFIN USER")
            thisUser.cats = emptyArray
            setCurrentUser(thisUser)
            // setCurrentUser(...currentUser)
            navigate('/feed')
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
                    onChange={e => setCat({...cat, header: e.target.value})}
                    required
                    ></input>
                </div>
                <div>
                    <label htmlFor='content'>Description:</label>
                    <input 
                    type='text' 
                    id='content' 
                    value={cat.content}
                    placeholder='Describe your cat...' 
                    onChange={e => setCat({...cat, content: e.target.value})}
                    required
                    ></input>
                </div>
                <input hidden></input>
            <button type='submit'>Add to Profile</button>
            </form>
            {/* <button onClick={addFavorite}>Add to profile</button> */}
        </div>
    )

}