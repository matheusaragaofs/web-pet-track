import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({coordinates}: any) => {
  const [lat , long]  = coordinates[2]?.location?.coordinates
  const icon = L.icon({ iconUrl: "/marker-icon.png" });


  return (
    <MapContainer
      className='w-3/4 h-full m-auto border-[#E8E8E8] border-4'
      // center={[-8.0653925, -34.9538231]} zoom={13} scrollWheelZoom={false} >
      center={[long, lat]} zoom={13} scrollWheelZoom={false} >

      <TileLayer
        attribution='&copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      <Marker icon={icon} position={[long, lat]}>
        <Popup offset={[2, 4]}>
          Seu pet está aqui <br /> Venha buscar antes que alguem o sequestre :).
        </Popup>
      </Marker>
    </MapContainer>

  )
}

export default Map