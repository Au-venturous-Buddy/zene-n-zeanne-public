import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Modal, Form } from "react-bootstrap";
import SettingsButton from "../components/settings-button";
import CloseButton from "../components/close-button";
import ResponsiveSize from "../hooks/responsive-size";
import ResponsiveHeader from "../components/responsive-header";

class WordpressMultilingual extends React.Component {
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

  render() {
    var metadataItems = null;
    var content = null;
    var languages = new Set();
    var modes = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node
      if(nodeItem.relativeDirectory.includes("modes") && nodeItem.ext === ".md") {
        languages.add(nodeItem.name)
        modes.add(nodeItem.childMarkdownRemark.frontmatter.mode_name)
        if(nodeItem.name === this.state.currentLanguage && nodeItem.childMarkdownRemark.frontmatter.mode_name === this.state.currentMode) {
          content = nodeItem.childMarkdownRemark.html
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
    modes.forEach((mode) => {
      modeOptions.push(<option key={mode}>{mode}</option>)
    })

    var displayContent = (<article className="m-3 wordpress-body" style={{textAlign: "center"}}>This article does not exist yet!</article>)
    if(!(content === null)) {
      displayContent = (
        <article className="m-3 wordpress-body" style={{textAlign: "justify"}} dangerouslySetInnerHTML={{ __html: content }}></article>
      )
    }

    return(
      <>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <div>
        <div style={{textAlign: "center", color: "white"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>
            {metadataItems.childMarkdownRemark.frontmatter.title}
          </ResponsiveHeader>
        </div>
        <div className="mt-3">
          <SettingsButton fontButtonSize={this.props.fontButtonSize} handleShow={this.handleShow} />
        </div>
        {displayContent}
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
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                Language
              </ResponsiveHeader>
            </div>
            <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="language-selector" as="select" onChange={this.changeLanguage} value={this.state.currentLanguage}>
              {languageOptions}
            </Form.Control>
          </section>
          <section className="mb-3">
              <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
                <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                  Mode
                </ResponsiveHeader>
              </div>
            <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="mode-selector" as="select" onChange={this.changeMode} value={this.state.currentMode}>
              {modeOptions}
            </Form.Control>
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

export default function Wordpress({ data }) {
  return (
    <Layout>
      <WordpressMultilingual data={data} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} />
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
          html
          frontmatter {
            title
            mode_name
            category
          }
        }
      }
    }
  }
}
`