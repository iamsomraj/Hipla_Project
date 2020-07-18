import React, { Component, getGlobal } from "reactn";
import { Helmet } from "react-helmet";
// import { Route, Redirect, HashRouter, BrowserRouter as Router } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-js-pagination";
import { postAuth, deleteAuth } from "../../../util/Service";
import { HOC } from "../../../util/HOC";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
type props = {
    history: any;
    showAlert: any;
};
type states = {
    cameras: any;
    search: any;
    itemsCountPerPage: number;
    currentPage: number;
    isLoading: boolean;
    isAddModalopen: boolean;
    isDeleteModalOpen: boolean;
    isEditModalopen: boolean;
    addCam: any;
    isAddEditLoading: boolean;
    validation: any;
    deleteCamId: string;
    editCam: any;
};
class CameraDetails extends Component<props, states> {
    constructor() {
        super();
        this.state = {
            search: null,
            currentPage: 1,
            itemsCountPerPage: 5,
            cameras: [

            ],
            isLoading: false,
            isAddModalopen: false,
            isDeleteModalOpen: false,
            isEditModalopen: false,
            addCam: {
                camId: '',
                camera_location_lat: null,
                camera_location_lng: null,
                camera_room_number: "",
                camera_room_name: "",
                safe_distance: null,
                time_lag: null,
                cctv_feed_url: ""
            },
            validation: {
                camId: '',
                camera_location_lat: null,
                camera_location_lng: null,
                camera_room_number: "",
                camera_room_name: "",
                safe_distance: null,
                time_lag: null,
                cctv_feed_url: ""
            },
            editCam: {
                camera_location: [126.3188, 87.31313],
                camera_room_name: "BASEMENT",
                camera_room_number: "ROOM003",
                cctv_feed_url: "jhvj",
                id: "CAM2XKSQAUQBGKMTAGMUUKPAP",
                safe_distance: 3,
                time_lag: 123
            },
            isAddEditLoading: false,
            deleteCamId: ''
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        postAuth('/api/cameras', {})
            .then((res) => {
                console.log(res)
                this.setState({
                    isLoading: false
                })
                const status = res.request.status;
                if (status === 200) {
                    if (res.data.data.length > 0) {
                        this.setState({
                            cameras: res.data.data
                        })
                    }
                    else {
                        //toggle add modal
                        this.toggleModal('ADD')
                    }
                }
                else {
                    this.props.showAlert("Cannot get camera", "error");
                }
            })
    }

    /**
       * @description handhe searck key input
       * @param {string} event
       */
    searchSpace = (event: any) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }

    /**
     * @description handle toggle popup
     * @param {string} name
     */
    toggleModal = (name: string) => {
        switch (name) {
            case "ADD":
                this.setState({
                    isAddModalopen: !this.state.isAddModalopen,
                    addCam: {
                        camId: '',
                        camera_location_lat: null,
                        camera_location_lng: null,
                        camera_room_number: "",
                        camera_room_name: "",
                        safe_distance: null,
                        time_lag: null,
                        cctv_feed_url: ""
                    },
                    validation: {
                        camId: '',
                        camera_location_lat: null,
                        camera_location_lng: null,
                        camera_room_number: "",
                        camera_room_name: "",
                        safe_distance: null,
                        time_lag: null,
                        cctv_feed_url: ""
                    }
                });
                break;
            case "DELETE":
                this.setState({
                    isDeleteModalOpen: !this.state.isDeleteModalOpen,
                });
                break;
            case "EDIT":
                this.setState({
                    isEditModalopen: !this.state.isEditModalopen,
                });
                break;
        }
    }
    // save data from add camera input box
    handleAddChange = (event: any, name: string) => {
        let addCam = { ...this.state.addCam };
        addCam[name] = event.target.value;
        this.validateInput(event, name);
        this.setState({ addCam });
    }

