import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames';
import './memotest.css'

const arrayOrdenadoDeFrutas=["anana",
	"anana",
	"banana",
	"banana",
	"frutilla",
	"frutilla",
	"manzana",
	"manzana",
	"naranja",
	"naranja",
	"pera",
	"pera",
	"sandia",
	"sandia",
	"uva",
	"uva"
]

const cuadroMemotest = (fruta, onClick = ()=>{}, src ) => {
    return(
        <div className='item'>
           <img
            src={src}
            value={fruta}
            alt='carta-memotest'
            onClick={onClick}
            height='150' width='150'
           /> 
    </div>)
}

const useTableroCartas = () => {
    const [frutas, setFrutas] = React.useState(desordenarArray(arrayOrdenadoDeFrutas))
    const clickCuadro = (event) => {
        const fruta = event.target.getAttribute('value')
        
    }


    return {frutas, setFrutas, clickCuadro}
}



const tableroCartas = () =>{

}

function desordenarArray(array){
    return(
        array.sort(()=>{
            return Math.random()-0.5
        })
    )
}