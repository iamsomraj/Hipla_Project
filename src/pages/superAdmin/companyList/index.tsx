import React, { Component, getGlobal } from "reactn";
import { Helmet } from "react-helmet";
// import { Route, Redirect, HashRouter, BrowserRouter as Router } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-js-pagination";
import { get, post, axiosPatch } from "../../../util/Service";
import { HOC } from "../../../util/HOC";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import './style.css'
type props = {
    history: any;
    showAlert: any;
};
type states = {
    companies: any;
    search: any;
    itemsCountPerPage: number;
    currentPage: number;
    isLoading: boolean;
    isAddModalopen: boolean;
    isDeleteModalOpen: boolean;
    isEditModalopen: boolean;
    isAddEditLoading: boolean;
    validation: any;
    addCmp: any;
    plans: any
    isLoadingActive: boolean;
    isUpgradeModalOpen: boolean;
    upgradePlanId: string;
    isLoadingUpdatePlan: boolean;
    upgradePlanCompId: string
};
class CompanyList extends Component<props, states> {
    constructor() {
        super();
        this.state = {
            search: null,
            currentPage: 1,
            itemsCountPerPage: 5,
            companies: [

            ],
            isLoading: false,
            isAddModalopen: false,
            isDeleteModalOpen: false,
            isEditModalopen: false,
            plans: [],
            validation: {
                email: '',
                password: '',
                cmpanyName: '',
                companyWebsite: '',
                country: '',
                phone: '',
                plan: ''
            },
            isAddEditLoading: false,
            addCmp: {
                email: '',
                password: '',
                cmpanyName: '',
                companyWebsite: '',
                country: '',
                phone: '',
                plan: ''
            },
            isLoadingActive: false,
            isUpgradeModalOpen: false,
            upgradePlanId: '',
            isLoadingUpdatePlan: false,
            upgradePlanCompId: ''
        };
    }

    componentDidMount() {
        this.getCompany()
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

    }

    getCompany = () => {
        this.setState({
            isLoading: true
        })
        get(`/api/company/all?pageSize=${1000}&pageNumber=${1}&sortBy=createdAt:desc`)
            .then((res) => {
                console.log(res)

                this.setState({
                    isLoading: false
                })
                // return
                const status = res.request.status;
                if (status === 201) {

                    this.setState({
                        companies: res.data.data
                    })

                }
                else {
                    this.props.showAlert("Cannot get camera", "error");
                }
            })

    }

