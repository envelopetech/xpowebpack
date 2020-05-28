var express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
const socketIO = require('socket.io')
var path = require('path');
var app = express();
var webpack = require('webpack');
var config = require('./webpack.config');
const compiler = webpack(config);
var sslRedirect = require('heroku-ssl-redirect');

//app.use(bodyParser.json());
app.use(sslRedirect());


const server = http.createServer(app)
// This creates our socket using the instance of the server
const io = socketIO(server, { 'transports': ['websocket', 'polling'] })

io.on('connection', socket => {
    console.log('New client connected')


    socket.on('test', () => {
        console.log("test data")        
    })

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});
const PORT = process.env.PORT || 5000;
// app.get('*',function(req,res){  
//     res.sendFile(path.join(__dirname, './build/index.html'));  
// });  
// app.get('/api',function(req,res){  
//     res.send('<p>This is a api Data</p>');  
// });  
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
server.listen(PORT, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log(`app running on port ${PORT}`)
    }
})  