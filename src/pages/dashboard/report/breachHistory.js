import React, { Component } from 'reactn';
import Chart from "react-google-charts";
import { postAuth } from '../../../util/Service'
import { parseISO, addDays, format } from 'date-fns';
class BreachHistory extends Component {

    constructor() {
        super();
        this.state = {
            breaches: [
                ['Dates', 'Number of breaches']
            ]
        }
    }
    componentDidMount() {
        this.getHistory()

    }

    getHistory = () => {
        let data = {
            "from_date": format(addDays(new Date(), -6), 'yyyy-MM-dd'),
            "to_date": format(addDays(new Date(),1), 'yyyy-MM-dd')
        }
        postAuth('/api/cross/7day-report', data)
            .then((res) => {
                // console.log(res, '====================>>>>>>>>>>>>>>>>>>>>>>')
                const status = res.request.status;
                if (status === 200) {
                    let breaches = [...this.state.breaches];

                    res.data.result.reverse().map((breach, i) => {
                        breaches[i + 1] = new Array(format(addDays(new Date(breach.to_day),-1), 'dd/MM'), breach.total); //.toDateString().split(' ')[0]
                        return breach;
                    })

                    this.setState({
                        breaches
                    })
                }
            })
    }
    render() {
        return (
            <div className="graph-box">
                <div className="topgraphheading">
                    <h3>Breach history</h3>
                    <h4>Last 7 Days</h4>
                </div>
                {/* <img src={`${process.env.PUBLIC_URL}/assets/images/graphimg2.png`} /> */}
                <div className="grapContainer">
                    <Chart
                        width={'550px'}
                        height="400px"
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={this.state.breaches}
                        options={{
                            legend: { position: 'none' }
                        }}
                    // For tests
                    // rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            </div>
        )
    }
}

export default BreachHistory;
