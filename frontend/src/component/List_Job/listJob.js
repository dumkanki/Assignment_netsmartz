import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import {
    getPostListing, deleteJobList
} from "../../action/action";

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteModal: false
        };
    }

    async componentDidMount() {
        await this.props.dispatch(getPostListing())
    }

    openModal = (id) => {
        this.deleteId = id;
        this.setState({
            openDeleteModal: true
        });
    }

    deleteJob = async () => {
        let data = await this.props.dispatch(deleteJobList(this.deleteId));
        if (data) {
            this.toggle();
        }
    }


    toggle = () => {
        this.setState({
            openDeleteModal: false
        });
    }

    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    addJob = () => {
        this.props.history.push({ pathname: "/add-job" });
    }
    render() {
        const { getPostDetails } = this.props;
        return (
            <div>
                <span><h2 className="text-center">Job Listing</h2>
                    <button type="button" className="btn btn-primary float-right" onClickCapture={this.addJob}>Add Job</button></span>
                <section className="">
                    <div className="table-responsive-md">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-theme">
                                <tr>
                                    <th>S.No</th>
                                    <th>Job Title</th>
                                    <th>Job Location</th>
                                    <th>Job Description</th>
                                    <th>Date</th>
                                    <th>Job status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getPostDetails && getPostDetails.map((data, index) => {
                                    let formatDate = moment(data.date).format('MMMM Do YYYY');
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{data.jobTitle}</td>
                                            <td>{data.jobLocation}</td>
                                            <td>{data.jobDescription}</td>
                                            <td>{formatDate}</td>
                                            <td>{data.status}</td>
                                            <td>
                                                <NavLink to={`edit-job/${data._id}`}>
                                                    <span style={{ cursor: "pointer" }}
                                                        className="glyphicon glyphicon-pencil mr-2"></span>
                                                </NavLink>
                                                <span style={{ cursor: "pointer" }} className="glyphicon glyphicon-trash"
                                                    onClickCapture={() => this.openModal(data._id)}></span>

                                            </td>
                                        </tr>
                                    )
                                })
                                }


                            </tbody>

                        </table>
                        <Modal isOpen={this.state.openDeleteModal} toggle={this.toggle} >
                            <ModalHeader className="border-0" toggle={this.toggle}>Delete Confirmation</ModalHeader>
                            <ModalBody>
                                <div>
                                    <strong>Are you sure to delete this Job account?</strong>
                                </div>

                            </ModalBody>
                            <ModalFooter className="border-0">
                                <Button color="primary" onClick={this.deleteJob}>Delete</Button>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    {getPostDetails === undefined || getPostDetails === [] &&
                        <>
                            <h5 className="text-center">No records found</h5>
                        </>
                    }
                </section>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        getPostDetails: state.post.getPostDetails,
    };
}

export default connect(mapStateToProps)(JobList);