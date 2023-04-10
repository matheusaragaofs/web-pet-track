import * as L from 'leaflet'

import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ position, start, end, color }: any) => {
  const instance = L.Routing.control({
    routeWhileDragging: false,
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