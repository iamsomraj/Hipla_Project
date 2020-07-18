import React, { Component } from 'reactn';
import Pagination from "react-js-pagination";
import { postAuth } from '../../../util/Service';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import { parseISO, addDays, format } from 'date-fns';
import { CSVLink, CSVDownload } from "react-csv";
const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
export default class Tracing extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            itemsCountPerPage: 5,
            showDays: '1',
            breaches: [],
            isLoading: false,
            search: 'mobile',
            hero: [],
            csv: [["Name", "Department", "COVID-19 Status", "Breach with", "Department", "COVID-19 Status", "Distance (+ /- 1.5 ft )", "Source", "Time | Date"]]
        }
    }

    componentDidMount() {
        this.getBreachData();
    }


    /**
       * @description handhe searck key input
       * @param {string} event
       */
    searchSpace = (keyword) => {
        // let keyword = event.target.value;
        this.setState({ search: keyword })
    }

    getBreachData = () => {
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
        this.setState({
            isLoading: true,
            csv: [["Name", "Department", "COVID-19 Status", "Breach with", "Department", "COVID-19 Status", "Distance (+ /- 1.5 ft )", "Source", "Time | Date"]]
        })
        postAuth(`/api/cross/history/company`, data)
            .then((res) => {
                console.log(res);
                this.setState({
                    isLoading: false
                }, () => this.getHero(data))
                const status = res.request.status;
                if (status === 201) {
                    let csv = [...this.state.csv];
                    res.data.result.data.map((breach, i) => {
                        csv[i + 1] = new Array(
                            breach.employee !== undefined
                                ?
                                breach.employee[0] !== undefined
                                    ?
                                    breach.employee[0].name
                                    : 'Unknown'
                                : 'Unknown',

                            breach.employee !== undefined
                                ?
                                breach.employee[0] !== undefined
                                    ?
                                    breach.employee[0].department
                                        ?
                                        breach.employee[0].department
                                        :
                                        'N/A'
                                    :
                                    'N/A'
                                :
                                'N/A',

                            breach.employee !== undefined
                                ?
                                breach.employee[0] !== undefined
                                    ?
                                    breach.employee[0].is_conta_tracing
                                        ?
                                        'POSITIVE'
                                        :
                                        'NEGATIVE'
                                    :
                                    'N/A'
                                :
                                'N/A',

                            breach.cross_employee !== undefined
                                ?
                                breach.cross_employee[0] !== undefined
                                    ?
                                    breach.cross_employee[0].name
                                    : 'Unknown'
                                :
                                'Unknown',

                            breach.cross_employee !== undefined
                                ?
                                breach.cross_employee[0] !== undefined
                                    ?
                                    breach.cross_employee[0].department
                                        ?
                                        breach.cross_employee[0].department
                                        :
                                        'N/A'
                                    :
                                    'N/A'
                                :
                                'N/A',
                            breach.cross_employee !== undefined
                                ?
                                breach.cross_employee[0] !== undefined
                                    ?
                                    breach.cross_employee[0].is_conta_tracing
                                        ?
                                        'POSITIVE'
                                        :
                                        'NEGATIVE'
                                    :
                                    'N/A'
                                :
                                'N/A',

                            breach.distance.toFixed(2),
                            breach.source,
                            parseISO(breach.cross_date).getHours() + ':' + parseISO(breach.cross_date).getMinutes() + ':' + parseISO(breach.cross_date).getSeconds() + ' | ' + parseISO(breach.cross_date).toDateString()

                        );
                        return breach;
                    })



                    // console.log(csv, '====================');

                    this.setState({
                        breaches: res.data.result.data,
                        csv
                    })
                }
            })


    }

    getHero = (data) => {
        postAuth(`/api/cross/hero`, data)
            .then((res) => {
                // console.log(res);
                this.setState({
                    isLoading: false
                })
                const status = res.request.status;
                if (status === 201) {
                    console.log(res.data.result, '============================>>>>>>>>>>>>>>>>>')
                    if (res.data.result.length > 0) {
                        this.setState({
                            hero: res.data.result[0]
                        })
                    }
                }
            })
    }
    render() {
        // filter employees
        const items = this.state.breaches.filter((data) => {
            if (this.state.search == null)
                return data
            else if (
                data.source.toLowerCase().includes(this.state.search.toLowerCase())
            ) {
                return data
            }
        })

        // Logic for displaying todos
        const indexOfLastTodo = this.state.currentPage * this.state.itemsCountPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.itemsCountPerPage;
        const currentBreaches = items.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <div className="employee-directoryprt">
                <div className="topemployeeheader">
                    <div className="leftheadingprt">
                        <h2>

                            Contact History
                        </h2>
                        {
                            Object.keys(this.state.hero).length === 0
                                ?
                                null
                                :
                                <h2 >
                                    MOST BREACHED: &nbsp;
                                    <span>
                                        {
                                            Object.keys(this.state.hero.employee).length !== 0
                                                ?
                                                this.state.hero.employee[0].profile_photo
                                                    ?
                                                    <img src={this.state.hero.employee[0].profile_photo} />
                                                    :
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                                :
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                        }

                                    </span>
                                    <b style={{ color: '#2e59a8' }}>
                                        {
                                            Object.keys(this.state.hero.employee).length === 0
                                                ?
                                                'Unknown'
                                                :
                                                this.state.hero.employee[0].name
                                        } ({this.state.hero.count})
                                    </b>
                                </h2>
                        }

                    </div>


                    <div className="exportdataprt">
                        <CSVLink data={this.state.csv} filename={`${format(new Date(), 'dd-MM-yy-HH:mm')}.csv`} target="_blank"><i className="fa fa-download"></i> EXPORT TO CSV</CSVLink>
                        <select onChange={(e) => { this.setState({ showDays: e.target.value, currentPage: 1 }, () => { this.getBreachData() }) }}>
                            <option value={1}>Today</option>
                            <option value={7}>7 days</option>
                            <option value={14}>14 days</option>
                        </select>
                    </div>
                    {/* <input type="search" placeholder="Search" onChange={(e) => this.searchSpace(e)} /> */}

                </div>
                <div className="tableprt">
                    <table cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>

                                <th>&nbsp;</th>
                                <th>NAME</th>
                                <th>Department</th>
                                <th>COVID-19</th>
                                <th>&nbsp;</th>
                                <th>Breach with</th>
                                <th>Department</th>
                                <th>COVID-19</th>
                                <th>Distance (+ /- 1.5 ft )</th>
                                <th>source</th>
                                <th style={{ textAlign: 'right' }}>time | date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.isLoading
                                    ?
                                    <tr>
                                        <td colSpan={11}>
                                            <div style={{ textAlign: 'center' }}>
                                                <CircularProgress color="primary" />
                                            </div>
                                        </td>
                                    </tr>
                                    :
                                    currentBreaches.length === 0
                                        ?
                                        <tr>
                                            <td colSpan={11}>
                                                <p style={{ textAlign: 'center' }}>
                                                    No breaches found
                                                </p>
                                            </td>
                                        </tr>
                                        :
                                        currentBreaches.map((breach, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <a data-toggle="modal" data-target="#addbrowseModal">
                                                            <div className="userimg">
                                                                {
                                                                    breach.employee !== undefined
                                                                        ?
                                                                        breach.employee[0] !== undefined
                                                                            ?
                                                                            breach.employee[0].profile_photo !== undefined
                                                                                ?
                                                                                < img src={breach.employee[0].profile_photo} alt="emp" />
                                                                                :
                                                                                <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                                                            :
                                                                            <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                                                        : <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                                                }

                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td title="NAME">
                                                        <b>
                                                            {
                                                                breach.employee !== undefined
                                                                    ?
                                                                    breach.employee[0] !== undefined
                                                                        ?
                                                                        breach.employee[0].name
                                                                        : 'Unknown'
                                                                    : 'Unknown'
                                                            }
                                                        </b>
                                                    </td>
                                                    <td title="department">
                                                        <b>
                                                            {
                                                                breach.employee !== undefined
                                                                    ?
                                                                    breach.employee[0] !== undefined
                                                                        ?
                                                                        breach.employee[0].department
                                                                            ?
                                                                            breach.employee[0].department
                                                                            :
                                                                            'N/A'
                                                                        :
                                                                        'N/A'
                                                                    :
                                                                    'N/A'
                                                            }
                                                        </b>
                                                    </td>
                                                    <td title="department">
                                                        {
                                                            breach.employee !== undefined
                                                                ?
                                                                breach.employee[0] !== undefined
                                                                    ?
                                                                    breach.employee[0].is_conta_tracing
                                                                        ?
                                                                        <b style={{ color: 'red' }}>POSITIVE</b>
                                                                        :
                                                                        <b style={{ color: 'green' }}>NEGATIVE</b>
                                                                    :
                                                                    <b>N/A</b>
                                                                :
                                                                <b>N/A</b>
                                                        }
                                                    </td>
                                                    <td>
                                                        <a data-toggle="modal" data-target="#addbrowseModal">
                                                            <div className="userimg">
                                                                {
                                                                    breach.cross_employee !== undefined
                                                                        ?

                                                                        breach.cross_employee[0] !== undefined
                                                                            ?
                                                                            breach.cross_employee[0].profile_photo !== undefined
                                                                                ?
                                                                                < img src={breach.cross_employee[0].profile_photo} alt="emp" />
                                                                                :
                                                                                <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                                                            :
                                                                            <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                                                        : <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />
                                                                }
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td title="Breach with"><b>{
                                                        breach.cross_employee !== undefined
                                                            ?
                                                            breach.cross_employee[0] !== undefined
                                                                ?
                                                                breach.cross_employee[0].name
                                                                : 'Unknown'
                                                            :
                                                            'Unknown'
                                                    }</b></td>
                                                    <td>
                                                        <b>
                                                            {
                                                                breach.cross_employee !== undefined
                                                                    ?
                                                                    breach.cross_employee[0] !== undefined
                                                                        ?
                                                                        breach.cross_employee[0].department
                                                                            ?
                                                                            breach.cross_employee[0].department
                                                                            :
                                                                            'N/A'
                                                                        :
                                                                        'N/A'
                                                                    :
                                                                    'N/A'
                                                            }
                                                        </b>
                                                    </td>
                                                    <td>

                                                        {
                                                            breach.cross_employee !== undefined
                                                                ?
                                                                breach.cross_employee[0] !== undefined
                                                                    ?
                                                                    breach.cross_employee[0].is_conta_tracing
                                                                        ?

                                                                        <b style={{ color: 'red' }}>POSITIVE</b>
                                                                        :
                                                                        <b style={{ color: 'green' }}>NEGATIVE</b>
                                                                    :
                                                                    <b>N/A</b>
                                                                :
                                                                <b>N/A</b>
                                                        }

                                                    </td>
                                                    <td title="distance">{breach.distance.toFixed(2)}</td>
                                                    <td title="source">{breach.source}</td>
                                                    <td title="datetime"> {parseISO(breach.cross_date).getHours() + ':' + parseISO(breach.cross_date).getMinutes() + ':' + parseISO(breach.cross_date).getSeconds()} |{parseISO(breach.cross_date).toDateString()} </td>
                                                </tr>
                                            )
                                        })

                            }




                        </tbody>
                    </table>
                </div>


                <div className="pegignation-part">

                    <Pagination
                        activePage={this.state.currentPage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={items.length}
                        pageRangeDisplayed={5}
                        itemClass="pegignation"
                        innerClass="pegignation-wrapper"
                        activeClass="active"
                        onChange={(page) => this.setState({ currentPage: page })}
                    />
                </div>
            </div>
        )
    }
}