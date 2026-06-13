import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function Map({ selectedAnimal }) {

    const position = [selectedAnimal?.latitude || 40.730610, selectedAnimal?.longitude || -73.935242];

    function RecenterMap({ position }) {
        const map = useMap();

        useEffect(() => {
            map.setView(position);
        }, [position, map]);

        return null;
    }

    return (
        <MapContainer
            center={position}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "400px", width: "100%", maxWidth: "1000px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterMap position={position} />
            {selectedAnimal && (
                <Marker position={position}>
                    <Popup>
                        {selectedAnimal.name ? (
                            <>
                                <strong>{selectedAnimal.name}</strong>
                                <br />
                                <p>Breed: {selectedAnimal.breed}</p>
                                <p>Type: {selectedAnimal.animal_type}</p>
                            </>
                        ) : "Unnamed Animal"
                        }
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
}