import React, { Component } from 'reactn';
import Header from '../../components/header';
import { Helmet } from "react-helmet";
import CartBox from '../../components/cartBox';
type props = {
        history: any
};
type states = {
};

type global = {
        selectedPlan: any
}
class Checkout extends Component<props, states, global> {
        constructor() {
            super();
        }
        render() {
            return (
                <>
                    <Helmet>
                        <title>Contatrack | Plans</title>
                    </Helmet>
                    <Header {...this.props} />
                    <div className="innerbody">
                        <div className="inner-container">
                            <div className="twopanel-signin">
                                <div className="leftPrt">
    
                                    <div className="leftbox">
                                        <div className="topheadwithvalue">
                                            <h2>Billing Details</h2>
                                        </div>
                                        <div className="row margin20">
                                            <div className="col-md-12">
                                                <div className="input-panel">
                                                    <label>Full Name</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input-panel">
                                                    <label>Email Address</label>
                                                    <select>
                                                        <option>India</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-panel">
                                                    <label>State</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-panel">
                                                    <label>Pincode</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                        </div>
    
    
    
    
    
    
                                    </div>
    
                                    <div className="leftbox margin20">
                                        <div className="topheadwithvalue">
                                            <h2>Payment</h2>
                                        </div>
                                        <div className="row margin20">
                                            <div className="col-md-12">
                                                <div className="input-panel">
                                                    <label>Full Name</label>
                                                    <div className="creditoptionpanel">
                                                        <div className="listitem-check">
                                                            <input type="radio" name="dredit-card" value="General Query" />
                                                            <label>Credit card </label>
                                                        </div>
    
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/card-img.png`} />
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div className="col-md-12">
                                                <div className="input-panel">
                                                    <label>Card Number</label>
                                                    <input type="text" placeholder="3433 5466 6575 5456" />
    
                                                    <div className="cardimg">
                                                        <img src={`${process.env.PUBLIC_URL}/assets/images/visa-icon.png`} />
                                                    </div>
                                                </div>
                                            </div>
    
    
                                            <div className="col-md-6">
                                                <div className="input-panel">
                                                    <label>Expiration Date</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-panel">
                                                    <label>Security Code</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
    
                                        </div>
    
    
    
    
    
    
                                    </div>
    
                                    <button className="blue inner-button normabtn margin20">PAY NOW</button>
                                    <small className="shortTxt">By clicking the button, you agree to the <a href="#">Terms & Conditions</a></small>
                                </div>

                                {
                                        this.global.selectedPlan === null
                                        ?
                                        null
                                        :
                                        <CartBox />
                                }
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
export default Checkout;