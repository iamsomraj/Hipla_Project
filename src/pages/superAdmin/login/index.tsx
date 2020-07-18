import React, { Component, setGlobal } from 'reactn';
import { Link, RouteProps } from 'react-router-dom';
import { HOC } from '../../../util/HOC'
import { checkAuthSuperAdmin } from '../../../util/auth';
import { post } from '../../../util/Service';
import { Helmet } from "react-helmet";
import CircularProgress from '@material-ui/core/CircularProgress';
// import CartBox from '../../components/cartBox';

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
    value: any,
    validation: any,
    isSecurePass: boolean,
    loading: boolean
};

type global = {
    selectedPlan: any
}


class SuperLogin extends Component<props & RouteProps, states, global> {

    constructor(props: any) {
        super();
        this.state = {
            value: {
                email: '',
                password: ''
            },
            validation: {
                email: '',
                password: ''
            },
            isSecurePass: true,
            loading: false
        }
    }

    componentDidMount() {
        // checkAuth
        if (checkAuthSuperAdmin.isAuthenticated) {
            this.props.history.push('/portal/hipla')
        }
    }

    _submitForm = (e: any) => {
        e.preventDefault();
        this.setState({ loading: true })
        const data = { ...this.state.value }
        post('/api/admin/login', data)
            .then((res) => {
                this.setState({ loading: false })
                // console.log(res);
                // return
                const status = res.request.status;
                if (status === 201) {
                    this.props.showAlert('Login successful', 'success');
                    // console.log(res.data.data.company);

                    localStorage.setItem('super_admin', 'User logged in');
                    setTimeout(() => {
                        checkAuthSuperAdmin.authenticate();
                        this.props.history.push('/portal/hipla')
                    }, 500)
                } else {
                    // console.log(JSON.stringify(res.response.data))
                    this.props.showAlert(res.response.data.message, 'error');
                }
            })
        // this.props.showAlert('Login successful', 'success');
        // checkAuth.authenticate();
        // setTimeout(() => {
        //     this.setState({ loading: false })
        //     this.props.history.push('/')
        // }, 1500)
    }

    handleChange = (event: any, name: string) => {
        // console.log(event.target.value)
        let value = { ...this.state.value };
        value[name] = event.target.value;
        this.validateInput(event, name);
        this.setState({ value });
    }

    validateInput = (event: any, name: string) => {
        const value = event.target.value;
        let validation = { ...this.state.validation };
        switch (name) {
            case 'email':
                if (value === '') {
                    validation[name] = 'Please enter your registered email address User name';
                }
                else {
                    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    if (reg.test(value)) {
                        validation[name] = '';
                    } else {
                        validation[name] = 'Please enter valid email address';
                    }
                }
                break;
            case 'password':
                if (value === '') {
                    validation[name] = 'Please enter your password';
                }
                else {
                    validation[name] = '';
                }
                break;
            default:
                console.log('Default')
                break;
        }
        this.setState({ validation })
    }

    render() {
        return (
            <section>
                <Helmet>
                    <title>Contatrack | Hipla Login</title>
                </Helmet>
                {/* <Header {...this.props} /> */}

                <div data-aos="fade-down" className="innerbody">
                    <div className="inner-container">
                        <div className="twopanel-signin">
                            <div className="leftPrt">
                                <div className="leftbox">
                                    <h2 className="text-center">Sign in to Contatrack Admin</h2>
                                    {/* <p className="text-center">Doesn't have an account? <Link to="/plans">Sign up</Link></p> */}
                                    <form onSubmit={(e) => this._submitForm(e)}>
                                        <div className="input-panel margin30">
                                            <label>Email Address or User name</label>
                                            <input
                                                type="text"
                                                onChange={(e) => this.handleChange(e, 'email')}
                                                defaultValue={this.state.value.email}
                                                onBlur={(e) => this.validateInput(e, 'email')}
                                            />
                                            <span className="error" >{this.state.validation.email}</span>
                                        </div>
                                        <div className="input-panel">
                                            <label>Password</label>
                                            <input
                                                type={this.state.isSecurePass ? "password" : "text"}
                                                onChange={(e) => this.handleChange(e, 'password')}
                                                defaultValue={this.state.value.password}
                                                onBlur={(e) => this.validateInput(e, 'password')} />
                                            <span className="error">{this.state.validation.password}</span>
                                            <div className="showlink" >
                                                <a onClick={() => this.setState({ isSecurePass: !this.state.isSecurePass })}>{this.state.isSecurePass ? "Show" : "Hide"}</a>
                                            </div>

                                        </div>

                                        <button
                                            disabled={
                                                this.state.value.email === '' ||
                                                this.state.value.password === '' ||
                                                this.state.validation.email !== '' ||
                                                this.state.validation.password !== ''
                                            }
                                            type="submit"
                                            className="blue inner-button normabtn">
                                            {
                                                this.state.loading
                                                    ?
                                                    <CircularProgress color="inherit" />
                                                    :
                                                    'Sign In'
                                            }
                                        </button>
                                        {/* <br /> */}
                                        {/* <Link to="/forgot-password" className="signin-forgetPass-link">Forgot Password?</Link> */}
                                    </form>
                                </div>
                            </div>
                            {/* {
                                this.global.selectedPlan === null
                                    ?
                                    null
                                    :
                                    <CartBox />
                            } */}

                        </div>
                    </div>
                </div>



            </section>
        )
    }
}

export default HOC(SuperLogin);