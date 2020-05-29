import React from 'react';
import Countdown from 'react-countdown-now';

class timercounter extends React.Component {
    render() {        

        let renderer = ({ minutes, seconds, completed }) => {
            if (completed) {
                return this.props.completetimerhandler()
            } else {
                // Render a countdown
                return <span id="spantimer" >{minutes}:{seconds}</span>;
            }
        };
        let coundownrender = null;

        if (this.props.counter) {
            coundownrender = <Countdown
                date={Date.now() + 10000}
                renderer={renderer} />
        }
        else
        {
            coundownrender=null;
        }
        return (
            <React.Fragment>
                {coundownrender}
            </React.Fragment >
        );
    }
};
export default timercounter;