import React, { useState, useEffect } from "react";

const Nasa = (props) => {
  const [image, setImage] = useState("");

  const fetchImage = async () => {
    await fetch(
      `https://api.nasa.gov/planetary/earth/imagery?dim=0.05&lon=${props.lng}&lat=${props.lat}&date=2014-02-01&api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU`
    ).then((result) => {
      if (result.status == "200") setImage(result.url);
      else if (result.status == "404") fetchKitties();
    });
  };

  const fetchKitties = () => {
    fetch(`https://api.thecatapi.com/v1/images/search`)
      .then((result) => result.json())
      .then((result) => setImage(result[0].url));
  };

  useEffect(() => {
    if (props.lat !== "" && props.lng !== "") fetchImage();
  }, [props.lng]);
  
  return (
    <>
      <img src={image} alt="Your image is loading..." width="300px" />
    </>
  );
};
export default Nasa;

// xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU;
