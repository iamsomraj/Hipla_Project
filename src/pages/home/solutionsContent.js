import React from 'reactn';
import LazyLoad from 'react-lazyload';
import * as Scroll from 'react-scroll';
const SolutionsContent = () => (
    <Scroll.Element className="servicesprt text-center"  name="about">
        <div className="inner-container">
            <h2 data-aos="fade-up">What our solution has to offer</h2>


            <LazyLoad>
                <div className="row margin60">
                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="1000">
                        <div className="box text-center">

                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-01.png`} />
                            <h3>Safe distancing<br />
								surveillance</h3>

                        </div>
                    </div>

                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="2000">
                        <div className="box text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-07.png`} />
                            <h3>Mask detection
								monitoring</h3>

                        </div>
                    </div>

                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="3000">
                        <div className="box text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-08.png`} />
                            <h3>Real-time Contact<br />
								Tracing</h3>

                        </div>
                    </div>

                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="4000">
                        <div className="box text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-03.png`} />
                            <h3>Instant notifications on<br />
								safety protocol breaches</h3>

                        </div>
                    </div>

                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="5000">
                        <div className="box text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-05.png`} />
                            <h3>Rich/Customisable data<br />
								for admin panels</h3>

                        </div>
                    </div>

                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="6000">
                        <div className="box text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-04.png`} />
                            <h3>Hotspot<br /> identification</h3>

                        </div>
                    </div>

                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="7000">
                        <div className="box text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-09.png`} />
                            <h3>Footfall monitoring/<br />crowd sensing</h3>

                        </div>
                    </div>

                    <div className="col-lg-3" data-aos="zoom-in" data-aos-duration="8000">
                        <div className="box text-center">
                            <img src={`${process.env.PUBLIC_URL}/assets/images/home-icon-one-06.png`} />
                            <h3>Hardware <br />independent</h3>

                        </div>
                    </div>


                </div>
            </LazyLoad>




        </div>
    </Scroll.Element>
)

export default SolutionsContent;