import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Wordpress({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.category} />
      <div>
        <h1 style={{textAlign: "center", color: "white"}}>{post.frontmatter.title}</h1>
        <article className="m-3 wordpress-body" style={{textAlign: "justify"}} dangerouslySetInnerHTML={{ __html: post.html }}></article>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
      }
    }
  }
`