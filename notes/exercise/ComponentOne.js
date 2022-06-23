import { useState, useEffect } from "react";

export default function ComponentOne() {
  const [number, setnumber] = useState(0);

  useEffect(() => {
    console.log("running");
    setnumber(10);
  }, [number]);

  const updateNumber = () => {
    setnumber(number + 1);
  };
  return (
    <div>
      <button onClick={updateNumber}>Update Number</button>
    </div>
  );
}
