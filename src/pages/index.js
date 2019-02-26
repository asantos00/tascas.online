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

  getRandomIndex = () => Math.floor(Math.random() * 10)

  getRandomPlaces = (numberOfPlaces) => {
    const { data } = this.props;
    const randomIndex = this.getRandomIndex()

    return data.allTascasJson.edges.slice(randomIndex, randomIndex + 3)
  }

  render() {
    const { data }  = this.props;
    const { place } = this.state;

    return (
      <Layout>
        <SEO title="Home" keywords={[`food`, `eat`, `restaurants`, `typical`, `portugal`]} />
        <div className={styles.wrapper}>
          <div className={styles.map}>
            <Map
              latitude={place && place.coordinates.lat}
              longitude={place && place.coordinates.lng}
              places={data.allTascasJson.edges}
              onSelectPlace={this.selectPlace} />
          </div>
          { place && (
            <div className={styles.sidebar}>
              <div className={styles.imageWrapper}>
                <img src={place.image[0]} />
              </div>
              <div className={styles.body}>
                <h3>{place.title}</h3>
                {place.description.map(d => <h6 key={d.substring(0, 6)}>{d}</h6>)}
              </div>
            </div>
          )}
          {!place && (
            <div className={styles.sidebar}>
              <div className={styles.body}>
                <h3>A que tasca vamos hoje?</h3>
                <h5>tascas.online é uma lista devidamente curada das melhores tascas de Lisboa</h5>

                <h3>Aqui está uma lista aleatória de tascas:</h3>
                <ul>
                  {this.getRandomPlaces(3).map(p => (
                    <li className={styles.item} onClick={() => this.selectPlace(p.node)} key={p.node.title}>{p.node.title}</li>
                  ))}
                </ul>
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
