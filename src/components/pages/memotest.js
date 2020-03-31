import React, {useState} from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames';
import './memotest.css'
import image from './memotest/color-fondo.jpg'

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

const CuadroMemotest = ({fruta, clickFuncion = ()=>{}, src} ) => {

    return(
        <div className='item'>
           <img
            src={src}
            value={fruta}
            alt='carta-memotest'
            onClick={() => {clickFuncion()}}
            height='150' width='150'
           /> 
    </div>)
}



const useTableroCartas = () => {
	const [frutas, setFrutas] = React.useState(crearObjetoFrutas(arrayOrdenadoDeFrutas))
	console.log(frutas)

	/* const inicarJuego = (boton) => {
		boton.setAttribute('disabled')
	} */

	const clickCuadro = (fruta, index) => {
		const nuevoFrutas = [...frutas]
		nuevoFrutas[index] = {fruta : fruta,
							  src: require(`./memotest/${fruta}.jpg`),
							  estado : true}
		setFrutas(nuevoFrutas)
	}

	const evaluarJuego = () => {
		const indexs = []

		frutas.forEach((e,index)=>{
			if(e.estado === true){
				indexs.push(index)
			}
		})

		if(indexs.length === 2){
			frutas[indexs[0]].fruta === frutas[indexs[1]].fruta ? 
				setTimeout(quitarCartas,500,indexs[0],indexs[1]) : setTimeout(ocultarCartas,500,indexs[0],indexs[1])
		}

	}

	const quitarCartas = (indice1, indice2) => {
		const newFrutas = [...frutas]

		newFrutas[indice1] = {
			fruta : null,
			src : require('./memotest/fondo.jpg'),
			estado : 'resuelto'
		}

		newFrutas[indice2] = {
			fruta : null,
			src : require('./memotest/fondo.jpg'),
			estado : 'resuelto'
		}

		setFrutas(newFrutas)
	}


	const ocultarCartas = (indice1, indice2) => {
		const newFrutas = [...frutas]

		newFrutas[indice1].estado = false
		newFrutas[indice1].src = require('./memotest/color-fondo.jpg')

		newFrutas[indice2].estado = false
		newFrutas[indice2].src = require('./memotest/color-fondo.jpg')

		setFrutas(newFrutas)
	}

	evaluarJuego()
    return {frutas, clickCuadro}
}




const TableroCartas = () => {
	const {frutas, clickCuadro} = useTableroCartas()
	
    return(
		<>
		<div className='container'>
			{frutas.map((e,index) => (
				
				<CuadroMemotest fruta={e.fruta} 
								clickFuncion={e.estado===false && (()=>{clickCuadro(e.fruta, index)})}
								src={e.src}
								key={index}/>
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
	desordenado.forEach(e => frutas.push({
		fruta : e,
		src : require('./memotest/color-fondo.jpg'),
		estado : false  				// va a poder ser true, tambien 'resuelto', y 'evaluando'
	}))

	return frutas
}