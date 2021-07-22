import "../styles/EditCardModal.css";

import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import TextareaAutosize from "react-textarea-autosize";
import Button from "@material-ui/core/Button";


class EditCardModal extends Component {
  state = {
    title: null,
    description: null,
  };

  componentDidMount() {
    this.setState({
      title: this.props.card?.text,
      description: this.props.card?.description,
    })
  }

  render() {
    const {card, onSave, onClose, onDelete} = this.props;
    const {title,description} = this.state;

    return (
        <Modal
          open={true}
          onClose={onClose}
        >
          <div className="Modal-Body">
            <div className="Modal-Form">
              <div className="Modal-Form-Section">
                <div>Title:</div>
                <TextareaAutosize
                  autoFocus
                  className="Edit-Card-Textarea"
                  placeholder="Enter the text for this card..."
                  value={title}
                  maxRows={2}
                  onChange={(e) => {this.setState({title: e.target.value})}}
                />
              </div>
              <div className="Modal-Form-Section">
                <div>Description:</div>
                <TextareaAutosize
                  className="Edit-Card-Textarea"
                  placeholder="Enter the text for this card..."
                  value={description}
                  onChange={(e) => {this.setState({description: e.target.value})}}
                />
              </div>
            </div>
            <div className="Modal-Actions">
              <Button onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSave(title, description)
              }}
                      variant="contained"
                      color="primary">
                Save
              </Button>
              {
                card && (
                  <Button onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDelete()
                  }}
                          variant="contained"
                          color="secondary">
                    Delete Card
                  </Button>
                )
              }
              <Button onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onClose()
              }}
                      variant="contained"
                      color="default">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
    )

  }
}

export default EditCardModal