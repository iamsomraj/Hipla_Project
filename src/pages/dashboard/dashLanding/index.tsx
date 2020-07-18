import React, { Component, getGlobal } from 'reactn';
import { Helmet } from "react-helmet";
import { HOC } from '../../../util/HOC';
import { get, authPatch } from '../../../util/Service'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

type props = {
	history: any;
	showAlert: any;
};
type states = {
	cmpDetails: any;
	isLoading: boolean;
	isUpgradeModalOpen: boolean;
	plans: any;
	upgradePlanId: string;
};

type global = {
	company: any;
}
class DashLanding extends Component<props, states, global> {
	constructor() {
		super();
		this.state = {
			cmpDetails: {},
			isLoading: false,
			isUpgradeModalOpen: false,
			plans: [],
			upgradePlanId: ''
		}
	}

	componentDidMount() {
		const { company } = getGlobal();
		this.setState({
			isLoading: true
		})
		get('/api/plans')
			.then((res) => {
				// console.log(JSON.stringify(res));
				const status = res.request.status;
				if (status === 201) {
					this.setState({
						plans: res.data.data
					})
				}
			})
		get(`/api/company/details/${company._id}`)
			.then((res) => {
				console.log(res, 'company details =============>>>>>>>>>>>>>')
				this.setState({
					isLoading: false
				})
				const status = res.request.status;
				if (status === 201) {
					this.setState({
						cmpDetails: { ...res.data.data }
					})
				}
			})
	}

	upgradePlan = () => {
		let { company } = getGlobal();

		let data = {
			"plan": this.state.upgradePlanId,
			"is_super_admin": false
		}

		this.setState({
			isLoading: true
		})
		authPatch(`/api/company/upgrade/plan/${company._id}`, data)
			.then((res) => {
				// console.log(res);

				this.setState({
					isLoading: false,
					isUpgradeModalOpen: false
				})
				const status = res.request.status;
				if (status === 201) {
					this.props.showAlert(res.data.message, 'success');
				} else {
					this.props.showAlert('Something went wrong, Please try again!', 'error');
				}
			})
	}

	onChangeValues = (e: any, name: string) => {
		let cmpDetails = { ...this.state.cmpDetails }
		cmpDetails[name] = e.target.value.toString();
		this.setState({
			cmpDetails
		})
		let { company } = getGlobal();
		switch (name) {
			case 'timeMetric':
				let data = {
					"timeMetric": e.target.value
				}
				authPatch(`/api/company/save-time-metric/${company._id}`, data)
					.then((res) => {
						const status = res.request.status;
						if (status === 201) {
							this.props.showAlert(res.data.message, 'success');
						} else {
							this.props.showAlert('Something went wrong, Please try again!', 'error');
						}
					})
				break;
			case 'min_distance':
				let dataTime = {
					"min_distance" : e.target.value
				}
				authPatch(`/api/company/save-minimum-distance/${company._id}`, dataTime)
					.then((res) => {
						const status = res.request.status;
						if (status === 201) {
							this.props.showAlert(res.data.message, 'success');
						} else {
							this.props.showAlert('Something went wrong, Please try again!', 'error');
						}
					})
				break;
		}
	}