    // save data from add camera input box
    handleEditChange = (event: any, name: string) => {
        let editCam = { ...this.state.editCam };
        if (name === 'camera_location_lat') {
            editCam['camera_location'][0] = event.target.value;
        }
        else if (name === 'camera_location_lng') {
            editCam['camera_location'][1] = event.target.value;
        } else {
            editCam[name] = event.target.value;
        }

        this.validateInput(event, name);
        this.setState({ editCam });
    }
    // validate data from add and edit camera input box
    validateInput = (event: any, name: string) => {
        const value = event.target.value;
        let validation = { ...this.state.validation };
        switch (name) {
            case 'camId':
                if (value === '') {
                    validation[name] = 'Please enter camera id';
                }
                else {
                    validation[name] = '';
                }
                break;

            case 'camera_room_name':
                if (value === '') {
                    validation[name] = 'Please enter camera room name';
                }
                else {
                    const reg = /^([a-zA-Z0-9 _-]+)$/;

                    if (reg.test(value)) {
                        validation[name] = '';

                    } else {
                        validation[name] = 'Only alphabets and numbers accepted.';
                    }
                }
                break;
            case 'camera_room_number':
                if (value === '') {
                    validation[name] = 'Please enter camera room number';
                }
                else {
                    const reg = /^([a-zA-Z0-9 _-]+)$/;
                    if (reg.test(value)) {
                        validation[name] = '';

                    } else {
                        validation[name] = 'Only alphabets and numbers accepted.';
                    }
                }
                break;
            case 'safe_distance':
                if (value === '') {
                    validation[name] = 'Please enter safe distance metric';
                }
                else {
                    let reg = /^[1-9]\d*(\.\d+)?$/;
                    if (reg.test(value)) {
                        validation[name] = '';

                    } else {
                        validation[name] = 'Only numbers accepted.';
                    }
                }
                break;
            case 'time_lag':
                if (value === '') {
                    validation[name] = 'Please enter breach time lag metric';
                }
                else {
                    let reg = /^[1-9]\d*(\.\d+)?$/;
                    if (reg.test(value)) {
                        validation[name] = '';

                    } else {
                        validation[name] = 'Only numbers accepted.';
                    }
                }
                break;
            case 'cctv_feed_url':
                if (value === '') {
                    validation[name] = 'Please enter cctv feed url';
                }
                else {
                    validation[name] = '';
                }
                break;
            case 'camera_location_lat':
                if (value === '') {
                    validation[name] = 'Please enter camera location (lat)';
                }
                else {
                    validation[name] = '';
                }
                break;
            case 'camera_location_lng':
                if (value === '') {
                    validation[name] = 'Please enter camera location (lng)';
                }
                else {
                    validation[name] = '';
                }
                break;

            default:
                console.log('Default')
                break;
        }
        this.setState({ validation })
    }

    //add camera http call
    _submitAddCamera = () => {
        const addCam = { ...this.state.addCam };
        const { company } = getGlobal();
        let data = {
            "company_name": company.company_name,
            "company_id": company.unique_id,
            "id": addCam.camId,
            "camera_location": [addCam.camera_location_lat || '54.54', addCam.camera_location_lng || '87.5454'],
            "camera_room_number": addCam.camera_room_number,
            "camera_room_name": addCam.camera_room_name,
            "safe_distance": addCam.safe_distance,
            "time_lag": addCam.time_lag,
            "cctv_feed_url": addCam.cctv_feed_url
        }
        this.setState({
            isAddEditLoading: true
        })
        postAuth('/api/camera/new', data)
            .then((res) => {
                console.log(res);
                this.setState({
                    isAddEditLoading: false
                })
                const status = res.request.status;
                if (status === 201) {
                    let cameras = [...this.state.cameras]
                    cameras.unshift(res.data.data);
                    this.setState({
                        cameras
                    }, () => {
                        this.toggleModal('ADD')
                    })
                }
                else {
                    this.props.showAlert("Something went wrong, Please try again!", "error");
                }
            })

    }

    //edit camera http call
    _submitEditCamera = () => {
        const data = { ...this.state.editCam }
        console.log(data)
    }

    // delete camera http call
    deleteEmployee = () => {
        console.log(this.state.deleteCamId)
        deleteAuth(`/api/camera/${this.state.deleteCamId}`)
            .then((res) => {
                console.log(res);
                const status = res.request.status;
                if (status === 200) {
                    let cameras = [...this.state.cameras]
                    const index = cameras.findIndex((camera) => camera._id === this.state.deleteCamId)
                    cameras.splice(index, 1);
                    this.setState({
                        cameras
                    }, () => {
                        this.toggleModal("DELETE");
                        this.props.showAlert("Camera deleted", "success");
                    })

                } else {
                    this.props.showAlert("Something went wrong, Pleasse try again!", "error");
                    this.toggleModal("DELETE");
                }
            })
    }

