import React, { Component } from 'reactn';
import { postAuth } from '../../../util/Service';
import { addDays, format } from 'date-fns';
class TodayReport extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            infected:0
        }
    }

    componentDidMount() {
        this.getIndicator();
    }

    getIndicator = () => {
        let data = {
            "from_date": format(addDays(new Date(), -6), 'yyyy-MM-dd'),
            "to_date": format(addDays(new Date(),1), 'yyyy-MM-dd'),
            "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        postAuth('/api/cross/7day-report', data)
            .then((res) => {
                // console.log(res)
                const status = res.request.status;
                if (status === 200) {
                    // let breaches = [...this.state.breaches];

                    // res.data.result.map((breach, i) => {
                    //     breaches[i + 1] = new Array(days[new Date(breach.date).getDay()], breach.total);
                    //     return breach;
                    // })
                    console.log(res.data.result[0].date)
                    this.setState({
                        score : res.data.result[0].total
                    })
                }
            })

        postAuth('/api/employee/infected', {})
            .then((res) => {
                // console.log(res.data.result.score);
                const status = res.request.status;
                if (status === 200) {
                    this.setState({
                        infected: res.data.result
                    })
                }
            })
    }
    render() {
        return (
            <div className="breachupdate">
                <div className="breachpanel">
                    <span>{this.state.score}</span>
                    &nbsp;Breach Today
                </div>
                <div className="breachpanel">
                    <span>{this.state.infected}</span>
                    &nbsp;Known Infected
                </div>
                <a className="viewemployeebtn" href="#" onClick={(e)=>{
                    e.preventDefault();
                    this.props.goToTracing()
                }}>View Contact tracing</a>
            </div>
        )
    }
}

export default TodayReport;
