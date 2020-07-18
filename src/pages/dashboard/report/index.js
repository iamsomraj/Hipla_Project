import React, { Component, lazy, Suspense } from 'reactn';
import { Helmet } from "react-helmet";
import { HOC } from '../../../util/HOC';

const SafetyIndicator = lazy(() => import('./safetyIndicator'));
const BreachHistory = lazy(() => import('./breachHistory'));
const BreachTrend = lazy(() => import('./breachTrend'));
const TodayReport = lazy(() => import('./todayReport'));
const Tracing = lazy(() => import('./tracing'));
// type props = {
//     history: any
// };
// type states = {
//     categotyType: string;
// };

// type global = {
//     company: any;
// }

class Report extends Component {
    constructor() {
        super();
        this.state = {
            categotyType: 'mobile',
            isActiveInsights: true
        }
    }
    render() {
        // const props = Object.assign({category:this.state.categotyType}, this.props )
        return (
            <>
                <Helmet>
                    <title>Contatrack | Report</title>
                </Helmet>

                <div className="innerwrapperbody report-full-height padd-bottom0">
                    <div className="topInnerHeading">
                        <h3 className="loactionprt">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon.png`} />
                            {this.global.company.company_name.toUpperCase()}

                        </h3>
                        <h3 className="loactionprt" style={{ marginTop: 7, color: 'black' }}>PASS-KEY: &nbsp;<b style={{ color: '#2e59a8' }}>{this.global.company.unique_id}</b> </h3>
                        {/* <div className="labelzoneselect">
                            <select>
                                <option>Lavel 2 Zone B</option>
                            </select>
                        </div> */}
                    </div>

                    <div className="dashboard-body margin20">
                        <div className="tab-content px-3 px-sm-0" id="nav-tabContent">

                            <div className={this.state.isActiveInsights ? "tab-pane fade show active" : "tab-pane fade"} id="insights" role="tabpanel"
                                aria-labelledby="nav-insights-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <Suspense fallback={<div className="graph-box">
                                            <div className="topgraphheading">
                                                <h3>Safety Indicator</h3>
                                                <div className="exportdataprt">

                                                    <select>
                                                        <option>Today</option>
                                                        <option>7 days</option>
                                                        <option>14 days</option>
                                                    </select>
                                                </div>
                                            </div>
                                            Loading...
                                        </div>}
                                        >
                                            <SafetyIndicator {...this.props} />
                                        </Suspense>
                                    </div>
                                    <div className="col-md-6">
                                        <Suspense fallback={<div className="graph-box">
                                            <div className="topgraphheading">
                                                <h3>Breach history</h3>
                                                <h4>Today</h4>
                                            </div>
                                            Loading...
                                        </div>}>
                                            <BreachHistory />
                                        </Suspense>
                                    </div>
                                    <div className="col-md-7">
                                        <Suspense fallback={<div className="graph-box">
                                            <div className="topgraphheading">
                                                <h3>Breach Trend</h3>
                                                <div className="exportdataprt">
                                                    <span>
                                                        <i className="fa fa-long-arrow-down"></i>
															Export data
														</span>
                                                    <select>
                                                        <option>Today</option>
                                                        <option>7 days</option>
                                                        <option>14 days</option>
                                                    </select>
                                                </div>
                                            </div>
                                            Loading...
                                        </div>} >
                                            <BreachTrend />
                                        </Suspense>
                                    </div>
                                    <div className="col-md-5">
                                        <Suspense fallback={<div>Loadind...</div>}>
                                            <TodayReport goToTracing={()=>this.setState({isActiveInsights:false})} />
                                        </Suspense>
                                    </div>
                                </div>
                                <div style={{ height: 10 }}></div>
                            </div>
                            <div className={!this.state.isActiveInsights ? "tab-pane fade show active" : "tab-pane fade"} id="tracing" role="tabpanel"
                                aria-labelledby="nav-tracing-tab">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Tracing ref="tracing" />
                                </Suspense>
                            </div>
                            <div style={{ height: 180 }}></div>
                        </div>

                        {/* <nav className="position-relative">
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="insights" data-toggle="tab" href="#insights"
                                    role="tab" aria-controls="nav-insights" aria-selected="true">Insights</a>
                                <a className="nav-item nav-link" id="tracing" data-toggle="tab" href="#tracing"
                                    role="tab" aria-controls="nav-tracing" aria-selected="false">Tracing</a>
                            </div>
                        </nav> */}
                    </div>



                </div>

                <div className="footer-cont">

                    {/* <nav className="position-relative bothpadding">
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="insights" data-toggle="tab" href="#insights"
                                role="tab" aria-controls="nav-insights" aria-selected="true">Insights</a>
                            <a className="nav-item nav-link" id="tracing" data-toggle="tab" href="#tracing" role="tab"
                                aria-controls="nav-tracing" aria-selected="false">Tracing</a>
                        </div>
                    </nav> */}
                    <nav className="position-relative bothpadding">
                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <a className={this.state.isActiveInsights ? "nav-item nav-link active" : "nav-item nav-link"} href="#insights"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ isActiveInsights: true })
                                }}
                            >Insights</a>
                            <a className={!this.state.isActiveInsights ? "nav-item nav-link active" : "nav-item nav-link"} href="#tracing" onClick={(e) => {
                                e.preventDefault();
                                this.setState({ isActiveInsights: false })
                            }}>Tracing</a>
                        </div>
                    </nav>

                    <div className="innerfootercont flex">
                        <div className="footerinput">
                            <label>Date:</label>
                            <input type="text" disabled placeholder={new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()} />
                        </div>
                        {
                            this.state.isActiveInsights
                                ?
                                null
                                :
                                <div className="footerinput">
                                    <label>Category:</label>
                                    <select onChange={(e) => this.setState({ categotyType: e.target.value }, () => { this.refs.tracing.searchSpace(this.state.categotyType) })}>
                                        <option value="mobile">Mobile</option>
                                        <option value="computer">Computer Vision</option>
                                    </select>
                                </div>}
                        {/* 
                        <div className="footerinput">
                            <label>Track:</label>
                            <select>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                            </select>
                        </div>
                        <div className="footerinput">
                            <label>Speed:</label>
                            <select>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                                <option>ddfdf</option>
                            </select>
                        </div> */}

                    </div>

                </div>
            </>
        )
    }
}
export default HOC(Report);