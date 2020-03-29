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

// crear un Reactelement para el boton y el contador
// Crear una funcion en useTableroCartas que desactive el contador mientras el juego se encuentre activo
// Ver como mierda hacer el contador

const useTableroCartas = () => {
	const [frutas, setFrutas] = React.useState(crearObjetoFrutas(arrayOrdenadoDeFrutas))

	const inicarJuego = (boton) => {
		boton.setAttribute('disabled')
	}

	
    return {frutas, setFrutas}
}

const evaluarJuego = (frutas, funcionSetFrutas) => {
	const frutasClickeadas = []
	const indexFrutas = []

	frutas.forEach((e,index) => {
		Object.entries(e).forEach(([fruta,estado]) => {
			if(estado){
				frutasClickeadas.push(fruta)
				indexFrutas.push(index)
			}
		})
	})

	if(frutasClickeadas.length === 2){
		if(frutasClickeadas[0] === frutasClickeadas[1]){
			let newFrutas = frutas
			newFrutas[indexFrutas[0]] = {}
		}
	}
}


const TableroCartas = () => {
	const {frutas, setFrutas} = useTableroCartas()
	
    return(
		<>
		<div className='container'>
			{frutas.map((e,index)=>(
				Object.entries(e).map(([fruta, estado])=>(
					<div className='item' key={index}>
						<img 
							src={estado ? require(`./memotest/${fruta}.jpg`) : require('./memotest/color-fondo.jpg')}
							alt='carta-memotest'
							width='150' height='150'
							value={fruta}
							onClick={event => {
								const frutasNuevo = [...frutas]
								const frutaParticular = event.target.getAttribute('value')
								frutasNuevo[index] = { [frutaParticular] : true}
								setFrutas(frutasNuevo)
							}}>
						</img>
					</div>
				))
			))}
		</div>
		<div id='manejo-del-juego'>
			<button className='boton-comenzar'>Comenzar</button>
		</div>
		</>
    )
}

export default TableroCartas



function crearObjetoFrutas(array){
	let desordenado=array.sort(
		function(){
			return Math.random()-0.5
	})
	
	const frutas = []
	desordenado.forEach(e => frutas.push({[e] : false}))

	return frutas
}