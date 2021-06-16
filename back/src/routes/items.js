const express = require('express');
const router = express.Router();
const conn = require('../database');



router.post('/items', async (req, res) => {
	const {id_pedido, precio} = req.body;
	conn.query('INSERT INTO items SET ?', [req.body], (err, rows, fields) => {
		if(!err){
			
			conn.query(`UPDATE pedidos SET total_pedido = ${precio} WHERE id_pedido = ${id_pedido}`, (err, rows, fields) => {
				if(!err){
					res.json({"response":true,"details":"Item agregado"});
				}else{
					res.json({"response":false});
				}
			})
		}else{
			res.json({"response":false,"details":"no se pudo agregar"});
		}
	});
});



module.exports = router;