    /**
       * @description handhe searck key input
       * @param {string} event
       */
    searchSpace = (event: any) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }

    /**
     * @description handle toggle popup
     * @param {string} name
     */
    toggleModal = (name: string) => {
        switch (name) {
            case "ADD":
                this.setState({

                    isAddModalopen: !this.state.isAddModalopen,
                    addCmp: {
                        email: '',
                        password: '',
                        cmpanyName: '',
                        companyWebsite: '',
                        country: '',
                        phone: '',
                        plan: ''
                    }
                });
                break;
            case "UPGRADEPLAN":
                this.setState({
                    isUpgradeModalOpen: !this.state.isUpgradeModalOpen,
                });
                break;
        }
    }
    // save data from add camera input box
    handleAddChange = (event: any, name: string) => {
        let addCmp = { ...this.state.addCmp };
        addCmp[name] = event.target.value;
        this.validateInput(event, name);
        this.setState({ addCmp });
    }
    // validate data from add and edit camera input box
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
                        validation[name] = '';
                    } else {
                        validation[name] = 'Only numbers accepted.';
                    }

                }
                break;
            case 'plan':
                if (value === '') {
                    validation[name] = 'Please select subscription plan';
                }
                else {
                    validation[name] = '';
                }
                break;
            default:
                // console.log('Default')
                break;
        }
        this.setState({ validation })
    }

    activeCompany = (company_id: any) => {
        // e.preventDefault()
        // alert('kjhkjh')
        // return
        this.setState({
            isLoadingActive: true
        })
        get(`/api/company/activate/${company_id}`)
            .then((res) => {
                this.setState({
                    isLoadingActive: false
                })
                const status = res.request.status;
                if (status === 201) {
                    let companies = [...this.state.companies]
                    const index = companies.findIndex((company) => company._id === company_id);
                    companies[index].isActive = true;
                    this.setState({
                        companies
                    }, () => {
                        this.props.showAlert('Company activated!', "Success");
                    })
                }
                else {
                    this.props.showAlert('Something went wrong, Please try again!', "error");
                }
            })
    }

    _submitAddCompany = () => {
        this.setState({ isAddEditLoading: true })
        let { selectedPlan } = getGlobal();
        const { email, phone, country, cmpanyName, companyWebsite, plan } = this.state.addCmp;
        const data = {
            "company_name": cmpanyName,
            "email": email,
            "password": "123456789",
            "subdomain": companyWebsite,
            "location": {
                "country": country
            },
            "plan": plan,
            "phone": phone,

        }
        console.log(data);
        // return
        post('/api/company/signup', data)
            .then((res) => {
                this.setState({ isAddEditLoading: false })
                console.log(res)
                const status = res.request.status;
                if (status === 201) {
                    let companies = [...this.state.companies]
                    companies.unshift(res.data.data.company);
                    this.setState({
                        companies
                    }, () => { this.toggleModal('ADD') })
                    this.props.showAlert('Company created successfully!', 'success');

                } else {
                    this.props.showAlert(res.response.data.message, 'error');
                }
            })
    }

    upgradePlan = () => {
        this.setState({ isLoadingUpdatePlan: true })
        let data = {
            "plan": this.state.upgradePlanId,
            "is_super_admin": true
        }
        axiosPatch(`/api/company/upgrade/plan/${this.state.upgradePlanCompId}`, data)
            .then((res) => {
                console.log(res)
                const status = res.request.status;
                if (status === 201) {
                    this.setState({ isLoadingUpdatePlan: false, upgradePlanCompId: '', upgradePlanId: '' }, () => {
                        this.toggleModal('UPGRADEPLAN');
                        this.getCompany();
                    })
                }
                else {
                    this.props.showAlert('Something went wrong, Please try again!', "error")
                }
            })
    }

    render() {
        // filter employees
        const items = this.state.companies.filter((data: any) => {
            if (this.state.search == null)
                return data
            else if (
                data.company_name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.email.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.subdomain.toLowerCase().includes(this.state.search.toLowerCase())
            ) {
                return data
            }
        })

        // Logic for displaying todos
        const indexOfLastTodo = this.state.currentPage * this.state.itemsCountPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.itemsCountPerPage;
        const currentcompanies = items.slice(indexOfFirstTodo, indexOfLastTodo);

        return (
            <>
                <Helmet>
                    <title>Contatrack | Dashboard</title>
                </Helmet>

                <div data-aos="fade-down" className="innerwrapperbody">

                    <div className="employee-directoryprt margin20">
                        <div className="topemployeeheader">
                            <div className="leftheadingprt">
                                <h2>COMPANY DIRECTORY</h2>
                                <input type="search" placeholder="Search" onChange={(e) => this.searchSpace(e)} />
                            </div>
                            <button
                                className="borderbtn"
                                onClick={() => { this.toggleModal('ADD') }}
                            >
                                + ADD COMPANY
                            </button>
                        </div>
                        <div className="tableprt">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>COMPANY NAME</th>
                                        <th>USERNAME</th>
                                        <th>PHONE</th>
                                        <th>WEBSITE</th>
                                        <th>PLAN TYPE</th>
                                        <th>STATUS</th>
                                        <th style={{ textAlign: 'right' }}>ACTION</th>
                                        {/* <th>&nbsp;</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.isLoading ?
                                        <tr>
                                            <td colSpan={8}>
                                                <p style={{ textAlign: 'center' }}>
                                                    <CircularProgress color="primary" />
                                                </p>
                                            </td>
                                        </tr>
                                        :
                                        currentcompanies.map((company: any, i: number) => {
                                            return (
                                                <tr key={i}>
                                                    <td title="COMPANY NAME">{company.company_name || 'N/A'}</td>
                                                    <td title="USERNAME">
                                                        <b>{company.email || 'N/A'}</b>
                                                    </td>
                                                    <td title="PHONE">{company.phone || 'N/A'}</td>
                                                    <td title="WEBSITE">{company.subdomain || 'N/A'}</td>
                                                    <td title="SUBSCTIPTION PLAN">
                                                        {company.current_plan_details
                                                            ?
                                                            this.state.plans.map((plan: any) => {
                                                                let data = ''

                                                                company.current_plan_details.plan === plan.id
                                                                    ?
                                                                    data = plan.name
                                                                    :
                                                                    data = ''

                                                                return data
                                                            })
                                                            :
                                                            'N/A'
                                                        }
                                                        &nbsp;<a href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            this.setState({
                                                                upgradePlanCompId: company._id
                                                            }, () => {
                                                                this.toggleModal('UPGRADEPLAN');
                                                            })
                                                        }}>Change</a>
                                                    </td>
                                                    <td title="STATUS">
                                                        {
                                                            company.isActive
                                                                ?
                                                                <p style={{ color: 'green', fontSize: 13, marginTop: 15 }}>ACTIVE</p>
                                                                :
                                                                <p style={{ color: 'orange', fontSize: 13, marginTop: 15 }}>PENDING</p>
                                                        }
                                                    </td>
                                                    <td title="ACTION" >
                                                        {
                                                            company.isActive
                                                                ?
                                                                <a style={{ color: 'red' }} href="#" onClick={(e) => { e.preventDefault(); this.props.showAlert('This feature is under construction.', "error") }}>INACTIVATE</a>
                                                                :
                                                                <a style={{ color: 'green' }} href="#" onClick={(e) => { e.preventDefault(); this.activeCompany(company._id) }}>ACCEPT</a>
                                                        }

                                                    </td>
                                                    {/* <td> */}
                                                    {/* <div className="twobtn">
                                                            <button
                                                                data-toggle="modal"
                                                            >
                                                                <img
                                                                    src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                                                                />
                                                            </button>
                                                            <button
                                                            >
                                                                <img
                                                                    src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
                                                                />
                                                            </button>
                                                        </div> */}
                                                    {/* </td> */}
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="pegignation-part">
                            <Pagination
                                activePage={this.state.currentPage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={items.length}
                                pageRangeDisplayed={5}
                                itemClass="pegignation"
                                innerClass="pegignation-wrapper"
                                activeClass="active"
                                onChange={(page) => this.setState({ currentPage: page })}
                            />
                        </div>
                    </div>
                </div>


                {/* popup section ====================================================== */}
                {/* add popup */}
                <Dialog
                    open={this.state.isAddModalopen}
                    onClose={() => { this.toggleModal("ADD") }}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <div className="dialog-header">
                            <h4 className="modal-title">Add Company</h4>
                            <button
                                type="button"
                                className="close"
                                onClick={() => { this.toggleModal("ADD") }}
                            >
                                &times;
                            </button>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Company Name</label>
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={(e) => this.handleAddChange(e, 'cmpanyName')}
                                        defaultValue={this.state.addCmp.cmpanyName}
                                        onBlur={(e) => this.validateInput(e, 'cmpanyName')}
                                    />
                                    <span className="error">{this.state.validation.cmpanyName}</span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="cmpanyName"
                                        onChange={(e) => this.handleAddChange(e, 'email')}
                                        defaultValue={this.state.addCmp.email}
                                        onBlur={(e) => this.validateInput(e, 'email')}
                                    />
                                    <span className="error">{this.state.validation.email}</span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Company Website</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.addCmp.companyWebsite}
                                        onChange={(e) => this.handleAddChange(e, "companyWebsite")}
                                        onBlur={(e) => this.validateInput(e, "companyWebsite")}
                                    />
                                    <span className="error">
                                        {this.state.validation.companyWebsite}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        maxLength={10}
                                        defaultValue={this.state.addCmp.phone}
                                        onChange={(e) => this.handleAddChange(e, "phone")}
                                        onBlur={(e) => this.validateInput(e, "phone")}
                                    />
                                    <span className="error">
                                        {this.state.validation.phone}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Country</label>
                                    <select defaultValue={this.state.addCmp.country} onChange={(e) => this.handleAddChange(e, 'country')} >
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
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Subscription Plan</label>
                                    <select onChange={(e) => this.handleAddChange(e, 'plan')} >
                                        <option value="" selected>Select Plan</option>
                                        {

                                            this.state.plans.map((plan: any, i: number) => {
                                                return (
                                                    <option key={i} value={plan.id} >{plan.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    <span className="error">{this.state.validation.plan}</span>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button
                            type="button"
                            className="canbtn"
                            onClick={() => { this.toggleModal("ADD") }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="addbtn"
                            disabled={
                                this.state.isAddEditLoading ||
                                this.state.addCmp.email === '' ||
                                this.state.addCmp.companyWebsite === '' ||
                                this.state.addCmp.cmpanyName === '' ||
                                this.state.addCmp.phone === '' ||
                                this.state.addCmp.country === '' ||
                                this.state.addCmp.plan === '' ||

                                this.state.validation.email !== '' ||
                                this.state.validation.companyWebsite !== '' ||
                                this.state.validation.cmpanyName !== '' ||
                                this.state.validation.phone !== '' ||
                                this.state.validation.country !== '' ||
                                this.state.validation.plan !== ''
                            }
                            onClick={(e) => {
                                // this.toggleModal("ADD");

                                this._submitAddCompany();
                            }}
                        >
                            {
                                this.state.isAddEditLoading
                                    ?
                                    <CircularProgress color="inherit" size={25} />
                                    :
                                    'Add'
                            }
                        </button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.isUpgradeModalOpen}
                    onClose={() => this.setState({ isUpgradeModalOpen: false })}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <div className="modal-body text-center">
                            <div className="deletebody">
                                <h4>Change Plan</h4>
                                <p>
                                    Select a plan and submit.
                				</p>
                                <div className="modal-input" style={{ minWidth: 400 }}>
                                    {/* <label>Subscription Plan</label> */}
                                    {

                                        <select onChange={(e) => this.setState({ upgradePlanId: e.target.value })} >
                                            <option value="" selected>Select Plan</option>
                                            {

                                                this.state.plans.map((plan: any, i: number) => {
                                                    return (

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
                                        disabled={this.state.upgradePlanId === '' || this.state.isLoadingUpdatePlan}
                                        onClick={() => {
                                            this.upgradePlan();
                                        }}
                                    >
                                        {
                                            this.state.isLoadingUpdatePlan
                                                ?
                                                'Loading...'
                                                :
                                                'UPDATE PLAN'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {
                    this.state.isLoadingActive ?
                        <div className="loading">Loading&#8230;</div>
                        : null

                }

            </>
        );
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
export default HOC(CompanyList);

