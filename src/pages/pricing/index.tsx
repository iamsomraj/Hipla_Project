import React, { Component, setGlobal } from 'reactn';
import Header from '../../components/header';
import { Helmet } from "react-helmet";
import { Redirect, Link } from 'react-router-dom'
import Footer from '../../components/footer';
import { get } from '../../util/Service';
type props = {
	history: any
};
type states = {
	plans: any,
	isLoading: boolean
};
type global = {
	subscriptionDetail: any
}
class Pricing extends Component<props, states, global> {
	constructor() {
		super();
		this.state = {
			plans: [],
			isLoading: false
		}
	}
	componentDidMount() {
		window.scrollTo(0, 0)
		this.setState({
			isLoading: true
		})
		get('/api/plans')
			.then((res) => {
				this.setState({
					isLoading: false
				})
				console.log(JSON.stringify(res));
				const status = res.request.status;
				if (status === 201) {
					this.setState({
						plans: res.data.data
					})
				}
			})
	}

	selectPlan = (plan: any) => {
		// console.log(plan);
		let subscriptionDetail = this.global.subscriptionDetail;
		localStorage.setItem('selectedPlan', JSON.stringify(plan))
		subscriptionDetail['amount'] = plan.price;
		setGlobal({
			selectedPlan: plan,
			subscriptionDetail
		}, () => {
			this.props.history.push('/signup')
		})

	}

	render() {
		return (
			<>
				<Helmet>
					<title>Contatrack | Plans</title>
				</Helmet>
				<Header {...this.props} />
				<div className="plan-body margin80">
					<div className="inner-container">

						<h2 className="text-center" data-aos="fade-up">Choose the plan that’s right for your team</h2>
						<p className="text-center" data-aos="zoom-in-up">Flexible and customisable payment frames, cancel anytime.</p>

						<div className="row margin60">
							{
								this.state.plans.map((plan: any, i: number) => {
									return (
										<div className="col-lg-4" key={i} data-aos="zoom-in" data-aos-duration="1000">
											<div className="plan-box">
												<div className="topblueprt">
													<h3>{plan.planDetails.plan_name}</h3>
													<p>{plan.planDetails.description || 'Medium-sized enterprises with a high employee/square foot density'}</p>
												</div>

												<div className="lower-body">
													<span>
														{/* {
															plan.planDetails.plan_name === 'Professional'
																?
																null
																:

																<small>Price/user/month</small>
														} */}
														{
															plan.planDetails.plan_name === 'Professional'
																?
																<>
																	<p><b>Mobile Application</b></p>
																	<h5>INR 15/user | USD 0.50/user</h5>
																	<p><b>Mobile Application + Computer Vision:</b></p>
																	<p style={{color: '#44CE6F', marginTop:-3}}><Link to="/contactus" style={{color:'inherit'}}>Please get in touch for custom rates</Link></p>
																	<p><b>Camera</b></p>
																	<div className="row">
																		<div className="col-md-6">
																			<p style={{color:'#0654D1'}}>{'Cameras in facility<10'}</p>
																			<h6><b>INR 2500/camera/month</b></h6>
																		</div>
																		<div className="col-md-6">
																			<p style={{color:'#0654D1'}}>{'Cameras in facility 10+'}</p>
																			<h6><b>INR 1200/camera/month</b></h6>
																		</div>
																	</div>
																</>
																: null
														}
														<h5>{
															plan.price === '0.00' ?
																plan.planDetails.plan_name === 'Enterprise'
																	?
																	'Customizable'
																	:
																	'Free'
																: ''}</h5>
													</span>
													<span>
														<small>Users/Employees</small>
														<h5> {
															plan.planDetails.plan_name === 'Enterprise'
																?
																'500 users+'
																:
																'Upto ' + plan.planDetails.max_employee + ' users'
														}</h5>
													</span>
													<div className="feature-box" style={{minHeight: plan.planDetails.plan_name === 'Professional' ? 160 : 250}}>
														<span className="featureList">
															<small>Features</small>
															{
																plan.planDetails.feature.map((el: string, i: number) => {
																	return (
																		<p key={i}>{el}</p>
																	)
																})
															}
														</span>
														{
															plan.planDetails.plan_name === 'Standard'
																?
																<small>* Limited Use 7-day trial</small>
																: null
														}

													</div>

													<span>
														<small>Access</small>
														{
															plan.planDetails.access.map((el: string, i: number) => {
																return (
																	<p key={i}>{el}</p>
																)
															})
														}
													</span>

													<button className="inner-button greenbtn trybutton" onClick={() => this.selectPlan(plan)}>
														{
															plan.planDetails.plan_name === 'Standard'
																?
																'Join the waitlist'
																: 'Continue'
														}
													</button>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
						<div style={{ height: 150 }}></div>


						{/* <div className="contactprt text-center innerpadding">
							<div className="container">
								<h2 data-aos="fade-up">Fluid Social-distancing | Contact tracing</h2>
								<p data-aos="zoom-in-up">We will deliver a customized, effective and elegant solution that assists
						you in ensuring employee safety. </p>
								<button className="bluebtn" onClick={() => this.props.history.push('/contactus')}>GET STARTED</button>
							</div>

						</div> */}
					</div>




				</div>
				<Footer {...this.props} />
			</>
		)
	}
}

export default Pricing;