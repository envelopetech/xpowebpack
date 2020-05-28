import socketIOClient from "socket.io-client";

export default function () {    
    const socket = socketIOClient("http://localhost:3000", {'transports': ['websocket', 'polling']});
    //const socket = socketIOClient("https://xporiumwebpack.herokuapp.com", {'transports': ['websocket', 'polling']});
    function test() {         
        socket.emit('test')
    }    
    return {
        test,
       
    }
}