import React from "react"
import ResponsiveSize from "../hooks/responsive-size";
import { Button } from "react-bootstrap"

export default function AllsHubProfile({info, profilePic}) {
    var displayImage = (
      <img
        className="d-block w-100"
        style={{border: "4px solid #2d93d1", borderRadius: "20%"}}
        src={profilePic}
        alt={info.frontmatter.name}
      />
    )
    
    return(
    <Button aria-label={info.frontmatter.name} className="view profile-button p-3 m-3" href={info.fields.slug} style={{color: "#2d93d1"}}>
      <div aria-hidden={true}>
        {displayImage}
        <h2 className="m-1 bold-text profile-caption" style={{fontSize: ResponsiveSize(0.9, "rem", 0.001, 330)}}>
          {info.frontmatter.name}
        </h2>
      </div>
    </Button>
    )
}