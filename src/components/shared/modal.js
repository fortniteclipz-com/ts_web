import React from 'react';
import autoBind from 'react-autobind';
import { Modal } from 'react-bootstrap';

export default class AppModal extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      content: undefined,
    };
  }

  close() {
    this.setState({
      content: undefined,
    }, function () {
      document.querySelectorAll('#tawkchat-container').forEach(n => n.style.display = 'block');
    });
  }

  show(Component) {
    this.setState({
      content: <Component />,
    }, function () {
      document.querySelectorAll('#tawkchat-container').forEach(n => n.style.display = 'none');
    });
  }

  render() {
    return (
      <Modal show={this.state.content !== undefined} onHide={this.close}>
        {this.state.content}
      </Modal>
    );
  }
}
