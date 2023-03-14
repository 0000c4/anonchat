const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const events = require('events');
const sql = require('./sqlDB.js')
const private_router = express.Router();

const emmiter = new events.EventEmitter();

//private_router.use(cookieParser());
private_router.use(express.static(__dirname + "/"));

function generateAccessToken(room_id, pass) {
    return (jwt.sign({ room_id }, pass))
}

private_router.get('/:room_id', (req, res) => {
    const room_id = req.params['room_id'].split('_')[1];
    sql.query('select password from private where id = ?', room_id).then(result => {
        jwt.verify(req.cookies.token, result[0][0].password, function (err, decoded) {
            if (decoded) {
                res.sendFile(__dirname + "/client/private/index.html")
            }
            if (err) {
                console.log(err)
                res.sendFile(__dirname + "/client/private/access_denied.html")
            };
        })
    })
})
private_router.get('/:room_id/get-last-msgs',(req,res)=>{
    const room_id = req.params['room_id'].split('_')[1];
    sql.query('select password from private where id = ?', room_id).then(result => {
        jwt.verify(req.cookies.token, result[0][0].password, function (err, decoded) {
            if (decoded) {
                sql.query('select name,color,message from ' + req.params['room_id']).then(result => {
                    res.json(result[0])
                    console.log(result[0])
                })
            }
            if (err) {
                console.log(err)
                res.sendFile(__dirname + "/client/private/access_denied.html")
            };
        })
    })
})
private_router.post('/:room_id/new-msg', (req, res) => {
    const room_id = req.params['room_id'].split('_')[1];
    sql.query('select password from private where id = ?', room_id).then(result => {
        jwt.verify(req.cookies.token, result[0][0].password, function (err, decoded) {
            if (decoded) {
                const message = req.body;
                console.log(message)
                sql.query('insert into ' + req.params['room_id'] + '(name,color,message) VALUES(?,?,?)', [message.name, message.color, message.message])
                emmiter.emit('newMSG', message)
                res.sendStatus(200);
            }
            if (err) {
                console.log('unauthorized access attempt')
            };
        })
    })
})
private_router.get('/:room_id/get-msg', (req, res) => {
    const room_id = req.params['room_id'].split('_')[1];
    sql.query('select password from private where id = ?', room_id).then(result => {
        jwt.verify(req.cookies.token, result[0][0].password, function (err, decoded) {
            if (decoded) {
                emmiter.once('newMSG', (message) => {
                    res.json(message)
                })
            }
            if (err) {
                console.log('unauthorized access attempt')
            };
        })
    })
})

private_router.post('/connect_room', (req, res) => {
    const room_id = req.body.name.split('_');
    sql.query('select password,id from private where name  = ? and id = ?', room_id)
        .then(async result => {
            //console.log(result[0][0])
            if (result[0].length > 0) {
                if (await bcrypt.compare(req.body.password, result[0][0].password)) {
                    const token = generateAccessToken(req.body.name, result[0][0].password)
                    res.cookie("token", token, { sameSite: true })
                    res.sendStatus(200);

                }
            }
        })
})
module.exports = private_router;