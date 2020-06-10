import React, { Component } from "react";
import { connect } from "react-redux";
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators
} from "react-reactive-form";
import { NavLink } from 'react-router-dom';
import {
    getJobDataToUpdate, editJobPost
} from "../../action/action";
class EditJob extends Component {
    constructor(props) {
        super(props)
        this.editJobForm = FormBuilder.group({
            jobTitle: ["", [Validators.required]],
            jobLocation: ["", [Validators.required]],
            jobDescription: ["", [Validators.required]],
            date: ["", [Validators.required]],
            status: ["", [Validators.required]],
        });
    }

    async  componentDidMount() {
        let jobDetais = await this.props.dispatch(getJobDataToUpdate(this.props.match.params.id));
        this.editJobForm.patchValue({
            jobTitle: jobDetais.jobTitle,
            jobLocation: jobDetais.jobLocation,
            jobDescription: jobDetais.jobDescription,
            status: jobDetais.status,
            date: jobDetais.date
        })
    }

    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    handleSubmit = async () => {
        var data = {
            id: this.props.match.params.id,
            jobTitle: this.editJobForm.value.jobTitle,
            jobLocation: this.editJobForm.value.jobLocation,
            jobDescription: this.editJobForm.value.jobDescription,
            date: this.editJobForm.value.date,
            status: this.editJobForm.value.status,
        }
        await this.props.dispatch(editJobPost(data, this.props.history));

    }
    render() {
        return (
            <div>
                <div>
                    <h2>Edit Job Details<span style={{ marginLeft: "60%", cursor: "pointer" }}></span></h2>
                </div>
                <FieldGroup
                    control={this.editJobForm}
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
                                                <option value={1}>Traniee</option>
                                                <option value={2}>Associate</option>
                                                <option value={3}>Senior Associate</option>
                                                <option value={3}>Manager Level 1</option>
                                                <option value={4}>Senior Manager</option>
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
                                        update
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

export default connect(mapStateToProps)(EditJob);
