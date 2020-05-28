import socketIOClient from "socket.io-client";

export default function () {    
    const socket = socketIOClient("http://localhost:5000", {'transports': ['websocket', 'polling']});
    function test() {         
        socket.emit('test')
    }    
    return {
        test,
       
    }
}