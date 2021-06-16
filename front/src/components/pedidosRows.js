import React from 'react';

export const PedidosRows = ({pedido,eliminarPedido,toggleStateEditor,toggleStateItems,toggleStateStatus}) => (
	<tr key={pedido.id_pedido}>
		<td>{pedido.id_pedido}</td>
		<td>{pedido.estatus === 1 ? 'En proceso':pedido.estatus === 2 ?'En camino' :pedido.estatus === 3 ?'Entregada' : 'Eliminada'}</td>
		<td>{pedido.nombre_cliente}</td>
		<td>{pedido.telefono_cliente}</td>
		<td>$ {pedido.total_pedido}</td>
		<td>
			<button type="button" className="btn btn-primary" style={{marginRight:5}} onClick={e => toggleStateItems(pedido.id_pedido)}>Agregar items</button>
			<button type="button" className="btn btn-warning" style={{marginRight:5}} onClick={e => toggleStateEditor(pedido.id_pedido)}>Editar</button>
			<button type="button" className="btn btn-info" style={{marginRight:5}} onClick={e => toggleStateStatus(pedido.id_pedido)}>Estatus</button>
			<button type="button" className="btn btn-danger" onClick={e => eliminarPedido(e,pedido.id_pedido)}>Borrar</button>
		</td>
	</tr>
);