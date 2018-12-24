import React from 'react';
import autoBind from 'react-autobind';
import { Modal } from 'react-bootstrap';

export default class AppModal extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      show: false,
      content: false,
    };
  }

  close() {
    this.setState({
      show: false,
      content: false,
    });
  }

  show(Component) {
    this.setState({
      show: true,
      content: <Component />,
    });
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close}>
        {this.state.content}
      </Modal>
    );
  }
}
