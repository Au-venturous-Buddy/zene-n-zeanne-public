import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

class TextLayer extends React.Component {
    render() {
      return(
        <div className="mask flex-center">
          {this.props.children}
        </div>
      )
    }
  }
  
export default function ComicStripPage({scene, dialogue, keyID}) {
    var dialogueRender = (
      <div></div>
    )
    if(dialogue) {
      dialogueRender = (
        <img
          className="d-block w-100"
          src={dialogue.publicURL}
          alt={keyID}
        />
      )
    }
  
    return(
    <div aria-hidden={true} className="view comic-strip-page">
      <img
        className="d-block w-100"
        src={scene.publicURL}
        alt={keyID}
      />
      <TextLayer>
        {dialogueRender}
      </TextLayer>
    </div>
    )
}