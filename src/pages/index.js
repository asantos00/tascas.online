import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/map"

import styles from './styles.module.css';

class IndexPage extends React.Component {
  state = {
    place: undefined
  }

  selectPlace = (place) => {
    this.setState({ place });
  }

  render() {
    const { data }  = this.props;
    const { place } = this.state;

    return (
      <Layout>
        <SEO title="Home" keywords={[`food`, `eat`, `restaurants`, `typical`, `portugal`]} />
        <div className={styles.wrapper}>
          <div className={styles.map}>
            <Map places={data.allTascasJson.edges} onSelectPlace={this.selectPlace} />
          </div>
          { place && (
            <div className={styles.sidebar}>
              <img src={place.image[0]} />
              <div className={styles.body}>
                <h3>{place.title}</h3>
                {place.description.map(d => <h6>{d}</h6>)}
              </div>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
{
  allTascasJson {
    edges {
      node {
        title
        description
        coordinates {
          lat
          lng
        }
        image
      }
    }
  }
}
`

export default IndexPage
