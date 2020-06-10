import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from 'react-loader-spinner';
import './App.css';

const loading = () => (
  <div className="user-db-loader">
    <Loader
      type="ThreeDots"
      color="#00BFFF"
      height={100}
      width={100}
    />
  </div>
);
const JobList = React.lazy(() =>
  import("./component/List_Job/listJob")
);
const EditJob = React.lazy(() =>
  import("./component/Edit_Job/editJob")
);
const AddJob = React.lazy(() =>
  import("./component/Add_Job/addJob")
);
class App extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <React.Suspense fallback={loading()}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              name="Get Listing"
              render={props => <JobList {...props} />}
            />
            <Route
              exact
              path="/edit-job/:id"
              name="Edit Job"
              render={props => <EditJob {...props} />}
            />
            <Route
              exact
              path="/add-job"
              name="Add Job"
              render={props => <AddJob {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </React.Suspense>

    );
  }
}

export default App;


