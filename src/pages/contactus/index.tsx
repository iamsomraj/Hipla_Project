import React, { Component } from 'reactn';
import Header from '../../components/header';
import { Helmet } from "react-helmet";
import Footer from '../../components/footer';
type props = {
    history: any
};
type states = {};
class ContactUs extends Component<props, states> {
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <>
                <div className="wrapper">
                    <Helmet>
                        <title>Contatrack | Contact Us</title>
                    </Helmet>
                    <Header {...this.props} />
                    <div className="contact-body">
                        <div className="inner-container">

                            <h2 data-aos="fade-up" className="text-center">Get in touch</h2>
                            <p data-aos="zoom-in-up" className="text-center">Let us find you a solution that is tailor made for your needs.</p>
                            <div className="row margin60">
                                {/* <div className="col-lg-6" data-aos="fade-up">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/contact-img.png`} />
                            </div>

                            <div className="col-lg-6" data-aos="fade-down">
                                <div className="input-panel greybg">
                                    <label>Name</label>
                                    <input type="text" />
                                </div>
                                <div className="input-panel greybg">
                                    <label>Email Address</label>
                                    <input type="email" />
                                </div>
                                <div className="input-panel greybg">
                                    <label>Company Name</label>
                                    <input type="text" />
                                </div>
                                <div className="input-panel greybg">
                                    <label>Message</label>
                                    <textarea></textarea>
                                </div>

                                <button className="green inner-button normabtn">Submit</button>
                            </div> */}

                                <div className="col-lg-4" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="box">
                                        <h3>Kolkata</h3>
                                        <span>
                                            <i className="fa fa-user"></i>
										Ritankar Bhattacharya
									</span>
                                        <span>
                                            <i className="fa fa-mobile"></i>
											<a style={{color: 'inherit'}} href="tel:9874025199">+91 98740 25199</a>
										</span>
                                        <span>
                                            <i className="fa fa-envelope"></i>
                                            <a style={{color: 'inherit'}} href="mailto:ritankar.b@hipla.io">ritankar.b@hipla.io</a>
											</span>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="box">
                                        <h3>Mumbai</h3>
                                        <span>
                                            <i className="fa fa-user"></i>
                                            Akshay Selar
									</span>
                                        <span>
                                            <i className="fa fa-mobile"></i>
											<a style={{color: 'inherit'}} href="tel:9664870382">+91 96648 70382</a>
										</span>
                                        <span>
                                            <i className="fa fa-envelope"></i>
                                            <a style={{color: 'inherit'}} href="mailto:akshay@hipla.io">akshay@hipla.io</a>
											</span>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="box">
                                        <h3>Delhi-NCR</h3>
                                        <span>
                                            <i className="fa fa-user"></i>
										Adarsh Samuel
									</span>
                                        <span>
                                            <i className="fa fa-mobile"></i>
											<a style={{color: 'inherit'}} href="tel:9650972890">+91 96509 72890</a>
										</span>
                                        <span>
                                            <i className="fa fa-envelope"></i>
												<a style={{color: 'inherit'}} href="mailto:adarsh.s@hipla.io">adarsh.s@hipla.io</a>
											</span>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="box">
                                        <h3>Bangalore</h3>
                                        <span>
                                            <i className="fa fa-user"></i>
                                        Amarnath Reddy
									</span>
                                        <span>
                                            <i className="fa fa-mobile"></i>
											<a style={{color: 'inherit'}} href="tel:9916884801">+91 99168 84801</a>
										</span>
                                        <span>
                                            <i className="fa fa-envelope"></i>
                                            <a style={{color: 'inherit'}} href="mailto:amarnath.r@hipla.io">amarnath.r@hipla.io</a>
											</span>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="box">
                                        <h3>Hyderabad</h3>
                                        <span>
                                            <i className="fa fa-user"></i>
                                        Manjima Ghosh
									</span>
                                        <span>
                                            <i className="fa fa-mobile"></i>
											<a style={{color: 'inherit'}} href="tel:7980693441">+91 79806 93441</a>
										</span>
                                        <span>
                                            <i className="fa fa-envelope"></i>
                                            <a style={{color: 'inherit'}} href="mailto:manjima.g@hipla.io">manjima.g@hipla.io</a>
											</span>
                                    </div>
                                </div>
                                <div className="col-lg-4" data-aos="zoom-in" data-aos-duration="1000">
                                    <div className="box">
                                        <h3>Singapore</h3>
                                        <span>
                                            <i className="fa fa-user"></i>
                                        Sandeep Kaul
									</span>
                                        <span>
                                            <i className="fa fa-mobile"></i>
											<a style={{color: 'inherit'}} href="tel:92332199">+65 9233 2199</a>
										</span>
                                        <span>
                                            <i className="fa fa-envelope"></i>
                                            <a style={{color: 'inherit'}} href="mailto:sandeep.k@hipla.io">sandeep.k@hipla.io</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <Footer {...this.props} />
                </div>
            </>
        )
    }
}

export default ContactUs;