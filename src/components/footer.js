import React, { Component } from 'reactn';
import { Link } from 'react-router-dom'
class Header extends Component {

	render() {
		return (
			<footer>
				<div className="container">
					<div className="row">
						<div className="col-lg-3 bottom20" data-aos="zoom-in" data-aos-duration="1000">
							<div className="footer-logo">
								<img alt="footer-logo" src={`${process.env.PUBLIC_URL}/assets/images/footer-logo.png`} />
							</div>
							<div className="socialLink">
								<ul>
									<li>
										<a href="https://www.facebook.com/Contatrack/">
											<img alt="face-logo" src={`${process.env.PUBLIC_URL}/assets/images/facebook.png`} />
										</a>
									</li>

									<li>
										<a href="https://www.linkedin.com/company/contatrack-ai/">
											<img alt="linkedin-logo" src={`${process.env.PUBLIC_URL}/assets/images/linkedin-icon.png`} />
										</a>
									</li>


									<li>
										<a href="https://www.instagram.com/contatrack.ai/?igshid=1rnw4fgn4haha">
											<img alt="instagram-logo" src={`${process.env.PUBLIC_URL}/assets/images/instagram.png`} />
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-5" data-aos="zoom-in" data-aos-duration="1500">
							<div className="addressprt">
								<h3>Mumbai</h3>
								<span>
									<i className="fa fa-map-marker"></i>
								17 & 18, Platinum Techno Park,Level 3, Sector 30 Vashi Mumbai 400705, India.
							</span>
								<span>
									<i className="fa fa-phone"></i>
									<a href="tel:+91 96648 70382">
										+91 96648 70382
								</a>
								</span>
								<span>
									<i className="fa fa-envelope"></i>
									<a href="mailto:info@hipla.io">
										info@hipla.io
								</a>
								</span>
							</div>

							<div className="addressprt">
								<h3>Delhi - NCR</h3>
								<span>
									<i className="fa fa-map-marker"></i>
								D13, 3rd floor. Sector 3 Noida 201301, India.
							</span>
								<span>
									<i className="fa fa-phone"></i>
									<a href="tel:+91 96509 72890">
										+91 96509 72890
								</a>
								</span>
								<span>
									<i className="fa fa-envelope"></i>
									<a href="mailto:info@hipla.io">
										info@hipla.io
								</a>
								</span>
							</div>
							<div className="addressprt">
								<h3>Kolkata</h3>
								<span>
									<i className="fa fa-map-marker"></i>
								5A Synergy Building, 5th Floor Thakdari Road P.O. Krishnapur, Rajarhat Kolkata 700102.
								India
							</span>
								<span>
									<i className="fa fa-phone"></i>
									<a href="tel:+91 98740 25199">
										+91 98740 25199
								</a>
								</span>
								<span>
									<i className="fa fa-envelope"></i>
									<a href="mailto:info@hipla.io">
										info@hipla.io
								</a>
								</span>
							</div>
						</div>
						<div className="col-lg-4" data-aos="zoom-in" data-aos-duration="2000">
							<div className="addressprt">
								<h3>Bangalore</h3>
								<span>
									<i className="fa fa-map-marker"></i>
								#823, 2nd FL, 8th Cross, 27th Main Rd, Sector 1, HSR Layout Bengaluru 560102, Karnataka,
								India
							</span>
								<span>
									<i className="fa fa-phone"></i>
									<a href="tel: +91 99168 84801">
										+91 99168 84801
								</a>
								</span>
								<span>
									<i className="fa fa-envelope"></i>
									<a href="mailto:info@hipla.io">
										info@hipla.io
								</a>
								</span>
							</div>
							<div className="addressprt">
								<h3>Singapore</h3>
								<span>
									<i className="fa fa-map-marker"></i>
								One Raffles Place #19-61 Tower 2 Singapore 048616
							</span>
								<span>
									<i className="fa fa-phone"></i>
									<a href="tel:+65 9233 2199">
										+65 9233 2199
								</a>
								</span>
								<span>
									<i className="fa fa-envelope"></i>
									<a href="mailto:info@hipla.io">
										info@hipla.io
								</a>
								</span>
							</div>
							<div className="addressprt">
								<h3>We accept</h3>
								<ul className="cardprt">
									<li>
										<img src={`${process.env.PUBLIC_URL}/assets/images/cardImg1.png`} alt="master card" />
									</li>
									<li>
										<img src={`${process.env.PUBLIC_URL}/assets/images/cardImg2.png`} alt="visa card" />
									</li>
								</ul>

							</div>
						</div>
					</div>

					<div className="row margin30">
						<div className="col-md-6">
							<ul className="lowerLink">
								<li>
									<Link to="/terms-conditions">
										Terms and Conditions
								</Link>

								</li>
								<li>
									<Link to="/privacy">
										Privacy Policy
								</Link>

								</li>
							</ul>
						</div>

						<div className="col-md-6 footerrightcont">
							<p>
								©2020 Copyright Hipla Technologies Pte. Ltd.
						</p>

						</div>
					</div>
				</div>

			</footer>
		)
	}
}

export default Header;