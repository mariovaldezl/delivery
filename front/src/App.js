import React,{useState,useEffect} from 'react';
import {PedidosRows} from './components/pedidosRows';
import {PedidosHeader} from './components/pedidosHeader';
import {PedidoCreator} from './components/pedidoCreator';
import {PedidoEditor} from './components/pedidoEditar';
import {AgregarItems} from './components/agregarItems';
import {CambioStatus}from './components/cambioStatus';
import axios from 'axios';
import swal from 'sweetalert';

function App() {

  const [pedidos, setPedidos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [idEdit, setIdEdit] = useState('');
  const [toggleItems, setToggleItems] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);

  const pedidosTable = () => (
    pedidos.map(pedido => (
      <PedidosRows 
      pedido={pedido} 
      key={pedido.id_pedido} 
      eliminarPedido={eliminarPedido}
      toggleStateEditor={toggleStateEditor}
      toggleStateItems={toggleStateItems}
      toggleStateStatus={toggleStateStatus}
      />
    ))
  );
  const getPedidos = async () => {
    await axios.get(`http://localhost:3004`)
      .then(res => {
        const array = res.data;
        setPedidos(array);
      })
  }
  useEffect(() => {
    getPedidos();
  }, [])

  const toggleState = () => setToggle(!toggle)
  const toggleStateEditor = (id) => {
    setIdEdit(id);
    setToggleEditor(!toggleEditor);
  }
  const toggleStateItems = (id) => {
    setIdEdit(id);
    setToggleItems(!toggleItems);
  }
  const toggleStateStatus = (id) => {
    setIdEdit(id);
    setToggleStatus(!toggleStatus);
  }

  const eliminarPedido = async (e,id) => {
    e.preventDefault()
		await axios.delete(`http://localhost:3004/${id}`)
		.then(res => {
			const array = res.data;
			console.log(array);
			getPedidos();
      swal("Correcto", "Pedido eliminado", "success");
		})
	}

 

  return (
    <div>
      <PedidosHeader noPedidos={pedidos.length}/>
      <table className="table table-striped table-border">
        <thead>
          <tr>
            <td>No. pedido</td>
            <td>Estatus</td>
            <td>Nombre</td>
            <td>Telefono</td>
            <td>Total</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {pedidosTable()}
        </tbody>
      </table>
      <br/>
      <button className="btn btn-success mt-1" style={{ marginLeft:'30px',marginBottom:'30px'}} onClick={e => toggleState()}>
				Agregar Pedigo
			</button>
      <br/>
      {toggle ?
      <PedidoCreator getPedidos={getPedidos}/>
      :null}
      {toggleEditor ?
      <PedidoEditor toggleEditor={toggleEditor} setToggleEditor={setToggleEditor} getPedidos={getPedidos} idEdit={idEdit}/>
      :null}
      {toggleItems ?
      <AgregarItems toggleItems={toggleItems} setToggleItems={setToggleItems} getPedidos={getPedidos} idEdit={idEdit}/>
      :null}
      {toggleStatus ?
      <CambioStatus toggleStatus={toggleStatus} setToggleStatus={setToggleStatus} getPedidos={getPedidos} idEdit={idEdit}/>
      :null}

    </div>
  );
}

export default App;
