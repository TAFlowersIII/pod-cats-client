import React from 'react';
import { Link } from 'react-router-dom'

export default function Welcome() {
	return (
		<div>
			<h1>Welcome To Pod Cats!</h1>
			<h3>Browse some cats, and save your favorites!</h3>
		<br></br>
			<img src="https://coed.com/wp-content/uploads/2018/01/shutterstock_1031589889.jpg" alt="a picture of a smiling kitten"></img>
		<br></br>
			<p>“Owners of dogs will have noticed that, if you provide them with food and water and shelter and affection, they will think you are God. Whereas owners of cats are compelled to realize that, if you provide them with food and water and affection, they draw the conclusion that they are God.” – Christopher Hitchens</p>

			<Link to={"./Login"}>
				<button>Click To Log In</button>
			</Link>
			
			
		

		</div>
	)
}