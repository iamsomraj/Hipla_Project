import React, { Component, setGlobal } from 'reactn';
import { Link } from 'react-router-dom';
import { get } from '../util/Service';

class CartBox extends Component {
    constructor() {
        super();
        this.state = {
            plans: [],
            isLoading: false,
            selectedPlanId: ''
        }
    }
    componentDidMount() {

        this.setState({
            isLoading: true
        })
        get('/api/plans')
            .then((res) => {
                this.setState({
                    isLoading: false
                })
                // console.log(JSON.stringify(res));
                const status = res.request.status;
                if (status === 201) {
                    this.setState({
                        plans: res.data.data
                    })
                }
            })
    }

    selectPlan = (e) => {
        console.log(JSON.parse(e.target.value));

        const plan = e.target.value
        localStorage.setItem('selectedPlan', plan)
        // subscriptionDetail['amount'] = plan.price;
        setGlobal({
            selectedPlan: JSON.parse(plan)
        })

    }

    render() {
        const { name, planDetails, description } = this.global.selectedPlan;
        const price = this.global.subscriptionDetail.amount;
        const { isPayble, max_employee } = planDetails;
        return (
            <div className="rightprt">
                <div className="rightprtbox">
                    <div className="topcont">
                        <h2>
                            {/* <i className="fa fa-shopping-cart"></i> */}
                        Product
                        {/* <small><Link to="/plans">Edit</Link></small> */}
                        </h2>

                        <div className="pro-officeprt">
                            <div className="procont formobfull">
                                {/* <h3>{name} Office Plan</h3> */}
                                <div className="productselect">
                                    <select onChange={(e) => this.selectPlan(e)} >
                                        {
                                            this.state.plans.map((plan, i) => {
                                                return (
                                                    <option key={i} selected={name === plan.name} value={JSON.stringify(plan)} >{plan.name} Plan</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <p>{this.global.selectedPlan.planDetails.description}</p>
                                {/* <span>({this.global.subscriptionDetail.numberOfEmployee}/{max_employee} Employees)</span> */}
                            </div>
                            {/* <div className="price">
                                <span>${price}</span> Per user/month
                            </div> */}
                        </div>
                    </div>

                    {/* <div className="bottom-cont">
                        Estimated Total: <span>${this.global.subscriptionDetail.numberOfEmployee*price}</span>
                    </div> */}
                </div>

                <span className="lowertxt text-left margin20">Not willing to wait? Write to us at <b><a style={{ color: 'inherit' }} href="mailto:info@hipla.io">info@hipla.io</a></b> with your requirement!</span>
                <font className="orprt">
					or
				</font>
                <span className="countryfield">
                    <label>Singapore</label>
                    <p>
                        <a href="mailto:sandeep.k@hipla.io">
                            sandeep.k@hipla.io
						</a>

                    </p>
                </span>
                <span className="countryfield">
                    <label>Kolkata </label>
                    <p>

                        <a href="mailto:ritankar.b@hipla.io">
                            ritankar.b@hipla.io
							</a>
                    </p>
                </span>
                <span className="countryfield">
                    <label>Mumbai</label>
                    <p>

                        <a href="mailto:akshay@hipla.io">
                            akshay@hipla.io
						</a>
                    </p>
                </span>
                <span className="countryfield">
                    <label>Delhi-NCR</label>
                    <p>
                        <a href="mailto:adarsh.s@hipla.io">
                            adarsh.s@hipla.io
							</a>
                    </p>
                </span>
                <span className="countryfield">
                    <label>Bangalore</label>
                    <p>

                        <a href="mailto:amarnath.r@hipla.io">
                            amarnath.r@hipla.io
						</a>
                    </p>
                </span>
                <span className="countryfield">
                    <label>Hyderabad</label>
                    <p>

                        <a href="mailto:manjima.g@hipla.io">
                            manjima.g@hipla.io
						</a>
                    </p>
                </span>
            </div>
        )
    }
}

export default CartBox;