const events = require('events');
const bcrypt = require('bcrypt')
const sql = require('./sqlDB.js')
const privateRoom = require('./private_controller.js')
const emmiter = new events.EventEmitter();
let messages = [];//massive with all msgs
class controller{

    mainRender(req,res){
        res.sendFile(__dirname + "/client/index.html")
    }
    msgSend(req,res){
        emmiter.once('newMSG', (message)=>{
            res.json(message)
        })
    }
    
    msgAllSend(req,res){
        console.log(messages)
        res.json(messages)
    }
    
    getMsg(req,res){
        const message = req.body;
        messages.push(message);
        emmiter.emit('newMSG', message)
        res.sendStatus(200);
    }
    async make_room(req,res){
        if(req.body.security == "private"){
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            sql.query(`INSERT INTO private(name,password,time) VALUES(?,?,?)`,[req.body.name, hashedPassword, req.body.room_timer ]).then( result =>{
                console.log(result[0].insertId)
                sql.query('create table ' + req.body.name + '_' + result[0].insertId + '(id int primary key auto_increment, name varchar(255) not null, color varchar(50) not null,message text not null)')
            })
        }
        else if(req.body.security == "public"){
            sql.query(`INSERT INTO public(name) VALUES(?)`,req.body.name).then( result =>{
                console.log(result[0].insertId)
                sql.query('create table ' + req.body.name + '_' + result[0].insertId + '(id int primary key auto_increment, name varchar(255) not null, color varchar(50) not null,message text not null)')
            })
        }
        res.sendStatus(200);
    }
}

module.exports = new controller();