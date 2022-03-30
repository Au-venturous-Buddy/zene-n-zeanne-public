import React from "react"
import Layout from "../components/layout"
import ResponsiveSize from "../hooks/responsive-size";
import {GetBonus} from "../hooks/get-bonus"
import {GetBonusCovers} from "../hooks/get-bonus-covers"
import {GetBonusCategories} from "../hooks/get-bonus-categories"
import SearchBox from "../components/search-box";
import SEO from "../components/seo";
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import MediaCover from "../components/media-cover"
import MediaLibrary from "../components/media-library";

export default function Bonus() {
  const bonusData = GetBonus()
  const bonusCovers = GetBonusCovers()
  const bonusCategories = GetBonusCategories();

  console.log(bonusCovers)
  
  var bonus = {};
  var bonusSearch = [];

  for(var i = 0; i < bonusData.allFile.edges.length; i++) {
    var bonusItemData = bonusData.allFile.edges[i].node.childMarkdownRemark;
    var bonusItemCover = bonusCovers.allFile.edges[i].node.publicURL;

    var displayBonusItemCover = (
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 330
        }}

        className="p-2"
      >
        <MediaCover title={bonusItemData.frontmatter.title} synopsis={bonusItemData.frontmatter.synopsis} cover={bonusItemCover} showBadge={false} badgeItem={""} slug={bonusItemData.fields.slug} titleFontSize={ResponsiveSize(1, "rem", 0.001, 800)} playNowText="Go" />
      </div>
    )
    
    var version = bonusItemData.frontmatter.version;
    var category = bonusItemData.frontmatter.category;

    if(!(version in bonus)) {
      bonus[version] = {}
    }
    if(!(category in bonus[version])) {
      bonus[version][category] = []
      bonus[version][category][1] = []
    }

    bonus[version][category][1].push(displayBonusItemCover)

    bonusSearch.push({display: displayBonusItemCover, contents: [bonusItemData.frontmatter.title, bonusItemData.internal.content, bonusItemData.frontmatter.synopsis]})
  }

  return(
    <Layout pageID="bonus" showMenuBar={true}>
      <SEO title="Bonus" description="Zene 'N Zeanne Bonus Content" />
      <h1>Bonus</h1>
      <SearchBox searchItems={bonusSearch} />
      <MediaLibrary headerSize={ResponsiveSize(1.5, "rem", 0.001, 500)} categoryButtonSize={ResponsiveSize(0.9, "rem", 0.001, 330)} grid={ResponsiveGridColumns(4, [970, 750, 500])} mediaItems={bonus} mediaCategories={bonusCategories} defaultVersion={4} mediaSubCategoryName={"Volume"} />
    </Layout>
  )
}
