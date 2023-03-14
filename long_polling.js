const express = require('express');
const cookieParser = require('cookie-parser')
const controller = require('./controller.js')
const private_controller = require('./private_controller.js')
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + "/"));

app.use('/private', private_controller)

app.get("/",controller.mainRender)
app.get('/get-msg',controller.msgSend)
app.get('/get-last-msgs', controller.msgAllSend)

app.post('/new-msg',controller.getMsg)
app.post('/create_room',controller.make_room)
app.get('/test', (req,res) =>{
    console.log(req.cookies)
})

app.listen(1488, () => console.log("server has been started"))
