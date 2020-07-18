import React, { Component, getGlobal } from 'reactn';
import { Link, NavLink } from 'react-router-dom';
import { get } from '../util/Service'
class ReportSideBar extends Component {
    constructor() {
        super();
        this.state = {
            cmpDetails: {},
            isLoading: false
        }
    }
    UNSAFE_componentWillMount() {
        const { company } = getGlobal();
        this.setState({
            isLoading: true
        })
        get(`/api/company/details/${company._id}`)
            .then((res) => {
                // console.log(res)

                const status = res.request.status;
                if (status === 201) {
                    this.setState({
                        cmpDetails: { ...res.data.data },
                        isLoading: false
                    })
                }
                else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
    }
    render() {
        return (
            <div className="blubg main-sidebar" id="sidebar-wrapper">
                <div className="sidebar-heading">
                    <Link to={`/`} className="shortimg">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/white-shortlogo.png`} alt="#" />
                    </Link>
                    <Link to={`/`} className="bigimg">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/dashboard-headerlogo.png`} alt="#" />
                    </Link>
                </div>
                <div className="list-group list-group-flush linkList">

                    {/* <a href="#" className="list-group-item list-group-item-action">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/up.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Upgrade</span>
                    </a>

                    <a href="#" className="list-group-item list-group-item-action">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/clipboard.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Order History</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/wallet.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Payment Methods</span>
                    </a> */}
                    <h3>Reports</h3>
                    <NavLink activeClassName="active" to={`/dashboard/${this.global.company.company_name.toLowerCase()}/insights`} className="list-group-item list-group-item-action">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/insight-icon.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Insights</span>
                    </NavLink>
                    <NavLink activeClassName="active" to={`/dashboard/${this.global.company.company_name.toLowerCase()}/emp`} className="list-group-item list-group-item-action">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/employee-directory.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Employee Directory</span>
                    </NavLink>
                    {
                        !this.state.isLoading
                            ?
                            this.state.cmpDetails.current_plan_details !== undefined
                                ?
                                this.state.cmpDetails.current_plan_details.plan.plan_name !== 'Standard'
                                    ?
                                    <>
                                        <a className="nav-link list-group-item collapsed" href="#submenu1" data-toggle="collapse"
                                            data-target="#submenu1">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/computer-vision.png`} />
                                            <span className={this.props.isToggleMenu ? "menu-text" : ""}>Computer Vision</span>
                                            {/* <button className="whiteupgradebtn" data-toggle="modal" data-target="#upgradeModal">Upgrade</button> */}
                                        </a>
                                        <div className="collapse" id="submenu1" aria-expanded="false">
                                            <ul className="flex-column pl-5 nav submenu">
                                                <li className="nav-item"><NavLink activeClassName="active" className="nav-link py-0" to={`/dashboard/${this.global.company.company_name.toLowerCase()}/camera-details`}><span>Camera Details</span></NavLink></li>
                                                {/* <li className="nav-item">
                                                    <a className="nav-link py-0" href="#"><span>Pending Employee Details</span></a>
                                                    <span className="counter">2</span>
                                                </li> */}
                                            </ul>
                                        </div></>
                                    :
                                    <Link to={`/dashboard/${this.global.company.company_name.toLowerCase()}/landing`} className="list-group-item list-group-item-action">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/computer-vision.png`} />
                                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Computer Vision</span>
                                        <button className="whiteupgradebtn" data-toggle="modal" data-target="#upgradeModal">Upgrade</button>
                                    </Link>
                                : null
                            :
                            null
                    }

                    <NavLink activeClassName="active" to={`/dashboard/${this.global.company.company_name.toLowerCase()}/landing`} className="list-group-item list-group-item-action">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/dashboard-icon.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Dashboard</span>
                    </NavLink>

                    {/* <NavLink to={`/report/${this.global.company.company_name.toLowerCase()}/emp`} className="list-group-item list-group-item-action" activeClassName="active">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/dashboard-icon.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Employee</span>
                        
                    </NavLink>
                    <NavLink to={`/report/${this.global.company.company_name.toLowerCase()}/camera-details`} className="list-group-item list-group-item-action" activeClassName="active">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/up.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Camera Details</span>
                    </NavLink> */}
                    {/* <a href="#" className="list-group-item list-group-item-action">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/clipboard.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Menu Item 3</span>
                    </a> */}
                    {/* <a className="nav-link list-group-item collapsed" href="#submenu1" data-toggle="collapse"
						data-target="#submenu1">
						<img src={`${process.env.PUBLIC_URL}/assets/images/wallet.png`} />
						<span className={this.props.isToggleMenu ? "menu-text" : ""}>Computer Vision</span>
						<button className="whiteupgradebtn" data-toggle="modal" data-target="#upgradeModal">Upgrade</button>
					</a> */}
                    {/* <div className="collapse" id="submenu1" aria-expanded="false">
						<ul className="flex-column pl-5 nav submenu">
							<li className="nav-item"><a className="nav-link py-0" href="#"><span>Camera Details</span></a></li>
							<li className="nav-item">
								<a className="nav-link py-0" href="#"><span>Pending Employee Details</span></a>
								<span className="counter">2</span>
							</li>
						</ul>
					</div> */}

                    {/* <button className="shortBorderbtn">P</button> */}
                    {/* <button className="bigBorderbtn">Pro</button> */}


                </div>
                <span className="buttomtxt">Powered by hipla</span>
            </div>
        )
    }
}

export default ReportSideBar;