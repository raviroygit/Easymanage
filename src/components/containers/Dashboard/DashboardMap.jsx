/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DashBoardStyle } from "./DashBoardStyle";
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useSelector } from 'react-redux';
import { DASHBOARD_MAP_URL } from '../../../constants/constants';

const useStyles = makeStyles(DashBoardStyle);

function DashboardMap() {
  const classes = useStyles();
  const terminalLocation = useSelector(state => state.dashboardDetails.terminalLocation)
  const [ini, setIni] = useState([33.8869, 9.5375]);
  const corner1 = Leaflet.latLng(-90, -200)
  const corner2 = Leaflet.latLng(90, 200)
  const bounds = Leaflet.latLngBounds(corner1, corner2)
  useEffect(() => {
    if (terminalLocation && terminalLocation.length > 0) {
      setIni(terminalLocation[0].location)
    }
  }, []);
  return (
    <Grid className={classes.mapOuterBox}>
      <MapContainer
        className={classes.mapOuterBox}
        center={ini} zoom={3}
        minZoom={3}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}
        scrollWheelZoom={true}
        attributionControl={false}>
        <TileLayer
          url={DASHBOARD_MAP_URL}
        />
        <MarkerClusterGroup>
          {terminalLocation && terminalLocation.map(terminal => (
            <Marker position={terminal.location}>
              <Popup>
                {terminal.serialNumber}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Grid>
  );
}

export default DashboardMap;