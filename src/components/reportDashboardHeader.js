import React, { Component, setGlobal } from 'reactn';
import { Link } from 'react-router-dom'
import { checkAuth } from '../util/auth';
class ReportDashboardHeader extends Component {
    signout = () => {
        setGlobal({ token: '', company: '' });
        checkAuth.signout();
        this.props.history.push('/')
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light dashboard-header whitebg">
                <button className="btn togglebtn" id="menu-toggle" onClick={() => this.props.toggleMenu()} >
                    <img src={`${process.env.PUBLIC_URL}/assets/images/toggle-menu.png`} />
                </button>



                <div className="rightmenuprt ml-auto">
                    <ul className="navbar-nav ml-auto mt-lg-0 rightmenu">
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <img src={`${process.env.PUBLIC_URL}/assets/images/bell.png`} />

                            </a>

                            <div className="dropdown-menu dropdown-menu-right notification_list" aria-labelledby="navbarDropdown">
                                notification
                            </div>
                        </li> */}
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/help-circle.png`} />

                            </a>

                            <div className="dropdown-menu dropdown-menu-right questionshow" aria-labelledby="navbarDropdown">
                                This question is asking for XXX purpose
                            </div>
                        </li> */}
                        <li className="nav-item dropdown userListprt">
                            <a className="nav-link dropdown-toggle userLink" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="rounduserprt">
                                    {this.global.company.company_name.split('')[0].toUpperCase()}
                                </div>
                                {this.global.company.company_name}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                {/* <Link className="dropdown-item" to={`/dashboard/${this.global.company.company_name.toLowerCase()}/profile`}>
                                    <i>
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/envelop.png`} />
                                    </i>
                                    Profile
                                </Link> */}
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
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}

export default ReportDashboardHeader;