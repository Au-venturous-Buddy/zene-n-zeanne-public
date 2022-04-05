import React from "react";
import Layout from "../components/layout"
import GridGalleryMain from "../components/grid-gallery-main";
import { graphql } from "gatsby";
import SEO from "../components/seo";

export default function GridGallery({data}) {
  var metadataItems = null;
  var images = [];
  for(var i = 0; i < data.allFile.edges.length; i++) {
    var nodeItem = data.allFile.edges[i].node
    if(nodeItem.relativeDirectory.includes("images") && nodeItem.ext === ".png") {
      images.push(nodeItem);
    }
    else if(nodeItem.ext === ".md" && nodeItem.name === "index") {
      metadataItems = nodeItem;
    }
  }

  return (
    <Layout showMenuBar={false}>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <div style={{textAlign: 'center'}}>
        <GridGalleryMain title={metadataItems.childMarkdownRemark.frontmatter.title} images={images} />
      </div>
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
            frontmatter {
              title
              captions
            }
          }
        }
      }
    }
  }
`