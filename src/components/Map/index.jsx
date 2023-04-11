import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import { FiRefreshCcw } from "react-icons/fi";

import * as ttapi from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { CollarsData, fetchCollarsData } from '../../pages/my-collars/redux'
import Link from 'next/link'
import HeaderMenu from '../HeaderMenu/index'
import { FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-toastify'

const MapPage = () => {

  const dispatch = useDispatch();
  const { data: petLgLat, error, status } = CollarsData();
  const [loadedMap, setLoadedMap] = useState(false)
  const [userLngLat, setUserLngLat] = useState(null)
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
        'line-color': '#4a90e2',
        'line-width': 6

      }
    })
  }
  const addMarker = ({ lngLat, map, popupMessage }) => {
    const element = document.createElement('div')
    element.className = 'marker'
    const popupOffset = {
      bottom: [0, -25]
    }
    const popup = new tt.Popup({ offset: popupOffset }).setHTML(popupMessage)
    const marker = new tt.Marker({
      draggable: false,
      element
    }).setLngLat(lngLat)
      .addTo(map)


    marker.setPopup(popup).togglePopup()

  }


  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setUserLngLat([longitude, latitude])
  }

  function errorCallback(error) {
    let message = "";
    switch (error.code) {
      case 1:
        message = "Permission denied. Please allow location access.";
        break;
      case 2:
        message = "Position unavailable. Please check your location settings.";
        break;
      case 3:
        message = "Timeout. Please try again later or check your network connection.";
        break;
      default:
        message = "An unknown error occurred.";
    }
    console.error(message);
  }

  const getUserLocation = () => {

    try {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
      toast("Sucesso ao recuperar localização do usuário!", { type: 'success' });

    } catch (err) {
      toast("Erro ao tentar recuperar localização do usuário! Tente outro navegador. ", { type: 'error' });
    }
  }


  const recalculateRoutes = ({ startLngLat, endLngLat }) => {
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
      addMarker({ lngLat: petLgLat, map, popupMessage: 'Seu pet está aqui' })
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
      addMarker({ lngLat: userLngLat, map, popupMessage: 'Você está aqui!' })
      recalculateRoutes({ startLngLat: petLgLat, endLngLat: userLngLat })

    }

  }, [userLngLat])


  return (
    <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
      <HeaderMenu showingOptions={false} />
      <div className='h-2/3'>
        <div className='w-3/4 m-auto d-flex text-right relative' >
          <Link href='/my-collars' className='flex space-x-8'>
            <FiArrowLeft color='white' size={22} />
            <span className='text-white font-bold absolute left-0'> Voltar </span>
          </Link>
          <span className='bg-[#E8E8E8] px-10 m-0 py-2 rounded-md text-[#4811A2] font-bold text-lg '> Polly</span>
        </div>
        <div className="map-container">
          <div ref={mapElement} className="map" />
          <span className='my-6 bg-[#E8E8E8] px-10 m-0 py-2 rounded-3xl flex justify-center items-center space-x-2 text-[#4811A2] font-bold text-lg '>
            <p>

              minha localização
            </p>
            <button onClick={() => getUserLocation()}>
              <FiRefreshCcw /></button>
          </span>

          {!_.isEmpty(routeInfo) &&
            <span className='bg-[#E8E8E8] px-10 m-0 py-2 rounded-2xl text-[#4811A2] font-bold text-lg '>
              <div>Seu pet está há {routeInfo.distance} de você</div>
              <div>Para chegar até ele levará {routeInfo.travelTime}</div>
            </span>
          }
        </div>

      </div>
    </div>




  )
}

export default MapPage