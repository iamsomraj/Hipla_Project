import React, { Component } from 'reactn';
import { HOC } from '../../util/HOC';
import { Link, RouteProps } from 'react-router-dom';
import { get } from '../../util/Service';
import CircularProgress from '@material-ui/core/CircularProgress';
type props = {
    history: any,
    match: any,
    showAlert: any
};
type states = {
    loading: boolean,
    isSuccess: boolean
};

class EmailVerify extends Component<props & RouteProps, states> {
    constructor() {
        super();
        this.state = {
            loading: true,
            isSuccess: false
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.token);
        const token = this.props.match.params.token;
        get(`/api/company/emailverified/${token}`)
            .then((res) => {
                this.setState({
                    loading: false
                })
                const status = res.request.status;
                if (status === 201) {
                    // this.props.showAlert(res.data.message, 'success');
                    this.setState({
                        isSuccess: true
                    })

                } else {
                    // this.props.showAlert(res.response.data.message, 'error');
                    this.setState({
                        isSuccess: false
                    })
                }
            })
    }
    render() {
        return (
            <div className="innerbody">

                <div data-aos="zoom-in" className="middlebox success text-center">
                    {
                        this.state.loading
                            ?
                            <CircularProgress color="primary" />
                            :
                            this.state.isSuccess
                                ?
                                <>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/checked.svg`} />
                                    <h2>Congratulations!</h2>
                                    <p>Your email is successfully verified. Now you can sign in.</p>
                                    <button onClick={() => { this.props.history.push('/') }}>Ok</button>
                                </>
                                :
                                <>
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} />
                                    <h2>Oops!</h2>
                                    <p>Your email is not verified. Please try again!.</p>
                                    <button onClick={() => { this.props.history.push('/') }}>Ok</button>
                                </>
                    }


                </div>
            </div>
        )
    }
}

export default HOC(EmailVerify)