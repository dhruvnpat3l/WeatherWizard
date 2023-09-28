import React from 'react';
import rainycloud from "../assets/rainy cloud.png"


function CloudAnimation() {
  return (
    <div className="cloud-container">
      <div className="cloud"><img src={rainycloud}/></div>
    </div>
  );
}

export default CloudAnimation;
