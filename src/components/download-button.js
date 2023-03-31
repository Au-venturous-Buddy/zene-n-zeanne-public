import React from "react"
import { BsDownload } from "react-icons/bs";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import ResponsiveSize from "../hooks/responsive-size";

const helpTooltip = (message, props) => (
    <Tooltip {...props}>
      {message}
    </Tooltip>
);

export default function DownloadButton({downloadLink}) {
    return(
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 250 }}
          overlay={helpTooltip("Download")}
        >
        <Button disabled={!(contents.metadataItems.childMarkdownRemark.frontmatter.download_link)} style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500), backgroundColor: "#01A5FF"}} aria-label="Download" href={downloadLink} target="_blank" rel="noreferrer">
            <span aria-hidden={true}><BsDownload aria-hidden={true} /></span>
        </Button>
        </OverlayTrigger>
    )
}