import React, { Component } from 'reactn';
import { Link, RouteProps } from 'react-router-dom';
import { HOC } from '../../util/HOC';
import { axiosPatch } from '../../util/Service';
// import Header from '../../components/header';
import { Helmet } from "react-helmet";
import CircularProgress from '@material-ui/core/CircularProgress';

type props = {
    history: any,
    showAlert: any,
    match: any
};
type states = {
    loading: boolean,
    passWord: any,
    confPass: any,
    passWordValid: string,
    confPassValid: string,
    isPassSaved: boolean,
    token: string
};

type global = {
    selectedPlan: any
}


class ResetPass extends Component<props & RouteProps, states, global> {
    constructor() {
        super();
        this.state = {
            loading: false,
            passWord: '',
            confPass: '',
            passWordValid: '',
            confPassValid: '',
            isPassSaved: false,
            token: ''
        }
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        this.setState({
            token: token
        })
    }

    handleChange = (event: any, name: string) => {


        switch (name) {

            case 'passWord':
                this.setState({ passWord: event.target.value });
                this.validateInput(event, name);
                break;
            case 'confPass':
                this.setState({ confPass: event.target.value });
                this.validateInput(event, name);
                break;
        }
    }

    validateInput = (event: any, name: string) => {
        const value = event.target.value;

        switch (name) {

            case 'passWord':
                if (value === '') {
                    this.setState({ passWordValid: 'Please enter your password' });
                }
                else {
                    this.setState({ passWordValid: '' });
                }
                break;
            case 'confPass':
                if (value === '') {
                    this.setState({ confPassValid: 'Please enter confirm password' });
                }
                else {

                    this.setState({ confPassValid: '' });

                }
                break;
            default:
                console.log('Default')
                break;
        }
    }

    _submitForm = (event: any) => {
        event.preventDefault();
        const { passWord, confPass, token } = this.state;
        if (passWord === confPass) {
            // console.log(passWord)
            let data = {
                password: passWord
            }
            this.setState({ loading: true })
            axiosPatch(`/api/company/resetpassword/${token}`, data)
                .then((res) => {
                    console.log(res);
                    this.setState({ loading: false })
                    const status = res.request.status;
                    if (status === 201) {
                        this.setState({
                            isPassSaved: true
                        })
                        this.props.showAlert(res.data.message, 'success');
                    } else {
                        this.props.showAlert(res.response.data.message, 'error');
                    }
                })
        }
        else {
            this.props.showAlert('Confirm password does not match', 'error')
        }
    }

    render() {
        return (
            <section>
                <Helmet>
                    <title>Contatrack | Forgot password</title>
                </Helmet>
                {/* <Header {...this.props} /> */}

                <div data-aos="fade-down" className="innerbody">
                    {
                        !this.state.isPassSaved
                            ?
                            <div className="inner-container">
                                <div className="twopanel-signin">
                                    <div className="leftPrt">
                                        <div className="leftbox">
                                            <h2 className="text-center">Reset password</h2>
                                            <p className="text-center">Remember password? <Link to="/login">Sign in</Link></p>
                                            <form onSubmit={(e) => this._submitForm(e)}>
                                                <div className="input-panel margin30">
                                                    <label>New Password *</label>
                                                    <input
                                                        type="password"
                                                        onChange={(e) => this.handleChange(e, 'passWord')}
                                                        defaultValue={this.state.passWord}
                                                        onBlur={(e) => this.validateInput(e, 'passWord')}
                                                    />
                                                    <span className="error" >{this.state.passWordValid}</span>
                                                </div>

                                                <div className="input-panel margin30">
                                                    <label>Re-enter New Password *</label>
                                                    <input
                                                        type="password"
                                                        onChange={(e) => this.handleChange(e, 'confPass')}
                                                        defaultValue={this.state.confPass}
                                                        onBlur={(e) => this.validateInput(e, 'confPass')}
                                                    />
                                                    <span className="error" >{this.state.confPassValid}</span>
                                                </div>


                                                <button
                                                    disabled={
                                                        this.state.passWord === '' ||
                                                        this.state.passWordValid !== '' ||
                                                        this.state.confPass === '' ||
                                                        this.state.confPassValid !== ''
                                                    }
                                                    type="submit"
                                                    className="blue inner-button normabtn">
                                                    {
                                                        this.state.loading
                                                            ?
                                                            <CircularProgress color="inherit" />
                                                            :
                                                            'Submit'
                                                    }

                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className="middlebox success text-center">

                                <img src={`${process.env.PUBLIC_URL}/assets/images/checked.svg`} />
                                <h2>Congratulations!</h2>
                                <p>Your password is successfully reseted.</p>

                                <button onClick={() => { this.props.history.push('/login') }}>LOGIN</button>
                            </div>
                    }
                </div>



            </section>
        )
    }
}

export default HOC(ResetPass);