import React, {useState} from "react"
import { graphql } from "gatsby"
import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import { Modal, Form, Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import SettingsButton from "../../../components/settings-button";
import CloseButton from "../../../components/close-button";
import ResponsiveSize from "../../../hooks/responsive-size";
import ResponsiveHeader from "../../../components/responsive-header";
import {BsCircleFill, BsCircle} from "react-icons/bs";
import NextArrow from "../../../components/next-arrow";
import PrevArrow from "../../../components/prev-arrow";
import zeneProfile from "../images/Zene.png";
import zeanneProfile from "../images/Zeanne.png";
import jakeProfile from "../images/Jake.png";
import nikkiProfile from "../images/Nikki.png";
import meganProfile from "../images/Megan.png";
import {FaUndoAlt} from "react-icons/fa";

const helpTooltip = (message, props) => (
    <Tooltip {...props}>
      {message}
    </Tooltip>
  );

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function SettingsWindow(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <SettingsButton fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} handleShow={handleShow} />
    <Modal show={show} onHide={handleClose} centered scrollable>
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
            <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="language-selector" as="select" onChange={props.changeLanguage} value={props.state.currentLanguage}>
              {props.languageOptions}
            </Form.Control>
          </section>
          <section className="mb-3">
            <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                Table Background
              </ResponsiveHeader>
            </div>
            <Form.Select style={{color: "#017BFF"}} className="hover-shadow" id="table-background-selector" onChange={props.changeTableBackground} value={props.currentTableBackground}>
              {props.tableBackgroundOptions.map((value) => (<option key={value}>{value}</option>))}
            </Form.Select>
          </section>
          <section className="mb-3">
            <div className='align-items-center'>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                Other Settings
              </ResponsiveHeader>
            </div>
            <Button style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} onClick={props.clearSelectedItems}><FaUndoAlt /> Clear Answers</Button>
          </section>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  )
}

function MultipleChoiceItem(props) {
    const updateScores = () => {
        props.updateCurrentScoreMatrix(props.score, props.questionID)
        props.updateSelectedItems(props.questionID, props.index)
    }

    return(
        <Button style={{border: `none`, background: `rgba(0, 0, 0, 0)`, color: "#017BFF"}} onClick={updateScores}>
            {props.children}
        </Button>
    )
}

class MultipleChoiceQuestion extends React.Component {
    render() {
        console.log(this.props.currentItem)
        return(
            <section>
                <p dangerouslySetInnerHTML={{ __html: this.props.question.html }}></p>
                <ul style={{textAlign: "center"}}>
                {this.props.question.frontmatter.choices.map((value, index) => (
                    (index === this.props.currentItem) ?
                    (<li><MultipleChoiceItem totalQuestions={this.props.totalQuestions} overallState={this.props.overallState} currentChoiceState={this.state} score={this.props.scores[index]} questionID={this.props.questionID} index={index} updateCurrentScoreMatrix={this.props.updateCurrentScoreMatrix} updateSelectedItems={this.props.updateSelectedItems}><BsCircleFill /> {value}</MultipleChoiceItem></li>) :
                    (<li><MultipleChoiceItem totalQuestions={this.props.totalQuestions} overallState={this.props.overallState} currentChoiceState={this.state} score={this.props.scores[index]} questionID={this.props.questionID} index={index} updateCurrentScoreMatrix={this.props.updateCurrentScoreMatrix} updateSelectedItems={this.props.updateSelectedItems}><BsCircle /> {value}</MultipleChoiceItem></li>)
                ))}
                </ul>
            </section>
        )
    }
}

function PreviousButton({goToQuestion, questionIndex, numQuestions}) {
    const previousSlide = () => {
      goToQuestion(questionIndex, (questionIndex > 0) ? (questionIndex - 1) : (numQuestions - 1));
    }
    
    return(
      <PrevArrow onClick={previousSlide} />
    )
  }
  
function NextButton({goToQuestion, questionIndex, numQuestions}) {
    const nextSlide = () => {
        goToQuestion(questionIndex, (questionIndex + 1) % numQuestions);
    }
    
    return(
      <NextArrow onClick={nextSlide} />
    )
}

function QuestionThumbnail({question, answer, questionIndex, index, goToQuestion, closeFunction}) {
    const changeQuestion = () => {
      goToQuestion(questionIndex, index)
      closeFunction()
    }
  
    return(
      <Button className="m-3" aria-label={`Question ${index + 1}: ${question.internal.content} (${(answer > -1) ? (question.frontmatter.choices[answer]) : "No Answer"})`} onClick={changeQuestion}>
          {`${index + 1}. ${question.internal.content} (${(answer > -1) ? (question.frontmatter.choices[answer]) : "No Answer"})`}
      </Button>
    )
  }

