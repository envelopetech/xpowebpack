import socketIOClient from "socket.io-client";
import{socketendpoint} from '../shared/utility'

export default function () {    
    const socket = socketIOClient(socketendpoint, {'transports': ['websocket', 'polling']});
    function update_feed_post_notified_user(data) {         
        socket.emit('update_feed_post_notified_user', data)
    }
    function user_feedpost_save(data) {        
        socket.emit('user_feedpost_save', data)
    }
    function user_follow(data) {        
        socket.emit('user_follow', data)
    }
    function user_feeds_likes(data) {        
        socket.emit('user_feeds_likes', data)
    }
    function user_feeds_comments(data) {        
        socket.emit('user_feeds_comments', data)
    }
    function user_feeds_comments_totalcount_child() {        
        socket.emit('user_feeds_comments_totalcount_child')
    }    
    function user_tieups_request_send() {        
        socket.emit('user_tieups_request_send')
    }    
    function user_tieups_request_response(data) {          
        socket.emit('user_tieups_request_response', data)
    } 
    function join_wing_request_send(data) {          
        socket.emit('join_wing_request_send', data)
    } 
    function join_wing_request_response(data) {          
        socket.emit('join_wing_request_response', data)
    } 
    function wing_feed_post_save(data) {            
        socket.emit('wing_feed_post_save', data)
    }
    function wing_lead_post_win_by_poster_id(data) {            
        socket.emit('wing_lead_post_win_by_poster_id', data)
    }
    function wing_lead_post_lose_by_poster_id(data) {            
        socket.emit('wing_lead_post_lose_by_poster_id', data)
    }
    function wing_lead_post_refused_by_poster_id(data) {            
        socket.emit('wing_lead_post_refused_by_poster_id', data)
    }
    function wing_lead_post_accept_by_curator_id(data) {            
        socket.emit('wing_lead_post_accept_by_curator_id', data)
    }
    function wing_lead_post_reject_by_curator_id(data) {           
        socket.emit('wing_lead_post_reject_by_curator_id', data)
    }
    function callback_after_reject_lead_by_curator(data) {           
        socket.emit('callback_after_reject_lead_by_curator', data)
    }

    function call_request_from_publisher(data) {           
        socket.emit('call_request_from_publisher', data)
    }
    function call_response_from_subscriber(data) {           
        socket.emit('call_response_from_subscriber', data)
    }
    function end_call_by_publisher(data) {           
        socket.emit('end_call_by_publisher', data)
    }
    function end_call_by_publisher_subscriber(data) {           
        socket.emit('end_call_by_publisher_subscriber', data)
    }
    function set_otp_state(data) {           
        socket.emit('set_otp_state', data)
    }
    return {
        user_feedpost_save,
        user_follow,
        update_feed_post_notified_user,
        user_feeds_likes,
        user_feeds_comments,
        user_feeds_comments_totalcount_child,
        user_tieups_request_send,        
        user_tieups_request_response,
        join_wing_request_send,
        join_wing_request_response,
        wing_feed_post_save,
        wing_lead_post_win_by_poster_id,
        wing_lead_post_lose_by_poster_id,
        wing_lead_post_refused_by_poster_id,
        wing_lead_post_accept_by_curator_id,
        wing_lead_post_reject_by_curator_id,
        callback_after_reject_lead_by_curator,
        call_request_from_publisher,
        call_response_from_subscriber,
        end_call_by_publisher,
        end_call_by_publisher_subscriber,
        set_otp_state
    }
}