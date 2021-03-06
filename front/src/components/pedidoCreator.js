import React,{useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export const PedidoCreator = ({getPedidos}) => {

	const initialState = {
		nombre_cliente:"",
		estatus:"",
		medio_pago:"",
		total_pedido:"",
		subtotal_pedido:"",
		descuento:"",
		cupo_descuento:"",
		telefono_cliente:"",
		info_repartidor:"",
		origen:""
	}

	const [values, setValues] = useState({
		nombre_cliente:"",
		estatus:"",
		medio_pago:"",
		total_pedido:"",
		subtotal_pedido:"",
		descuento:"",
		cupo_descuento:"",
		telefono_cliente:"",
		info_repartidor:"",
		origen:""
	});
	const {
		nombre_cliente,
		estatus,
		medio_pago,
		total_pedido,
		subtotal_pedido,
		descuento,
		cupo_descuento,
		telefono_cliente,
		info_repartidor,
		origen
	 } = values;

	const updateValues = ({target}) =>{
		setValues({
			...values,
			[target.name] : target.value
		})
	}

	const agregarPedido = async () => {
		await axios.post(`http://localhost:3004`,values)
		.then(res => {
			const array = res.data;
			console.log(array);
			getPedidos();
			swal("Correcto", "Pedido agregado", "success");
		})
	}

	return (
		<div className="my-1" style={{marginLeft:100}}>
			<div className="row col-md-8">
				<label className="label-control">Nombre del Cliente</label>
				<input
					type="text"
					name="nombre_cliente"
					className="form-control"
					placeholder="Nombre del cliente"
					value={nombre_cliente}
					onChange={updateValues}
				/>	
			</div>
			<br/>
			<div className="row col-md-8">
				<label className="label-control">Telefono del Cliente</label>
				<input
					type="text"
					name="telefono_cliente"
					placeholder="Telefono del cliente"
					className="form-control"
					value={telefono_cliente}
					onChange={updateValues}
				/>
			</div>
			<br/>
			<div className="row col-md-8">
				<label className="label-control">Medio de pago</label>
				<select 
					name="medio_pago" 
					className="form-control" 
					value={medio_pago}
					onChange={updateValues}
				>
					<option value="0">Selecciona una opcion</option>
					<option value="1">Efectivo</option>
					<option value="2">Tarjeta</option>
				</select>
			</div>
			<br/>
			<div className="row col-md-8">
				<label className="label-control">Origen</label>
				<select 
					name="origen" 
					className="form-control" 
					value={origen}
					onChange={updateValues}
				>
					<option value="0">Selecciona una opcion</option>
					<option value="tienda">Tienda</option>
					<option value="didi">Didi</option>
					<option value="uber">Uber Eats</option>
					<option value="rappi">Rappi</option>
				</select>
			</div>
			<br/>
			<div className="row col-md-8">
				<label className="label-control">Info del Repartidor</label>
				<textarea
					type="text"
					name="info_repartidor"
					placeholder="Informaci??n del repartidor"
					className="form-control"
					value={info_repartidor}
					onChange={updateValues}
				/>
			</div>
			<br/>
			<button className="btn btn-primary mt-1" onClick={agregarPedido}>
				Guardar 
			</button>
		</div>
	)
}