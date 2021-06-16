const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/', (req, res) => {
	conn.query('SELECT * FROM pedidos', (err, rows, fields) => {
		if(!err){
			res.json(rows);
		}else{
			res.json({"response":false});
		}
	})
});

router.get('/:id',(req, res) => {
	const {id} = req.params;
	conn.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id], (err, rows, fields) => {
		if(!err){
			res.json(rows[0]);
		}else{
			res.json({"response":false});
		}
	})
});

router.post('/', (req, res) => {
	const {detalle} = req.body;
	conn.query('INSERT INTO pedidos SET ?', [req.body], (err, rows, fields) => {
		if(!err){
			res.json({"response":true,"details":"Pedido agregado"});
		}else{
			res.json({"response":false,"details":"no se pudo agregar"});
		}
	});
});

router.put('/:id', async (req, res)=> {
	const {id} = req.params;
	const {estatus ='',
    	medio_pago= '',
    	total_pedido='',
    	subtotal_pedido='',
    	descuento='',
    	cupo_descuento='',
    	nombre_cliente='',
    	telefono_cliente='',
    	info_repartidor=''
	} = req.body;
	const objetoUpdate = {};
	if (estatus != '') { objetoUpdate.estatus = estatus};
	if (medio_pago != '') { objetoUpdate.medio_pago = medio_pago};
	if (total_pedido != '') { objetoUpdate.total_pedido = total_pedido};
	if (subtotal_pedido != '') { objetoUpdate.subtotal_pedido = subtotal_pedido};
	if (descuento != '') { objetoUpdate.descuento = descuento};
	if (cupo_descuento != '') { objetoUpdate.cupo_descuento = cupo_descuento};
	if (nombre_cliente != '') { objetoUpdate.nombre_cliente = nombre_cliente};
	if (telefono_cliente != '') { objetoUpdate.telefono_cliente = telefono_cliente};
	if (info_repartidor != '') { objetoUpdate.info_repartidor = info_repartidor};
	conn.query(`UPDATE pedidos SET ? WHERE id_pedido = ${id}` , [objetoUpdate], (err, rows, fields) => {
		if(!err){
			res.json({"response":true,"details":"Pedido editado"});
		}else{
			res.json({"response":false,"details":"no se pudo editar"});
		}
	});
	
});

router.delete('/:id', (req, res) => {
	const {id} = req.params;
	conn.query('DELETE FROM pedidos WHERE id_pedido = ?', [id], (err,rows,fields) => {
		if(!err){
			res.json({"response":true,"details":"Pedido borrado"});
		}else{
			res.json({"response":false,"details":"no se pudo borrar"});
		}
	})
});

router.put('/status/:id', async (req, res)=> {
	const {id} = req.params;
	const {estatus} = req.body;
	conn.query(`UPDATE pedidos SET estatus = ${estatus} WHERE id_pedido = ${id}`, (err, rows, fields) => {
		if(!err){
			res.json({"response":true,"details":"Cambio de estatus"});
		}else{
			res.json({"response":false,"details":"no se pudo editar"});
		}
	});
	
});



module.exports = router;