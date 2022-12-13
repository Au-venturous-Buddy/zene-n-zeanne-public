import React, { useState } from "react"
import Layout from "../components/layout"
import { Accordion, Button, Modal, Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap"
import {BsCaretRightFill} from "react-icons/bs";
import {GetCharacterInfo} from "../hooks/get-character-info";
import {GetCharacterProfiles} from "../hooks/get-character-profiles";
import {GetCharacterPhotos} from "../hooks/get-character-photos";
import BackButton from "../components/back-button";
import CloseButton from "../components/close-button";
import SEO from "../components/seo"
import ResponsiveHeader from "../components/responsive-header";
import SearchBox from "../components/search-box";
import MenuWindow from "../components/menu-window";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ResponsiveSize from "../hooks/responsive-size";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

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
        <section className="mt-3">
          <article lang="en" dir="ltr" className="px-4" style={{textAlign: "justify"}} dangerouslySetInnerHTML={{ __html: info.html }}></article>
        </section>
      )
    }

    var shortDescription = (<section hidden={true}></section>);
    if(!(info.frontmatter.short_description === null)) {
      shortDescription = (
        <section className="character-short-desc my-2">
          <ResponsiveHeader level={3} maxSize={1} minScreenSize={500}>{`"${info.frontmatter.short_description}"`}</ResponsiveHeader>
        </section>
      )
    }

    var displayProfilePic = (
      <GatsbyImage
        className="d-block w-100 profile-img"
        image={getImage(profilePic)}
        alt={info.frontmatter.name}
        aria-hidden={true}
      />
    )

    return(
    <>
    <Button style={{maxWidth: "30%"}} aria-label={info.frontmatter.name} className="view profile-button m-3" onClick={handleShow}>
      <div aria-hidden={true} className="profile-button-contents">
        {displayProfilePic}
        <div className="m-2 bold-text profile-caption">
          <ResponsiveHeader level={4} maxSize={0.9} minScreenSize={330}>{info.frontmatter.name}</ResponsiveHeader>
        </div>
      </div>
    </Button>
    <Modal show={show} onHide={handleClose} centered scrollable fullscreen={true}>
        <Modal.Header className="justify-content-center bold-text">
          <Modal.Title>
            <div style={{color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Character Info</ResponsiveHeader>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-0">
          <div className="table-background">
          <div className={`py-3 m-3 character-info-main-version-${info.frontmatter.version}`}>
          <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{info.frontmatter.name}</ResponsiveHeader>
          <div className="character-photo-desc">
            <GatsbyImage
              className="d-block w-100 character-photo"
              image={getImage(photo)}
              alt={info.frontmatter.name}
              aria-hidden={true}
            />
            {shortDescription}
          </div>
          {writeUp}
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <BackButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
    )
}

function SelectVersionButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 250 }}
      overlay={helpTooltip("Select Version")}
    >
    <Button aria-label={`Select Version - Version ${props.currentVersion}`} onClick={handleShow} style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}}>
      <div aria-hidden={true}>
        Version {props.currentVersion} <BsCaretRightFill />
      </div>
    </Button>
    </OverlayTrigger>
    <Modal size="sm" show={show} onHide={handleClose} centered scrollable>
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
              Object.keys(props.characterItems).map((currentValue, index) => (
                <Row className="my-3 mx-1" style={{justifyContent: "center"}} key={index}>
                  <VersionSelector version={currentValue} stateChangeFunction={props.changeVersion} closeFunction={handleClose} />
                </Row>
              ))
            }
          </Container>
        </section>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={handleClose} />
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default function Characters() {
  const [currentVersion, setCurrentVersion] = useState(4);

  const changeVersion = (version) => setCurrentVersion(version)

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
      <li style={{display: "inline"}} className="justify-content-center m-3" key={i}>
        <CharacterProfile info={personalInfo} profilePic={personalProfilePic} photo={personalPhoto} />
      </li>
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

  var charactersCurrentVersion = characterGroups[currentVersion];

  return(
    <Layout menuBarItems={[(<MenuWindow pageID="characters" />), (<SelectVersionButton currentVersion={currentVersion} characterItems={characterGroups} changeVersion={changeVersion} />), (<SearchBox />)]} showMenuBar={true}>
    <SEO title="Characters" description="Characters - Meet the Characters of Zene 'N Zeanne" />
    <section className="py-3" style={{textAlign: "center"}}>
      <div className="table-background">
        <section className={`py-3 m-3 character-profiles-main-version-${currentVersion}`}>
          <Accordion className="mb-3" flush>
            {
              Object.keys(charactersCurrentVersion).map((currentValue, index) => (
                <div className="m-3" key={index}>
                  <Accordion.Item eventKey={currentValue}>
                    <Accordion.Header className="hover-shadow-card bold-text justify-content-center" style={{textAlign: "center"}}>
                      <ResponsiveHeader level={3} maxSize={1.5} minScreenSize={500}>{currentValue}</ResponsiveHeader>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul className="character-profiles">
                        {charactersCurrentVersion[currentValue]}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              ))
            }
          </Accordion>
        </section>
      </div>
    </section>
    </Layout>
  )
}