function QuestionToggle(props) { 
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <ButtonGroup aria-label="Question Navigator">
          <PreviousButton goToQuestion={props.goToQuestion} questionIndex={props.state.currentQuestion} numQuestions={props.allQuestions.length} />
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            overlay={helpTooltip("Toggle Question")}
          >
            <Button aria-label={`Toggle Question - Question ${props.state.currentQuestion + 1} of ${props.allQuestions.length}`} style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} onClick={handleShow}>
              <span aria-hidden={true}>{props.state.currentQuestion + 1} of {props.allQuestions.length}</span>
            </Button>
          </OverlayTrigger>
          <NextButton goToQuestion={props.goToQuestion} questionIndex={props.state.currentQuestion} numQuestions={props.allQuestions.length} />
        </ButtonGroup>
        <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Toggle Question</ResponsiveHeader>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            {props.state.shuffledQuestionIDs.map((questionID, index) => (
              <li key={index}>
                <QuestionThumbnail question={props.allQuestions[questionID]} answer={props.state.selectedItems[questionID]} questionIndex={props.state.currentQuestion} index={index} goToQuestion={props.goToQuestion} closeFunction={handleClose} />
              </li>
            ))}
          </ol>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
        </Modal>
        </>
      );
}

function ShowOutcome({state, outcomes, restartTest}) { 
    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false)
      restartTest()
    }

    var overallScore = []
    outcomes.forEach((item) => {
        overallScore.push(0)
    })

    Object.keys(state.currentScoreMatrix).forEach((key) => {
        for(var i = 0; i < state.currentScoreMatrix[key].length; i++) {
            overallScore[i] = overallScore[i] + state.currentScoreMatrix[key][i]
        }
    })

    const allProfiles = {
      "Zene": zeneProfile,
      "Zeanne": zeanneProfile,
      "Jake": jakeProfile,
      "Nikki": nikkiProfile,
      "Megan": meganProfile
    }
  
    return (
      <>
        <Button disabled={Object.values(state.selectedItems).includes(-1)} aria-label="Submit" style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} onClick={handleShow}>
            Submit
        </Button>
        <Modal show={show} backdrop="static" centered scrollable fullscreen>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Here's your result:</ResponsiveHeader>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-0">
          <section className={"justify-content-center mb-2 table-background-" + state.currentTableBackground.toLowerCase().replace(/ /g, "-")} style={{textAlign: "justify"}}>
          <div className="miscellaneous-page justify-content-center p-3">
            <ul className="justify-content-center">
              {
                outcomes.map((item, index) => (
                  <li style={{textAlign: "center"}} className="my-2">
                    <div className="character-photo-desc my-3">
                      <img style={{maxWidth: "90%"}} className="character-photo" src={allProfiles[item.outcome]} alt={item.outcome} />
                    </div>
                    <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{item.outcome}</ResponsiveHeader>
                    <p className={"m-2 p-2" + ((overallScore[index] === Math.max(...overallScore)) ? " high-score-character" : "")}>{overallScore[index]} Point(s)</p>
                  </li>
                ))
              }
            </ul>
            <section className="justify-content-center mb-2" style={{textAlign: "justify"}}>
              <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>What it Means:</ResponsiveHeader>
              {outcomes.map((item, index) => (
                <p key={index} style={{textAlign: "justify"}} hidden={!(overallScore[index] === Math.max(...overallScore))} className="my-2">
                  {item.interpretation}
                </p>
              ))}
            </section>
          </div>
          </section>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} onClick={handleClose}>Restart Quiz</Button>
        </Modal.Footer>
        </Modal>
        </>
      );
}

export default class Quiz extends React.Component {
  state = {
    currentLanguage: 'English',
    currentTableBackground: 'Zene',
    currentQuestion: 0,
    currentScoreMatrix: {},
    selectedItems: {},
    currentQuestionSelectedItem: -1,
    shuffledQuestionIDs: [],
    showResult: false
  }

  changeLanguage = () => {
    var language = document.getElementById("language-selector").value;
    this.setState({currentLanguage: language});
  }

  changeTableBackground = () => {
    var tableBackground = document.getElementById("table-background-selector").value;
    this.setState({currentTableBackground: tableBackground});
  }

  restartTest = () => {
    this.setState({currentQuestion: 0})
    this.setState({currentQuestionSelectedItem: -1})
    this.state.currentScoreMatrix = {}
    this.state.selectedItems = {}
    this.state.shuffledQuestionIDs = []
    this.setState({showResult: false})
  }

