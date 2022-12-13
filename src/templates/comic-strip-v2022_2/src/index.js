import React, {useState} from "react";
import Layout from "../../../components/layout"
import { graphql } from "gatsby";
import { Container, Button, ButtonGroup, Offcanvas, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import SettingsButton from "../../../components/settings-button";
import ResponsiveSize from "../../../hooks/responsive-size";
import SEO from "../../../components/seo";
import ResponsiveHeader from "../../../components/responsive-header";
import Slider from "react-slick";
import NextArrow from "../../../components/next-arrow";
import PrevArrow from "../../../components/prev-arrow";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
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
        paddingTop: `5%`,
        paddingBottom: `5%`
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
      <Offcanvas show={show} onHide={handleClose} placement="end" scroll={true}>
      <Offcanvas.Header className="justify-content-center">
        <Offcanvas.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Toggle Page</ResponsiveHeader>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="px-0">
        <div className="my-2 table-background">
        <ol>
          {props.children.map((currentValue, index) => (
            <li key={index}>
              <SlideThumbnail slide={currentValue} currentIndex={props.state.slideIndex} index={index} goToPage={props.goToPage} closeFunction={handleClose} />
            </li>
          ))}
        </ol>
        </div>
      </Offcanvas.Body>
      </Offcanvas>
      </>
    );
}

class TextLayer extends React.Component {
  render() {
    return(
      <div className="mask flex-center">
        {this.props.children}
      </div>
    )
  }
}

function Page({scene, dialogue, keyID}) {
  var dialogueRender = (
    <div></div>
  )
  if(dialogue) {
    dialogueRender = (
      <GatsbyImage
        className="d-block w-100"
        image={getImage(dialogue)}
        alt={keyID}
      />
    )
  }

  return(
  <div aria-hidden={true} className="view comic-strip-page">
    <GatsbyImage
      className="d-block w-100"
      image={getImage(scene)}
      alt={keyID}
    />
    <TextLayer>
      {dialogueRender}
    </TextLayer>
  </div>
  )
}

function generatePages(scenes, dialogues, dialoguesAlt, callAt) {
  var pages = [];

  callAt.forEach((sceneID) => {
    var subScenes = scenes[sceneID]
    var subDialogues = dialogues[sceneID.split("-")[0]]
    var subDialoguesAlt = dialoguesAlt[sceneID.split("-")[0]]

    var pageNum = 0;
    var maxPageNum = Math.max(parseInt(subScenes[subScenes.length - 1].name), parseInt(subDialogues[subDialogues.length - 1].name));
    var currentScene = null;
    var currentDialogue = null;
    var nextDialogueID = 0;
    var nextSceneID = 0;
    while(pageNum <= maxPageNum) {
      if(nextDialogueID < subDialogues.length && parseInt(subDialogues[nextDialogueID].name) === pageNum) {
        currentDialogue = subDialogues[nextDialogueID];
        nextDialogueID++;
      }
  
      if(nextSceneID < subScenes.length && parseInt(subScenes[nextSceneID].name) === pageNum) {
        currentScene = subScenes[nextSceneID];
        nextSceneID++;
      }
  
      pages.push(
        <div aria-label={subDialoguesAlt[pageNum]} key={pageNum.toString()}>
          <Page scene={currentScene} dialogue={currentDialogue} keyID={pageNum.toString()} />
        </div>
      )
  
      pageNum++;
    }
  })

  return pages;
}

function SettingsWindow(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <SettingsButton fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} handleShow={handleShow} />
      <Offcanvas show={show} onHide={handleClose} placement="bottom" scroll={true}>
      <Offcanvas.Header className="justify-content-center">
        <Offcanvas.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Settings</ResponsiveHeader>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
      </Offcanvas.Body>
    </Offcanvas>
    </>
  )
}

export default class ComicStripMultiLingualv2022_2 extends React.Component {
  state = {
    currentLanguage: 'English',
    currentMode: 'Original',
    currentTableBackground: "Zene",
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
    var metadataItems = null;
    var scenes = {};
    var dialogues = {};
    var dialoguesAlt = {};
    var currentLanguageCode = `en`;
    var languages = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node
      var parentFolder = nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1]
      if(nodeItem.relativeDirectory.includes("SCENES") && nodeItem.ext === ".png") {
        if(!(parentFolder in scenes)) {
          scenes[parentFolder] = [];
        }
        scenes[parentFolder].push(nodeItem);
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".md" && nodeItem.name === "lang-info") {
        languages.add(parentFolder)
        if(nodeItem.relativeDirectory.includes("DIALOGUES/" + this.state.currentLanguage)) {
          currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
        }
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".md" && nodeItem.name === "dialogue-alt" && nodeItem.relativeDirectory.includes("DIALOGUES/" + this.state.currentLanguage)) {
        if(!(parentFolder in dialoguesAlt)) {
          dialoguesAlt[parentFolder] = [];
        }
        dialoguesAlt[parentFolder] = nodeItem.childMarkdownRemark.frontmatter.dialogue_alt
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".png") {
        if(nodeItem.relativeDirectory.includes("DIALOGUES/" + this.state.currentLanguage)) {
          if(!(parentFolder in dialogues)) {
            dialogues[parentFolder] = [];
          }
          dialogues[parentFolder].push(nodeItem);
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
    metadataItems.childMarkdownRemark.frontmatter.modes_v2.forEach((mode) => {
      modeOptions.push(<option key={mode.mode_name}>{mode.mode_name}</option>)
      if(mode.mode_name === this.state.currentMode) {
        callAt = mode.scenes;
      }
    })

    var pages = generatePages(scenes, dialogues, dialoguesAlt, callAt);

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
      <Layout menuBarItems={[(<ComicStripToggle state={this.state} goToPage={this.goToPage}>{pages}</ComicStripToggle>), (<SettingsWindow state={this.state} languageOptions={languageOptions} modeOptions={modeOptions} changeLanguage={this.changeLanguage} changeMode={this.changeMode} changeTableBackground={this.changeTableBackground} changePageSize={this.changePageSize} />)]} showMenuBar={true}>
        <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
        <div className={"table-background-" + this.state.currentTableBackground.toLowerCase().replace(/ /g, "-")} style={{textAlign: 'center'}}>
          <div className="m-3 p-3 comic-strip-main" style={{textAlign: 'center', color: "#017BFF"}}>
          <section className="my-3" style={{textAlign: "center"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{metadataItems.childMarkdownRemark.frontmatter.title}</ResponsiveHeader>
          </section>
          <Container className="my-5" style={{maxWidth: this.state.currentSize.toString() + "%"}}>
          <section lang={currentLanguageCode} className="book-main mb-3">
            <Slider ref={slider => (this.slider = slider)} {...settings}>
              {pages}
            </Slider>
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
          childMarkdownRemark {
            frontmatter {
              title
              modes_v2 {
                mode_name
                scenes
              }
              language_code
              dialogue_alt
            }
          }
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`