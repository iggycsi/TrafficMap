import React, { Component } from 'react';
import MapboxGL from 'mapbox-gl';


export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api_url: 'http://data.edmonton.ca/resource/87ck-293k.json',
            map: false, 
            viewport: {
                zoom: 13.9, 
                center: [ 21.944345, 41.866090,]
            }, 
            token: 'pk.eyJ1IjoiaWdneWNzaSIsImEiOiJjanpiZjl2OXAwMGU3M25zMGhjMjd1amFzIn0.fSIsz56qXzKurQEaEJoJxw',
            data: null   
        };
    }

    initializeMap() {
        MapboxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        let map = new MapboxGL.Map({
            container: "map", 
            style: 'mapbox://styles/mapbox/light-v9',
            ...this.state.viewport
        });
        this.setState({ map });
    }

    createFeatureCollection(data) {
        let features = [];
        data.forEach(point => {
            features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point", 
                    "coordinates": [
                        parseFloat(point.location.longitude), 
                        parseFloat(point.location.latitude),
                    ]
                },
                "properties": {
                    "description": point.description, 
                    "details": point.details, 
                    "duration": point.duration, 
                    "impact": point.impact
                }
            });
        });

        return {
            "type": "FeatureCollection",
            "features": features
        }
    }

    componentDidMount() {
        const { data, api_url } = this.state;

        if (!data) {
            fetch(api_url, {method: 'GET'})
            .then(response => response.json)
            .then(response => this.createFeatureCollection(response))
            .then(response => this.setState({ data: response}));
        }
    }

    render() {
        const { map, data } = this.state;
        if (data && !map) this.initializeMap();
        return (

            <div style={{ width: 1100, height: 800}} id='map' />
            
        );
    }
}
