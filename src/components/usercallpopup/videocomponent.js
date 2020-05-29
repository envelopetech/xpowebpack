import React, { Component } from 'react';
import Video from "twilio-video";
import { Card, CardText } from 'material-ui/Card';
import * as classsharedlocal from './classconst';
import * as classshared from '../commoncss/classconst';
import Button from '../UI/Button/Button';
import { ButtonType, ICONS } from '../../shared/utility';
import RaisedButton from 'material-ui/RaisedButton';
import Timercounter from './timercounter';
import ReactDOM from 'react-dom'


export default class videocomponent extends Component {
    constructor(props) {
        super();
        this.state = {
            identity: null,
            roomName: '',
            roomNameErr: false, // Track error for room name TextField
            previewTracks: null,
            localMediaAvailable: false,
            hasJoinedRoom: false,
            activeRoom: '',// Track the current active room
            token: null,
            counter_start: false
        };
        this.joinRoom = this.joinRoom.bind(this);
        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
        this.roomJoined = this.roomJoined.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        this.detachTracks = this.detachTracks.bind(this);
        this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
    }
    handleRoomNameChange(e) {
        let roomName = e.target.value;
        this.setState({ roomName });
    }
    joinRoom() {        
        if (!this.props.twilio_room.trim()) {
            this.setState({ roomNameErr: true });
            return;
        }
        console.log("Joining room '" + this.props.twilio_room + "'...");
        let connectOptions = {
            name: this.props.twilio_room
        };
        if (this.state.previewTracks) {
            connectOptions.tracks = this.state.previewTracks;
        }
        // Join the Room with the token from the server and the
        // LocalParticipant's Tracks.
        Video.connect(this.state.token, connectOptions).then(this.roomJoined, error => {
            alert('Could not connect to Twilio: ' + error.message);
        });
    }
    attachTracks(tracks, container) {        
        tracks.forEach(track => {
            container.appendChild(track.attach());
        });
    }
    // Attaches a track to a specified DOM container
    attachParticipantTracks(participant, container) {
        //var tracks = Array.from(participant.tracks.values());
        var tracks = this.getTracks(participant);
        this.attachTracks(tracks, container);
    }
    getTracks(participant) {
        return Array.from(participant.tracks.values()).filter(function (publication) {
            return publication.track;
        }).map(function (publication) {
            return publication.track;
        });
    }
    detachTracks(tracks) {
        tracks.forEach(track => {
            track.detach().forEach(detachedElement => {
                detachedElement.remove();
            });
        });
        // for (let track of tracks) {
        //     const htmlElements = track.detach();
        //     for (let htmlElement of htmlElements) {
        //        htmlElement.remove();
        //      }
        //   }
    }
    detachParticipantTracks(participant) {
        //var tracks = Array.from(participant.tracks.values());
        var tracks = this.getTracks(participant);
        this.detachTracks(tracks);
    }
    roomJoined(room) {        
        // Called when a participant joins a room
        console.log("Joined as '" + this.state.identity + "'");
        this.setState({
            activeRoom: room,
            localMediaAvailable: true,
            hasJoinedRoom: true
        });

        // Attach LocalParticipant's Tracks, if not already attached.
        var previewContainer = this.refs.localMedia;
        console.log(previewContainer)
        if (!previewContainer.querySelector('video')) {            
            this.attachParticipantTracks(room.localParticipant, previewContainer);
        }

        // Attach the Tracks of the Room's Participants.
        // When a Participant joins the Room, log the event.
        room.on('participantConnected', participant => {            
            this.setState({
                counter_start: true
            });
            var previewContainerPat = document.getElementById("remote_media");
            console.log(previewContainerPat);
            this.attachParticipantTracks(participant, previewContainerPat);
        });

        // When a Participant adds a Track, attach it to the DOM.
        room.on('trackSubscribed', (track, participant) => {
            //console.log(participant.identity + ' added track: ' + track.kind);
            var previewContainer = document.getElementById("remote_media");
            this.attachTracks([track], previewContainer);
        });
        // room.on('participantConnected', function (participant) {
        //     alert('11111111111111111111111111111111111111111111')
        //     var previewContainerPat = document.getElementById("remote-media");
        //     console.log(previewContainerPat);
        //     this.attachParticipantTracks(participant, previewContainerPat);

        //     participant.on('trackSubscribed', function (track) {
        //         var previewContainer = document.getElementById("remote-media");
        //         this.attachTracks([track], previewContainer);
        //     });

        //     // room.on('trackAdded', function (track, participant) {
        //     //     //log(participant.identity + " added track: " + track.kind);
        //     //     var previewContainer = this.refs.remoteMedia;
        //     //     this.attachTracks([track], previewContainer);
        //     // });
        // });

        // room.on("trackAdded", (track, participant)=> {
        //     this.log(participant.identity + " added track: " + track.kind);
        //     var previewContainer = document.getElementById("remote-media");
        //     this.attachTracks([track], previewContainer);
        // });
        room.on('trackRemoved', function (track, participant) {
            //log(participant.identity + " removed track: " + track.kind);
            this.detachTracks([track]);
        });
        room.on('participantDisconnected', participant => {
            //alert('disconnect....................')
            console.log("Participant '" + participant.identity + "' left the room");
            this.detachParticipantTracks(participant);
            this.props.closemodal(); //Call parent functions to close popup
        });
        room.on('disconnected', () => {
            //alert('1111111111111111111')
            if (this.state.previewTracks) {
                this.state.previewTracks.forEach(function (track) {
                    track.stop();
                });
                this.setState({
                    previewTracks: null,
                });
            }
            room.participants.forEach(this.detachParticipantTracks);
            this.setState({
                activeRoom: null,
            });
            this.props.closemodal();

        });
        room.on('disconnected', room => {
            //alert('22222222222222222222222222222')
            // // Detach the local media elements
            // room.localParticipant.tracks.forEach(track => {
            //     let attachedElements = track.detach();
            //     attachedElements.forEach(element => element.remove());
            // });
            this.detachParticipantTracks(room.localParticipant);
            this.props.closemodal();
        });
    }
    componentDidMount() {
        // var data = generate_twilio_token()
        // data.then(res => {
        //     this.setState({ token: res.data[0], identity: res.data[1], roomName: res.data[2] }, () => {
        //         this.joinRoom();
        //     });
        // });
    }
    leaveRoom() {        
        let timerreference = ReactDOM.findDOMNode(this.refs.timerreference);
        console.log(timerreference)
        this.setState({ hasJoinedRoom: false, localMediaAvailable: false, counter_start: false });
        this.state.activeRoom.disconnect();
        this.props.closemodal();
        return ""
    }
    render() {
        // let headertext=null;
        // if(this.props.iscaller)
        // {
        //     headertext="Outgoing Call"
        // }
        // else{
        //     headertext="Incoming Call"
        // }
        // Only show video track after user has joined a room
        let showLocalTrack = this.state.localMediaAvailable ? (
            <div className={classsharedlocal.flex_item}>
                <div ref="localMedia" />
            </div>
        ) : (
                ''
            );
        let joinOrLeaveRoomButton = null;
        if (this.state.hasJoinedRoom) {
            joinOrLeaveRoomButton = <RaisedButton label="Disconnect" secondary={true} onClick={this.leaveRoom} />
        }
        return (
            <React.Fragment>
               
                        <div className={classshared.popup__content_header}>
                            <div className={classshared.sidebar__user_stats.join(' ')}>
                                <div className={classshared.sidebar__user_details_left.join(' ')}>                                   
                                </div>
                                <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                                    <Button btntype={ButtonType.btn_close_popup} clicked={this.props.closemodal} svgclass={classshared.icon_25_icon_medium_grey.join(' ')} icon={ICONS.CROSS}></Button>
                                </div>
                            </div>                           
                        </div>
                        <div className={classshared.popup__content_bottom}>
                            <Card>
                                <CardText>
                                    <div className={classsharedlocal.flex_container}>
                                        {showLocalTrack}
                                        <div className={classsharedlocal.flex_item}>                                            
                                            {joinOrLeaveRoomButton}
                                            <Timercounter ref="timerreference" completetimerhandler={this.leaveRoom} counter={this.state.counter_start}></Timercounter>
                                        </div>
                                        <div className={classsharedlocal.flex_item} ref="remoteMedia" id="remote_media" />
                                    </div>
                                </CardText>
                            </Card>
                        </div>
                  
            </React.Fragment>
        );
    }
}