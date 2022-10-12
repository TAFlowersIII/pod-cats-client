import React from 'react';
import { Link } from 'react-router'

export default function About() {
     return (
          <div>
               <h1>About Pod Cats:</h1>
               <h3>In software engineering, group projects are considered especially challenging.</h3>
               <h3>At General Assembly, the dedicated web developers who love their pet cats have created this website known as Pod Cats.</h3>
               <h3>These are their stories.</h3>

               <br></br>
               <br></br>
               <br></br>

               {/* Thomas: */}
               <div>
                    <img src='https://cdn2.thecatapi.com/images/16h.jpg'></img>
                    <br></br>
                    <h1>Thomas</h1>
                    <br></br>
                    <h4>Thomas is a grumpy old man on the outside, but a lil cutie patootie on the inside. He enjoys weird and obscure music, long bike rides through nature, deep talks about philosophy/the state of humanity, and immature humor- although he pretends to enjoy immature humor ironically. He is too hip and cool for his own damn good.</h4>
               </div>
               
          </div>
     )
}