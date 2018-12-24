import React from 'react';
import autoBind from 'react-autobind';
import { Button, Image, Modal } from 'react-bootstrap';
import Slider from 'react-slick';

import modal from '../../services/modal';

export default class WalkThruModal extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
    this.slides = [{
      html: "<p>Hi, welcome to FortniteClipz!</p><br/><p>We are all about helping the streamer create highlights of their daily streams so they can boost their clout and worry about what matter’s most to them, playing the game. We only support Fortnite as of now but let us know what other games you would like us to add. If you ever need help, there’s a chat/email button on the bottom right of the page where you can get in touch with us with help or if you have some feedback! We need your help in making this app streamer’s dream.</p><br/><p>Thanks!</p>",
    }, {
      image: 'help1_twitch',
      html: "<p>On Twitch.tv, navigate to the past Fortnite Twitch broadcast you wish to create a highlight of. Find the Twitch Video ID of the broadcast in the URL.</p>",
    }, {
      image: 'help2_select',
      html: "<p>On FortniteClipz, find the Twitch Broadcast by entering the Twitch Video ID.</p>",
    }, {
      image: 'help3_analyze',
      html: "<p>Analyze the Broadcast for Fortnite clips. You must sign in to analyze a broadcast but don’t worry, it’s free!</p>",
    }, {
      image: 'help4_analyzing',
      html: "<p>Wait for the stream to analyze. Usually takes about 20 minutes.</p>",
    }, {
      image: 'help5_clips',
      html: "<p>After the Broadcast is analyzed, view analyzed clips. From this screen you can:<br/>- <b>Play</b> — <small>Preview clip.</small><br/>- <b>Select</b> — <small>Select whether clip should be included in your highlight.</small><br/>- <b>Edit</b> — <small>Edit clip starting and ending time by dragging the slider.</small><br/>- <b>Sort</b> — <small>Drag to rearrange clip order</small><br/>- <b>Create</b> — <small>Create the highlight. You must sign in to create a highlight but don’t worry, it’s free!</small></p>",
    }, {
      image: 'help6_watch',
      html: "<p>After creating a highlight, it can be viewed on FortniteClipz and downloaded from your browser for uploading to social media.</p>",
    }];
  }

  render() {
    let next = null;
    if (this.state.slideIndex !== this.slides.length - 1) {
      next = (<Button bsStyle="primary" onClick={e => this.slider.slickNext()}>Next</Button>);
    }
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Walk Thru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-help">
            <Slider
              dots={true}
              infinite={false}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              beforeChange={(current, next) => this.setState({slideIndex: next})}
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
                    {image}
                    <div dangerouslySetInnerHTML={{__html: slide.html}}></div>
                  </div>
                );
              })
            }
            </Slider>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e => modal.close()}>Close</Button>
          {next}
        </Modal.Footer>
      </div>
    );
  }
}
