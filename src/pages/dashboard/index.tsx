import React, { Component, getGlobal } from 'reactn';
import ReportSideBar from '../../components/reportSidebar';
import ReportDashboardHeader from '../../components/reportDashboardHeader';
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import DashLanding from './dashLanding/index';
import ChangePass from './changePass/index';
import Profile from './profile/index';
// import OrderHistory from './orderHistory/index';
// import UpgradePlan from './upgradePlan/index'
import Employee from './employee/index';
import Report from './report/index';
import CameraDetails from './camera/index'
type props = {
    history: any;
    global: any;
};
type states = {
    isToggleMenu: boolean,
    commpany_name: string
};
class Dashboard extends Component<props, states> {
    state = {
        isToggleMenu: false,
        commpany_name: ''
    }
    UNSAFE_componentWillMount() {
        const { company } = getGlobal();
        this.setState({
            commpany_name: company.company_name
        })
    }
    render() {
        const props = Object.assign({
            toggleMenu: () => {
                this.setState({ isToggleMenu: !this.state.isToggleMenu })
            },
            isToggleMenu: this.state.isToggleMenu
        }, this.props)

        return (
            <>
                <div className={this.state.isToggleMenu ? "d-flex toggled" : "d-flex"} id="wrapper">
                    <div className="bodycontprt">
                        <Helmet>
                            <title>Contatrack | Dashboard</title>
                        </Helmet>
                        <ReportSideBar {...props} />
                        <div id="page-content-wrapper">
                            <ReportDashboardHeader
                                {...props} />
                            <div className="container-fluid">
                                <Switch>
                                        <Route exact path="/dashboard/:companyName" >
                                            <Redirect to={`/dashboard/${this.state.commpany_name.toLowerCase()}/insights`} />
                                        </Route>
                                        <Route exact path="/dashboard/:companyName/landing" component={DashLanding} />

                                        {/* <Route path="/dashboard/:companyName/upgrade-plan" component={UpgradePlan} />
                                        <Route path="/dashboard/:companyName/order-history" component={OrderHistory} /> */}
                                        <Route exact path="/dashboard/:companyName/insights" component={Report} />
                                        
                                        <Route path="/dashboard/:companyName/emp" component={Employee} />
                                        <Route path="/dashboard/:companyName/camera-details" component={CameraDetails} />
                                        <Route path="/dashboard/:companyName/change-pass" component={ChangePass} />
                                        <Route path="/dashboard/:companyName/profile" component={Profile} />
                                    
                                </Switch>
                            </div>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}

export default Dashboard;