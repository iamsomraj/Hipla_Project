import React, { Component } from 'reactn';
import SideBar from '../../components/sideBar';
import DashboardHeader from '../../components/dashboardHeader';
import { Helmet } from "react-helmet";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CompanyList from './companyList/index'
type props = {
    history: any,
};
type states = {
    isToggleMenu: boolean
};
class SuperAdmin extends Component<props, states> {
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
                            <title>Contatrack | Hipla</title>
                        </Helmet>
                        <SideBar {...props} />
                        <div id="page-content-wrapper">
                            <DashboardHeader 
                                {...props} />
                            <div className="container-fluid">
                                <Switch>
                                    <Route exact path="/portal/hipla" component={CompanyList} >
                                        
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SuperAdmin;