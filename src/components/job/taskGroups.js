import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import Table from "../table";
import shortUUID from "../uuid";
import JSON from "../json";

class JobTaskGroups extends Component {
    render() {
        const job = this.props.job;

        const taskGroups = [];
        const taskGroupHeaders = [
            "ID",
            "Name",
            "Count",
            "Constraints",
            "Meta",
            "Restart Policy",
        ];
        job.TaskGroups.forEach((taskGroup) => {
            taskGroup.ID = taskGroup.Name;
            taskGroups.push(
                <tr key={taskGroup.ID}>
                    <td><Link to={`/jobs/${job.ID}/taskGroups`}
                              query={{taskGroupId: taskGroup.ID}}>{shortUUID(taskGroup.ID)}</Link></td>
                    <td>{taskGroup.Name}</td>
                    <td>{taskGroup.Count}</td>
                    <td>{taskGroup.Constraints || "<none>"}</td>
                    <td>{taskGroup.Meta || "<none>" }</td>
                    <td>{taskGroup.RestartPolicy.Mode}</td>
                </tr>
            )
        });

        let taskGroupId = this.props.location.query['taskGroupId'];

        //
        // Auto-select first task group if only one is available.
        //
        if (!taskGroupId && job.TaskGroups.length === 1) {
            taskGroupId = job.TaskGroups[0].ID;
        }
        return (
            <div className="tab-pane active">
                <div className="row">
                    <div className="col-md-6">
                        <legend>Task Groups</legend>
                        {(taskGroups.length > 0) ?
                            <Table classes="table table-hover table-striped" headers={taskGroupHeaders}
                                   body={taskGroups}/>
                            : null
                        }
                    </div>
                    <div className="col-md-4">
                        <legend>Task Group: {taskGroupId}</legend>
                        {job.TaskGroups.filter((taskGroup) => {
                            return taskGroup.ID === taskGroupId
                        }).map((taskGroup) => {
                            return (
                                <JSON json={taskGroup}/>
                            )
                        }).pop()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({job}) {
    return {job}
}

export default connect(mapStateToProps)(JobTaskGroups);
