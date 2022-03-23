import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import React from "react"

const Header = () => (
  <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 260,
        padding: `1.45rem 1.0875rem`,
        textAlign: `center`
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          <StaticImage src="../images/Zene N Zeanne V4 Logo.png" alt='Zene N Zeanne Logo' layout="fullWidth"></StaticImage>
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
