import * as L from 'leaflet'

import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ position, start, end, color }: any) => {
  const icon = L.icon({ iconUrl: "/marker-icon.png" });

  const instance = L.Routing.control({
    createMarker: function() { return null } ,

    routeWhileDragging: false,
    showAlternatives: false,
    waypointMode: undefined,
    fitSelectedRoutes: false,
    waypoints: [
      start,
      end
    ],

    lineOptions: {
      missingRouteTolerance: 10000,
      addWaypoints: false,
      extendToWaypoints: false,
      styles: [
        {
          color,
        },
      ],
    },
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;