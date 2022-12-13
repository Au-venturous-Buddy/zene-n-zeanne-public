import React from "react"
import {GetBonus} from "../hooks/get-bonus"
import {GetBonusCovers} from "../hooks/get-bonus-covers"
import {GetBonusCategories} from "../hooks/get-bonus-categories"
import MediaCover from "../components/media-cover"
import MediaLibrary from "../components/media-library";

export default function Bonus() {
  const bonusData = GetBonus()
  const bonusCovers = GetBonusCovers()
  const bonusCategories = GetBonusCategories();

  console.log(bonusCovers)
  
  var bonus = {};
  for(var i = 0; i < bonusData.allFile.edges.length; i++) {
    var bonusItemData = bonusData.allFile.edges[i].node.childMarkdownRemark;
    var bonusItemCover = bonusCovers.allFile.edges[i].node;

    var version = bonusItemData.frontmatter.version;
    var category = bonusItemData.frontmatter.category;
    var wave = bonusItemData.frontmatter.wave;

    var displayBonusItemCover = (
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 330
        }}

        className="p-2"
      >
        <MediaCover categoryName={category.toLowerCase().replace(/ /g, "-")} title={bonusItemData.frontmatter.title} synopsis={bonusItemData.frontmatter.synopsis} cover={bonusItemCover} showBadge={true} badgeItem={`Wave ${bonusItemData.frontmatter.wave} Release ${bonusItemData.frontmatter.release}`} slug={bonusItemData.fields.slug} playNowText="Go" />
      </div>
    )

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
    <MediaLibrary pageID="bonus" title="Bonus" description="Zene 'N Zeanne Bonus Content" gridListClassName="bonus-list" gridListTileClassName="mt-2" buttonClassName="bonus-preview" mediaItems={bonus} mediaCategories={bonusCategories} defaultVersion={4} mediaSubCategoryName={"Wave"} />
  )
}
