const express = require('express')
const events = require('events');
const sql = require('./sqlDB.js')

const public_router = express.Router();
public_router.use(express.static(__dirname + "/"));

const emmiter = new events.EventEmitter();
public_router.get('/:room_id', (req, res) => {
    res.sendFile(__dirname + "/client/room/index.html")
})
public_router.get('/:room_id/get-msg',(req,res)=>{
    emmiter.once('newMSG', (message)=>{
        res.json(message)
    })
})
public_router.get('/:room_id/get-last-msgs', (req,res)=>{
    sql.query('select name,color,message from ' + req.params['room_id']).then(result => {
        res.json(result[0])
    }).catch(err =>{console.log(err)});
})

public_router.post('/:room_id/new-msg',(req,res)=>{
    const message = req.body;
    sql.query('insert into ' + req.params['room_id'] + '(name,color,message) VALUES(?,?,?)', [message.name, message.color, message.message])
    .catch(err =>{console.log(err)});
    emmiter.emit('newMSG', message)
    res.sendStatus(200);
})

module.exports = public_router;