import React, {useState} from "react"
import { graphql } from "gatsby"
import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import { Form, Offcanvas } from "react-bootstrap";
import SettingsButton from "../../../components/settings-button";
import ResponsiveSize from "../../../hooks/responsive-size";
import ResponsiveHeader from "../../../components/responsive-header";
import { textVide } from 'text-vide';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import RangeSlider from 'react-bootstrap-range-slider';

function SettingsWindow(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <SettingsButton fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} handleShow={handleShow} />
    <Offcanvas show={show} onHide={handleClose} placement="bottom" scroll={true}>
        <Offcanvas.Header className="justify-content-center">
          <Offcanvas.Title style={{color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Settings</ResponsiveHeader>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <section className="mb-3">
            <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                Language and Dialogue
              </ResponsiveHeader>
            </div>
            <Form.Select style={{color: "#017BFF"}} className="hover-shadow" id="language-selector" onChange={props.changeLanguage} value={props.state.currentLanguage}>
              {props.languageOptions}
            </Form.Select>
          </section>
          <section className="mb-3">
              <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
                <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                  Mode
                </ResponsiveHeader>
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
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{`Bionic Reading Level`}</ResponsiveHeader>
          </div>
          <RangeSlider className="hover-shadow mt-3" variant="dark" tooltipPlacement='top' tooltip='on' onChange={changeEvent => props.changeBionicReadingFixation(changeEvent.target.value)} min={0} max={3} value={props.state.currentBionicReadingFixationIndex} />
        </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default class WordpressBlogv2022_3 extends React.Component {
  state = {
    currentLanguage: 'English',
    currentMode: 'Original',
    currentTableBackground: "Zene",
    currentSize: 65,
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
    var images = {};
    var texts = {};
    var imagesAlt = {};
    var currentLanguageCode = `en`;
    var languages = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node
      var parentFolder = nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1]
      if(nodeItem.relativeDirectory.includes("images") && nodeItem.ext === ".png") {
        if(!(parentFolder in images)) {
          images[parentFolder] = [];
        }
        images[parentFolder].push(nodeItem);
      }
      else if(nodeItem.relativeDirectory.includes("text") && nodeItem.ext === ".md" && nodeItem.name === "lang-info") {
        languages.add(parentFolder)
        if(nodeItem.relativeDirectory.includes("text/" + this.state.currentLanguage)) {
          currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
        }
      }
      else if(nodeItem.relativeDirectory.includes("text") && nodeItem.ext === ".md" && nodeItem.name === "image-alt" && nodeItem.relativeDirectory.includes("text/" + this.state.currentLanguage)) {
        if(!(parentFolder in imagesAlt)) {
          imagesAlt[parentFolder] = [];
        }
        imagesAlt[parentFolder] = nodeItem.childMarkdownRemark.frontmatter.image_alt
      }
      else if(nodeItem.relativeDirectory.includes("text") && nodeItem.ext === ".md") {
        if(nodeItem.relativeDirectory.includes("text/" + this.state.currentLanguage.split("-")[0])) {
          if(!(parentFolder in texts)) {
            texts[parentFolder] = [];
          }
          texts[parentFolder].push(nodeItem);
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

    var sections = [];
    callAt.forEach((sceneID) => {
      var subImages = images[sceneID]
      var subTexts = texts[sceneID.split("-")[0]]
      var subImagesAlt = imagesAlt[sceneID.split("-")[0]]

      var sectionNum = 0;
      var maxSectionNum = Math.max(parseInt(subImages[subImages.length - 1].name), parseInt(subTexts[subTexts.length - 1].name));
      var currentImage = (<section aria-hidden={true}></section>);
      var currentText = null;
      var nextTextID = 0;
      var nextImageID = 0;

      while(sectionNum <= maxSectionNum) {
        if(nextTextID < subTexts.length && parseInt(subTexts[nextTextID].name) === sectionNum) {
          var currentTextHTML = subTexts[nextTextID].childMarkdownRemark.html;
          if(this.state.currentBionicReadingFixation > 0) {
            if(metadataItems.childMarkdownRemark.frontmatter.version === 4) {
              currentTextHTML = textVide(currentTextHTML, { fixationPoint: this.state.currentBionicReadingFixation });
            }
            else {
              const anchorStartTagRegex = /<a.*">/gi
              const anchorEndTagRegex = /<\/a>/gi
              console.log(currentTextHTML)
              currentTextHTML = currentTextHTML.replace(anchorStartTagRegex, "")
              currentTextHTML = currentTextHTML.replace(anchorEndTagRegex, "")
              currentTextHTML = textVide(currentTextHTML, { sep: ['<span style="color: #A35BFF">', '</span>'], fixationPoint: (![2, 3].includes(this.state.currentBionicReadingFixation)) ? this.state.currentBionicReadingFixation : 1 });
            }
          }
          currentText = (<section className="my-2" dangerouslySetInnerHTML={{ __html: currentTextHTML }}></section>);
          nextTextID++;
        }
  
        if(nextImageID < subImages.length && parseInt(subImages[nextImageID].name) === sectionNum) {
          currentImage = (
            <section className="my-2 center-image">
              <GatsbyImage style={{maxWidth: "60%"}} alt={subImagesAlt[sectionNum]} image={getImage(subImages[nextImageID])} />
            </section>
          );
          nextImageID++;
        }
  
        sections.push(currentImage)
        sections.push(currentText)
        sectionNum++;
      }
    })

    return(
      <Layout menuBarItems={[(<SettingsWindow state={this.state} languageOptions={languageOptions} modeOptions={modeOptions} changeLanguage={this.changeLanguage} changeMode={this.changeMode} changeTableBackground={this.changeTableBackground} changeBionicReadingFixation={this.changeBionicReadingFixation} />)]} showMenuBar={true}>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <section className={"table-background-" + this.state.currentTableBackground.toLowerCase().replace(/ /g, "-")}>
        <div className={`p-3 ${metadataItems.childMarkdownRemark.frontmatter.format}`}>
        <div style={{textAlign: "center"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>
            {metadataItems.childMarkdownRemark.frontmatter.title}
          </ResponsiveHeader>
        </div>
        <article lang={currentLanguageCode} className={`m-3`} style={{textAlign: "justify"}}>
          {sections}
        </article>
        </div>
      </section>
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
          html
          frontmatter {
            title
            image_alt
            language_code
            modes_v2 {
              mode_name
              scenes
            }
            format
            version
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