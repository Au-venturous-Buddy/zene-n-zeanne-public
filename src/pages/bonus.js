import React from "react"
import Layout from "../components/layout"
import {GetBonus} from "../hooks/get-bonus"
import {GetBonusCovers} from "../hooks/get-bonus-covers"
import {GetBonusCategories} from "../hooks/get-bonus-categories"
import SEO from "../components/seo";
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import MediaCover from "../components/media-cover"
import MediaLibrary from "../components/media-library";
import ResponsiveHeader from "../components/responsive-header";
import SearchBox from "../components/search-box";
import MenuWindow from "../components/menu-window";

export default function Bonus() {
  const bonusData = GetBonus()
  const bonusCovers = GetBonusCovers()
  const bonusCategories = GetBonusCategories();

  console.log(bonusCovers)
  
  var bonus = {};
  for(var i = 0; i < bonusData.allFile.edges.length; i++) {
    var bonusItemData = bonusData.allFile.edges[i].node.childMarkdownRemark;
    var bonusItemCover = bonusCovers.allFile.edges[i].node;

    var displayBonusItemCover = (
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 330
        }}

        className="p-2"
      >
        <MediaCover title={bonusItemData.frontmatter.title} synopsis={bonusItemData.frontmatter.synopsis} cover={bonusItemCover} showBadge={true} badgeItem={`Wave ${bonusItemData.frontmatter.wave} Release ${bonusItemData.frontmatter.release}`} slug={bonusItemData.fields.slug} playNowText="Go" />
      </div>
    )
    
    var version = bonusItemData.frontmatter.version;
    var category = bonusItemData.frontmatter.category;
    var wave = bonusItemData.frontmatter.wave;

    if(!(version in bonus)) {
      bonus[version] = {}
    }
    if(!(category in bonus[version])) {
      bonus[version][category] = []
    }
    if(!(wave in bonus[version][category])) {
      bonus[version][category][wave] = []
    }

    bonus[version][category][wave].push(displayBonusItemCover)
  }

  return(
    <Layout menuBarItems={[(<MenuWindow pageID="bonus" />), (<SearchBox />)]} showMenuBar={true}>
      <SEO title="Bonus" description="Zene 'N Zeanne Bonus Content" />
      <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>Bonus</ResponsiveHeader>
      <MediaLibrary grid={ResponsiveGridColumns(4, [970, 750, 500])} mediaItems={bonus} mediaCategories={bonusCategories} defaultVersion={4} mediaSubCategoryName={"Wave"} />
    </Layout>
  )
}
