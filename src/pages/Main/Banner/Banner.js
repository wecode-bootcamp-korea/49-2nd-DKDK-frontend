import React from 'react';
import './Banner.scss';

const Banner = () => {
  return (
    <section className="bannerWrap">
      <div className="contentWrap">
        <h1>WELCOME TO DKDK</h1>
        <div className="goContent">
          <h2>GET FIT IN LESS 2 WEEKS</h2>
          <p className="text">
            We provide high businesses dolor sit amet, consectetur adipiscing
            elit dolor sit dolor sit amet consectetur
            <br />
            adipiscing elit, sed diam nonummy nibh euismod.
          </p>
          <button type="button" className="goSubscribe">
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
