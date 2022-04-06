import React from "react"
import Layout from "../components/layout"
import {GetBooks} from "../hooks/get-books"
import {GetBooksCovers} from "../hooks/get-books-covers"
import {GetBooksCategories} from "../hooks/get-books-categories"
import SearchBox from "../components/search-box";
import SEO from "../components/seo";
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import MediaCover from "../components/media-cover"
import MediaLibrary from "../components/media-library";
import ResponsiveHeader from "../components/responsive-header";

export default function Books() {
  const booksData = GetBooks()
  const booksCovers = GetBooksCovers()
  const booksCategories = GetBooksCategories();
  
  var books = {};
  var booksSearch = [];

  for(var i = 0; i < booksData.allFile.edges.length; i++) {
    var bookData = booksData.allFile.edges[i].node.childMarkdownRemark;
    var bookCover = booksCovers.allFile.edges[i].node.publicURL;

    var displayBookCover = (
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 330
        }}

        className="p-2"
      >
        <MediaCover title={bookData.frontmatter.title} synopsis={bookData.frontmatter.synopsis} cover={bookCover} showBadge={true} badgeItem={`Volume ${bookData.frontmatter.volume} Issue ${bookData.frontmatter.issue}`} slug={bookData.fields.slug} playNowText="Read Now" />
      </div>
    )
    
    var version = bookData.frontmatter.version;
    var category = bookData.frontmatter.category;
    var volume = bookData.frontmatter.volume;

    if(!(version in books)) {
      books[version] = {}
    }
    if(!(category in books[version])) {
      books[version][category] = []
    }
    if(!(volume in books[version][category])) {
      books[version][category][volume] = []
    }

    books[version][category][volume].push(displayBookCover)

    booksSearch.push({display: displayBookCover, contents: [bookData.frontmatter.title, bookData.internal.content, bookData.frontmatter.synopsis]})
  }

  return(
    <Layout pageID="books" showMenuBar={true}>
      <SEO title="Books" description="Read Zene 'N Zeanne Books" />
      <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>Books</ResponsiveHeader>
      <SearchBox searchItems={booksSearch} />
      <MediaLibrary grid={ResponsiveGridColumns(4, [970, 750, 500])} mediaItems={books} mediaCategories={booksCategories} defaultVersion={2} mediaSubCategoryName={"Volume"} />
    </Layout>
  )
}
