import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#4c516d`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        height: '60px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h3 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h3>
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
