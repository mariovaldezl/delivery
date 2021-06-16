import React,{useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export const CambioStatus = ({getPedidos,setToggleStatus,idEdit}) => {

	const initialState = {
		estatus:"",
	}

	const [values, setValues] = useState({
		estatus:"",
	});
	const {
		estatus,
	 } = values;

	const updateValues = ({target}) =>{
		setValues({
			...values,
			[target.name] : target.value
		})
	}

	const cambioStatus = async () => {
		await axios.put(`http://localhost:3004/status/${idEdit}`,values)
		.then(res => {
			const array = res.data;
			console.log(array);
			getPedidos();
			swal("Correcto", "Cambio de Estatus", "success");
		})
	}

	return (
		<div className="my-1" style={{marginLeft:100}}>
			<div className="row col-md-8">
				<label className="label-control">Estatus</label>
				<select 
					name="estatus" 
					className="form-control" 
					value={estatus}
					onChange={updateValues}
				>
					<option value="0">Selecciona una opcion</option>
					<option value="1">Proceso</option>
					<option value="2">En camino</option>
					<option value="3">Entregado</option>
				</select>	
			</div>
			<br/>
			<button className="btn btn-danger mt-1" style={{marginRight:5}} onClick={e => setToggleStatus(false)}>
				Cancelar 
			</button>
			<button className="btn btn-primary mt-1" onClick={cambioStatus}>
				Cambiar 
			</button>
		</div>
	)
}