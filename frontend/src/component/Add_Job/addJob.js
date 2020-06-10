import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators
} from "react-reactive-form";
import {
    addJob
} from "../../action/action";
class AddJob extends Component {
    constructor(props) {
        super(props)
        this.addJobForm = FormBuilder.group({
            jobTitle: ["", [Validators.required]],
            jobLocation: ["", [Validators.required]],
            jobDescription: ["", [Validators.required]],
            date: ["", [Validators.required]],
            status: ["", [Validators.required]],
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await this.props.dispatch(
            addJob(this.addJobForm.value, this.props.history)
        );
    }

    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );
    render() {
        return (
            <div>
                <div>
                    <h2> Add Job<span style={{ marginLeft: "60%", cursor: "pointer" }}></span></h2>
                </div>
                <FieldGroup
                    control={this.addJobForm}
                    render={({ get, invalid }) => (
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <FieldControl
                                    name="jobTitle"
                                    render={({ handler, touched, hasError }) => (
                                        <div className="col-md-12 form-group">
                                            <label for="">Job Title</label>
                                            <input
                                                className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                type="text"
                                                {...handler()}
                                            />
                                            <span className="pro-error" style={{ color: "red" }}>
                                                {touched &&
                                                    ((hasError("required") && `Job title is required`))}
                                            </span>
                                        </div>
                                    )}
                                />
                                <FieldControl
                                    name="jobLocation"
                                    render={({ handler, touched, hasError }) => (
                                        <div className="col-md-12 form-group">
                                            <label for="">Job Location</label>
                                            <input
                                                className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                type="text"
                                                {...handler()}
                                            />
                                            <span className="pro-error" style={{ color: "red" }}>
                                                {touched &&
                                                    ((hasError("required") && `Job location is required`))}
                                            </span>
                                        </div>
                                    )}
                                />
                                <FieldControl
                                    name="jobDescription"
                                    render={({ handler, touched, hasError }) => (
                                        <div className="col-md-12 form-group">
                                            <label for="">Job Description</label>
                                            <textarea className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                {...handler()}></textarea>
                                            <span className="pro-error" style={{ color: "red" }}>
                                                {touched &&
                                                    ((hasError("required") && `Job description is required`))}
                                            </span>
                                        </div>
                                    )}
                                />
                                <FieldControl
                                    name="date"
                                    render={({ handler, touched, hasError }) => (
                                        <div className="col-md-12 form-group">
                                            <label for="">Date</label>
                                            <input
                                                className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                type="date"
                                                {...handler()}
                                            />
                                            <span className="pro-error" style={{ color: "red" }}>
                                                {touched &&
                                                    ((hasError("required") && `Date is required`))}
                                            </span>
                                        </div>
                                    )}
                                />
                                <FieldControl
                                    name="status"
                                    render={({ handler, touched, hasError }) => (
                                        <div className="col-md-12 form-group">
                                            <label for="">Job Status</label>
                                            <select
                                                className="form-control rounded-0 border-top-0 border-right-0 border-left-0 px-0"
                                                id="exampleFormControlSelect1"
                                                {...handler()}
                                            >
                                                <option value="">Select an option</option>
                                                <option value="Traniee">Traniee</option>
                                                <option value="Associate">Associate</option>
                                                <option value="Senior Associate">Senior Associate</option>
                                                <option value="Manager Level 1">Manager Level 1</option>
                                                <option value="Senior Manager">Senior Manager</option>
                                            </select>
                                            <span className="pro-error" style={{ color: "red" }}>
                                                {touched &&
                                                    ((hasError("required") && `Status is required`))}
                                            </span>
                                        </div>
                                    )}
                                />
                                <div className="col-md-6">
                                    <button
                                        type="submit"
                                        className="btn btn-success text-center"
                                        disabled={invalid}
                                    >
                                        Submit
                             </button>
                                </div>
                                <div className="col-md-6">
                                    <NavLink to="/">
                                        <button
                                            type="button"
                                            className="btn btn-primary float-right"
                                        >
                                            Back
                             </button>
                                    </NavLink>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        getPostDetails: state.post.getPostDetails,
    };
}

export default connect(mapStateToProps)(AddJob)
