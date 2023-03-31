import React, {useState} from "react";
import Layout from "./layout"
import { Container, Button, ButtonGroup, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import SettingsButton from "./settings-button";
import ResponsiveSize from "../hooks/responsive-size";
import SEO from "./seo";
import ResponsiveHeader from "./responsive-header";
import Slider from "react-slick";
import NextArrow from "./next-arrow";
import PrevArrow from "./prev-arrow";
import CloseButton from "./close-button";
import DownloadButton from "./download-button";
import RangeSlider from 'react-bootstrap-range-slider';

const helpTooltip = (message, props) => (
    <Tooltip {...props}>
      {message}
    </Tooltip>
  );
  
  function SlideThumbnail({slide, currentIndex, index, goToPage, closeFunction}) {
    const changeSlide = () => {
      goToPage(index)
      closeFunction()
    }
  
    return(
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 330,
          paddingTop: '3%',
          paddingBottom: '3%'
        }}
      >
        <Button aria-label={`Page ${index + 1}`} className={`p-2 view img-button comic-strip-page-thumbnail ${(currentIndex === index) ? "comic-strip-page-thumbnail-current" : ""}`} onClick={changeSlide}>
          <div aria-hidden={true}>
          {slide}
          <section className="mt-2 comic-strip-page-number">
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{index + 1}</ResponsiveHeader>
          </section>
          </div>
        </Button>
      </div>
    )
  }
  
  function PreviousButton({goToPage, slideIndex, numPages}) {
    const previousSlide = () => {
      goToPage((slideIndex > 0) ? (slideIndex - 1) : (numPages - 1));
    }
    
    return(
      <PrevArrow onClick={previousSlide} />
    )
  }
  
  function NextButton({goToPage, slideIndex, numPages}) {
    const nextSlide = () => {
      goToPage((slideIndex + 1) % numPages);
    }
    
    return(
      <NextArrow onClick={nextSlide} />
    )
  }
  
  function ComicStripToggle(props) {  
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <ButtonGroup aria-label="Page Navigator">
          <PreviousButton goToPage={props.goToPage} slideIndex={props.state.slideIndex} numPages={props.children.length} />
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            overlay={helpTooltip("Toggle Page")}
          >
            <Button aria-label={`Toggle Page - Page ${props.state.slideIndex + 1} of ${props.children.length}`} style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} onClick={handleShow}>
              <span aria-hidden={true}>{props.state.slideIndex + 1} of {props.children.length}</span>
            </Button>
          </OverlayTrigger>
          <NextButton goToPage={props.goToPage} slideIndex={props.state.slideIndex} numPages={props.children.length} />
        </ButtonGroup>
        <Modal show={show} onHide={handleClose} fullscreen={true} scrollable={true}>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Toggle Page</ResponsiveHeader>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-0">
          <div className={"my-2 " + props.tableBackground}>
          <ol>
            {props.children.map((currentValue, index) => (
              <li key={index}>
                <SlideThumbnail slide={currentValue} currentIndex={props.state.slideIndex} index={index} goToPage={props.goToPage} closeFunction={handleClose} />
              </li>
            ))}
          </ol>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
        </Modal>
        </>
      );
  }

  function SettingsWindow(props) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return(
      <>
        <SettingsButton fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} handleShow={handleShow} />
        <Modal show={show} onHide={handleClose} fullscreen={true} scrollable={true}>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Settings</ResponsiveHeader>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="mb-3">
            <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Language and Dialogue</ResponsiveHeader>
            </div>
            <Form.Select style={{color: "#017BFF"}} className="hover-shadow" id="language-selector" onChange={props.changeLanguage} value={props.state.currentLanguage}>
              {props.languageOptions}
            </Form.Select>
          </section>
          <section className="mb-3">
            <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Mode</ResponsiveHeader>
            </div>
            <Form.Select style={{color: "#017BFF"}} className="hover-shadow" id="mode-selector" onChange={props.changeMode} value={props.state.currentMode}>
              {props.modeOptions}
            </Form.Select>
          </section>
          <section className="mb-3">
            <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                Table Background
              </ResponsiveHeader>
            </div>
            <Form.Select style={{color: "#017BFF"}} className="hover-shadow" id="table-background-selector" onChange={props.changeTableBackground} value={props.state.currentTableBackground}>
              {props.tableBackgroundOptions.map((value) => (<option key={value}>{value}</option>))}
            </Form.Select>
          </section>
          <section className="mb-3">
            <div className='align-items-center pb-3' style={{textAlign: 'center', color: "#017BFF"}}>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{`Page Size`}</ResponsiveHeader>
            </div>
            <RangeSlider className="hover-shadow mt-3" variant="dark" tooltipLabel={currentValue => `${currentValue}%`} tooltipPlacement='top' tooltip='on' onChange={changeEvent => props.changePageSize(changeEvent.target.value)} value={props.state.currentSize} />
          </section>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
      </>
    )
  }

