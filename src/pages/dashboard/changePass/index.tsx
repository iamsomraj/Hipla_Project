import React, { Component, getGlobal, setGlobal } from "reactn";
import { update } from '../../../util/Service';
import { Helmet } from "react-helmet";
import { HOC } from "../../../util/HOC";
import CircularProgress from '@material-ui/core/CircularProgress';
import { checkAuth } from '../../../util/auth'
type props = {
  history: any;
  showAlert: any
};
type states = {
  value: any;
  validation: any;
  isLoading: boolean;
};

class ChangePass extends Component<props, states> {
  constructor(props: any) {
    super();
    this.state = {
      value: {
        changepass: "",
        changepassconfirm: "",
      },
      validation: {
        changepass: "",
        changepassconfirm: "",
      },
      isLoading: false
    };
  }

  handleChange = (event: any, name: string) => {
    let value = { ...this.state.value };
    value[name] = event.target.value;
    this.validateInput(event, name);
    this.setState({ value });
  };
  validateInput = (event: any, name: string) => {
    const value = event.target.value;
    let validation = { ...this.state.validation }
    switch (name) {

      case 'changepass':
        if (value === '') {
          validation[name] = 'Please enter your password'
        }
        else {
          if (value.length < 7) {
            validation[name] = 'Password should be minimum 7 character'
          }
          else {
            validation[name] = ''
          }
        }
        break;
      case 'changepassconfirm':
        if (value === '') {
          validation[name] = 'Please enter confirm password'
        }
        else {

          validation[name] = ''

        }
        break;
      default:
        console.log('Default')
        break;
    }

    this.setState({ validation })
  }

  _submitForm = () => {
    if (this.state.value.changepass === this.state.value.changepassconfirm) {

      let { company } = getGlobal();
      let data = {
        email: company.email,
        password: this.state.value.changepass
      }
      this.setState({
        isLoading: true
      })
      update('/api/company/changepassword', data)
        .then(response => {
          // console.log(response)
          this.setState({
            isLoading: false
          })
          if (response.success) {

            this.props.showAlert('Password changed successfully', 'success');
            this.signout()
          } else {
            this.props.showAlert('Something went wrong, please try again!', 'error');
          }
        })
    }
    else {
      this.props.showAlert('Confirm new password does not match', 'error')
    }
  }
  signout = () => {
    this.props.history.push('/login')
    checkAuth.signout();
    setGlobal({ token: '', company: '' });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Contatrack | Dashboard | Change Password</title>
        </Helmet>

        <div data-aos="zoom-in" className="innerwrapperbody">
          <div className="twopanel-signin">
            <div className="leftPrt">
              <div className="leftbox">
                <h2 className="text-center">Change Password</h2>

                <div className="input-panel margin30">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="changepass"
                    value={this.state.value.changepass}
                    onChange={(e) => {
                      this.handleChange(e, "changepass");
                    }}
                    onBlur={(e) => {
                      this.validateInput(e, "changepass");
                    }}
                  />
                  <span className="error" >{this.state.validation.changepass}</span>
                </div>
                <div className="input-panel">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="changepassconfirm"
                    value={this.state.value.changepassconfirm}
                    onChange={(e) => {
                      this.handleChange(e, "changepassconfirm");
                    }}
                    onBlur={(e) => {
                      this.validateInput(e, "changepassconfirm");
                    }}
                  />
                  <span className="error" >{this.state.validation.changepassconfirm}</span>
                </div>

                <button className="blue inner-button normabtn" disabled={
                  this.state.isLoading ||
                  this.state.validation.changepass !== '' ||
                  this.state.validation.changepassconfirm !== '' ||
                  this.state.value.changepass === '' ||
                  this.state.value.changepassconfirm === ''
                } onClick={() => {
                  this._submitForm()
                }}>{
                    this.state.isLoading
                      ?
                      <CircularProgress color="inherit" />
                      :
                      'update'
                  }</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HOC(ChangePass);
