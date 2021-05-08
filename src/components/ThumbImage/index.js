import React, { useState, useEffect } from "react";

// Component Show Temporary Image

const Thumb = ({ file }) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (file) {
      let reader = new FileReader();

      reader.onloadend = () => {
        setState(reader.result);
        setLoading(false);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!file) return null;

  if (loading) return <p>Loading...</p>;

  return <img src={state} style={{ width: "100%", height: "100%" }} />;
};

export default Thumb;
