import React from 'reactn';
import LazyLoad from 'react-lazyload';

const SvgAnimation = () => (
    <div className="about-videoprt text-center">
        <div className="inner-container">

            <div className="videocontent" data-aos="zoom-in-up">
                {/* <img src={`${process.env.PUBLIC_URL}/assets/images/video-banner.png`} />
                            <span>
                                <img src={`${process.env.PUBLIC_URL}/assets/images/play-button.svg`} />
                            </span> */}
                <LazyLoad>
                    <iframe title="svg-animation-ifame" src={`${process.env.PUBLIC_URL}/assets/svg-animation/index.html`} width="100%" ></iframe>
                </LazyLoad>
            </div>

        </div>
    </div>
)

export default SvgAnimation;