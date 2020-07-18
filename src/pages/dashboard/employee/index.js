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
import { authGet, authPatch, deleteAuth, postAuth, axiosPatchFormData, axiosPostFormData } from "../../../util/Service";
import { HOC } from "../../../util/HOC";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import { utcToZonedTime, format } from 'date-fns-tz';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { CSVLink } from "react-csv";

class Employee extends Component {
  csvLink = React.createRef()
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      itemsCountPerPage: 10,
      toDay: new Date(),
      isAddModalopen: false,
      isDeleteModalOpen: false,
      isEditModalopen: false,
      isFaceImgOpen: false,
      isAddEditLoading: false,
      isDeleting: false,
      isLoading: false,
      isExportLoading: true,
      search: null,
      deleteEmpId: '',
      deleteEmpName: '',
      prifilePhoto: '',
      prifilePhotoToShow: '',
      imageValidation: '',
      addEmp: {
        employee_id: "",
        name: "",
        email: "",
        password: this.randomString(6, "#"),
        phone: "",
        designation: "",
        department: "",
        gender: "Male",
        dob: new Date().toISOString(),
        company_id: "",
        is_conta_tracing: false,
        conta_tracing_date: new Date().toISOString()
      },
      isValidate: false,
      validation: {
        employee_id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        department: ""
      },
      editEmp: {
      },
      employees: [
      ],
      csvFile: '',
      selectCSVName: '',
      isCsvModalOpen: false,
      csvValidation: [],
      isEmailCSV: true,
      csv: [["ID NO.", "NAME", "PHONE NO.", "EMAIL", "DEPARTMENT", "COVID-19 STATUS", "LAST ACTIVE"]]
    };
  }
  componentDidMount() {
    // this._getEmployee()
    this.setState({ isLoading: true }, () => this._getEmployee())
  }

  randomString = (length, chars) => {
    let mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    let result = '';
    for (let i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
  }

  resetAddEmp = () => {
    this.setState({
      toDay: new Date(),
      addEmp: {
        employee_id: "",
        name: "",
        email: "",
        password: this.randomString(6, "#"),
        phone: "",
        designation: "",
        department: "",
        gender: "Male",
        dob: new Date().toISOString(),
        company_id: "",
        is_conta_tracing: false,
        conta_tracing_date: new Date().toISOString()
      },
      validation: {
        employee_id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        department: ""
      }
    })
  }

  _getEmployee = () => {
    // let { company } = getGlobal();
    // let key = company.unique_id;
    authGet("/api/employees")
      .then((res) => {
        // console.log(res, '====>')
        // return
        const status = res.request.status;
        if (status === 201) {
          if (res.data.data.length > 0) {
            this.setState({
              isLoading: false,
              employees: res.data.data
            }, () => this.exportToCSV());
          }
          else {
            this.setState({
              isLoading: false
            });
            this.toggleModal('ADD')
          }
        } else {
          this.setState({
            isLoading: false
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        this.setState({
          isLoading: false
        });
      });
  }
  /**
     * @description handle date on change
     * @param {Date} date
     */
  onChangeDate = (date) => {
    let event = new Date(date);
    // console.log('jhvjh',event.toISOString());
    let addEmp = { ...this.state.addEmp }
    addEmp['dob'] = event.toISOString();
    this.setState({
      addEmp,
      toDay: event
    });
  }

  onChangeDateEditDOB = (date) => {
    let event = new Date(date);
    // console.log('jhvjh',event.toISOString());
    let editEmp = { ...this.state.editEmp }
    editEmp['dob'] = event.toISOString();
    this.setState({
      editEmp
    });
  }


  /**
   * @description handle date on change
   * @param {Date} date
   */
  onChangeCoronaDate = (date) => {
    let event = new Date(date);
    let addEmp = { ...this.state.addEmp };
    addEmp.conta_tracing_date = event.toISOString();

    this.setState({
      addEmp
    });
  }

  /**
   * @description handle date on change
   * @param {Date} date
   */
  onChangeCoronaDateEdit = (date) => {
    let event = new Date(date);
    let editEmp = { ...this.state.editEmp };
    editEmp.conta_tracing_date = event.toISOString();
    this.setState({
      editEmp
    });
  }

  /**
     * @description handle toggle popup
     * @param {string} name
     */
  toggleModal = (name) => {
    switch (name) {
      case "ADD":
        this.resetAddEmp();
        this.setState({
          isAddModalopen: !this.state.isAddModalopen
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
      case "FACE":
        this.setState({
          prifilePhotoToShow: '',
          isFaceImgOpen: !this.state.isFaceImgOpen,
        });
        break;
      case "CSV":
        this.setState({
          csvFile: '',
          selectCSVName: '',
          csvValidation: [],
          isCsvModalOpen: !this.state.isCsvModalOpen,
        });
        break;
    }
  }

  /**
     * @description handle add popup input
     * @param {string} event/data
     * @param {string} name
     */
  handleAddChange = (event, name) => {
    let addEmp = { ...this.state.addEmp };
    if (name === 'is_conta_tracing') {
      if (event.target.value === 'positive') {
        addEmp[name] = true;
      } else {
        addEmp[name] = false;
      }
    }
    else if (name === 'phone') {
      // console.log(event.country, event.phone.slice(event.country.dialCode.length), 'phone===========>')
      addEmp[name] = event.phone.slice(event.country.dialCode.length)
      addEmp['country_code'] = event.country.dialCode;
      this.validateInput(event.phone.slice(event.country.dialCode.length), name);
    }
    else {
      this.validateInput(event, name);
      addEmp[name] = event.target.value;
    }

    this.setState({ addEmp });
    // console.log(this.state)
  }

  /**
   * @description handle edit popup input
   * @param {string} event/data
   * @param {string} name
   */
  handleEditChange = (event, name) => {
    let editEmp = { ...this.state.editEmp };
    if (name === 'is_conta_tracing') {
      if (event.target.value === 'positive') {
        editEmp[name] = true;
      } else {
        editEmp[name] = false;
      }
    } else {
      this.validateInput(event, name);
      editEmp[name] = event.target.value;
    }

    this.setState({ editEmp });
  }

  validateInput = (event, name) => {
    let validation = { ...this.state.validation };
    if (name === 'phone') {
      if (event === '') {
        validation[name] = 'Please enter phone number';
      }
      else {
        validation[name] = '';
      }

    } else {
      const value = event.target.value;

      switch (name) {
        case 'employee_id':
          if (value === '') {
            validation[name] = 'Please enter employee id';
          }
          else {
            validation[name] = '';
          }
          break;

        case 'name':
          if (value === '') {
            validation[name] = 'Please enter employee name';
          }
          else {
            let regx = /^[a-zA-Z ]*$/
            if (regx.test(value)) {
              validation[name] = '';
            }
            else {
              validation[name] = 'Only alphabet accepted.';
            }
          }
          break;
        case 'password':
          if (value === '') {
            validation[name] = 'Please enter initial password';
          }
          else {
            validation[name] = '';
          }
          break;
        case 'email':
          if (value) {
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (reg.test(value)) {
              validation[name] = '';
            } else {
              validation[name] = 'Please enter valid email address';
            }
          }
          break;

        case 'department':
          if (value === '') {
            validation[name] = 'Please enter department';
          }
          else {

            validation[name] = '';

          }
          break;

        default:
          console.log('Default')
          break;
      }
    }
    this.setState({ validation })
  }



  /**
   * @description add employee http call
   */
  _submitAdd = (e) => {

    let data = { ...this.state.addEmp };
    let { company } = getGlobal();
    data["company_id"] = company.unique_id;
    this.setState({
      isAddEditLoading: true
    })
    postAuth("/api/employee/new", data)
      .then((res) => {
        // console.log(res);
        const status = res.request.status;
        if (status === 201) {
          let employees = [...this.state.employees];
          employees.unshift(res.data.data);
          this.setState({ employees, isAddEditLoading: false, addEmp: {} }, () => {
            this.toggleModal("ADD");
            this.props.showAlert("Employee added successfully", "success");
          })
        } else {
          this.setState({
            isAddEditLoading: false
          })
          this.props.showAlert(res.response.data.message, 'error');
          // this.toggleModal("ADD");
          // console.log(res);
        }
      })

  }

  _submitEdit = () => {

    let data = { ...this.state.editEmp };
    const employee_id = data.employee_id;
    delete data["employee_id"];
    delete data["email"];
    this.setState({
      isAddEditLoading: true
    })
    authPatch(`/api/employee/${employee_id}`, data)
      .then((res) => {
        // console.log(res);
        // return
        const status = res.request.status;
        if (status === 200) {
          let employees = [...this.state.employees];
          let index = employees.findIndex((emp) => emp.employee_id === employee_id);
          employees[index] = { ...res.data.result };

          this.setState({ employees, isAddEditLoading: false }, () => {
            this.toggleModal("EDIT");
            this.props.showAlert("Employee edited successfully", "success");
          })
        } else {
          this.setState({
            isAddEditLoading: false
          })
          this.props.showAlert(res.response.data.message, 'error');
          // this.toggleModal("EDIT");
          // console.log(res);
        }
      })

  }

  /**
   * @description delete employee http call
   */
  deleteEmployee = () => {
    // return;
    this.setState({
      isDeleting: true
    })
    deleteAuth(`/api/employee/${this.state.deleteEmpId}`)
      .then((res) => {
        // console.log(res);
        this.setState({
          isDeleting: false
        })
        const status = res.request.status;
        if (status === 200) {
          let employees = [...this.state.employees]
          const index = employees.findIndex((emp) => emp._id === this.state.deleteEmpId)
          employees.splice(index, 1);
          this.setState({
            employees
          }, () => {
            this.toggleModal("DELETE");
            this.props.showAlert("Employee deleted", "success");
          })

        } else {
          this.props.showAlert("Something went wrong, Please try again!", 'error');
          this.toggleModal("DELETE");
        }

      })
    // http://3.16.48.200:3000/api/employee/5ec3c69ea6cb701722911628
  }

  _submitPhotos = () => {
    if (this.state.prifilePhoto !== '') {
      // console.log(this.state.prifilePhoto.size / 1024)
      let size = Math.round(this.state.prifilePhoto.size / 1024);
      // return
      if (size <= 400) {
        let formData = new FormData();
        formData.append('profile_photo', this.state.prifilePhoto);
        this.setState({
          isAddEditLoading: true,
          imageValidation: ''
        })
        axiosPatchFormData(`/api/employee/profile-photo/${this.state.editEmp.employee_id}`, formData)
          .then((res) => {
            // console.log(res);
            this.setState({
              isAddEditLoading: false
            })
            const status = res.request.status;
            if (status === 200) {
              this.props.showAlert("Profile picture uploaded", "success");
              let employees = [...this.state.employees];
              const index = employees.findIndex((emp) => emp.employee_id === this.state.editEmp.employee_id);
              // if (employees[index].photos.length > 0) {
              employees[index].profile_photo = URL.createObjectURL(this.state.prifilePhoto)
              // }
              // else {
              //   employees[index].photos.push(URL.createObjectURL(this.state.prifilePhoto))
              // }
              this.setState({
                prifilePhoto: '',
                prifilePhotoToShow: '',
                editEmp: {}
              })
              this.toggleModal("FACE");
            }
            else {
              this.props.showAlert("Something went wrong, Pleasse try again!", "error");
              this.toggleModal("FACE");
            }
          })
      }
      else {
        this.setState({
          imageValidation: `Please select image less then 400kb, Selected image size is ${size}kb`
        })
      }
    }
    else {
      this.props.showAlert("Pleasse select profile photo!", "error");
    }

  }

  _submitCSV = () => {
    if (this.state.csvFile !== '') {
      let formData = new FormData();
      formData.append('csv', this.state.csvFile);
      formData.append('method', this.state.isEmailCSV ? 'email' : 'phone')
      // console.log(new Response(formData).text().then(console.log));
      // return
      this.setState({
        isAddEditLoading: true,
        csvValidation: []
      })
      axiosPostFormData(`/api/employee/csv-upload`, formData)
        .then((res) => {
          // console.log(res);
          this.setState({
            isAddEditLoading: false
          })
          const status = res.request.status;
          if (status === 200) {
            this.props.showAlert("Data import done.", "success");
            if (res.data.message.length === 0) {
              this.toggleModal("CSV");
              this._getEmployee();
            }
            else {
              this.setState({
                csvValidation: res.data.message
              }, () => {
                this._getEmployee();
              })
            }
          }
          else {
            this.props.showAlert("Something went wrong, Pleasse try again!", "error");
            this.toggleModal("CSV");
          }
        })

    }
    else {
      this.props.showAlert("Pleasse select the file.", "error");
    }
  }

  /**
   * @description handhe searck key input
   * @param {string} event
   */
  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword })
  }

  /**
   * @description export all employee data ro csv
   */
  exportToCSV = () => {
    this.setState({
      isExportLoading: true
    })
    authGet("/api/employees")
      .then((res) => {
        // console.log(res, '====>')
        // return
        const status = res.request.status;
        if (status === 201) {
          this.setState({
            isExportLoading: false,
            csv: [["ID NO.", "NAME", "PHONE NO.", "EMAIL", "DEPARTMENT", "COVID-19 STATUS", "LAST ACTIVE"]]
          });
          let csv = [...this.state.csv];
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
          res.data.data.map((emp, i) => {
            csv[i + 1] = new Array(
              emp.employee_id,
              emp.name,
              emp.email || 'N/A',
              emp.phone || 'N/A',
              emp.department || 'N/A',
              emp.is_conta_tracing
                ?

                'POSITIVE'
                :
                `NEGATIVE`,
              emp.last_active ? format(utcToZonedTime(emp.last_active, timeZone), 'd/M/yyyy HH:mm', { timeZone }) : 'Not available'
            )
          })
          // console.log(csv);
          this.setState({
            csv
          })
        } else {
          this.setState({
            isExportLoading: false
          });
        }
      })
  }

  render() {

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    // filter employees
    const items = this.state.employees.filter((data) => {
      if (this.state.search == null)
        return data
      else if (
        data.employee_id.toLowerCase().includes(this.state.search.toLowerCase()) ||
        data.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        data.department.toLowerCase().includes(this.state.search.toLowerCase())
      ) {
        return data
      }
    })

    // Logic for displaying todos
    const indexOfLastTodo = this.state.currentPage * this.state.itemsCountPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.itemsCountPerPage;
    const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
      <>
        <Helmet>
          <title>Contatrack | Dashboard</title>
        </Helmet>

        <div data-aos="fade-down" className="innerwrapperbody">
          {/* <div className="labelzoneselect">
            <select>
              <option>Lavel 2 Zone B</option>
            </select>
          </div> */}

          <div className="employee-directoryprt margin20">
            <div className="topemployeeheader">
              <div className="leftheadingprt">
                <h2>EMPLOYEE DIRECTORY</h2>

                <input type="search" placeholder="Search" onChange={(e) => this.searchSpace(e)} />
              </div>
              {/* <a href="#" onClick={(e) => { e.preventDefault(); this.exportToCSV(); }}><i className="fa fa-download"></i> EXPORT TO CSV</a> */}


              <button
                className="borderbtn"
                onClick={() => this.toggleModal("CSV")}
              >
                + IMPORT CSV
              </button>
              <button
                className="borderbtn"
                onClick={() => this.toggleModal("ADD")}
              >
                + ADD EMPLOYEE
              </button>
            </div>
            <div className="tableprt">
              <table cellPadding="0" cellSpacing="0">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>ID NO.</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>Designation</th>
                    <th>DEPARTMENT</th>
                    <th>&nbsp;</th>
                    <th>COVID-19 STATUS</th>
                    <th>LAST ACTIVE</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    this.state.isLoading ?
                      <tr>
                        <td colSpan={10}>
                          <div style={{ textAlign: 'center' }}>
                            <CircularProgress color="primary" />
                          </div>
                        </td>
                      </tr>
                      :
                      currentTodos.map((emp, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <button
                                className="userimg-btn"
                                onClick={() => {
                                  this.setState({ editEmp: emp });
                                  this.toggleModal("FACE")
                                }}
                              >
                                <div className="userimg">
                                  {
                                    emp.profile_photo === undefined
                                      ?

                                      emp.gender === 'Female'
                                        ?
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/femaleProfileNoImage.png`} />
                                        :
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/menProfileNoImage.jpg`} />


                                      : <img src={emp.profile_photo} />
                                  }
                                  <a>
                                    <i className="fa fa-pencil"></i>
                                  </a>

                                </div>
                              </button>
                            </td>

                            <td title="ID NO.">{emp.employee_id}</td>
                            <td title="NAME">
                              <b>{emp.name}</b>
                            </td>
                            <td title="email">{emp.email || 'N/A'}</td>
                            <td title="Designation">{emp.designation || 'N/A'}</td>
                            <td title="DEPARTMENT">{emp.department || 'N/A'}</td>
                            <td>
                              <a href="#" onClick={(e) => {
                                e.preventDefault()
                                this.setState({ editEmp: emp }, () => this.toggleModal("FACE"));

                              }}
                              >UPLOAD PROFILE PHOTO</a>
                            </td>
                            <td>
                              <a style={{ color: emp.is_conta_tracing ? 'red' : '#3ED2A0' }}>
                                {
                                  emp.is_conta_tracing
                                    ?

                                    'POSITIVE'
                                    :
                                    `NEGATIVE`
                                }
                              </a><br />
                              {
                                emp.is_conta_tracing
                                  ?
                                  emp.conta_tracing_date
                                    ?

                                    <span>on {new Date(emp.conta_tracing_date).getDate() + '/' + (new Date(emp.conta_tracing_date).getMonth() + 1) + '/' + new Date(emp.conta_tracing_date).getFullYear()}</span>
                                    :
                                    'date not disclosed'
                                  : null
                              }

                            </td>
                            <td title="last active">
                              {emp.last_active ? format(utcToZonedTime(emp.last_active, timeZone), 'd/M/yyyy HH:mm', { timeZone }) : 'Not available'}
                            </td>

                            <td>
                              <div className="twobtn">
                                <button
                                  data-toggle="modal"
                                  onClick={() => {
                                    this.setState({ deleteEmpId: emp._id, deleteEmpName: emp.name }, () => {
                                      this.toggleModal("DELETE")
                                    })
                                  }}
                                >
                                  {/* <img
                                    src={`${process.env.PUBLIC_URL}/assets/images/delete.svg`}
                                  /> */}
                                  <i className="fa fa-trash-o"></i>
                                </button>
                                <button
                                  onClick={() => {
                                    this.setState({ editEmp: emp });
                                    this.toggleModal("EDIT");
                                  }}
                                >
                                  {/* <img
                                    src={`${process.env.PUBLIC_URL}/assets/images/edit.svg`}
                                  /> */}
                                  <i className="fa fa-pencil"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  }

                </tbody>
              </table>
            </div>
            <div className="pegignation-part">
              <div>
                <FormControl variant="outlined" style={{ minWidth: 200, marginTop: -10 }}>
                  <InputLabel style={{ backgroundColor: '#fff', paddingRight: 5, paddingLeft: 5 }} id="demo-simple-select-outlined-label">Employee count / page</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.itemsCountPerPage}
                    onChange={(e) => this.setState({ itemsCountPerPage: parseInt(e.target.value), currentPage: 1 })}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>

                {
                  this.state.isExportLoading
                    ?
                    null
                    :
                    <CSVLink
                      data={this.state.csv}
                      ref={this.csvLink}
                      target="_blank"
                      style={{ marginLeft: 20, color:'inherit', marginTop:10 }}
                      filename={`${format(new Date(), 'dd-MM-yy-HH:mm')}.csv`}>
                      <i className="fa fa-download"></i> EXPORT ALL EMPLOYEE TO CSV
                  </CSVLink>
                }
              </div>

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

        {/* add popup */}
        <Dialog
          open={this.state.isAddModalopen}
          onClose={() => { this.toggleModal("ADD") }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <div className="dialog-header">
              <h4 className="modal-title">Add Employee</h4>
              <button
                type="button"
                className="close"
                onClick={() => { this.toggleModal("ADD") }}
              >
                &times;
              </button>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Full Name</label>
                  <input
                    type="text"
                    defaultValue={this.state.addEmp.name}
                    onChange={(e) => this.handleAddChange(e, "name")}
                    onBlur={(e) => this.validateInput(e, "name")}

                  />
                  <span className="error">{this.state.validation.name}</span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Email</label>
                  <input
                    type="text"
                    defaultValue={this.state.addEmp.email}
                    onChange={(e) => this.handleAddChange(e, "email")}
                    onBlur={(e) => this.validateInput(e, "email")}
                  />
                  <span className="error">{this.state.validation.email}</span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Phone</label>
                  <PhoneInput
                    country={'in'}
                    countryCodeEditable={false}
                    enableSearch={true}
                    onChange={(phone, country) => this.handleAddChange({ phone, country }, "phone")}
                    onBlur={(phone) => this.validateInput(phone, "phone")}
                  />
                  <span className="error">{this.state.validation.phone}</span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Auto Generated Password</label>
                  <input
                    type="password"
                    disabled={true}
                    value={this.state.addEmp.password}
                    onChange={(e) => this.handleAddChange(e, "password")}
                    onBlur={(e) => this.validateInput(e, "password")}
                  />
                  <span className="error">
                    {this.state.validation.password}
                  </span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    defaultValue={this.state.addEmp.employee_id}
                    onChange={(e) => this.handleAddChange(e, "employee_id")}
                    onBlur={(e) => this.validateInput(e, "employee_id")}
                  />
                  <span className="error">
                    {this.state.validation.employee_id}
                  </span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Designation (Optional)</label>
                  <input
                    type="text"
                    defaultValue={this.state.addEmp.designation}
                    onChange={(e) => this.handleAddChange(e, "designation")}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Department</label>
                  <input
                    type="text"
                    defaultValue={this.state.addEmp.department}
                    onChange={(e) => this.handleAddChange(e, "department")}
                    onBlur={(e) => this.validateInput(e, "department")}
                  />
                  <span className="error">
                    {this.state.validation.department}
                  </span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="modal-input">
                  <label>Date of Birth</label>
                  {/* <input type="text" /> */}
                  <DatePicker
                    placeholderText="mm/dd/yyyy"
                    selected={this.state.toDay}
                    onChange={(date) => this.onChangeDate(date)}
                    maxDate={new Date()}

                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="modal-input">
                  <label>Gender</label>
                  <select onChange={(e) => this.handleAddChange(e, "gender")}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-12">
                <div className="modal-input">
                  <label>COVID-19 Status</label>
                  <div className="planprt">
                    <div className="plan-check">
                      <input type="radio" name="renewType" onChange={(e) => this.handleAddChange(e, 'is_conta_tracing')} value={'positive'} checked={this.state.addEmp.is_conta_tracing} id="positive" />
                      <label htmlFor="positive" >Positive </label>
                    </div>
                    <div className="plan-check">
                      <input type="radio" name="renewType" onChange={(e) => this.handleAddChange(e, 'is_conta_tracing')} value={'nagetive'} checked={!this.state.addEmp.is_conta_tracing} id="nagetive" />
                      <label htmlFor="nagetive" >Negative</label>
                    </div>
                  </div>
                </div>
              </div>
              {
                this.state.addEmp.is_conta_tracing
                  ?
                  <div className="col-md-6">
                    <div className="modal-input">
                      <label>COVID-19 Positive date</label>
                      {/* <input type="text" /> */}
                      <DatePicker
                        placeholderText="mm/dd/yyyy"
                        selected={new Date(this.state.addEmp.conta_tracing_date) || new Date()}
                        onChange={(date) => this.onChangeCoronaDate(date)}
                        maxDate={new Date()}

                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </div>
                  </div>
                  :
                  null
              }


            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="canbtn"
              onClick={() => { this.toggleModal("ADD") }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="addbtn"
              disabled={
                this.state.isAddEditLoading ||

                this.state.addEmp.name === '' ||
                // this.state.addEmp.email === '' ||
                this.state.addEmp.password === '' ||
                this.state.addEmp.phone === '' ||
                this.state.addEmp.employee_id === '' ||
                this.state.addEmp.department === '' ||

                this.state.validation.name !== '' ||
                this.state.validation.email !== '' ||
                this.state.validation.password !== '' ||
                this.state.validation.phone !== '' ||
                this.state.validation.employee_id !== '' ||
                this.state.validation.department !== ''
              }
              onClick={(e) => {
                // this.toggleModal("ADD");

                this._submitAdd(e);
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

        {/* edit popup */}
        <Dialog
          open={this.state.isEditModalopen}
          onClose={() => this.toggleModal("EDIT")}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <div className="dialog-header">
              <h4 className="modal-title">Edit Employee</h4>
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
                  <label>Full Name</label>
                  <input type="text"
                    defaultValue={this.state.editEmp.name}
                    onChange={(e) => this.handleEditChange(e, "name")}
                    onBlur={(e) => this.validateInput(e, "name")}
                  />
                  <span className="error">{this.state.validation.name}</span>
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="modal-input">
                  <label>Email</label>
                  <input type="text"
                    defaultValue={this.state.editEmp.email}
                    onChange={(e) => this.handleEditChange(e, "email")}
                    onBlur={(e) => this.validateInput(e, "email")}
                  />
                  <span className="error">{this.state.validation.email}</span>
                </div>
              </div> */}
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Phone</label>
                  <input type="text"
                    maxLength={13}
                    disabled={true}
                    defaultValue={this.state.editEmp.phone}
                    onChange={(e) => this.handleEditChange(e, "phone")}
                    onBlur={(e) => this.validateInput(e, "phone")}
                  />
                  <span className="error">{this.state.validation.phone}</span>
                </div>
              </div>

              <div className="col-md-12">
                <div className="modal-input">
                  <label>Designation (Optional)</label>
                  <input type="text"
                    defaultValue={this.state.editEmp.designation}
                    onChange={(e) => this.handleEditChange(e, "designation")}
                  />
                  <span className="error">{this.state.validation.designation}</span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>Department</label>
                  <input type="text"
                    defaultValue={this.state.editEmp.department}
                    onChange={(e) => this.handleEditChange(e, "department")}
                    onBlur={(e) => this.validateInput(e, "department")}
                  />
                  <span className="error">{this.state.validation.department}</span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="modal-input">
                  <label>Date of Birth</label>
                  {/* <input type="text" /> */}
                  <DatePicker
                    placeholderText="mm/dd/yyyy"
                    selected={new Date(this.state.editEmp.dob) || new Date()}
                    onChange={(date) => this.onChangeDateEditDOB(date)}
                    maxDate={new Date()}

                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="modal-input">
                  <label>Gender</label>
                  <select
                    onChange={(e) => this.handleEditChange(e, "gender")}
                    defaultValue={this.state.editEmp.gender}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="modal-input">
                  <label>COVID-19 Status</label>
                  <div className="planprt">
                    <div className="plan-check">
                      <input type="radio" name="renewType" onChange={(e) => this.handleEditChange(e, 'is_conta_tracing')} value={'positive'} checked={this.state.editEmp.is_conta_tracing} id="positive" />
                      <label htmlFor="positive" >Positive </label>
                    </div>
                    <div className="plan-check">
                      <input type="radio" name="renewType" onChange={(e) => this.handleEditChange(e, 'is_conta_tracing')} value={'nagetive'} checked={!this.state.editEmp.is_conta_tracing} id="nagetive" />
                      <label htmlFor="nagetive" >Negative</label>
                    </div>
                  </div>
                </div>
              </div>
              {
                this.state.editEmp.is_conta_tracing
                  ?
                  <div className="col-md-6">
                    <div className="modal-input">
                      <label>COVID-19 Positive date</label>
                      {/* <input type="text" /> */}
                      <DatePicker
                        placeholderText="mm/dd/yyyy"
                        selected={this.state.editEmp.conta_tracing_date === undefined || this.state.editEmp.conta_tracing_date === null ? new Date() : new Date(this.state.editEmp.conta_tracing_date)}
                        onChange={(date) => this.onChangeCoronaDateEdit(date)}
                        maxDate={new Date()}

                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </div>
                  </div>
                  :
                  null
              }
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

                this.state.editEmp.name === '' ||
                this.state.editEmp.password === '' ||
                this.state.editEmp.phone === '' ||
                this.state.editEmp.department === '' ||

                this.state.validation.name !== '' ||
                this.state.validation.password !== '' ||
                this.state.validation.phone !== '' ||
                this.state.validation.department !== ''}
              onClick={() => this._submitEdit()}
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

        {/* face image upload popup */}
        <Dialog
          open={this.state.isFaceImgOpen}
          onClose={() => this.toggleModal("FACE")}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <div className="dialog-header">
              <h4 className="modal-title">Add Image</h4>
              <button
                type="button"
                className="close"
                onClick={() => this.toggleModal("FACE")}
              >
                &times;
              </button>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-12">
                <label className="upload-heading">Profile</label>
                <div className="uploadsection">
                  <div className="leftprof">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/upload-icon.png`}
                    />
                    Profile Pic
                  </div>
                  <div className="browseBtnprt">
                    <input
                      type="file"
                      onChange={(event) => {
                        // console.log(event.target.value)
                        // let data = { ...this.state.editRowData }
                        // data.url = URL.createObjectURL(event.target.files[0])
                        this.setState({ prifilePhoto: event.target.files[0], prifilePhotoToShow: URL.createObjectURL(event.target.files[0]), imageValidation: '' })
                      }}
                    />

                    <span>Upload</span>
                  </div>
                </div>
                <span className="error">{this.state.imageValidation}</span>
                {
                  this.state.prifilePhotoToShow !== ''
                    ?
                    <img src={this.state.prifilePhotoToShow} style={{ marginTop: 10 }} alt="profile" />
                    :
                    null
                }

              </div>

              <div className="col-md-12 margin30 profilepopprt">
                {/* <div className="rightquestionicon">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/question-mark.png`}
                  />
                  <div className="imgmoodshowprt text-center">
                    <p>
                      Take photo of the front at different angle shown below{" "}
                    </p>
                    <ul>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/font-face.png`}
                        />
                        <p>Front</p>
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/left-face.png`}
                        />
                        <p>Left</p>
                      </li>
                      <li>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/right-face.png`}
                        />
                        <p>Right</p>
                      </li>
                    </ul>
                  </div>
                </div> */}
                {/* <label className="upload-heading">
                  Facial Recognition Photo
                </label> */}
                {/* <div className="uploadsection">
                  <div className="leftprof">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/upload-icon.png`}
                    />
                    Front Face
                  </div>
                  <div className="browseBtnprt">
                    <input type="file" />
                    <span>Upload</span>
                  </div>
                </div> */}
                {/* <div className="uploadsection">
                  <div className="leftprof">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/upload-icon.png`}
                    />
                    Left side of the face
                  </div>
                  <div className="browseBtnprt">
                    <input type="file" />
                    <span>Upload</span>
                  </div>
                </div> */}
                {/* <div className="uploadsection">
                  <div className="leftprof">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/upload-icon.png`}
                    />
                    Right side of the face
                  </div>
                  <div className="browseBtnprt">
                    <input type="file" />
                    <span>Upload</span>
                  </div>
                </div> */}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="addbtn updatebtn"
              disabled={this.state.isAddEditLoading}
              onClick={() => this._submitPhotos()}
            >

              {
                this.state.isAddEditLoading
                  ?

                  <CircularProgress color="primary" size={30} variant="static" value={this.global.progress} />
                  :
                  'UPLOAD'
              }
            </button>
          </DialogActions>
        </Dialog>

        {/* CSV upload popup */}
        <Dialog
          open={this.state.isCsvModalOpen}
          onClose={() => this.toggleModal("CSV")}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <div className="dialog-header">
              <h4 className="modal-title">Upload CSV</h4>
              <button
                type="button"
                className="close"
                onClick={() => this.toggleModal("CSV")}
              >
                &times;
              </button>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-12">
                <label className="upload-heading">Import employees</label>
                <div className="uploadsection" style={{ minWidth: 400 }}>
                  <div className="leftprof">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/upload-icon.png`}
                    />
                    {this.state.selectCSVName || 'SELECT CSV'}
                  </div>
                  <div className="browseBtnprt">
                    <input
                      type="file"
                      onChange={(event) => {
                        this.setState({ csvFile: event.target.files[0], selectCSVName: event.target.files[0].name })
                      }}
                      accept=".xlsx, .xls, .csv"
                    />

                    <span>SELECT</span>
                  </div>

                </div>
                <div className="planprt">
                  <div className="plan-check">
                    <input type="radio" name="renewType" onChange={(e) => this.setState({ isEmailCSV: true })} value={'email'} checked={this.state.isEmailCSV} id="email" />
                    <label htmlFor="email" >Email</label>
                  </div>
                </div>

                <div className="planprt">
                  <div className="plan-check">
                    <input type="radio" name="renewType" onChange={(e) => this.setState({ isEmailCSV: false })} value={'mobile'} checked={!this.state.isEmailCSV} id="mobile" />
                    <label htmlFor="mobile" >Mobile</label>
                  </div>
                </div>
                {
                  this.state.csvValidation.map((er, i) => {
                    return (<React.Fragment key={i}><span className="error">{er}</span><br /></React.Fragment>)
                  })
                }

              </div>
            </div>
          </DialogContent>
          <DialogActions>
            {/* <div className="deletebtnprt"> */}
            <button
              type="button"
              className="canbtn"
              onClick={() => this.toggleModal("CSV")}
            >
              CLOSE
                  </button>
            <button
              type="button"
              className="addbtn"
              disabled={this.state.isAddEditLoading}
              onClick={() => this._submitCSV()}
            >

              {
                this.state.isAddEditLoading
                  ?

                  <CircularProgress color="primary" size={30} />
                  :
                  'UPLOAD CSV'
              }
            </button>
            {/* </div> */}
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
                  Are you sure you want to permanently remove {this.state.deleteEmpName} from employee list?
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
                    disabled={this.state.isDeleting}
                    onClick={() => {
                      this.deleteEmployee();
                    }}
                  >
                    {this.state.isDeleting ? 'Loading...' : 'Delete'}
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

export default HOC(Employee);

