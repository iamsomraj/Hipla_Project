import React, { Component, setGlobal } from 'reactn';
import Header from '../../components/header';
import { Helmet } from "react-helmet";
import ReactSlider from 'react-slider';
import CartBox from '../../components/cartBox';
type props = {
    history: any
};
type states = {
    empQuantity: any
};

type global = {
    selectedPlan: any,
    subscriptionDetail: any
}

class EmpRange extends Component<props, states, global> {
    constructor() {
        super();
        this.state = {
            empQuantity: 10
        }
    }
    componentDidMount() {
    }

    changeEmpQuantity = (event: any) => {
        let subscriptionDetail = this.global.subscriptionDetail
        subscriptionDetail['numberOfEmployee'] = event;
        setGlobal({
            subscriptionDetail
        })
    }

    onChangePlan = (event: any, planType: string) => {
        console.log(event.target.value, planType);
        // return
        let subscriptionDetail = this.global.subscriptionDetail;
        let selectedPlan = this.global.selectedPlan;
        subscriptionDetail['renewType'] = planType;
        subscriptionDetail['amount'] = event.target.value;
        setGlobal({
            subscriptionDetail,
            selectedPlan
        })
    }

    render() {
        const props = Object.assign({
            numberOfEmp: this.state.empQuantity
            , ...this.props
        })
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
                                        <h2>Number of employees</h2>
                                        <span>{this.global.subscriptionDetail.numberOfEmployee}</span>

                                    </div>
                                    <div className="rangebar">
                                        <ReactSlider
                                            defaultValue={this.global.subscriptionDetail.numberOfEmployee}
                                            max={this.global.selectedPlan.planDetails.max_employee}
                                            min={1}
                                            onChange={(e) => this.changeEmpQuantity(e)}
                                            className="horizontal-slider"
                                            thumbClassName="example-thumb"
                                            trackClassName="example-track"
                                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                        />
                                        <div id="tickmarks">
                                            <p>1</p>
                                            <p>{this.global.selectedPlan.planDetails.max_employee}</p>
                                        </div>

                                    </div>
                                    <small className="smallTxt">Large enterprises with a high employee count and high employee/square foot density in bigger office spaces</small>
                                </div>

                                {
                                    this.global.selectedPlan.planDetails.isPayble
                                        ?
                                        <div className="leftbox margin20">
                                            <div className="topheadwithvalue">
                                                <h2>Select term length</h2>
                                            </div>

                                            <div className="planprt">
                                                <div className="plan-check">
                                                    <input type="radio" name="renewType" onChange={(e) => this.onChangePlan(e, 'monthly')} value={Math.round(this.global.selectedPlan.price)} checked={this.global.subscriptionDetail.renewType === 'monthly'} id="monthly-plan" />
                                                    <label htmlFor="monthly-plan" >Monthly Plan </label>
                                                </div>

                                                <div className="price">
                                                    <span>${Math.round(this.global.selectedPlan.price)}</span> Per user/month
							                    </div>
                                            </div>

                                            <div className="planprt">
                                                <div className="plan-check">
                                                    <input type="radio" name="renewType" onChange={(e) => this.onChangePlan(e, 'yearly')} value={Math.round(this.global.selectedPlan.price - (this.global.selectedPlan.price * 10) / 100)} checked={this.global.subscriptionDetail.renewType === 'yearly'} id="annual-plan" />
                                                    <label htmlFor="annual-plan" >Annual Plan (10% off)</label>
                                                </div>

                                                <div className="price">
                                                    <span>${Math.round(this.global.selectedPlan.price - (this.global.selectedPlan.price * 10) / 100)}</span> Per user/month
							                    </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }

                                <button className="blue inner-button margin30 float-right" onClick={() => this.props.history.push('/checkout')}>Continue</button>
                            </div>

                            <CartBox {...props} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default EmpRange;