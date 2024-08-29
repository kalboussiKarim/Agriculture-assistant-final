import React, { useState, useEffect, useRef } from "react";
import { View, Image, Dimensions } from "react-native";
import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  onValue,
  ref,
} from "../../../../utils/FirebaseConfig";

const { width, height } = Dimensions.get("window");

export default function RobotVideo() {
  uid = FIREBASE_AUTH.currentUser.uid;
  const [currentImage, setCurrentImage] = useState(null);
  const [nextImage, setNextImage] = useState(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const databaseRef = ref(FIREBASE_DB, `${uid}/robot/image`);
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      if (!isInitialMount.current) {
        setNextImage(data);
      } else {
        setCurrentImage(data);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      setCurrentImage(nextImage);
    } else {
      isInitialMount.current = false;
    }
  }, [nextImage]);

  return (
    <View
      style={{
        width: width - 15,
        height: (width / 320) * 240 - 15,
        backgroundColor: "#ffc9c0",
        justifyContent: "center",
        borderRadius: 12,
      }}
    >
      {currentImage && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${currentImage}` }}
          style={{
            width: width - 20,
            height: (width / 320) * 240 - 20,
            alignSelf: "center",
            borderRadius: 10,
          }}
        />
      )}
      {nextImage && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${nextImage}` }}
          style={{
            width: 0,
            height: 0,
          }}
          onLoad={() => setCurrentImage(nextImage)}
        />
      )}
    </View>
  );
}