export default class ComicStripBase extends React.Component {
    state = {
      currentLanguage: this.props.defaultLanguage,
      currentMode: this.props.defaultMode,
      currentTableBackground: this.props.tableBackgroundOptions[0],
      currentSize: 65,
      slideIndex: 0,
      updateCount: 0,
    }
  
    changeLanguage = () => {
      var language = document.getElementById("language-selector").value;
      this.setState({currentLanguage: language});
    }
  
    changeMode = () => {
      var mode = document.getElementById("mode-selector").value;
      this.setState({currentMode: mode});
    }
  
    changePageSize = (pageSizeValue) => {
      this.setState({currentSize: pageSizeValue})
    }
  
    changeTableBackground = () => {
      var tableBackground = document.getElementById("table-background-selector").value;
      this.setState({currentTableBackground: tableBackground});
    }
  
    goToPage = (page) => {
      this.slider.slickGoTo(page);
    }
  
    render() {
      var contents = this.props.compile(this.props.data, this.state)
  
      const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        fade: true,
        centerPadding: "60px",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        lazyLoad: true,
        beforeChange: (current, next) => this.setState({ slideIndex: next })
      };
  
      return(
        <Layout useCustomBackground={this.props.useCustomBackground} menuBarItems={[(<ComicStripToggle state={this.state} goToPage={this.goToPage} tableBackground={this.props.tableBackgroundBase + "-" + this.state.currentTableBackground.toLowerCase().replace(/ /g, "-")}>{contents.pages}</ComicStripToggle>), (<SettingsWindow state={this.state} languageOptions={contents.languageOptions} modeOptions={contents.modeOptions} tableBackgroundOptions={this.props.tableBackgroundOptions} changeLanguage={this.changeLanguage} changeMode={this.changeMode} changeTableBackground={this.changeTableBackground} changePageSize={this.changePageSize} />), (<DownloadButton downloadLink={contents.metadataItems.childMarkdownRemark.frontmatter.download_link} />)]} showMenuBar={true}>
          <SEO title={contents.metadataItems.childMarkdownRemark.frontmatter.title} />
          <div className={this.props.tableBackgroundBase + "-" + this.state.currentTableBackground.toLowerCase().replace(/ /g, "-")} style={{textAlign: 'center'}}>
            <div className={`m-3 p-3 comic-strip-main`} style={{textAlign: 'center', color: "#017BFF"}}>
            <section className="my-3" style={{textAlign: "center"}}>
              <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{contents.metadataItems.childMarkdownRemark.frontmatter.title}</ResponsiveHeader>
            </section>
            <Container style={{maxWidth: this.state.currentSize.toString() + "%"}}>
            <section lang={contents.currentLanguageCode} className="book-main mb-3">
              <Slider ref={slider => (this.slider = slider)} {...settings}>
                {contents.pages}
              </Slider>
            </section>
            </Container>
            </div>
          </div>
        </Layout>
      )
    }
}