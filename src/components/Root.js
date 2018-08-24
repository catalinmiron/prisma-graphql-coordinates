import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'
import Map from './Map'

class Root extends Component {
  state = {
    radius: 2000,
    lat: 50,
    lng: 14.44
  }
  componentDidMount() {
      setInterval(() => {
        this.setState({
          radius: Math.round(Math.random() * 15000)
        }, () => {
          this.props.locationsQuery.refetch(this.state)
        })
      }, 10000)
  }

  render() {
    console.log(this.props.locationsQuery)
    if (this.props.locationsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading...</div>
        </div>
      )
    }

    return <div><Map
      locations={this.props.locationsQuery.locations}
      {...this.state}

    /></div>;
  }
}

// locations(radius: 3000, lat: 50, lng: 14.44) {
//     lat,
//     lng
//   }
const LOCATIONS_QUERY = gql`
  query LocationsQuery($radius: Int!, $lat: Float!, $lng: Float!) {
    locations(radius: $radius, lat: $lat, lng: $lng) {
      id,
      lat,
      lng
    }
  }
`

export default graphql(LOCATIONS_QUERY, {
  name: 'locationsQuery',
  options: {
    variables: {
      radius: 3000,
      lat: 50,
      lng: 14.44
    },
    fetchPolicy: 'network-only',
  }
})(Root)
