import React from 'react';
import {Container, Button, Modal, OverlayTrigger, Tooltip, Form, Col} from 'react-bootstrap';
import CloseButton from "./close-button";
import Slider from "react-slick";
import ResponsiveSize from "../hooks/responsive-size";
import NextArrow from "./next-arrow";
import PrevArrow from "./prev-arrow";
import {GridList, GridListTile} from '@material-ui/core';
import ResponsiveHeader from './responsive-header';

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

function SlideThumbnail({page, index, goToPage, closeFunction}) {
  const changeSlide = () => {
    goToPage(index)
    closeFunction()
  }

  return(
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 330,
        paddingTop: `5%`,
        paddingBottom: `5%`
      }}
    >
      <Button aria-label={`Page ${index + 1}`} className="view img-button" onClick={changeSlide}>
        <img
          className="d-block w-100"
          src={page.publicURL}
          alt={page.name}
          aria-hidden={true}
        />
      </Button>
      <div aria-hidden={true} className="mt-2" style={{textAlign: "center", color: "#017BFF"}}>
        <ResponsiveHeader level={2}>
          {index + 1}
        </ResponsiveHeader>
      </div>
    </div>
  )
}

class CaptionSlideshowDisplay extends React.Component {
  state = {
    slideIndex: 0,
    updateCount: 0,
    show: false,
  };
  
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  goToPage = (page) => {
    this.slider.slickGoTo(page);
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
        <div className="mb-5" style={{color: "#fff", textAlign: "center"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>
            {this.props.title}
          </ResponsiveHeader>
        </div>
        <section>
            <section className="book-main">
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                  {this.props.pages.map((page, index) => (
                    <div className="view">
                      <img
                        className="d-block w-100"
                        src={page.publicURL}
                        alt={page.name}
                      />
                    </div>
                  ))}
                </Slider>
            </section>
            <section lang={this.props.language} className='mt-3' style={{textAlign: 'justify'}}>
                <p dangerouslySetInnerHTML={{__html: this.props.dialogue[this.state.slideIndex]}}>
                </p>
            </section>
            <div className='mt-3' style={{textAlign: 'center'}}>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 250 }}
                    overlay={helpTooltip("Toggle Page")}
                >
                  <Button aria-label={`Toggle Page - Page ${this.state.slideIndex + 1} of ${this.props.total}`} style={{fontSize: this.props.fontButtonSize}} onClick={this.handleShow}>
                    <span aria-hidden={true}>{this.state.slideIndex + 1} of {this.props.total}</span>
                  </Button>
                </OverlayTrigger>
            </div>
        </section>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose} centered scrollable>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Toggle Page</ResponsiveHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GridList cellHeight="auto" spacing={5} cols={1}>
          {this.props.pages.map((currentValue, index) => (
            <GridListTile key={index}>
              <SlideThumbnail page={currentValue} index={index} goToPage={this.goToPage} closeFunction={this.handleClose} />
            </GridListTile>
          ))}
        </GridList>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={this.handleClose} />
      </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default function CaptionSlideshowMain({title, images, language, captions, omitSlides, size}) {
  var pages = [];
  var dialogue = [];
  for(var i = 0; i < images.length; i++) {
    if(!omitSlides.includes(i)) {
      pages.push(images[i]) 
      dialogue.push(captions[i])
    }
  }

  return (
    <Container className="my-5" style={{width: size.toString() + "%"}}>
      <CaptionSlideshowDisplay language={language} total={pages.length} title={title} pages={pages} dialogue={dialogue} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} />
    </Container>
  )
}