    render() {
        // filter employees
        const items = this.state.cameras.filter((data: any) => {
            if (this.state.search == null)
                return data
            else if (
                data.camera_room_name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.camera_room_number.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.id.toLowerCase().includes(this.state.search.toLowerCase())
            ) {
                return data
            }
        })

        // Logic for displaying todos
        const indexOfLastTodo = this.state.currentPage * this.state.itemsCountPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.itemsCountPerPage;
        const currentcamers = items.slice(indexOfFirstTodo, indexOfLastTodo);

        return (
            <>
                <Helmet>
                    <title>Contatrack | Dashboard</title>
                </Helmet>

                <div data-aos="fade-down" className="innerwrapperbody">

                    <div className="employee-directoryprt margin20">
                        <div className="topemployeeheader">
                            <div className="leftheadingprt">
                                <h2>CAMERA DETAILS</h2>
                                <input type="search" placeholder="Search" onChange={(e) => this.searchSpace(e)} />
                            </div>
                            <button
                                className="borderbtn"
                                onClick={() => { this.toggleModal('ADD') }}
                            >
                                + ADD CAMERA
                            </button>
                        </div>
                        <div className="tableprt">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>CAMERA ID</th>
                                        <th>ROOM NAME</th>
                                        <th>ROOM NUMBER</th>
                                        <th>LOCATION</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.isLoading ?
                                        <tr>
                                            <td colSpan={8}>
                                                <p style={{ textAlign: 'center' }}>
                                                    <CircularProgress color="primary" />
                                                </p>
                                            </td>
                                        </tr>
                                        :
                                        currentcamers.map((camera: any, i: number) => {
                                            return (
                                                <tr key={i}>
                                                    <td title="CAMERA NUMBER">{camera.id}</td>
                                                    <td title="ROOM NAME">
                                                        <b>{camera.camera_room_name}</b>
                                                    </td>
                                                    <td title="ROOM NUMBER">{camera.camera_room_number}</td>
                                                    <td title="LOCATION">{camera.camera_location[0]}, {camera.camera_location[1]}</td>
                                                    <td>
                                                        <div className="twobtn">
                                                            <button
                                                                onClick={() => {
                                                                    this.setState({
                                                                        deleteCamId: camera._id
                                                                    }, () => {
                                                                        this.toggleModal('DELETE')
                                                                    })
                                                                }}
                                                            >
                                                                <img
                                                                    src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                                                                />
                                                            </button>
                                                            {/* <button
                                                                onClick={() => {
                                                                    this.setState({
                                                                        editCam: JSON.parse(JSON.stringify(camera))
                                                                    }, () => {
                                                                        this.toggleModal('EDIT')
                                                                    })
                                                                }}
                                                            >
                                                                <img
                                                                    src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
                                                                />
                                                            </button> */}
                                                        </div>
                                                    </td>
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
                </div>


                {/* popup section ====================================================== */}
                {/* Add popup======== */}
                <Dialog
                    open={this.state.isAddModalopen}
                    onClose={() => this.toggleModal("ADD")}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <div className="dialog-header">
                            <h4 className="modal-title">Add Camera Details</h4>
                            <button
                                type="button"
                                className="close"
                                onClick={() => this.toggleModal("ADD")}
                            >
                                &times;
                        </button>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Camera Unique ID</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.addCam.camId}
                                        onChange={(e) => this.handleAddChange(e, "camId")}
                                        onBlur={(e) => this.validateInput(e, "camId")}
                                    />
                                    <span className="error">{this.state.validation.camId}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Location - Lat (optional)</label>
                                    <input
                                        type="number"
                                        defaultValue={this.state.addCam.camera_location_lat}
                                        onChange={(e) => this.handleAddChange(e, "camera_location_lat")}
                                    // onBlur={(e) => this.validateInput(e, "camera_location_lat")}
                                    />
                                    {/* <span className="error">{this.state.validation.camera_location_lat}</span> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Location - Lng (optional)</label>
                                    <input
                                        type="number"
                                        defaultValue={this.state.addCam.camera_location_lng}
                                        onChange={(e) => this.handleAddChange(e, "camera_location_lng")}
                                    // onBlur={(e) => this.validateInput(e, "camera_location_lng")}
                                    />
                                    {/* <span className="error">{this.state.validation.camera_location_lng}</span> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Room Name</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.addCam.camera_room_name}
                                        onChange={(e) => this.handleAddChange(e, "camera_room_name")}
                                        onBlur={(e) => this.validateInput(e, "camera_room_name")}
                                    />
                                    <span className="error">
                                        {this.state.validation.camera_room_name}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Room Number</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.addCam.camera_room_number}
                                        onChange={(e) => this.handleAddChange(e, "camera_room_number")}
                                        onBlur={(e) => this.validateInput(e, "camera_room_number")}
                                    />
                                    <span className="error">
                                        {this.state.validation.camera_room_number}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Safe Distance Metric (feet)</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.addCam.safe_distance}
                                        onChange={(e) => this.handleAddChange(e, "safe_distance")}
                                        onBlur={(e) => this.validateInput(e, "safe_distance")}
                                    />
                                    <span className="error">
                                        {this.state.validation.safe_distance}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Breach Time_Lag Metric (sec)</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.addCam.time_lag}
                                        onChange={(e) => this.handleAddChange(e, "time_lag")}
                                        onBlur={(e) => this.validateInput(e, "time_lag")}
                                    />
                                    <span className="error">
                                        {this.state.validation.time_lag}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Cctv_feed_url</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.addCam.cctv_feed_url}
                                        onChange={(e) => this.handleAddChange(e, "cctv_feed_url")}
                                        onBlur={(e) => this.validateInput(e, "cctv_feed_url")}
                                    />
                                    <span className="error">{this.state.validation.cctv_feed_url}</span>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button
                            type="button"
                            className="canbtn"
                            onClick={() => this.toggleModal("ADD")}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="addbtn"
                            disabled={
                                this.state.isAddEditLoading ||
                                this.state.validation.cctv_feed_url !== '' ||
                                this.state.validation.camId !== '' ||
                                // this.state.validation.camera_location_lat !== '' ||
                                // this.state.validation.camera_location_lng !== '' ||
                                this.state.validation.camera_room_name !== '' ||
                                this.state.validation.camera_room_number !== '' ||
                                this.state.validation.safe_distance !== '' ||
                                this.state.validation.time_lag !== '' ||
                                this.state.validation.cctv_feed_url !== '' ||

                                this.state.addCam.cctv_feed_url === '' ||
                                this.state.addCam.camId === '' ||
                                // this.state.addCam.camera_location_lat === '' ||
                                // this.state.addCam.camera_location_lng === '' ||
                                this.state.addCam.camera_room_name === '' ||
                                this.state.addCam.camera_room_number === '' ||
                                this.state.addCam.safe_distance === '' ||
                                this.state.addCam.time_lag === '' ||
                                this.state.addCam.cctv_feed_url === ''
                            }
                            onClick={() => {
                                this._submitAddCamera();
                            }}
                        >
                            {
                                this.state.isAddEditLoading
                                    ?
                                    <CircularProgress color="inherit" size={25} />
                                    :
                                    'Add'
                            }
                        </button>
                    </DialogActions>
                </Dialog>

                {/* edit popup======== */}
                <Dialog
                    open={this.state.isEditModalopen}
                    onClose={() => this.toggleModal("EDIT")}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <div className="dialog-header">
                            <h4 className="modal-title">Edit Camera Details</h4>
                            <button
                                type="button"
                                className="close"
                                onClick={() => this.toggleModal("EDIT")}
                            >
                                &times;
                        </button>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Camera Unique ID</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.editCam.id}
                                        disabled={true}
                                        onChange={(e) => this.handleEditChange(e, "id")}
                                        onBlur={(e) => this.validateInput(e, "id")}
                                    />
                                    <span className="error">{this.state.validation.id}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Location - Lat (optional)</label>
                                    <input
                                        type="number"
                                        defaultValue={this.state.editCam.camera_location[0]}
                                        onChange={(e) => this.handleEditChange(e, "camera_location_lat")}
                                        onBlur={(e) => this.validateInput(e, "camera_location_lat")}
                                    />
                                    <span className="error">{this.state.validation.camera_location_lat}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Location - Lng (optional)</label>
                                    <input
                                        type="number"
                                        defaultValue={this.state.editCam.camera_location[1]}
                                        onChange={(e) => this.handleEditChange(e, "camera_location_lng")}
                                        onBlur={(e) => this.validateInput(e, "camera_location_lng")}
                                    />
                                    <span className="error">{this.state.validation.camera_location_lng}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Room Name</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.editCam.camera_room_name}
                                        onChange={(e) => this.handleEditChange(e, "camera_room_name")}
                                        onBlur={(e) => this.validateInput(e, "camera_room_name")}
                                    />
                                    <span className="error">
                                        {this.state.validation.camera_room_name}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="modal-input">
                                    <label>Camera Room Number</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.editCam.camera_room_number}
                                        onChange={(e) => this.handleEditChange(e, "camera_room_number")}
                                        onBlur={(e) => this.validateInput(e, "camera_room_number")}
                                    />
                                    <span className="error">
                                        {this.state.validation.camera_room_number}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Safe Distance Metric (feet)</label>
                                    <input
                                        type="number"
                                        defaultValue={this.state.editCam.safe_distance}
                                        onChange={(e) => this.handleEditChange(e, "safe_distance")}
                                        onBlur={(e) => this.validateInput(e, "safe_distance")}
                                    />
                                    <span className="error">
                                        {this.state.validation.safe_distance}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Breach Time_Lag Metric (sec)</label>
                                    <input
                                        type="number"
                                        defaultValue={this.state.editCam.time_lag}
                                        onChange={(e) => this.handleEditChange(e, "time_lag")}
                                        onBlur={(e) => this.validateInput(e, "time_lag")}
                                    />
                                    <span className="error">
                                        {this.state.validation.time_lag}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="modal-input">
                                    <label>Cctv_feed_url</label>
                                    <input
                                        type="text"
                                        defaultValue={this.state.editCam.cctv_feed_url}
                                        onChange={(e) => this.handleEditChange(e, "cctv_feed_url")}
                                        onBlur={(e) => this.validateInput(e, "cctv_feed_url")}
                                    />
                                    <span className="error">{this.state.validation.cctv_feed_url}</span>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button
                            type="button"
                            className="canbtn"
                            onClick={() => this.toggleModal("EDIT")}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="addbtn"
                            disabled={
                                this.state.isAddEditLoading ||

                                // this.state.validation.cctv_feed_url !== '' ||
                                // this.state.validation.camera_location_lat !== '' ||
                                // this.state.validation.camera_location_lng !== '' ||
                                // this.state.validation.camera_room_name !== '' ||
                                // this.state.validation.camera_room_number !== '' ||
                                // this.state.validation.safe_distance !== '' ||
                                // this.state.validation.time_lag !== '' ||
                                // this.state.validation.cctv_feed_url !== '' ||

                                this.state.editCam.cctv_feed_url === '' ||
                                this.state.editCam.camera_location[0] === '' ||
                                this.state.editCam.camera_location[1] === '' ||
                                this.state.editCam.camera_room_name === '' ||
                                this.state.editCam.camera_room_number === '' ||
                                this.state.editCam.safe_distance === '' ||
                                this.state.editCam.time_lag === '' ||
                                this.state.editCam.cctv_feed_url === ''
                            }
                            onClick={() => {
                                this._submitEditCamera();
                            }}
                        >
                            {
                                this.state.isAddEditLoading
                                    ?
                                    <CircularProgress color="inherit" size={25} />
                                    :
                                    'UPDATE'
                            }
                        </button>
                    </DialogActions>
                </Dialog>

                {/* delete dialog */}
                <Dialog
                    open={this.state.isDeleteModalOpen}
                    onClose={() => this.toggleModal("DELETE")}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <div className="modal-body text-center">
                            <div className="deletebody">
                                <h4>Delete</h4>
                                <p>
                                    Are you sure you want to permanently remove this camera from camera details list?
                                </p>

                                <div className="deletebtnprt">
                                    <button
                                        type="button"
                                        className="canbtn"
                                        onClick={() => this.toggleModal("DELETE")}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="delbtn"
                                        onClick={() => {
                                            this.deleteEmployee();
                                        }}
                                    >
                                        Delete
                                </button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

export default HOC(CameraDetails);

