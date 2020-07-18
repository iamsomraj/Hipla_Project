import React, { Component } from 'reactn';
import { Helmet } from "react-helmet";
import { HOC } from '../../../util/HOC';

type props = {
    history: any
};
type states = {
};

class UpgradePlan extends Component<props, states> {
    render() {
        return (
            <>
                <Helmet>
                    <title>Contatrack | Order History</title>
                </Helmet>

                <div className="innerwrapperbody">
						<div className="topInnerHeading">
							<h2 className="upper-heading">Upgrade</h2>


						</div>

						<div className="row margin20">
							<div className="col-lg-4">
								<div className="plan-box active">
									<div className="topblueprt">
										<h3>Basic</h3>
										<p>Small enterprises and startups with limited office space</p>
									</div>

									<div className="lower-body">
										<span>
											<small>Price/user/month</small>
											<h4>Free</h4>
										</span>
										<span>
											<small>Users/Employees</small>
											<h5>Upto 20</h5>
										</span>
										<span>
											<small>Features</small>
											<p>Safe distancing.</p>
											<p>Contact Tracing.</p>
										</span>
										<span>
											<small>Access</small>
											<p>Mobile App-breach trigger notification, current safety level</p>
										</span>

										<button className="inner-button greenbtn trybutton">Try for free</button>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="plan-box">
									<div className="topblueprt">
										<h3>Standard</h3>
										<p>Medium-sized enterprises with a high employee/square foot density</p>
									</div>

									<div className="lower-body">
										<span>
											<small>Price/user/month</small>
											<h4>$5</h4>
										</span>
										<span>
											<small>Users/Employees</small>
											<h5>21 - 100</h5>
										</span>
										<span>
											<small>Features</small>
											<p>All the great stuff in Basic.</p>
											<p>Employee Route History for up to 7 days.</p>
											<p>All the great stuff in Basic.</p>
											<p>Employee Route History for up to 7 days.</p>
										</span>
										<span>
											<small>Access</small>
											<p>Mobile App-breach trigger notification, current safety level</p>
											<p>Mobile App-breach trigger notification, current safety level</p>
											<p>Mobile App-breach trigger notification, current safety level</p>
											<p>Mobile App-breach trigger notification, current safety level</p>
										</span>

										<button className="inner-button greenbtn trybutton">Try for free</button>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="plan-box">
									<div className="topblueprt">
										<h3>Pro</h3>
										<p>Large enterprises with a high employe count and high employee/square foot
											density in large office spaces</p>
									</div>

									<div className="lower-body">
										<span>
											<small>Price/user/month</small>
											<h4>$8</h4>
										</span>
										<span>
											<small>Users/Employees</small>
											<h5>101 - 500</h5>
										</span>
										<span>
											<small>Features</small>
											<p>All the great stuff in Basic.</p>
											<p>Employee route history for 14 days</p>
											<p>Fully Customisable insights dashboard</p>
											<p>Employee Route History for up to 7 days.</p>
										</span>
										<span>
											<small>Access</small>
											<p>Mobile App-breach trigger notification, current safety level</p>
											<p>Mobile App-breach trigger notification, current safety level</p>
											<p>Mobile App-breach trigger notification, current safety level</p>
											<p>Mobile App-breach trigger notification, current safety level</p>
											<p>Mobile App-breach trigger notification, current safety level</p>
										</span>

										<button className="inner-button greenbtn trybutton">Try for free</button>
									</div>
								</div>
							</div>

						</div>


					</div>
            </>
        )
    }
}

export default HOC(UpgradePlan);