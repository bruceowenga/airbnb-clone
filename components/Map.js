import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import { getCenter } from 'geolib';
import { Marker, Popup } from 'react-map-gl';

function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search results into an object
    // { latitude: 56.938984, longitude: 90.343498 }

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));


    // The latitude and longitude o the center of all location coordinates returned from the map

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState ({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return <ReactMapGL 
        mapStyle="mapbox://styles/brucembudi/cky8qdm4h25bu14s0b4sljjpv"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetTop={-10}
                >
                    <p onClick={() => setSelectedLocation(result)} className='cursor-pointer text-2xl animate-bounce' aria-label='push-pin'>📌</p>

                </Marker>
                {/* Popup on click  */}
                {selectedLocation.long === result.long ? (
                    <Popup
                    onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>

                ):(
                    false
                )}
            </div>
        ))}

    </ReactMapGL>
}

export default Map;
