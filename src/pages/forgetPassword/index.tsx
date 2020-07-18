import React, { Component } from 'reactn';
import { Link, RouteProps } from 'react-router-dom';
import { HOC } from '../../util/HOC';
import { checkAuth } from '../../util/auth';
import { axiosPatch } from '../../util/Service';
// import Header from '../../components/header';
import { Helmet } from "react-helmet";
import CircularProgress from '@material-ui/core/CircularProgress';

declare global {
    interface Window {
        Razorpay: any;
    }
}
type props = {
    history: any,
    showAlert: any
};
type states = {
    loading: boolean,
    validationEmail: string,
    email: string,
    isEmailSend: boolean
};

type global = {
    selectedPlan: any
}


class ForgetPass extends Component<props & RouteProps, states, global> {

    constructor(props: any) {
        super();
        this.state = {
            validationEmail: '',
            email: '',
            loading: false,
            isEmailSend: false
        }
    }

    _submitForm = (event: any) => {
        event.preventDefault();
        const data = {
            email: this.state.email
        }
        this.setState({ loading: true })
        axiosPatch('/api/company/forgetpassword', data)
            .then((res) => {
                // console.log(res);
                this.setState({ loading: false })
                const status = res.request.status;
                if (status === 201) {
                    this.setState({
                        isEmailSend: true
                    })
                    // this.props.showAlert("Password sent successfully", 'success');
                } else {
                    this.props.showAlert(res.response.data.message, 'error');
                }
            })
    }

    handleChange = (event: any) => {
        this.checkValid(event)
        this.setState({ email: event.target.value });
    }

    checkValid = (event: any) => {
        const value = event.target.value;
        if (value === '') {
            this.setState({ validationEmail: 'Please enter your email address' })
        }
        else {
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (reg.test(value)) {
                this.setState({ validationEmail: '' })
            } else {
                this.setState({ validationEmail: 'Please enter valid email address' })
            }
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
                        !this.state.isEmailSend
                            ?
                            <div className="inner-container">
                                <div className="twopanel-signin">
                                    <div className="leftPrt">
                                        <div className="leftbox">
                                            <h2 className="text-center">Verify email to Contatrack</h2>
                                            <p className="text-center">Remember password? <Link to="/login">Sign in</Link></p>
                                            <form onSubmit={(e) => this._submitForm(e)}>
                                                <div className="input-panel margin30">
                                                    <label>Email Address</label>
                                                    <input
                                                        type="text"
                                                        onChange={(e) => this.handleChange(e)}
                                                        defaultValue={this.state.email}
                                                        onBlur={(e) => this.checkValid(e)}
                                                    />
                                                    <span className="error" >{this.state.validationEmail}</span>
                                                </div>


                                                <button
                                                    disabled={
                                                        this.state.email === '' ||
                                                        this.state.validationEmail !== ''
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
                                <h2>Email sent!</h2>
                                <p>Email sent successfully</p>


                            </div>
                    }
                </div>



            </section>
        )
    }
}

export default HOC(ForgetPass);