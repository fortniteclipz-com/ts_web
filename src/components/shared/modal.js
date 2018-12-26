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
    document.querySelector('#tawkchat-container').style.display = 'block';
    this.setState({
      content: undefined,
    });
  }

  show(Component) {
    document.querySelector('#tawkchat-container').style.display = 'none';
    this.setState({
      content: <Component />,
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
