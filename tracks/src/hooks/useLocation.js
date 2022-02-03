import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default (shouldTrack, handleNewLocation) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) throw new Error("Location permission not granted");

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          handleNewLocation
        );
      } catch (error) {
        setError(error);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) subscriber.remove();
      subscriber = null;
    }

    return () => {
      if (subscriber) subscriber.remove();
    };
  }, [shouldTrack, handleNewLocation]);

  return [error];
};
