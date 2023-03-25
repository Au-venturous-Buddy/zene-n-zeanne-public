import React, {useState} from "react";
import Layout from "../../../components/layout"
import { graphql } from "gatsby";
import { Container, Button, ButtonGroup, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import SettingsButton from "../../../components/settings-button";
import ResponsiveSize from "../../../hooks/responsive-size";
import SEO from "../../../components/seo";
import ResponsiveHeader from "../../../components/responsive-header";
import Slider from "react-slick";
import NextArrow from "../../../components/next-arrow";
import PrevArrow from "../../../components/prev-arrow";
import CloseButton from "../../../components/close-button";
import { textVide } from 'text-vide';
import RangeSlider from 'react-bootstrap-range-slider';

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

function SlideThumbnail({page, currentIndex, index, goToPage, closeFunction}) {
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
      <Button aria-label={`Page ${index + 1}`} className={`p-2 view img-button comic-strip-page-thumbnail ${(currentIndex === index) ? "comic-strip-page-thumbnail-current" : ""}`} onClick={changeSlide}>
        <div aria-hidden={true}>
        <img
          className="d-block w-100 comic-strip-page"
          src={page.publicURL}
          alt={page.name}
          aria-hidden={true}
        />
        <div className="mt-2 comic-strip-page-number">
          <ResponsiveHeader level={2}>{index + 1}</ResponsiveHeader>
        </div>
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

function CaptionSlideshowToggle(props) {  
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
        <div className={"my-2 table-background-" + props.state.currentTableBackground.toLowerCase().replace(/ /g, "-")}>
        <ol>
          {props.children.map((currentValue, index) => (
            <li key={index}>
              <SlideThumbnail page={currentValue} currentIndex={props.state.slideIndex} index={index} goToPage={props.goToPage} closeFunction={handleClose} />
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

function generatePages(images, captions, callAt) {
  var pages = [];
  var dialogue = [];
  var pageNum = 0;
  var maxPageNum = Math.max(parseInt(images[images.length - 1].name), parseInt(captions[captions.length - 1].name));
  var currentScene = null;
  var currentDialogue = "";
  var nextDialogueID = 0;
  var nextSceneID = 0;
  var callAtIndex = 0;
  while(pageNum <= maxPageNum && callAtIndex < callAt.length) {
    if(nextDialogueID < captions.length && parseInt(captions[nextDialogueID].name) === pageNum) {
      currentDialogue = captions[nextDialogueID].childMarkdownRemark.html;
      nextDialogueID++;
    }

    if(nextSceneID < images.length && parseInt(images[nextSceneID].name) === pageNum) {
      currentScene = images[nextSceneID];
      nextSceneID++;
    }

    if(callAt[callAtIndex] === pageNum) {
      pages.push(currentScene)
      dialogue.push(currentDialogue) 
      callAtIndex++;
    }

    pageNum++;
  }

  return {"pages": pages, "dialogue": dialogue};
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
            {['Zene', 'Zeanne', 'Classroom Table'].map((value) => (<option key={value}>{value}</option>))}
          </Form.Select>
        </section>
        <section className="mb-3">
          <div className='align-items-center pb-3' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{`Page Size`}</ResponsiveHeader>
          </div>
          <RangeSlider className="hover-shadow mt-3" variant="dark" tooltipLabel={currentValue => `${currentValue}%`} tooltipPlacement='top' tooltip='on' onChange={changeEvent => props.changePageSize(changeEvent.target.value)} value={props.state.currentSize} />
        </section>
        <section className="mb-3">
          <div className='align-items-center pb-3' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{`Bionic Reading Level`}</ResponsiveHeader>
          </div>
          <RangeSlider className="hover-shadow mt-3" variant="dark" tooltipPlacement='top' tooltip='on' onChange={changeEvent => props.changeBionicReadingFixation(changeEvent.target.value)} min={0} max={3} value={props.state.currentBionicReadingFixationIndex} />
        </section>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={handleClose} />
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default class CaptionSlideshow extends React.Component {
  state = {
    currentLanguage: 'English',
    currentMode: 'Original',
    currentTableBackground: "Zene",
    currentSize: 65,
    slideIndex: 0,
    updateCount: 0,
    currentBionicReadingFixationIndex: 0,
    currentBionicReadingFixation: 0
  }

  changeLanguage = () => {
    var language = document.getElementById("language-selector").value;
    this.setState({currentLanguage: language});
  }

  changeMode = () => {
    var mode = document.getElementById("mode-selector").value;
    this.setState({currentMode: mode});
  }

  changeTableBackground = () => {
    var tableBackground = document.getElementById("table-background-selector").value;
    this.setState({currentTableBackground: tableBackground});
  }

  changePageSize = (pageSizeValue) => {
    this.setState({currentSize: pageSizeValue})
  }

  goToPage = (page) => {
    this.slider.slickGoTo(page);
  }

  changeBionicReadingFixation = (bionicReadingFixationRaw) => {
    switch(parseInt(bionicReadingFixationRaw)) {
      case 1:
        this.setState({currentBionicReadingFixation: 5});
        break;
      case 2:
        this.setState({currentBionicReadingFixation: 4});
        break;
      case 3:
        this.setState({currentBionicReadingFixation: 1});
        break;
      default:
        this.setState({currentBionicReadingFixation: 0});
    }

    this.setState({currentBionicReadingFixationIndex: parseInt(bionicReadingFixationRaw)});
  }

  render() {
    var metadataItems = null;
    var images = [];
    var captions = [];
    var currentLanguageCode = `en`;
    var languages = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node
      if(nodeItem.relativeDirectory.includes("images") && nodeItem.ext === ".png") {
        images.push(nodeItem);
      }
      else if(nodeItem.ext === ".md" && nodeItem.relativeDirectory.includes("captions")) {
        languages.add(nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1])
        if(nodeItem.relativeDirectory.includes("captions/" + this.state.currentLanguage.split("-")[0])) {
          if(nodeItem.name === "image-alt") {
            currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
          }
          else {
            captions.push(nodeItem);
          }
        }
      }
      else if(nodeItem.ext === ".md" && nodeItem.name === "index") {
        metadataItems = nodeItem;
      }
    }

    var languageOptions = []
    languages.forEach((value) => {
      languageOptions.push(<option key={value}>{value}</option>)
    })

    var modeOptions = []
    var callAt = []
    metadataItems.childMarkdownRemark.frontmatter.modes.forEach((mode) => {
      modeOptions.push(<option key={mode.mode_name}>{mode.mode_name}</option>)
      if(mode.mode_name === this.state.currentMode) {
        callAt = mode.call_at;
      }
    })

    var pagesDialogue = generatePages(images, captions, callAt);

    const settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      fade: true,
      centerPadding: "60px",
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };

    return(
    <Layout menuBarItems={[(<CaptionSlideshowToggle state={this.state} goToPage={this.goToPage}>{pagesDialogue["pages"]}</CaptionSlideshowToggle>), (<SettingsWindow state={this.state} languageOptions={languageOptions} modeOptions={modeOptions} changeLanguage={this.changeLanguage} changeMode={this.changeMode} changePageSize={this.changePageSize} changeTableBackground={this.changeTableBackground} changeBionicReadingFixation={this.changeBionicReadingFixation} />)]} showMenuBar={true}>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <div className={"table-background-" + this.state.currentTableBackground.toLowerCase().replace(/ /g, "-")}>
      <div className="m-3 p-3 comic-strip-main-caption-slideshow" style={{textAlign: 'center', color: "#017BFF"}}>
        <section className="my-3" style={{textAlign: "center"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{metadataItems.childMarkdownRemark.frontmatter.title}</ResponsiveHeader>
        </section>
        <Container className="my-5" style={{width: this.state.currentSize.toString() + "%"}}>
        <section className="book-main">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {pagesDialogue["pages"].map((page, index) => (
              <div className="view comic-strip-page">
                <img
                  className="d-block w-100"
                  src={page.publicURL}
                  alt={page.name}
                />
              </div>
            ))}
          </Slider>
        </section>
        <section lang={currentLanguageCode} className='mt-3' style={{textAlign: 'justify'}}>
          <p style={{color: "#017BFF"}} dangerouslySetInnerHTML={{__html: (this.state.currentBionicReadingFixation > 0) ? textVide(pagesDialogue["dialogue"][this.state.slideIndex], { sep: ['<span style="color: #A35BFF">', '</span>'], fixationPoint: this.state.currentBionicReadingFixation}) : pagesDialogue["dialogue"][this.state.slideIndex]}}>
          </p>
        </section>
        </Container>
      </div>
      </div>
    </Layout>
    )
  }
}

export const query = graphql`
  query($pagePath: String!) {
    allFile(
      filter: {relativeDirectory: {regex: $pagePath}}
      sort: {relativePath: ASC}
    ) {
      edges {
        node {
          name
          ext
          relativeDirectory
          publicURL
          childMarkdownRemark {
            frontmatter {
              title
              language_code
              modes {
                mode_name
                call_at
              }
            }
            html
          }
        }
      }
    }
  }
`