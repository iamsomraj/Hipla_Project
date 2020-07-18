import React, { Component, setGlobal } from 'reactn';
import { checkAuth } from '../util/auth';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
class HomeHeader extends Component {
    signout = () => {
        setGlobal({ token: '', company: '' });
        checkAuth.signout();
    }
    render() {
        // const {company_name} = this.global.company;
        return (
            <header className="navbar navbar-expand-md navbar-dark fixed-top home-header" id="banner">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={() => { this.props.history.push('/') }} >
                        <LazyLoad>
                            <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="logo" />
                        </LazyLoad>
                    </a>

                    <div className="buttonprt">
                        <button className="normal-link" onClick={() => { this.props.history.push('/contactus') }}>
                            <i className="fa fa-phone"></i>
                            <span>Contact Us</span>
                        </button>
                        <button onClick={() => { this.props.history.push('/plans') }} className="pricing-btn">PRICING</button>
                        {
                            checkAuth.isAuthenticated
                                ?
                                <div className="dropdown userListprt">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="rounduserprt">
                                            {this.global.company.company_name.split('')[0].toUpperCase()}
                                        </div>
                                        <span className="headerCompanyName">
                                            {this.global.company.company_name}
                                        </span>

                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to={`/dashboard/${this.global.company.company_name.toLowerCase()}`}>
                                            <i>
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/envelop.png`} />
                                            </i>
                                            Dashboard
                                        </Link>
                                        <Link className="dropdown-item" to={`/dashboard/${this.global.company.company_name.toLowerCase()}/change-pass`}>
                                            <i>
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/lock.png`} />
                                            </i>
                                            Change Password
                                        </Link>
                                        <a className="dropdown-item" onClick={() => this.signout()}>
                                            <i>
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/logout.png`} />
                                            </i>
                                            Logout
                                        </a>
                                    </div>
                                </div>
                                :
                                <button className="sign-btn" onClick={() => { this.props.history.push('/login') }} >SIGN IN</button>
                        }

                    </div>

                </div>
            </header>
        )
    }
}

export default HomeHeader;