import React from "react";
import Layout from "../components/layout"
import ComicStripMain from "../components/comic-strip-main";
import { graphql } from "gatsby";
import { Modal, Button, Form } from "react-bootstrap";
import {FaWindowClose} from "react-icons/fa";
import {AiFillSetting} from "react-icons/ai";
import ResponsiveSize from "../hooks/get-window-dimensions";
import SEO from "../components/seo";

class ComicStripMultiLingual extends React.Component {
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
    var scenes = [];
    var dialogues = [];
    var dialoguesAlt = [];
    var languages = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node
      if(nodeItem.relativeDirectory.includes("SCENES") && nodeItem.ext === ".png") {
        scenes.push(nodeItem);
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".png") {
        languages.add(nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1])
        if(nodeItem.relativeDirectory.includes("DIALOGUES/" + this.state.currentLanguage)) {
          dialogues.push(nodeItem);
        }
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".md" && nodeItem.name === "dialogue-alt" && nodeItem.relativeDirectory.includes("DIALOGUES/" + this.state.currentLanguage)) {
        dialoguesAlt = nodeItem.childMarkdownRemark.frontmatter.dialogue_alt
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
      <ComicStripMain title={metadataItems.childMarkdownRemark.frontmatter.title} scenes={scenes} dialogues={dialogues} dialoguesAlt={dialoguesAlt} omitSlides={omitSlides} size={this.state.currentSize} />
      <Button style={{fontSize: this.props.fontButtonSize}} onClick={this.handleShow}><AiFillSetting /> Settings</Button>
    </div>
    <Modal show={this.state.show} onHide={this.handleClose} centered scrollable>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <p className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            Language
          </p>
          <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="language-selector" as="select" onChange={this.changeLanguage} value={this.state.currentLanguage}>
            {languageOptions}
          </Form.Control>
        </div>
        <div className="mb-3">
          <p className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            Mode
          </p>
          <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="mode-selector" as="select" onChange={this.changeMode} value={this.state.currentMode}>
            {modeOptions}
          </Form.Control>
        </div>
        <div className="mb-3">
          <p className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            Page Size: {this.state.currentSize}%
          </p>
          <Form.Control className="hover-shadow custom-range" id="page-size" type="range" onInput={this.changePageSize} onChange={this.changePageSize} value={this.state.currentSize} />
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={this.handleClose}>
          <FaWindowClose /> Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
    )
  }
}

export default function ComicStrip({data}) {
    return (
      <Layout showMenuBar={false}>
        <ComicStripMultiLingual data={data} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} />
      </Layout>
    )
  }

export const query = graphql`
  query($pagePath: String!) {
    allFile(
      filter: {relativeDirectory: {regex: $pagePath}}
      sort: {fields: name, order: ASC}
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
              modes {
                mode_name
                omit_slides
              }
              dialogue_alt
            }
          }
        }
      }
    }
  }
`