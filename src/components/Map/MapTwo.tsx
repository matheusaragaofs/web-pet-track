import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
    TileLayer,
    MapContainer,
    LayersControl,
    Marker,
    Popup
} from "react-leaflet";

// import RoutingControl from './RoutingControl'

const maps = {
    base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};
import RoutingMachine from "./RoutingControl";
const MapTwo = () => {
    const viriato = [-8.1338920, -34.9098131]
    const viriato2 = [-34.9098131, -8.1338920]
    const cin = [-8.0554378, -34.9533899]
    const resi = [-8.1187577, -34.9102159]
    const resi2 = [-34.9102159, -8.1187577]
    const [map, setMap] = useState(null);
    const [start, setStart] = useState(viriato)
    const [end, setEnd] = useState(cin)
    const icon = L.icon({ iconUrl: "/marker-icon.png" });
    return (
        <>
            <MapContainer
                center={viriato as any}
                zoom={13}
                zoomControl={true}
                className='w-3/4 h-full m-auto border-[#E8E8E8] border-4'

                // style={{ height: "100vh", width: "100%", padding: 0 }}
                whenReady={(map: void) => setMap(map as any) as void}
            >
                {/* <RoutingMachine
                    position={'topright'}
                    start={start}
                    end={end}
                    color={'#2ef900'}
                /> */}
                <Marker icon={icon} position={viriato as any}>
                    <Popup offset={[2, 4]}>
                        Seu pet está aqui <br /> Venha buscar antes que alguem o sequestre :).
                    </Popup>
                </Marker>
                <Marker icon={icon} position={cin as any}>
                <Popup offset={[2, 4]}>
                        Seu pet está aqui <br /> Venha buscar antes que alguem o sequestre :).
                    </Popup>
                </Marker>
                <TileLayer
                    attribution='&copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </>
    );
};

export default MapTwo
