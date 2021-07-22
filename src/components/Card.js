import "../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import EditCardModal from "./EditCardModal";
import {serverAwait} from "../store";

class Card extends Component {
  state = {
    viewModal: null,
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;

    if (window.confirm("Are you sure to delete this card?")) {
      await serverAwait()
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
      this.setState({viewModal: null})
    }
  };

  saveCardData = async (title, description) => {
    const { listId, card, dispatch } = this.props;
    await serverAwait()
    dispatch({
      type: "SAVE_CARD_DATA",
      payload: { cardId: card._id, listId, cardText: title, cardDescription: description }
    });
    this.setState({viewModal: null})
  };

  render() {
    const { card, index } = this.props;
    const { viewModal } = this.state;

    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            onClick={() => {this.setState({viewModal: card._id})}}
          >
            {
              viewModal && (
                <EditCardModal
                  card={card}
                  onSave={this.saveCardData}
                  onDelete={this.deleteCard}
                  onClose={() => {
                    this.setState({viewModal: null})
                  }}
                />
              )
            }

            {card.text}
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);
