import React from 'reactn';
import LazyLoad from 'react-lazyload';
import * as Scroll from 'react-scroll';
const Banner = (props) => (
    <div className="banner">
        <div className="inner-container">
            <div className="row">
                <div className="col-md-6 banner-cont">

                    {/* <h1 data-aos="fade-down">
                        SOCIAL DISTANCING, MASK DETECTION  <span>AND</span> CONTACT TRACING
					</h1>
                    <p>Made budget-friendly, bullet proof and effortless</p>
                    <ul className="bannerListing">
                        <li><strong>Safe-guard your</strong></li>
                        <li>EDUCATION SPACE</li>
                        <li>OFFICE SPACE</li>
                        <li>MANUFACTURING/WAREHOUSE UNIT</li>
                    </ul> */}
                    <h1 data-aos="fade-down">
                        SOCIAL DISTANCING, MASK DETECTION  <span>AND</span> CONTACT TRACING
					</h1>
                    <p>Made budget-friendly, bulletproof and effortless</p>
                    <LazyLoad >
                        <div className="banner-imgprt">
                            <p>The strongest Covid-prevention tool for</p>
                            <ul>
                                <li>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/office.png`} alt="office" />
								Office Spaces
							</li>
                                <li>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/industry.png`} alt="industry" />
								Manufacturing Units
							</li>
                                <li>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/school.png`} alt="school" />
								Schools/Colleges
							</li>
                            </ul>
                            {/* <button className="bluebtn">GET STARTED</button> */}
                            <button className="bluebtn" onClick={() => { props.history.push('/plans') }}>Request a demo</button>
                        </div>
                    </LazyLoad>
                    {/* <h4 data-aos="zoom-in">LIKE YOU’VE NEVER SEEN BEFORE.</h4> */}


                </div>
                <LazyLoad >
                    <div className="col-md-6 position-relative">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/banner-img2.png`} alt="shape" data-aos="fade-up" className="floatingimg" />
                        <div className="roundshape shape1"></div>
                        <div className="roundshape shape2"></div>
                        <div className="roundshape shape3"></div>
                        <div className="roundshape shape4"></div>
                        <div className="roundshape shape5"></div>
                        <div className="roundshape shape6"></div>
                        <div className="roundshape shape7"></div>
                        <div className="roundshape shape8"></div>
                        <div className="roundshape shape9"></div>
                        <div className="roundshape shape10"></div>
                        <div className="roundshape shape11"></div>
                    </div>
                </LazyLoad>
            </div>
            <div className="mouseprt">
                <Scroll.Link to="about">
                    <div className="mouse">
                        <LazyLoad >
                            <img src={`${process.env.PUBLIC_URL}/assets/images/mouse.png`} alt="banner" />
                        </LazyLoad>
                    </div>
                </Scroll.Link>

            </div>

        </div>


        {/* <div className="leftsocialprt">

            <ul>
                <li>
                    <a href="https://www.facebook.com/Contatrack/">
                        <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/contatrack-ai/">
                        <i className="fa fa-linkedin"></i>
                    </a>
                </li>
                
                <li>
                    <a href="https://www.instagram.com/contatrack.ai/?igshid=1rnw4fgn4haha">
                        <i className="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </div> */}



    </div>
)

export default Banner;