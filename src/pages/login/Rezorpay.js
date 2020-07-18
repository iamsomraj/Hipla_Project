import React, { Component } from 'reactn';
import Button from '@material-ui/core/Button';
// declare var Rezorpay: any;
class Rezorpaycheckout extends Component {

    openCheckout = () => {
        let options = {
            "key": "YOUR_KEY_ID",
            "amount": this.state.amount, // 2000 paise = INR 20, amount in paisa
            "name": "Merchant Name",
            "description": "Purchase Description",
            "image": "/your_logo.png",
            "handler": function (response) {
                alert(response.razorpay_payment_id);
            },
            "prefill": {
                "name": "Harshil Mathur",
                "email": "harshil@razorpay.com"
            },
            "notes": {
                "address": "Hello World"
            },
            "theme": {
                "color": "#F37254"
            }
        };

        let rzp = new Razorpay(options);
        rzp.open();
    }

    render() {
        return (
            <Button type="submit" variant="contained" className="loginBtn" >
                Primary
            </Button>
        )
    }
}

export default Rezorpaycheckout;