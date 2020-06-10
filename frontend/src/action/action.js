import axios from "axios";
import toastr from "toastr";
import {
    GET_POST_LIST
} from "./action_constant/action_constant";
import "../../node_modules/toastr/build/toastr.css";
import url from "../config/config";

export function getJobList(data) {
    return {
        type: GET_POST_LIST,
        Payload: data
    };
}

export function getPostListing() {
    return function (dispatch) {
        return axios
            .post(url + "/post/getPostList")
            .then(res => {
                if (res.data.status === 200) {
                    dispatch(getJobList(res.data.data));
                } else {
                    toastr.error(res.data.msg);
                    return false
                }
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    }
}

export function addJob(data, history) {
    return function (dispatch) {
        return axios
            .post(url + "/post/addJobPost", { data })
            .then(res => {
                if (res.data.status === 200) {
                    toastr.success(res.data.msg);
                    history.push({ pathname: "/" });
                } else {
                    toastr.error(res.data.msg);
                    return false
                }
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    }
}

export function editJobPost(data, history) {
    return function (dispatch) {
        return axios
            .post(url + "/post/updateJobData", { data })
            .then(res => {
                if (res.data.status === 200) {
                    toastr.success(res.data.msg);
                    history.push({ pathname: "/" });
                } else {
                    toastr.error(res.data.msg);
                    return false
                }
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    }
}

export function deleteJobList(data, history) {
    return function (dispatch) {
        return axios
            .post(url + "/post/deleteJobData", { data })
            .then(res => {
                if (res.data.status === 200) {
                    toastr.success(res.data.msg);
                    dispatch(getJobList(res.data.data));
                    return true
                } else {
                    toastr.error(res.data.msg);
                    return false
                }
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    }
}

export function getJobDataToUpdate(data, history) {
    return function (dispatch) {
        return axios
            .post(url + "/post/getJobDataToUpdate", { data })
            .then(res => {
                if (res.data.status === 200) {
                    return res.data.data;
                } else {
                    toastr.error(res.data.msg);
                    return false
                }
            })
            .catch(err => {
                toastr.error("Something went wrong, Please try again");
            });
    }
}
