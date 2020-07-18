import React, { Component } from 'reactn';
import ReportSideBar from '../../components/reportSidebar';
import ReportDashboardHeader from '../../components/reportDashboardHeader';
import { Helmet } from "react-helmet";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Employee from './employee/index';
import Report from './report/index';
import CameraDetails from './camera/index'
type props = {
    history: any,
};
type states = {
    isToggleMenu: boolean
};
class ReportDashboard extends Component<props, states> {
    state={
        isToggleMenu:false
    }
    render() {
        const props = Object.assign({
            toggleMenu:()=>{
                this.setState({isToggleMenu: !this.state.isToggleMenu})
            },
            isToggleMenu: this.state.isToggleMenu
        }, this.props)
        return (
            <>
                <div className={this.state.isToggleMenu ? "d-flex toggled" : "d-flex"} id="wrapper">
                    <div className="bodycontprt">
                        <Helmet>
                            <title>Contatrack | Report</title>
                        </Helmet>
                        <ReportSideBar {...props} />
                        <div id="page-content-wrapper">
                            <ReportDashboardHeader 
                                {...props} />
                            <div className="container-fluid">
                                <Switch>
                                    <Route exact path="/report/:companyName" component={Report} />
                                        
                                    <Route path="/report/:companyName/emp" component={Employee} />
                                    <Route path="/report/:companyName/camera-details" component={CameraDetails} />
                                    
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ReportDashboard;