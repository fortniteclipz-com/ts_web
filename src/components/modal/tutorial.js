import React from 'react';
import autoBind from 'react-autobind';
import { Button, Image, Modal } from 'react-bootstrap';
import Slider from 'react-slick';

import modal from '../../services/modal';

export default class TutorialModal extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      slideIndex: 0,
    };
    this.slides = [{
      title: "Step 1",
      image: 'help1_twitch',
      html: `<p>Find the Broadcast's Twitch ID on <b>Twitch.tv</b>.</p>`,
    }, {
      title: "Step 2",
      image: 'help2_select',
      html: `<p>Enter Twitch ID into <b>FortniteClipz</b>.</p>`,
    }, {
      title: "Step 3",
      image: 'help3_analyze',
      html: `<p>Click <b>Analyze</b>.</p>`,
    }, {
      title: "Step 4",
      image: 'help4_analyzing',
      html: `<p>Wait. (approx. 20 minutes)</p>`,
    }, {
      title: "Step 5",
      image: 'help5_clips',
      html: `<p>Choose, edit, and rearrange clips in your highlight. When ready, press <b>Create</b>.</p>` ,
    }, {
      title: "Step 6",
      image: 'help6_watch',
      html: `<p>When it’s ready, <b>Watch</b> or <b>Download</b>. Congratulations! You’re done.</p>`,
    }, {
      title: "Thank You",
      html: `<p>Welcome to FortniteClipz!</p>
        <br/><p>We are all about helping the streamer create highlights of their daily streams so they can boost their clout and worry about what matter’s most to them, playing the game. We only support Fortnite as of now but let us know what other games you would like us to add. If you ever need help, there’s a chat/email button on the bottom right of the page where you can get in touch with us for help or if you just want to say hi! We need your help in making this app a streamer’s dream.</p>
        <br/><p>Thanks!</p>`,
    }];
  }

  render() {
    let back = null;
    let next = null;
    let close = null;
    if (this.state.slideIndex !== 0) {
      back = (<Button onClick={e => this.slider.slickPrev()}>Back</Button>);
    }
    if (this.state.slideIndex !== this.slides.length - 1) {
      next = (<Button bsStyle="primary" onClick={e => this.slider.slickNext()}>Next</Button>);
    } else {
      close = (<Button bsStyle="primary" onClick={e => modal.close()}>Close</Button>);
    }

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{this.slides[this.state.slideIndex].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-help">
            <Slider
              adaptiveHeight={true}
              beforeChange={(current, next) => this.setState({slideIndex: next})}
              dots={true}
              infinite={false}
              swipe={false}
              ref={s => this.slider = s}
            >
            {
              this.slides.map((slide, index) => {
                let image = null;
                if (slide.image) {
                  image = (<Image src={`/images/${slide.image}.jpg`} rounded />);
                }
                return (
                  <div key={index}>
                    <div dangerouslySetInnerHTML={{__html: slide.html}}></div>
                    {image}
                  </div>
                );
              })
            }
            </Slider>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {back}
          {next}
          {close}
        </Modal.Footer>
      </div>
    );
  }
}
