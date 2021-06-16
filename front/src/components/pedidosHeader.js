import React,{Fragment} from 'react';

export const PedidosHeader = ({noPedidos}) => (
	<div className="bg-primary text-white p-4">
		<h3 className="text-center ">
			Delivery Krispy Kreme {noPedidos} Pedidos
		</h3>
	</div>
)