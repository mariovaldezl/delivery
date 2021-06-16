import React,{useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export const AgregarItems = ({getPedidos,setToggleItems,idEdit}) => {

	const initialState = {
		items:"",
		precio:"",
		modificadores:"",
		extras:""
	}

	const [values, setValues] = useState({
		items:"",
		precio:"",
		modificadores:"",
		extras:""
	});
	const {
		items,
		precio,
		modificadores,
		extras
	 } = values;

	const updateValues = ({target}) =>{
		setValues({
			...values,
			[target.name] : target.value
		})
	}

	const agregarItems = async () => {
		console.log(idEdit);
		const objeto = values;
		objeto.id_pedido = idEdit;
		console.log(objeto);
		await axios.post(`http://localhost:3004/items`,objeto)
		.then(res => {
			const array = res.data;
			console.log(array);
			getPedidos();
			swal("Correcto", "Items agregados", "success");
		})
	}

	return (
		<div className="my-1" style={{marginLeft:100}}>
			<div className="row col-md-8">
				<label className="label-control">Producto</label>
				<select 
					name="items" 
					className="form-control" 
					value={items}
					onChange={updateValues}
				>
					<option value="0">Selecciona una opcion</option>
					<option value="Cafe">Cafe</option>
					<option value="Dona">Dona</option>
					<option value="Capuccino">Capuccino</option>
					<option value="Bebida">Bebida</option>
				</select>	
			</div>
			<br/>
			<div className="row col-md-8">
				<label className="label-control">Precio</label>
				<input
					type="text"
					name="precio"
					placeholder="Precio"
					className="form-control"
					value={precio}
					onChange={updateValues}
				/>
			</div>
			<br/>
			<div className="row col-md-8">
				<label className="label-control">Modificadores</label>
				<input
					type="text"
					name="modificadores"
					placeholder="modificadores"
					className="form-control"
					value={modificadores}
					onChange={updateValues}
				/>
			</div>
			<br/>
			<div className="row col-md-8">
				<label className="label-control">Extras</label>
				<input
					type="text"
					name="extras"
					placeholder="extras"
					className="form-control"
					value={extras}
					onChange={updateValues}
				/>
			</div>
			<br/>
			<button className="btn btn-danger mt-1" style={{marginRight:5}} onClick={e => setToggleItems(false)}>
				Cancelar 
			</button>
			<button className="btn btn-primary mt-1" onClick={agregarItems}>
				Agregar 
			</button>
		</div>
	)
}