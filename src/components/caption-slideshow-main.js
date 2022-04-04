import React from 'react';
import {Container, Button, Modal, OverlayTrigger, Tooltip, Form, Col} from 'react-bootstrap';
import {FaWindowClose} from "react-icons/fa";
import Slider from "react-slick";
import ResponsiveSize from "../hooks/get-window-dimensions";
import NextArrow from "./next-arrow";
import PrevArrow from "./prev-arrow";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

class CaptionSlideshowDisplay extends React.Component {
  state = {
    slideIndex: 0,
    updateCount: 0,
    show: false,
  };
  
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  goToPage = () => {
    var page = Number(document.getElementById("pageInput").value);
    this.slider.slickGoTo((page % this.props.total) - 1);
    this.handleClose();
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      fade: true,
      centerPadding: "60px",
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      adaptiveHeight: true,
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };

    return (
      <>
      <div>
        <h1 className="mb-5" style={{color: "#fff", textAlign: "center"}}>{this.props.title}</h1>
        <section>
            <section className="book-main">
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                    {this.props.images.map((image, index) => (
                        <div className="view">
                            <img
                                className="d-block w-100"
                                src={image.publicURL}
                                alt={image.name}
                            />
                        </div>
                    ))}
                </Slider>
            </section>
            <section className='mt-3' style={{textAlign: 'justify'}}>
                <p dangerouslySetInnerHTML={{__html: this.props.captions[this.state.slideIndex]}}>
                </p>
            </section>
            <div className='mt-3' style={{textAlign: 'center'}}>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 250 }}
                    overlay={helpTooltip("Toggle Page")}
                >
                    <Button style={{fontSize: this.props.fontButtonSize}} onClick={this.handleShow}>{this.state.slideIndex + 1} of {this.props.total}</Button>
                </OverlayTrigger>
            </div>
        </section>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>Toggle Page</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-0" onSubmit={e => e.preventDefault()}> 
          <Form.Row className="align-items-center">
            <Form.Control id="pageInput" className="hover-shadow" style={{textAlign: "center", color: "#017BFF"}} type="text" placeholder={`Enter page number from 1 to ${this.props.total}.`} />
          </Form.Row>
          <Form.Row className="align-items-center mt-3">
            <Col></Col>
            <Col style={{textAlign: "center"}}>
            <Button onClick={this.goToPage}>
              Go
            </Button>
            </Col>
            <Col></Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={this.handleClose}>
          <FaWindowClose /> Close
        </Button>
      </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default function CaptionSlideshowMain({title, images, captions, size}) {
  return (
    <Container className="my-5" style={{width: size.toString() + "%"}}>
      <CaptionSlideshowDisplay total={images.length} title={title} images={images} captions={captions} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} />
    </Container>
  )
}