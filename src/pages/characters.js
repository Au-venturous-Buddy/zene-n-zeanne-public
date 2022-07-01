import React, { useState } from "react"
import Layout from "../components/layout"
import { Accordion, Card, Button, Modal, Container, Row } from "react-bootstrap"
import {BsCaretDownFill} from "react-icons/bs";
import {GetCharacterInfo} from "../hooks/get-character-info";
import {GetCharacterProfiles} from "../hooks/get-character-profiles";
import {GetCharacterPhotos} from "../hooks/get-character-photos";
import {GridList, GridListTile} from '@material-ui/core';
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import CloseButton from "../components/close-button";
import SEO from "../components/seo"
import ResponsiveHeader from "../components/responsive-header";
import SearchBox from "../components/search-box";
import MenuWindow from "../components/menu-window";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function VersionSelector({version, stateChangeFunction, closeFunction}) {
  const changeState = () => {
    stateChangeFunction(version)
    closeFunction()
  }

  return(
    <Button style={{border: `none`, backgroundColor: "white", color: "#017BFF"}} onClick={changeState}>
      Version {version}
    </Button>
  )
}

function CharacterProfile({info, profilePic, photo}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    var writeUp = (<section hidden={true}></section>);
    if(!(info.html === "")) {
      writeUp = (
        <section>
          <article lang="en" dir="ltr" className="px-4" style={{textAlign: "justify", color: "#017BFF"}} dangerouslySetInnerHTML={{ __html: info.html }}></article>
        </section>
      )
    }

    var shortDescription = (<section hidden={true}></section>);
    if(!(info.frontmatter.short_description === null)) {
      shortDescription = (
        <section>
          <div style={{color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{`"${info.frontmatter.short_description}"`}</ResponsiveHeader>
          </div>
        </section>
      )
    }

    var displayProfilePic = (
      <GatsbyImage
        className="d-block w-100"
        style={{border: "4px solid #017BFF", borderRadius: "50%"}}
        image={getImage(profilePic)}
        alt={info.frontmatter.name}
        aria-hidden={true}
      />
    )

    return(
    <>
    <Button aria-label={info.frontmatter.name} className="view profile-button p-3 m-3" onClick={handleShow} style={{color: "#2d93d1"}}>
      <div aria-hidden={true}>
        {displayProfilePic}
        <div className="m-1 bold-text profile-caption">
          <ResponsiveHeader level={4} maxSize={0.9} minScreenSize={330}>{info.frontmatter.name}</ResponsiveHeader>
        </div>
      </div>
    </Button>
    <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header className="justify-content-center bold-text">
          <Modal.Title>
            <div style={{color: "#017BFF"}}>
              <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>{info.frontmatter.name}</ResponsiveHeader>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 230,
              paddingTop: `5%`,
              paddingBottom: `5%`
            }}
          >
            <GatsbyImage
              className="d-block w-100"
              image={getImage(photo)}
              alt={info.frontmatter.name}
              aria-hidden={true}
            />
          </div>
          {shortDescription}
          {writeUp}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
    )
}

function CharactersList(props) {
  return(
    <GridList cellHeight="auto" spacing={5} cols={ResponsiveGridColumns(4, [880, 750, 500])}>
      {props.children}
    </GridList>
  )
}

class DisplayCharacters extends React.Component {
  state = {
    currentVersion: 4,
    show: false
  };

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })
  
  changeVersion = (version) => {
    this.setState({currentVersion: version});
  }

  render() {
    var charactersCurrentVersion = this.props.characterItems[this.state.currentVersion];

    return(
      <>
      <section className="py-3 mx-3" style={{textAlign: "center"}}>
        <Button aria-label={`Select Version - Version ${this.state.currentVersion}`} onClick={this.handleShow} style={{border: `none`, color: "white", backgroundColor: "rgba(0, 0, 0, 0)", fontSize: this.props.headerSize}}>
          <div aria-hidden={true}>
            <ResponsiveHeader level={2} maxSize={2} minScreenSize={800}>
              Version {this.state.currentVersion} <BsCaretDownFill />
            </ResponsiveHeader>
          </div>
        </Button>
        <section className="py-3 mx-3">
          <Accordion className="mb-3">
            {
              Object.keys(charactersCurrentVersion).map((currentValue, index) => (
                <div className="my-3" key={index}>
                  <Card>
                    <Card.Header className="hover-shadow-card bold-text accordion-header" style={{textAlign: "center"}}>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey={currentValue}>
                        <ResponsiveHeader level={3} maxSize={1.5} minScreenSize={500}>{currentValue}</ResponsiveHeader>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={currentValue}>
                      <Card.Body>
                        <CharactersList>
                          {charactersCurrentVersion[currentValue]}
                        </CharactersList>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </div>
              ))
            }
          </Accordion>
        </section>
      </section>
      <Modal size="sm" show={this.state.show} onHide={this.handleClose} centered scrollable>
        <Modal.Header className="justify-content-center bold-text">
          <Modal.Title>
            <div style={{color: "#017BFF"}}>
              <ResponsiveHeader level={1} maxSize={1.5} minScreenSize={500}>Select Version</ResponsiveHeader>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Container>
                {
                  Object.keys(this.props.characterItems).map((currentValue, index) => (
                    <Row className="my-3 mx-1" style={{justifyContent: "center"}} key={index}>
                      <VersionSelector version={currentValue} stateChangeFunction={this.changeVersion} closeFunction={this.handleClose} />
                    </Row>
                  ))
                }
              </Container>
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

export default function Characters() {
  const characterInfo = GetCharacterInfo();
  const characterProfilePics = GetCharacterProfiles();
  const characterPhotos = GetCharacterPhotos();

  var characterGroups = {};
  var charactersSearch = [];
  for(var i = 0; i < characterInfo.allFile.edges.length; i++) {
    var personalInfo = characterInfo.allFile.edges[i].node.childMarkdownRemark;
    var personalProfilePic = characterProfilePics.allFile.edges[i].node;
    var personalPhoto = characterPhotos.allFile.edges[i].node;

    var personalProfile = (
      <GridListTile key={i}>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 230,
            paddingTop: `5%`,
            paddingBottom: `5%`
          }}
        >
          <CharacterProfile info={personalInfo} profilePic={personalProfilePic} photo={personalPhoto} />
        </div>
      </GridListTile>
    )

    if(!(personalInfo.frontmatter.version in characterGroups)) {
      characterGroups[personalInfo.frontmatter.version] = {}
    }

    personalInfo.frontmatter.character_groups.forEach((characterGroup, index) => {
      if(!(characterGroup in characterGroups[personalInfo.frontmatter.version])) {
        characterGroups[personalInfo.frontmatter.version][characterGroup] = []
      }
      characterGroups[personalInfo.frontmatter.version][characterGroup].push(personalProfile)
    })

    charactersSearch.push({display: personalProfile, contents: [personalInfo.frontmatter.name, personalInfo.internal.content]})
  }

  return(
    <Layout menuBarItems={[(<MenuWindow pageID="characters" />), (<SearchBox />)]} showMenuBar={true}>
      <SEO title="Characters" description="Characters - Meet the Characters of Zene 'N Zeanne" />
      <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>Characters</ResponsiveHeader>
      <DisplayCharacters characterItems={characterGroups} />
    </Layout>
  )
}
