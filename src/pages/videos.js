import React from "react"
import {GetVideos} from "../hooks/get-videos"
import {GetVideosCovers} from "../hooks/get-videos-covers"
import {GetVideosCategories} from "../hooks/get-videos-categories"
import MediaCover from "../components/media-cover"
import MediaLibrary from "../components/media-library";

export default function Videos() {
  const videosData = GetVideos()
  const videosCovers = GetVideosCovers()
  const videosCategories = GetVideosCategories();
  
  var videos = {};
  for(var i = 0; i < videosData.allFile.edges.length; i++) {
    var videoData = videosData.allFile.edges[i].node.childMarkdownRemark;
    var videoCover = videosCovers.allFile.edges[i].node;

    var version = videoData.frontmatter.version;
    var category = videoData.frontmatter.category;
    var season = videoData.frontmatter.season;

    var displayVideoCover = (
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 330
        }}

        className="p-2"
      >
        <MediaCover categoryName={category.toLowerCase().replace(/ /g, "-")} title={videoData.frontmatter.title} synopsis={videoData.frontmatter.synopsis} cover={videoCover} showBadge={true} badgeItem={`Season ${videoData.frontmatter.season} Episode ${videoData.frontmatter.episode}`} slug={videoData.fields.slug} playNowText="Watch Now" />
      </div>
    )

    if(!(version in videos)) {
      videos[version] = {}
    }
    if(!(category in videos[version])) {
      videos[version][category] = []
    }
    if(!(season in videos[version][category])) {
      videos[version][category][season] = []
    }

    videos[version][category][season].push(displayVideoCover)
  }

  return(
    <MediaLibrary pageID="videos" title="Videos" description="Watch Zene 'N Zeanne Videos" gridListClassName="videos-list" gridListTileClassName="mt-2" buttonClassName="videos-preview" mediaItems={videos} mediaCategories={videosCategories} defaultVersion={2} mediaSubCategoryName={"Season"} />
  )
}
