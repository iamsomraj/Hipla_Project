import React, { Component } from 'reactn';
import { Helmet } from "react-helmet";
import { HOC } from '../../../util/HOC';

type props = {
    history: any
};
type states = {
};

class Profile extends Component<props, states> {
    render() {
        return (
            <>
                <Helmet>
                    <title>Contatrack | Dashboard | Profile</title>
                </Helmet>

                <div data-aos="zoom-in" className="innerwrapperbody">
                    <div className="twopanel-signin">
                        <div className="leftPrt">
                            <div className="leftbox">
                                <h2 className="text-center">Update Profile</h2>
                                <div className="updateprofileimg margin40">
                                    {/* <div className="midimgprtprof">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/woman.png`} />
                                        <button className="buttonupload">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/upload-btn.png`} />
                                        </button>
                                    </div> */}

                                </div>
                                <div className="input-panel">
                                    <label>Company Name</label>
                                    <input type="text" placeholder="" />
                                </div>
                                <div className="input-panel margin30">
                                    <label>Company website</label>
                                    <input type="text" placeholder="" />
                                </div>
                                

                                <button className="blue inner-button normabtn">Update</button>
                            </div>
                        </div>


                    </div>
                </div>
            </>
        )
    }
}

export default HOC(Profile);