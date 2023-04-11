import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const Map = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(-34.9533899)
  const [latitude, setLatitude] = useState(-8.0554378)

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }
    map.addLayer({
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

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element
    })
      .setLngLat(lngLat)
      .addTo(map)
  }

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    }
    const destinations = []

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
      const popup = new tt.Popup({ offset: popupOffset }).setHTML('This is you!')
      const element = document.createElement('div')
      element.className = 'marker'

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map)

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })

      marker.setPopup(popup).togglePopup()

    }
    addMarker()

    const recalculateRoutes = () => {
      const teste =
        [
          {
            "lng": -34.9533899,
            "lat": -8.0554378
          },
          {
            "lng": -34.9098131,
            "lat": -8.13389209
          }
        ]

      ttapi.services
        .calculateRoute({
          key: process.env.NEXT_PUBLIC_REACT_APP_TOM_TOM_API_KEY,
          locations: teste,
        })
        .then((routeData) => {
          console.log('routeData:', routeData)
          const geoJson = routeData.toGeoJson()
          drawRoute(geoJson, map)
        })
    }


    map.on('click', (e) => {
      destinations.push(e.lngLat)
      addDeliveryMarker(e.lngLat, map)
      recalculateRoutes()
    })

    return () => map.remove()
  }, [longitude, latitude])

  return (
    <>
      {map && (
        <div className="map-container">
          <div ref={mapElement} className="map" />
        </div>
      )}
    </>
  )
}

export default Map