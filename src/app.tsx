import React, { Component, setGlobal } from 'reactn';
import { Route, Redirect, Switch, HashRouter, BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import { checkAuth, checkAuthSuperAdmin } from './util/auth';
import { HOC } from './util/HOC';
import Home from './pages/home/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Pricing from './pages/pricing/index';
import EmpRange from './pages/employeerange/index';
import Checkout from './pages/checkout/index';
import ContactUs from './pages/contactus/index';
import Dashboard from './pages/dashboard/index';
import ReportDashboard from './pages/dashboard/ReportDash';
import EmailVerify from './pages/emailVerification/index';
import ForgetPass from './pages/forgetPassword/index';
import ResetPassword from './pages/forgetPassword/resetPass';
import Success from './pages/success/index';
import SuperAdmin from './pages/superAdmin/index';
import SuperLogin from './pages/superAdmin/login/index';
import Privacy from './pages/privacy/index';
import Terms from './pages/terms/index';
import AppPrivacy from './pages/app-privacy/index';
import AppTerms from './pages/app-terms/index';
type props = {};
type states = {};

class App extends Component<props, states> {
    UNSAFE_componentWillMount() {
        //data-aos init
        AOS.init();
        this.setGlobalData()
    }

    /**
     * @description set global data from local storage
     */
    setGlobalData = () => {
        const company = localStorage.getItem('company');
        const selectedPlan = localStorage.getItem('selectedPlan');
        setGlobal({progress:0})
        if(company !== null){
            setGlobal({
                company: JSON.parse(company)
            })
        }
        if(localStorage.getItem('token')){
            setGlobal({
                token:localStorage.getItem('token')
            })
        }
        
        if(selectedPlan !== null){
            // console.log(JSON.parse(selectedPlan))
            setGlobal({
                selectedPlan:JSON.parse(selectedPlan)
            })
            setGlobal({
                subscriptionDetail:{
                    numberOfEmployee:1,
                    totalAmount:JSON.parse(selectedPlan).price * 1,
                    renewType:'monthly',
                    amount:JSON.parse(selectedPlan).price
                }
            })
        }else{
            setGlobal({
                selectedPlan:null
            })
            setGlobal({
                subscriptionDetail:{
                    numberOfEmployee:1,
                    totalAmount:0,
                    renewType:'monthly',
                    amount:0
                }
            })
        }

        
        
    }
    render() {

        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/success" component={Success} />
                    <Route path="/plans" component={Pricing} />
                    <Route path="/emp-range" component={EmpRange} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/privacy" component={Privacy} />
                    <Route path="/terms-conditions" component={Terms} />
                    <Route path="/app-privacy" component={AppPrivacy} />
                    <Route path="/app-terms-conditions" component={AppTerms} />
                    <Route path="/contactus" component={ContactUs} />
                    <Route path="/email-verification/:token" component={EmailVerify} />
                    <Route path="/forgot-password" component={ForgetPass} />
                    <Route path="/reset-password/:token" component={ResetPassword} />

                    <Route path="/portal/hipla/login" component={SuperLogin} />

                    <SuperAdminRoute path="/portal/hipla" component={SuperAdmin} />
                    
                    <PrivateRoute path='/dashboard/:companyName' component={Dashboard} />
                    <PrivateRoute path='/report/:companyName' component={ReportDashboard} />
                </Switch>
            </HashRouter>
        )
    }
}
interface Props {
    component: any,
    path: any
}
const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
        checkAuth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

const SuperAdminRoute: React.FC<Props> = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
        checkAuthSuperAdmin.isAuthenticated
            ? <Component {...props} />
            : <Redirect to='/portal/hipla/login' />
    )} />
)


export default HOC(App);