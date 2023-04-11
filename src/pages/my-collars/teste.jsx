import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { CollarsData, fetchCollarsData } from './redux'
import Link from 'next/link'
import HeaderMenu from '../../components/HeaderMenu/index'
import { FiArrowLeft } from 'react-icons/fi'

const MapPage = () => {

  const dispatch = useDispatch();
  const { data, error, status } = CollarsData();
  useEffect(() => {
    dispatch(fetchCollarsData());
  }, [dispatch]);



  console.log("MAPA TESTANDO ==")
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
  const [longitude, setLongitude] = useState(-34.9533899)
  const [latitude, setLatitude] = useState(-8.0554378)

  const [routeInfo, setRouteInfo] = useState({})

  const resiLatLog = [-8.1187577, -34.9102159]
  const drawRoute = (geoJson, map) => {
    if (map && map?.getLayer('route')) {
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

  // if ("geolocation" in navigator) {
  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  // } else {
  //   console.log("Geolocation API is not supported");
  // }

  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
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

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
  //   } else {
  //     console.log("Geolocation API is not supported");
  //   }

  // }, [])



  useEffect(() => {


    let map = tt.map({
      key: process.env.NEXT_PUBLIC_REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      // stylesVisibility: {
      //   trafficIncidents: true,
      //   trafficFlow: true,
      // },
      center: [longitude, latitude],
      zoom: 14,
    })
    setMap(map)

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25]
      }
      const popup = new tt.Popup({ offset: popupOffset }).setHTML('Esse é você!')
      const popup2 = new tt.Popup({ offset: popupOffset }).setHTML('Seu pet está aqui!')
      const element = document.createElement('div')
      const element2 = document.createElement('div')
      element.className = 'marker'
      element2.className = 'marker'

      const marker = new tt.Marker({
        draggable: false,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map)

      const marker2 = new tt.Marker({
        draggable: false,
        element: element2,
      })
        .setLngLat([resiLatLog[1], resiLatLog[0]])
        .addTo(map)


      marker.setPopup(popup).togglePopup()
      marker2.setPopup(popup2).togglePopup()

    }
    addMarker()
    const recalculateRoutes = () => {
      const teste =
        [
          {
            "lng": longitude,
            "lat": latitude
          },
          {
            "lng": resiLatLog[1],
            "lat": resiLatLog[0]
          }
        ]

      ttapi.services
        .calculateRoute({
          key: process.env.NEXT_PUBLIC_REACT_APP_TOM_TOM_API_KEY,
          locations: teste,
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

    map.on('load', function () {
      if (map) {
        recalculateRoutes()
      }
    });

    return () => map?.remove()
  }, [])



  return (
    <div className='d-flex bg-[#4811A2] h-screen items-center justify-center w-full overflow-y-scroll'>
      <HeaderMenu showingOptions={false} />
      <div className='h-2/3'>
        <div className='w-3/4 m-auto d-flex text-right relative' >
          {/* <Link href='/my-collars' className='flex space-x-8'>
            <FiArrowLeft color='white' size={22} />
            <span className='text-white font-bold absolute left-0'> Voltar </span>
          </Link> */}
          <span className='bg-[#E8E8E8] px-10 m-0 py-2 rounded-md text-[#4811A2] font-bold text-lg '> Polly</span>
        </div>
          <div className="map-container">
            <div ref={mapElement} className="map" />
            {!_.isEmpty(routeInfo) &&
              <span className='bg-[#E8E8E8] px-10 m-0 py-2 rounded-bl-md rounded-br-md text-[#4811A2] font-bold text-lg '>
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