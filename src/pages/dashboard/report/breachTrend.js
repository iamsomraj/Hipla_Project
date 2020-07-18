import React, { Component } from 'reactn';
import Chart from "react-google-charts";
import { addDays, format } from 'date-fns';
import { postAuth } from '../../../util/Service';
class BreachTrend extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                ['Time', 'Number of breaches'],
                ['10 am', 0]
            ],
            showDays: '1',
            isLoading: false
        }

        // ['Time', 'Number of breaches'],['10 am', 0],
        //         ['11 am', 10],
        //         ['12 pm', 23],
        //         ['1 pm', 17],
        //         ['2 pm', 18],
        //         ['3 pm', 9]
    }
    componentDidMount(){
        this.getTrends()
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone, 'current time zone ================== >>>>>>>>>>>');
    }
    getTrends = (cat) => {
        let data = {}

        switch (this.state.showDays) {
            case '1':
                data = {
                    "fromDate": format(new Date(), 'yyyy-MM-dd'),
                    "toDate": format(addDays(new Date(), 1), 'yyyy-MM-dd'),
                    "isToday": true,
                    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
                break;
            case '7':
                data = {
                    "fromDate": format(addDays(new Date(), -6), 'yyyy-MM-dd'),
                    "toDate": format(addDays(new Date(), 1), 'yyyy-MM-dd'),
                    "isToday": false,
                    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
                break;
            case '14':
                data = {
                    "fromDate": format(addDays(new Date(), -13), 'yyyy-MM-dd'),
                    "toDate": format(addDays(new Date(), 1), 'yyyy-MM-dd'),
                    "isToday": false,
                    "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
                }
                break;
        }


        postAuth('/api/breach/trends', data)
            .then((res) => {
                // console.log(res);
                const status = res.request.status;
                if (status === 200) {
                    res.data.data.map((trent, i) => {
                        // console.log(trent[1])
                        trent[1] = parseInt(trent[1])
                        trent[0] = trent[0]+':00'
                        return 
                    })
                    res.data.data.unshift(['Time', 'Number of breaches'])
                    // console.log(res.data.data)
                    this.setState({
                        data: res.data.data,
                        isLoading: false
                    })
                }
            })
    }
    render() {
        return (
            <div className="graph-box">
                <div className="topgraphheading">
                    <h3>Breach Trend</h3>
                    <div className="exportdataprt">
                        {/* <span>
                            <i className="fa fa-long-arrow-down"></i>
                            Export data
                        </span> */}
                        <select onChange={(e) => { this.setState({ showDays: e.target.value }, () => { this.getTrends() }) }}>
                            <option value={1}>Today</option>
                            <option value={7}>7 days</option>
                            <option value={14}>14 days</option>
                        </select>
                    </div>
                </div>
                {/* <img src={`${process.env.PUBLIC_URL}/assets/images/graphimg3.png`} /> */}
                <div className="grapContainer">
                    <Chart
                        width={'600px'}
                        height={'400px'}
                        className="breach-trend"
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.data}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Number of breaches',
                            },
                            series: {
                                1: { curveType: 'function' },
                            },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            </div>
        )
    }
}

export default BreachTrend;
