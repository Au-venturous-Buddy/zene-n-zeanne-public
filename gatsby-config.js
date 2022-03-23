/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Zene 'N Zeanne`,
    author: `FantaZZticNation Creatives`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
  `gatsby-plugin-sass`,
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`, // Needed for dynamic images
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Zene N Zeanne`,
      short_name: `ZNZ`,
      start_url: `/`,
      background_color: `#0088FE`,
      theme_color: `#FFB703`,
      // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
      // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
      display: `standalone`,
      icon: `src/images/Zene N Zeanne V4 Logo Small.png`, // This path is relative to the root of the site.
    },
  },
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  `gatsby-transformer-remark`
 ]
}
