import React, { Component } from 'reactn';
import {  addDays, format } from 'date-fns';
import { postAuth } from '../../../util/Service';
class SafetyIndicator extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                ["", ""],
                ["Immeditate Attention Required", 50],
                ["Breach Minimisation Required", 50],
                ["Optimum Safety Level", 10]
            ],
            showDays: '1',
            scoreData: [],
            isLoading:false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        this.getIndicator('mobile');

    }

    getIndicator = (cat) => {
        let data = {}

        switch (this.state.showDays) {
            case '1':
                data = {
                    "from_date": format(new Date(), 'yyyy-MM-dd'),
                    "to_date": format(addDays(new Date(), 1), 'yyyy-MM-dd')
                }
                break;
            case '7':
                data = {
                    "from_date": format(addDays(new Date(), -6), 'yyyy-MM-dd'),
                    "to_date": format(addDays(new Date(), 1), 'yyyy-MM-dd')
                }
                break;
            case '14':
                data = {
                    "from_date": format(addDays(new Date(), -13), 'yyyy-MM-dd'),
                    "to_date": format(addDays(new Date(), 1), 'yyyy-MM-dd')
                }
                break;
        }


        postAuth('/api/cross/safety-indicator', data)
            .then((res) => {
                // console.log(res);
                const status = res.request.status;
                if (status === 200) {
                    this.setState({
                        scoreData: res.data.result,
                        isLoading: false
                    })
                }
            })
    }
    render() {
        let getColor = 'donut deepgreen';
        let avg = this.state.scoreData.score;
        if (this.state.scoreData.color === 'Green') {
            getColor = 'donut deepgreen';
        }
        else if (this.state.scoreData.color === 'Yellow') {
            getColor = 'donut orange';
        }
        else if (this.state.scoreData.color === 'Red') {
            getColor = 'donut red';
        }
        return (
            <div className="graph-box">
                <div className="topgraphheading">
                    <h3>Safety Indicator</h3>
                    <div className="exportdataprt">

                        {/* <a>Refresh</a> */}
                        {
                            // !this.global.company.is_multiple_day_report
                            //     ?
                            <select onChange={(e) => { this.setState({ showDays: e.target.value }, () => { this.getIndicator() }) }}>
                                <option value={1}>Today</option>
                                <option value={7}>7 days</option>
                                <option value={14}>14 days</option>
                            </select>
                            // :
                            // <h4>Today</h4>
                        }

                    </div>
                </div>
                {/* <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={this.state.data}
                    options={{
                        // title: "COVID-19 Status",
                        pieHole: 0.4,
                        is3D: false,
                        slices: {
                            0: { color: 'red' },
                            1: { color: 'orange' },
                            2: { color: 'green' }
                        },
                    }}
                /> */}
                <div className="rounddonut">

                    <div className={getColor}>
                        <div className="getColorText">
                            <h2>
                                {
                                    this.state.isLoading
                                    ?
                                    '0'
                                    :
                                    avg || '0'
                                }
                            </h2>
                            <small>{this.state.showDays === '1' ? 'Todays' : 'Last '+ this.state.showDays+ ' days'} total number of breach / total number of employee / number of days</small>
                        </div>
                    </div>

                    <div className="legendprt">
                        <div className="legentpanel">
                            <i className="boxred"></i>
                            Immediate Attention Required
                        </div>
                        <div className="legentpanel">
                            <i className="boxorange"></i>
                            Breach Minimisation Required
                        </div>
                        <div className="legentpanel">
                            <i className="boxgreen"></i>
                            Optimum Safety Level
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SafetyIndicator;


// const data = [
//     ["Task", "Hours per Day"],
//     ["Immeditate Attention Required", 1],
//     ["Breach Minimisation Required", 2],
//     ["Optimum Safety Level", 50]
// ];
// const options = {
//     // title: "COVID-19 Status",
//     pieHole: 0.4,
//     is3D: false,
//     slices: {
//         0: { color: 'red' },
//         1: { color: 'orange' },
//         2: { color: 'green' }
//     },
// };