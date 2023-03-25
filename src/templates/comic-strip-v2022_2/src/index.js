import React from "react";
import { graphql } from "gatsby";
import ComicStripPage from '../../../components/comic-strip-page'
import ComicStripBase from "../../../components/comic-strip-base"

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
          <ComicStripPage scene={currentScene} dialogue={currentDialogue} keyID={pageNum.toString()} />
        </div>
      )
  
      pageNum++;
    }
  })

  return pages;
}

function compileComicStrip(data, state) {
    var metadataItems = null;
    var scenes = {};
    var dialogues = {};
    var dialoguesAlt = {};
    var currentLanguageCode = `en`;
    var languages = new Set();
    for(var i = 0; i < data.allFile.edges.length; i++) {
      var nodeItem = data.allFile.edges[i].node
      var parentFolder = nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1]
      if(nodeItem.relativeDirectory.includes("SCENES") && nodeItem.ext === ".png") {
        if(!(parentFolder in scenes)) {
          scenes[parentFolder] = [];
        }
        scenes[parentFolder].push(nodeItem);
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".md" && nodeItem.name === "lang-info") {
        languages.add(parentFolder)
        if(nodeItem.relativeDirectory.includes("DIALOGUES/" + state.currentLanguage)) {
          currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
        }
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".md" && nodeItem.name === "dialogue-alt" && nodeItem.relativeDirectory.includes("DIALOGUES/" + state.currentLanguage)) {
        if(!(parentFolder in dialoguesAlt)) {
          dialoguesAlt[parentFolder] = [];
        }
        dialoguesAlt[parentFolder] = nodeItem.childMarkdownRemark.frontmatter.dialogue_alt
      }
      else if(nodeItem.relativeDirectory.includes("DIALOGUES") && nodeItem.ext === ".png") {
        if(nodeItem.relativeDirectory.includes("DIALOGUES/" + state.currentLanguage)) {
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
      if(mode.mode_name === state.currentMode) {
        callAt = mode.scenes;
      }
    })

    var pages = generatePages(scenes, dialogues, dialoguesAlt, callAt);

    return {
      metadataItems,
      languageOptions,
      modeOptions,
      currentLanguageCode,
      pages
    }
}

export default function ComicStripv2022_2(props) {
  return(
    <ComicStripBase 
      data={props.data}
      tableBackgroundBase="table-background"
      tableBackgroundOptions={['Zene', 'Zeanne', 'Classroom Table']}
      defaultLanguage="English"
      defaultMode="Original"
      compile={compileComicStrip}
    />
  )
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
              format
              language_code
              dialogue_alt
            }
          }
          publicURL
        }
      }
    }
  }
`