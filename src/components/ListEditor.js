import "../styles/ListEditor.css";

import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ClickOutside from "./ClickOutside";

class ListEditor extends Component {
  state = {
    error: null,
  };
  ref = React.createRef();

  isValid = () => {
    return this.props.title.match(/^[a-zA-Z0-9]*$/)
  }

  onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (this.isValid()) {
        console.log('debug saving!!!')
        this.props.saveList();
      } else {
        this.setState({error: 'List name must contain only letters and numbers'})
      }
    }
  };

  render() {
    const { title, handleChangeTitle, deleteList, onClickOutside } = this.props;
    const { error } = this.state
    return (
      <ClickOutside onClickOutside={() => {
        if (this.isValid()) {
          onClickOutside()
        } else {
          this.setState({error: 'List name must contain only letters and numbers'})
        }
      }}>
        <div className="List-Title-Edit">
          <TextareaAutosize
            autoFocus
            className="List-Title-Textarea"
            placeholder="Enter list title..."
            value={title}
            onChange={handleChangeTitle}
            onKeyDown={this.onEnter}
            style={{ width: deleteList ? 220 : 245 }}
          />
          {error && <div className="Name-Error">{error}</div>}
          {deleteList && <ion-icon name="trash" onClick={deleteList} />}
        </div>
      </ClickOutside>
    );
  }
}

export default ListEditor;
