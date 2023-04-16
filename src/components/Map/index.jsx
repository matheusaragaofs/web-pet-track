import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import { FiRefreshCcw } from "react-icons/fi";
import { useRouter } from 'next/router'

import * as ttapi from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { CollarsData, fetchCollarsData } from '../../pages/my-collars/redux'
import Link from 'next/link'
import HeaderMenu from '../HeaderMenu/index'
import { FiArrowLeft, FiUser, FiX, FiSearch } from 'react-icons/fi'
import { MdPets } from 'react-icons/md'
import { toast } from 'react-toastify'

const MapPage = () => {
  const router = useRouter()
  const [userLngLat, setUserLngLat] = useState(null)
  const [mapMarkers, setMapMarkers] = useState([])



  const getLatLongFromCep = async (cep) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${cep}&format=json`);
      const data = await response.json();

      const { lat, lon } = data[0];
      setUserLngLat([lon, lat])
      toast("Sucesso ao recuperar localização do usuário!", { type: 'success' });

    } catch (error) {
      toast("Erro ao tentar recuperar localização do usuário! Tente outro navegador. ", { type: 'error' });
      console.error(error);
    }
  };
  const dispatch = useDispatch();
  const { data: petLgLat, error, status } = CollarsData();
  const [loadedMap, setLoadedMap] = useState(false)
  const defaultLngLat = [-34.900002, -8.050000]
  function formatDistanceLength(lengthInMeters) {
    if (lengthInMeters >= 1000) {
      const lengthInKm = Math.round(lengthInMeters / 1000 * 10) / 10;
      return `${lengthInKm}km`;
    } else {
      return `${lengthInMeters}m`;
    }
  }

  function formatTravelTime(travelTimeInSeconds) {
    if (travelTimeInSeconds < 60) {
      return `${travelTimeInSeconds}s`;
    } else if (travelTimeInSeconds < 3600) {
      const travelTimeInMin = Math.round(travelTimeInSeconds / 60);
      return `${travelTimeInMin}min`;
    } else {
      const travelTimeInHours = Math.floor(travelTimeInSeconds / 3600);
      const remainingTimeInMin = Math.round((travelTimeInSeconds % 3600) / 60);
      if (remainingTimeInMin === 0) {
        return `${travelTimeInHours}h`;
      } else {
        return `${travelTimeInHours}h ${remainingTimeInMin}min`;
      }
    }
  }

  const mapElement = useRef()
  const [map, setMap] = useState({})

  const [routeInfo, setRouteInfo] = useState({})

  const drawRoute = (geoJson, map) => {
    if (!loadedMap) return
    if (map?.getLayer('route')) {
      map?.removeLayer('route')
      map?.removeSource('route')
    }
    map?.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson
      },
      paint: {
        'line-color': '#4811A2',
        'line-width': 3

      }
    })
  }
  const addMarker = ({ lngLat, map, popupMessage, draggable = false, type }) => {
    const element = document.createElement('div')
    element.className = 'marker'
    const popupOffset = {
      bottom: [0, -25]
    }
    const popup = new tt.Popup({ offset: popupOffset }).setHTML(popupMessage)
    const marker = new tt.Marker({
      draggable,
      element
    }).setLngLat(lngLat)
      .addTo(map)

    if (draggable) {
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setUserLngLat([lngLat.lng, lngLat.lat])
      })
    }
    setMapMarkers(() => [...mapMarkers, { type, marker }])

    marker.setPopup(popup).togglePopup()

  }



  const getUserLocation = async () => {
    await getLatLongFromCep('51160220')
  }

  const handleUserMarker = (addNewMarker) => {
    let markersCopy = mapMarkers
    const lastUserMarker = markersCopy[markersCopy.length - 1]
    if (markersCopy.length > 1 && lastUserMarker.type === 'user') {
      const m = markersCopy.pop()
      m.marker.remove()
      setMapMarkers(markersCopy)
    }
    if (addNewMarker) {
      addMarker({
        lngLat: userLngLat, map, popupMessage:
          'Localização gerada a partir do seu endereço'
        , draggable: true, type: 'user'
      })
    }
  }

  const recalculateRoutes = ({ startLngLat, endLngLat }) => {
    handleUserMarker(true)
    const locations =
      [
        {
          "lng": startLngLat[0],
          "lat": startLngLat[1]
        },
        {
          "lng": endLngLat[0],
          "lat": endLngLat[1]
        }
      ]

    ttapi.services
      .calculateRoute({
        key: process.env.NEXT_PUBLIC_REACT_APP_TOM_TOM_API_KEY,
        locations
      })
      .then((routeData) => {
        const { lengthInMeters, travelTimeInSeconds } = routeData.routes[0].summary
        setRouteInfo({
          distance: formatDistanceLength(lengthInMeters),
          travelTime: formatTravelTime(travelTimeInSeconds)
        })
        const geoJson = routeData.toGeoJson()
        drawRoute(geoJson, map)
      })
  }

  // let hasLogged =false;

  // useEffect(() => {
  //   setInterval(() => {
  //     dispatch(fetchCollarsData())
  //   }, 5000);

  // }, [])



  useEffect(() => {

    let map = tt.map({
      key: process.env.NEXT_PUBLIC_REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      zoom: 14,
    })
    setMap(map)
    dispatch(fetchCollarsData());


    map.on('load', () => setLoadedMap(true))

    return () => map?.remove()
  }, [])

  useEffect(() => {

    if (loadedMap && !_.isEmpty(petLgLat)) {
      map.setCenter(petLgLat)
      addMarker({ lngLat: petLgLat, map, popupMessage: 'Seu pet está aqui', type: 'pet' })
    }

  }, [petLgLat, loadedMap])

  useEffect(() => {
    if (loadedMap && error) {
      map.setCenter(defaultLngLat)
      toast('Infelizmente não conseguimos localizar o pet', { type: 'error' })
      map.setZoom(5)
    }

  }, [loadedMap, error])

  useEffect(() => {
    if (userLngLat) {
      recalculateRoutes({ startLngLat: petLgLat, endLngLat: userLngLat })
    }

  }, [userLngLat])
  return (
    <div className='h-2/3 '>
      <div className='bg-white text-right space-x-5 pr-5 flex items-center justify-end m-0 py-2  relative text-[#4811A2] font-bold  text-lg '>
        <button
          className='absolute left-10'
          onClick={async () => router.replace('/my-collars')}>
          <FiArrowLeft />
        </button>
        <div>
          <span>
            Polly
          </span>
          {routeInfo?.distance &&
            <span className='ml-1 font-normal'>
              | {routeInfo.distance}
            </span>
          }
        </div>
        <button onClick={async () => getUserLocation()}>
          {!userLngLat ? <FiSearch /> : <FiRefreshCcw />}
        </button>

        {petLgLat &&
          <div className='space-x-5 flex items-center justify-center'>
            {userLngLat &&
              <button onClick={() => {
                map?.removeLayer('route')
                map?.removeSource('route')
                handleUserMarker()
                setUserLngLat(null)
                setRouteInfo(null)
              }}>
                <FiX />
              </button>
            }
            {userLngLat &&
              <button onClick={() => map.setCenter(userLngLat)}>
                <FiUser />
              </button>
            }
            <button onClick={() => map.setCenter(petLgLat)}>
              <MdPets />
            </button>
          </div>
        }
      </div>

      <div className="map-container">
        <div ref={mapElement} className="map " />
      </div>

    </div>




  )
}

export default MapPage