  goToQuestion = (oldQuestionNum, newQuestionNum) => {
    this.state.selectedItems[this.state.shuffledQuestionIDs[oldQuestionNum]] = this.state.currentQuestionSelectedItem;
    this.setState({currentQuestion: newQuestionNum});
    this.setState({currentQuestionSelectedItem: this.state.selectedItems[this.state.shuffledQuestionIDs[newQuestionNum]]})
  }

  updateCurrentScoreMatrix = (score, questionID) => {
    this.state.currentScoreMatrix[questionID] = score;
  }

  updateSelectedItems = (questionID, index) => {
    this.state.selectedItems[questionID] = index;
    this.setState({currentQuestionSelectedItem: this.state.selectedItems[questionID]})
  }

  clearSelectedItems = () => {
    this.state.currentScoreMatrix = {}
    this.setState({currentQuestionSelectedItem: -1})
    Object.keys(this.state.selectedItems).forEach((key) => {
      this.state.selectedItems[key] = -1
    })
  }

  render() {
    var metadataItems = null;
    var questions = [];
    var scores = [];
    var currentLanguageCode = `en`;
    var languages = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node

      if(nodeItem.relativeDirectory.includes("SCORES") && nodeItem.ext === ".md") {
        scores.push(nodeItem);
      }
      if(nodeItem.relativeDirectory.includes("QUESTIONS") && nodeItem.ext === ".md") {
        languages.add(nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1])
        if(nodeItem.relativeDirectory.includes("QUESTIONS/" + this.state.currentLanguage.split("-")[0])) {
          if(nodeItem.name === "lang-info") {
            currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
          }
          else {
            questions.push(nodeItem);
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

    var sections = [];
    var sectionNum = 0;
    var maxSectionNum = Math.max(parseInt(scores[scores.length - 1].name), parseInt(questions[questions.length - 1].name));
    var currentQuestion = null;
    var currentScore = [];
    var nextQuestionID = 0;
    var nextScoreID = 0;
    var allQuestionIDs = [];
    var allQuestions = [];
    while(sectionNum <= maxSectionNum) {
      if(nextQuestionID < questions.length && parseInt(questions[nextQuestionID].name) === sectionNum) {
        currentQuestion = questions[nextQuestionID].childMarkdownRemark;
        nextQuestionID++;
      }

      if(nextScoreID < scores.length && parseInt(scores[nextScoreID].name) === sectionNum) {
        currentScore = scores[nextScoreID].childMarkdownRemark.frontmatter.points
        nextScoreID++;
      }

      sections.push(
        <MultipleChoiceQuestion totalQuestions={questions.length} currentItem={this.state.currentQuestionSelectedItem} updateSelectedItems={this.updateSelectedItems} updateCurrentScoreMatrix={this.updateCurrentScoreMatrix} overallState={this.state} scores={currentScore} questionID={sectionNum} question={currentQuestion} />
      )
      allQuestionIDs.push(sectionNum)
      allQuestions.push(currentQuestion)
      sectionNum++;
    }

    if((this.state.shuffledQuestionIDs.length === 0) && (Object.keys(this.state.selectedItems).length === 0)) {
      this.state.shuffledQuestionIDs = shuffle(allQuestionIDs)

      allQuestionIDs.forEach((item) => {
        this.state.selectedItems[item] = -1;
      })
    }

    return(
      <Layout menuBarItems={[(<QuestionToggle state={this.state} goToQuestion={this.goToQuestion} allQuestions={allQuestions} />), (<ShowOutcome state={this.state} outcomes={metadataItems.childMarkdownRemark.frontmatter.outcomes} restartTest={this.restartTest} />), (<SettingsWindow clearSelectedItems={this.clearSelectedItems} state={this.state} languageOptions={languageOptions} changeLanguage={this.changeLanguage} tableBackgroundOptions={['Zene', 'Zeanne', 'Classroom Table']} changeTableBackground={this.changeTableBackground} />)]} showMenuBar={true}>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <div className={"table-background-" + this.state.currentTableBackground.toLowerCase().replace(/ /g, "-")} style={{textAlign: 'center'}}>
        <div className="miscellaneous-page p-3" style={{textAlign: 'center'}}>
          <div style={{textAlign: "center", color: "white"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>
              {metadataItems.childMarkdownRemark.frontmatter.title}
            </ResponsiveHeader>
          </div>
          <section className="mb-5" lang={currentLanguageCode}>
            {sections[this.state.shuffledQuestionIDs[this.state.currentQuestion]]}
          </section>
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
          html
          frontmatter {
            title
            language_code
            outcomes {
              outcome
              interpretation
            }
            choices
            points
          }
          fields {
            slug
          }
          internal {
            content
          }
        }
      }
    }
  }
}
`