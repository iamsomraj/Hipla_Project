import React, { Component } from 'reactn';
import { Link, RouteProps } from 'react-router-dom';
import { HOC } from '../../util/HOC';
import { Helmet } from "react-helmet";

type props = {
    history: any;
};
type states = {
};

type global = {
}


class Success extends Component<props & RouteProps, states, global> {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <section>
                <Helmet>
                    <title>Contatrack | Success</title>
                </Helmet>
                {/* <Header {...this.props} /> */}

                <div data-aos="fade-down" className="innerbody">

                    <div className="middlebox success text-center">

                        <img src={`${process.env.PUBLIC_URL}/assets/images/checked.svg`} />
                        <h2>Your request has been registered.</h2>
                        <p>Our team will get in touch with you shortly.</p>

                        <button onClick={() => { this.props.history.push('/') }}>Ok</button>
                    </div>
                </div>



            </section>
        )
    }
}

export default HOC(Success);