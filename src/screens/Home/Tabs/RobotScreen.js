import React, { useState, useEffect } from "react";

import {
  FIREBASE_DB,
  FIREBASE_AUTH,
  onValue,
  ref,
} from "../../../utils/FirebaseConfig";
import RobotControl from "./Robot/RobotControl";
import RobotHome from "./Robot/RobotHome";

export default function RobotScreen() {
  uid = FIREBASE_AUTH.currentUser.uid;
  const [status, setStatus] = useState(null);

  //bech namlou listner al value ta3 robot status w selon el valeur nraj3ou el home screen wala el control screen
  useEffect(() => {
    const databaseRef = ref(FIREBASE_DB, `${uid}/robot/status`);
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setStatus(data);
    });

    return () => unsubscribe();
  }, []);

  return status === "on" ? <RobotControl /> : <RobotHome />;
}
