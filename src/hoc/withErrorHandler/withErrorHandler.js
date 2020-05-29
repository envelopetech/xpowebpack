// import React from 'react';

// import Modal from '../../components/UI/Modal/Modal';
// import Auxx from '../Auxx';
// import useHttpErrorHandler from '../../hooks/http-error-handler';

// const withErrorHandler = (WrappedComponent, axios) => {
//   return props => {
//     const [error, clearError] = useHttpErrorHandler(axios);

//     return (
//       <Auxx>
//         <Modal show={error} modalClosed={clearError}>
//           {error ? error.message : null}
//         </Modal>
//         <WrappedComponent {...props} />
//       </Auxx>
//     );
//   };
// };
// export default withErrorHandler;
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxx from '../Auxx';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }
        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }
        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }
        render () {
            return (
                <Auxx>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxx>
            );
        }
    }
}
export default withErrorHandler;