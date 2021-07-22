import "../styles/AddList.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import EditButtons from "./EditButtons";
import {serverAwait} from "../store";

class AddList extends Component {
  state = {
    title: ""
  };

  handleChangeTitle = e => this.setState({ title: e.target.value });

  createList = async (e) => {
    const { title } = this.state;
    const { dispatch } = this.props;

    this.props.toggleAddingList();
    await serverAwait()
    dispatch({
      type: "ADD_LIST",
      payload: { listId: shortid.generate(), listTitle: title }
    });
  };

  render() {
    const { toggleAddingList } = this.props;
    const { title } = this.state;
    return (
      <div className="Add-List-Editor">
        <ListEditor
          title={title}
          handleChangeTitle={this.handleChangeTitle}
          onClickOutside={toggleAddingList}
          saveList={this.createList}
        />

        <EditButtons
          handleSave={this.createList}
          saveLabel={"Add list"}
          handleCancel={toggleAddingList}
        />
      </div>
    );
  }
}

export default connect()(AddList);
