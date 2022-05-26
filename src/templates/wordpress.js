import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Modal, Form } from "react-bootstrap";
import SettingsButton from "../components/settings-button";
import CloseButton from "../components/close-button";
import ResponsiveSize from "../hooks/responsive-size";
import ResponsiveHeader from "../components/responsive-header";
import { bionicReading } from 'bionic-reading';

class AuSomeBlogsMultilingual extends React.Component {
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
    var images = [];
    var texts = [];
    var imagesAlt = [];
    var currentLanguageCode = `en`;
    var languages = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node

      if(nodeItem.relativeDirectory.includes("images") && nodeItem.ext === ".png") {
        images.push(nodeItem);
      }
      if(nodeItem.relativeDirectory.includes("text") && nodeItem.ext === ".md") {
        languages.add(nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1])
        if(nodeItem.relativeDirectory.includes("text/" + this.state.currentLanguage.split("-")[0])) {
          if(nodeItem.name === "image-alt") {
            imagesAlt = nodeItem.childMarkdownRemark.frontmatter.image_alt
            currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
          }
          else {
            texts.push(nodeItem);
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
      if(metadataItems.childMarkdownRemark.frontmatter.format === "ausome-blogs") {
        languageOptions.push(<option key={value + "-Bionic"}>{value + "-Bionic"}</option>)
      }
    })

    var modeOptions = []
    var callAt = []
    metadataItems.childMarkdownRemark.frontmatter.modes.forEach((mode) => {
      modeOptions.push(<option key={mode.mode_name}>{mode.mode_name}</option>)
      if(mode.mode_name === this.state.currentMode) {
        callAt = mode.call_at;
      }
    })

    var sections = [];
    var sectionNum = 0;
    var maxSectionNum = Math.max(parseInt(images[images.length - 1].name), parseInt(texts[texts.length - 1].name));
    var currentImage = (<section aria-hidden={true}></section>);
    var currentText = null;
    var nextTextID = 0;
    var nextImageID = 0;
    var callAtIndex = 0;
    while(sectionNum <= maxSectionNum && callAtIndex < callAt.length) {
      if(nextTextID < texts.length && parseInt(texts[nextTextID].name) === sectionNum) {
        var currentTextHTML = texts[nextTextID].childMarkdownRemark.html;
        if(this.state.currentLanguage.includes("-Bionic")) {
          currentTextHTML = bionicReading(currentTextHTML);
        }
        currentText = (<section className="my-2" dangerouslySetInnerHTML={{ __html: currentTextHTML }}></section>);
        nextTextID++;
      }

      if(nextImageID < images.length && parseInt(images[nextImageID].name) === sectionNum) {
        currentImage = (
          <section className="my-2 center-image">
            <img width="60%" alt={imagesAlt[sectionNum]} src={images[nextImageID].publicURL} />
          </section>
        );
        nextImageID++;
      }

      if(sectionNum === callAt[callAtIndex]) {
        sections.push(currentImage)
        sections.push(currentText)
        callAtIndex++;
      }

      sectionNum++;
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
        <article lang={currentLanguageCode} className={`mt-3 p-3 ${metadataItems.childMarkdownRemark.frontmatter.format}`} style={{textAlign: "justify"}}>
          {sections}
        </article>
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

export default function AuSomeBlogs({ data }) {
  return (
    <Layout>
      <AuSomeBlogsMultilingual data={data} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} />
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
            image_alt
            language_code
            modes {
              mode_name
              call_at
            }
            format
          }
        }
      }
    }
  }
}
`