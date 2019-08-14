import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from './Pin';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api_url: 'http://localhost:3000/',
            viewport: {
                width: 1100, 
                height: 800, 
                zoom: 13.9, 
                latitude: 41.866090,
                longitude: 21.944345,
            }, 
            token: 'pk.eyJ1IjoiaWdneWNzaSIsImEiOiJjanpiZjl2OXAwMGU3M25zMGhjMjd1amFzIn0.fSIsz56qXzKurQEaEJoJxw',
            coords: [
                { latitude: 41.865055, longitude: 21.942607 },  
                { latitude: 41.865049, longitude: 21.933668 },
                { latitude: 41.866762, longitude: 21.933688 },
                { latitude: 41.868587, longitude: 21.934571 },
            ], 
            data: null   
        };
    }

    componentDidMount() {
        const { data, api_url } = this.state;

        if (!data) {
            fetch(api_url, {method: 'GET'})
            .then(response => response.json)
            .then(response => console.log(response));
        }
    }

    render() {
        const { coords } = this.state;
        return (
            <ReactMapGL
                mapboxApiAccessToken={this.state.token}
                    {...this.state.viewport}
                        onViewportChange={(viewport) => this.setState({viewport})}>
                
                {coords.map(coord => (
                    <Marker latitude={coord.latitude} longitude={coord.longitude}>
                        <Pin />
                    </Marker>
                ))}
                
            </ReactMapGL>
        );
    }
}
