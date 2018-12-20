import React from 'react';
import autoBind from 'react-autobind';
import { Modal } from 'react-bootstrap';

export default class AppModal extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      show: false
    };
  }

  close() {
    this.setState({
      show: false
    });
  }

  show() {
    this.setState({
      show: true
    });
  }

  render() {
    return (
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            sachin was here
            {this.children}
          </Modal.Body>
        </Modal>
    );
  }
}
