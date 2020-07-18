import React, { Component, Suspense, lazy } from 'reactn';
import * as Scroll from 'react-scroll';
import { Helmet } from 'react-helmet';

const HomeHeader: React.LazyExoticComponent<any> = lazy(() => import('../../components/homeHeader'));
const Footer: React.LazyExoticComponent<any> = lazy(() => import('../../components/footer'));
const Banner: React.LazyExoticComponent<any> = lazy(() => import('./bannerComp'));
const SvgAnimation: React.LazyExoticComponent<any> = lazy(() => import('./animationSvg'));
const StatisticContent: React.LazyExoticComponent<any> = lazy(() => import('./statisticContent'));
const SolutionsContent: React.LazyExoticComponent<any> = lazy(() => import('./solutionsContent'));

type props = {
    history: any
};
type states = {
    isReadmorevisible: boolean;
};

class Home extends Component<props, states> {
    constructor() {
        super();
        this.state = {
            isReadmorevisible: false
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div className="wrapper">
                <Helmet>
                    <title>Contatrack | Home</title>
                </Helmet>
                <Suspense fallback={<div></div>}>
                    <HomeHeader {...this.props} />
                </Suspense>
                <Suspense fallback={<div></div>}>
                    <Banner {...this.props} />
                </Suspense>

                <Suspense fallback={<div></div>}>
                    <SolutionsContent />
                </Suspense>


                <div className="contactprt text-center">
                    <div className="container">
                        <h2 data-aos="fade-up">Achieved through</h2>
                        <h3 data-aos="fade-up"><b>Computer vision | Beacon technology | Mobile devices</b></h3>
                        {/* <p data-aos="zoom-in-up">We will deliver a customized, effective and elegant solution that assists
						you in ensuring employee safety. </p> */}
                        <button className="bluebtn" onClick={() => this.props.history.push('/plans')}>Request a free trial</button>
                    </div>

                </div>



                <Suspense fallback={<div></div>}>
                    <SvgAnimation {...this.props} />
                </Suspense>
                <Suspense fallback={<div></div>}>
                    <StatisticContent />
                </Suspense>

                <div className="about-intoprt" >
                    <div className="inner-container">
                        <div className="row">
                            <div className="col-lg-5" data-aos="fade-up">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/who-weimg.png`} />
                            </div>
                            <div className="col-lg-7 padding-left margin80">

                                <h2 data-aos="fade-up">What we do</h2>
                                <p>
                                    We use advanced AI, Computer vision and Big Data in our system and apply it to your <b>existing</b> CCTV
						        </p>
                                <p>
                                    Our Surveillance solution monitors and establishes Safe Distancing Breaching, Mask Detection and Contact tracing systems into your space.
						        </p>
                                <div style={{ display: this.state.isReadmorevisible ? 'block' : 'none' }}>
                                    <p>
                                        Awarding you with a seamless, intutive and unprecedented infection control system.
							        </p>
                                    

                                </div>
                                <button className="readbtn" onClick={() => this.setState({ isReadmorevisible: !this.state.isReadmorevisible })} >{this.state.isReadmorevisible ? 'READ LESS' : 'Read MORE'}</button>
                                <br />
                                <button className="bluebtn" onClick={() =>this.props.history.push('/plans')} >Request a free trial</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Suspense fallback={<div></div>}>
                    <Footer />
                </Suspense>


            </div>
        )
    }
}

export default Home;