	render() {
		const { current_plan_details } = this.state.cmpDetails;
		return (
			<>
				<Helmet>
					<title>Contatrack | Report</title>
				</Helmet>

				<div className="innerwrapperbody">
					<h2 className="upper-heading">Dashboard</h2>

					<div className="dashboardplantable margin20">

						<div className="tableprt">
							<table cellPadding="0" cellSpacing="0">
								<thead>
									<tr>

										<th>Current Plan</th>
										{/* <th>Billing Date</th> */}
										<th>Payment Method</th>
										<th>Location</th>


									</tr>
								</thead>

								<tbody>
									{
										this.state.isLoading
											?
											<tr>
												<td colSpan={3}>
													<div style={{ textAlign: 'center' }}>
														<CircularProgress color="primary" />
													</div>
												</td>
											</tr>
											:

											Object.keys(this.state.cmpDetails).length > 0
												?
												<>
													<tr>
														<td title="Current Plan">
															{current_plan_details.plan.plan_name} Plan
													</td>
														{/* <td title="Billing Date">
														<span>Cancels</span>
														18/4/2022
													</td> */}
														<td title="Payment Method">
															In Cash
													</td>
														<td title="Location">
															{this.state.cmpDetails.location.country || 'N/A'}
														</td>

													</tr>
												</>
												: null
									}

								</tbody>
							</table>
						</div>

						<div className="rightbuttonprt">
							{/* <button className="renewbtn">RENEW</button> */}
							<button className="blue inner-button" onClick={() => this.setState({ isUpgradeModalOpen: true })} disabled={this.state.isLoading}>Upgrade</button>
						</div>



						<div className="tableprt">
							<table cellPadding="0" cellSpacing="0">
								<thead>
									<tr>

										<th>PASS-KEY</th>
										<th>&nbsp;</th>

									</tr>
								</thead>

								<tbody>
									<tr>
										<td >
											<h5 style={{ marginTop: 10, color: 'black', float: 'left' }}><b style={{ color: '#2e59a8' }}>{this.global.company.unique_id}</b> </h5>
										</td>
									</tr>

								</tbody>
							</table>
						</div>

						{/* <div className="rightbuttonprt">
							<button className="blue inner-button" onClick={() => this.setState({ isUpgradeModalOpen: true })} disabled={this.state.isLoading}>Upgrade</button>
						</div> */}

					</div>

					<div className="dashboardplantable margin20" >
						<p>Customize Minimum distance</p>
						<FormControl variant="outlined" style={{ minWidth: 200 }}>
							<InputLabel style={{ backgroundColor: '#fff' }} id="demo-simple-select-outlined-label">Distance (ft)</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={parseInt(this.state.cmpDetails.min_distance)}
								onChange={(e) => this.onChangeValues(e, 'min_distance')}
							>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={8}>8</MenuItem>
								<MenuItem value={10}>10</MenuItem>
							</Select>
						</FormControl>
						<br /><br />
						<p>Customize Time metric</p>
						<FormControl variant="outlined" style={{ minWidth: 200 }}>
							<InputLabel style={{ backgroundColor: '#fff', paddingRight: 5, paddingLeft: 5 }} id="demo-simple-select-outlined-label">Time metric (min)</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={parseInt(this.state.cmpDetails.timeMetric)}
								onChange={(e) => this.onChangeValues(e, 'timeMetric')}
							>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={15}>15</MenuItem>
								<MenuItem value={30}>30</MenuItem>
							</Select>
						</FormControl>
					</div>

				</div>



				{/* delete dialog */}
				<Dialog
					open={this.state.isUpgradeModalOpen}
					onClose={() => this.setState({ isUpgradeModalOpen: false })}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogContent>
						<div className="modal-body text-center">
							<div className="deletebody">
								<h4>Upgrade Plan</h4>
								<p>
									Select your plan and submit.
                				</p>
								<div className="modal-input" style={{ minWidth: 400 }}>
									{/* <label>Subscription Plan</label> */}
									{

										<select onChange={(e) => this.setState({ upgradePlanId: e.target.value })} >
											<option value="" selected>Select Plan</option>
											{
												this.state.cmpDetails.current_plan_details === undefined
													?
													null
													:
													this.state.plans.map((plan: any, i: number) => {
														return (
															this.state.cmpDetails.current_plan_details.plan.plan_name === plan.name
																?
																null
																:
																<option key={i} value={plan.id} >{plan.name}</option>
														)
													})
											}

										</select>
									}

									<span ><i>{'Please select a plan'}</i></span>
								</div>

								<div className="deletebtnprt">
									<button
										type="button"
										className="canbtn"
										onClick={() => this.setState({ isUpgradeModalOpen: false })}
									>
										Cancel
									</button>
									<button
										type="button"
										className="delbtn"
										disabled={this.state.upgradePlanId === '' || this.state.isLoading}
										onClick={() => {
											this.upgradePlan();
										}}
									>
										{
											this.state.isLoading
												?
												'Loading...'
												:
												'UPGRADE'}
									</button>
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</>
		)
	}
}

export default HOC(DashLanding);