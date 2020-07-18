import React, { Component } from 'reactn';
import { Link, NavLink } from 'react-router-dom';
class SideBar extends Component {
    render() {
        return (
            <div className="whitebg main-sidebar" id="sidebar-wrapper">
                <div className="sidebar-heading">
                    <Link to="/" className="shortimg">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/white-shortlogo.png`} alt="#" />
                    </Link>
                    <Link to="/" className="bigimg">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/dashboard-headerlogo.png`} alt="#" />
                    </Link>
                </div>
                <div className="list-group list-group-flush linkList">
                    <NavLink to={`/portal/hipla`} className="list-group-item list-group-item-action" activeClassName="active">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/dashboard-icon.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Company List</span>

                    </NavLink>
                    {/* <NavLink to={`/report/${this.global.company.company_name.toLowerCase()}/camera-details`} className="list-group-item list-group-item-action" activeClassName="active">
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

                    {/* <NavLink to={`/dashboard/${this.global.company.company_name.toLowerCase()}/upgrade-plan`} className="list-group-item list-group-item-action" activeClassName="active">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/up.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Upgrade</span>
                    </NavLink>
                    <NavLink to={`/dashboard/${this.global.company.company_name.toLowerCase()}/order-history`} className="list-group-item list-group-item-action" activeClassName="active">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/clipboard.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Order History</span>
                    </NavLink>
                    <NavLink to={`/dashboard/${this.global.company.company_name.toLowerCase()}/payment-methods`} className="list-group-item list-group-item-action" activeClassName="active">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/wallet.png`} />
                        <span className={this.props.isToggleMenu ? "menu-text" : ""}>Payment Methods</span>
                    </NavLink> */}

                    {/* <button className="shortBorderbtn" onClick={() => this.props.history.push(`/report/${this.global.company.company_name.toLowerCase()}`)}>R</button>
                    <button className="bigBorderbtn" onClick={() => this.props.history.push(`/report/${this.global.company.company_name.toLowerCase()}`)}>Reports</button> */}

                    {/* <button className="shortBorderbtn">P</button>
                    <button className="bigBorderbtn">Pro</button> */}


                </div>
                <span className="buttomtxt">Powered by hipla</span>
            </div>
        )
    }
}

export default SideBar;