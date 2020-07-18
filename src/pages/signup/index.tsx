import React, { Component, getGlobal } from 'reactn';
import Header from '../../components/header';
import { Link, RouteProps } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { HOC } from '../../util/HOC'
import { checkAuth } from '../../util/auth';
import { post } from '../../util/Service';
import CircularProgress from '@material-ui/core/CircularProgress';
import CartBox from '../../components/cartBox';
type props = {
	history: any,
	showAlert: any
};
type states = {
	value: any,
	validation: any,
	isSecurePass: boolean,
	loading: boolean
}

type global = {
	selectedPlan: any
}

class Signup extends Component<props & RouteProps, states, global> {
	constructor(props: any) {
		super();
		this.state = {
			value: {
				email: '',
				password: '',
				cmpanyName: '',
				companyWebsite: '',
				country: '',
				phone: ''
			},
			validation: {
				email: '',
				password: '',
				cmpanyName: '',
				companyWebsite: '',
				country: '',
				phone: ''
			},
			isSecurePass: true,
			loading: false
		}
	}

	componentDidMount() {
		// checkAuth
		window.scrollTo(0, 0)
		if (checkAuth.isAuthenticated) {
			this.props.history.push('/')
		}
	}

	handleChange = (event: any, name: string) => {
		// console.log(event.target.value)
		let value = { ...this.state.value };
		value[name] = event.target.value;
		this.validateInput(event, name);
		this.setState({ value });
	}

	validateInput = (event: any, name: string) => {
		const value = event.target.value;
		let validation = { ...this.state.validation };
		switch (name) {
			case 'email':
				if (value === '') {
					validation[name] = 'Please enter your email address';
				}
				else {
					const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
					if (reg.test(value)) {
						validation[name] = '';
					} else {
						validation[name] = 'Please enter valid email address';
					}
				}
				break;
			case 'cmpanyName':
				if (value === '') {
					validation[name] = 'Please enter your company name';
				}
				else {
					if (value.length < 3) {
						validation[name] = 'Company name should be minimum 3 character';
					} else {
						const reg = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
						if (reg.test(value)) {
							validation[name] = '';
						} else {
							validation[name] = `Spaces and Special characters not allowed.`;
						}
					}
				}
				break;
			case 'companyWebsite':
				if (value === '') {
					validation[name] = 'Please enter your company website url';
				}
				else {
					const reg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
					if (reg.test(value)) {
						validation[name] = '';
					}
					else {
						validation[name] = 'Please enter valid url';
					}

				}
				break;
			case 'country':
				if (value === '') {
					validation[name] = 'Please select country';
				}
				else {
					validation[name] = '';
				}
				break;
			case 'phone':
				if (value === '') {
					validation[name] = 'Please enter phone number';
				}
				else {

					let reg = /^[0-9]+$/;
					if (reg.test(value)) {
						if (value.length >= 6) {
							validation[name] = '';
						}
						else {
							validation[name] = 'Minimum 6 digit required.';
						}

					} else {
						validation[name] = 'Only numbers accepted.';
					}

				}
				break;
			default:
				// console.log('Default')
				break;
		}
		this.setState({ validation })
	}

	_submitForm = (e: any) => {
		e.preventDefault();
		this.setState({ loading: true })
		let { selectedPlan } = getGlobal();
		const { email, phone, country, cmpanyName, companyWebsite } = this.state.value;
		const data = {
			"company_name": cmpanyName,
			"email": email,
			"password": "123456789",
			"subdomain": companyWebsite,
			"location": {
				"country": country
			},
			"plan": selectedPlan.id,
			"phone": phone,

		}
		post('/api/company/signup', data)
			.then((res) => {
				this.setState({ loading: false })
				const status = res.request.status;
				if (status === 201) {
					// this.props.showAlert(res.data.message, 'success');
					// setTimeout(() => {
					this.props.history.push('/success')
					// }, 1500)
				} else {
					this.props.showAlert(res.response.data.message, 'error');
				}
			})
	}



