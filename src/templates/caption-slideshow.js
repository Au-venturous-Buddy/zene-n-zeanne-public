import React from "react";
import Layout from "../components/layout"
import CaptionSlideshowMain from "../components/caption-slideshow-main";
import { graphql } from "gatsby";
import { Modal, Form } from "react-bootstrap";
import CloseButton from "../components/close-button";
import SettingsButton from "../components/settings-button";
import ResponsiveSize from "../hooks/responsive-size";
import SEO from "../components/seo";
import ResponsiveHeader from "../components/responsive-header";

class CaptionSlideshowMultiLingual extends React.Component {
  state = {
    show: false,
    currentLanguage: 'English',
    currentMode: 'Original',
    currentSize: 65
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  changeLanguage = () => {
    var language = document.getElementById("language-selector").value;
    this.setState({currentLanguage: language});
  }

  changeMode = () => {
    var mode = document.getElementById("mode-selector").value;
    this.setState({currentMode: mode});
  }

  changePageSize = () => {
    var size = document.getElementById("page-size").value;
    this.setState({currentSize: size})
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
        languages.add(nodeItem.name)
        if(nodeItem.name === this.state.currentLanguage) {
          captions = nodeItem.childMarkdownRemark.frontmatter.captions
          currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
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
    var omitSlides = []
    metadataItems.childMarkdownRemark.frontmatter.modes.forEach((mode) => {
      modeOptions.push(<option key={mode.mode_name}>{mode.mode_name}</option>)
      if(mode.mode_name === this.state.currentMode) {
        omitSlides = mode.omit_slides;
      }
    })

    return(
    <>
    <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
    <div style={{textAlign: 'center'}}>
      <CaptionSlideshowMain language={currentLanguageCode} title={metadataItems.childMarkdownRemark.frontmatter.title} images={images} captions={captions} omitSlides={omitSlides} size={this.state.currentSize} />
      <SettingsButton fontButtonSize={this.props.fontButtonSize} handleShow={this.handleShow} />
    </div>
    <Modal show={this.state.show} onHide={this.handleClose} centered scrollable>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Settings</ResponsiveHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Language</ResponsiveHeader>
          </div>
          <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="language-selector" as="select" onChange={this.changeLanguage} value={this.state.currentLanguage}>
            {languageOptions}
          </Form.Control>
        </section>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Mode</ResponsiveHeader>
          </div>
          <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="mode-selector" as="select" onChange={this.changeMode} value={this.state.currentMode}>
            {modeOptions}
          </Form.Control>
        </section>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{`Page Size: ${this.state.currentSize}%`}</ResponsiveHeader>
          </div>
          <Form.Control className="hover-shadow custom-range" id="page-size" type="range" onInput={this.changePageSize} onChange={this.changePageSize} value={this.state.currentSize} />
        </section>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={this.handleClose} />
      </Modal.Footer>
    </Modal>
    </>
    )
  }
}

export default function CaptionSlideshow({data}) {
    return (
      <Layout showMenuBar={false}>
        <CaptionSlideshowMultiLingual data={data} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} />
      </Layout>
    )
  }

export const query = graphql`
  query($pagePath: String!) {
    allFile(
      filter: {relativeDirectory: {regex: $pagePath}}
      sort: {fields: relativePath, order: ASC}
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
              captions
              modes {
                mode_name
                omit_slides
              }
            }
          }
        }
      }
    }
  }
`