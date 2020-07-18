import React, { Component } from "reactn";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
/**
 * 
 * @param {*} WrappedComponent 
 */
export function HOC(WrappedComponent) {
  return class ReformEnhancer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        massage: 'This is a success message!',
        type: 'success',
        duration: 6000,
        isAlertOpen: false

      }
    }

    /**
     * @description show global slackbar
     * @param {string} massage
     * @param {string} type
     * @param {number} duration
     */
    showAlert = (massage, type, duration) => {
      this.setState({
        isAlertOpen: true,
        massage: massage,
        type: type,
        duration: duration || 6000
      })
    }

    /**
     * @description close snackbar
     */
    handleClose = () => {
      this.setState({
        isAlertOpen: false
      })
    }
    render() {
      const props = Object.assign({}, this.props)
      return (
        <>
          <WrappedComponent {...props} showAlert={(massage, type, duration) => this.showAlert(massage, type, duration)} />
          <Snackbar open={this.state.isAlertOpen} autoHideDuration={this.state.duration} onClose={this.handleClose}>
            <MuiAlert onClose={this.handleClose} severity={this.state.type}>
              {this.state.massage}
            </MuiAlert>
          </Snackbar>
        </>
      )
    }
  }
}