	render() {
		return (
			<>
				<Helmet>
					<title>Contatrack | Sign up</title>
				</Helmet>
				<Header {...this.props} />
				<div data-aos="fade-down" className="innerbody">
					<div className="inner-container">
						<div className="twopanel-signin">
							<div className="leftPrt">
								<div className="leftbox">
									<h2 >Enter details</h2>
									{/* <p className="text-center">Already have an account? <Link to="/login">Sign in</Link></p> */}
									<form onSubmit={(e) => this._submitForm(e)}>
										<div className="input-panel margin30">
											<label>Email Address</label>
											<input
												type="text"
												name="email"
												onChange={(e) => this.handleChange(e, 'email')}
												defaultValue={this.state.value.email}
												onBlur={(e) => this.validateInput(e, 'email')}
											/>
											<span className="error">{this.state.validation.email}</span>
										</div>
										<div className="input-panel margin30">
											<label>Company</label>
											<input
												type="text"
												name="cmpanyName"
												onChange={(e) => this.handleChange(e, 'cmpanyName')}
												defaultValue={this.state.value.cmpanyName}
												onBlur={(e) => this.validateInput(e, 'cmpanyName')}
											/>
											<span className="error">{this.state.validation.cmpanyName}</span>
										</div>
										<div className="input-panel margin30">
											<label>Company Website</label>
											<input
												type="text"
												name="companyWebsite"
												onChange={(e) => this.handleChange(e, 'companyWebsite')}
												defaultValue={this.state.value.companyWebsite}
												onBlur={(e) => this.validateInput(e, 'companyWebsite')}
											/>
											<span className="error">{this.state.validation.companyWebsite}</span>
										</div>
										<div className="input-panel margin30">
											<label>Phone</label>
											<input
												type="text"
												name="phone"
												maxLength={13}
												onChange={(e) => this.handleChange(e, 'phone')}
												defaultValue={this.state.value.phone}
												onBlur={(e) => this.validateInput(e, 'phone')}
											/>
											<span className="error">{this.state.validation.phone}</span>
										</div>
										<div className="input-panel margin30">
											<label>Country</label>
											<select defaultValue={this.state.value.country} onChange={(e) => this.handleChange(e, 'country')} >
												<option value="" selected>Select Country</option>
												{

													countryList.map((country, i) => {
														return (
															<option key={i} >{country}</option>
														)
													})
												}

											</select>
											<span className="error">{this.state.validation.country}</span>
										</div>
										{/* <div className="input-panel">
											<label>Password</label>
											<input
												name="password"
												type={this.state.isSecurePass ? "password" : "text"}
												onChange={(e) => this.handleChange(e, 'password')}
												defaultValue={this.state.value.password}
												onBlur={(e) => this.validateInput(e, 'password')}
											/>
											<span className="error">{this.state.validation.password}</span>
											<div className="showlink" >
												<a onClick={() => this.setState({ isSecurePass: !this.state.isSecurePass })}>{this.state.isSecurePass ? "Show" : "Hide"}</a>
											</div>

										</div> */}

										<button
											disabled={
												this.state.value.email === '' ||
												this.state.value.companyWebsite === '' ||
												this.state.value.cmpanyName === '' ||
												this.state.value.phone === '' ||
												this.state.value.country === '' ||

												this.state.validation.email !== '' ||
												this.state.validation.companyWebsite !== '' ||
												this.state.validation.cmpanyName !== '' ||
												this.state.validation.phone !== '' ||
												this.state.validation.country !== ''
											}
											type="submit"
											className="blue inner-button normabtn"
										>
											{
												this.state.loading
													?
													<CircularProgress color="inherit" />
													:
													'Submit'
											}
										</button>
										{/* <p className="shortTxt">By creating an account, you agree to Contatrack's <Link to="/terms-conditions" target="_blank">Terms & Conditions</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link></p> */}
									</form>
								</div>
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

const countryList = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan (Province of China)",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

export default HOC(Signup);