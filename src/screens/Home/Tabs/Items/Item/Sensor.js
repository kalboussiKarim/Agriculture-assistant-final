import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { FIREBASE_DB, onValue, ref } from "../../../../../utils/FirebaseConfig";

import Wave from "../../../../../components/charts/Wave";
import TemperatureMeter from "../../../../../components/charts/TemperatureMeter";
import HumidityMeter from "../../../../../components/charts/HumidityMeter";

import Name from "../../../../../components/item/Name";
import Info from "../../../../../components/item/Info";
import RainMeter from "../../../../../components/charts/RainMeter";
import AirPressureMeter from "../../../../../components/charts/AirPressureMeter";
import LightMeter from "../../../../../components/charts/LightMeter";
import SoilMoisture from "../../../../../components/charts/SoilMoisture";
import IsFavourite from "../../../../../components/item/IsFavourite";
import DefaultSensor from "../../../../../components/charts/DefaultSensor";

const Sensor = ({ item, uid, nodeId }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const databaseRef = ref(FIREBASE_DB, `${uid}/sensors/${item.path}`);
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setValue(data);
    });

    return () => unsubscribe();
  }, [item, uid, nodeId]);

  return (
    <View>
      <Name item={item} uid={uid} nodeId={nodeId}></Name>
      <Info item={item} nodeId={nodeId}></Info>
      <IsFavourite item={item} uid={uid} nodeId={nodeId} />
      {item.sub_category == "water tank" && <Wave value={value} />}
      {item.sub_category == "temperature" && <TemperatureMeter value={value} />}
      {item.sub_category == "humidity" && <HumidityMeter value={value} />}
      {item.sub_category == "rain" && <RainMeter value={value} />}
      {item.sub_category == "light" && <LightMeter value={value} />}
      {item.sub_category == "air pressure" && (
        <AirPressureMeter value={value} />
      )}

      {item.sub_category == "soil moisture" && <SoilMoisture value={value} />}
      {item.sub_category == "default" && (
        <DefaultSensor value={value} unit={item.unit} />
      )}
    </View>
  );
};

export default Sensor;
