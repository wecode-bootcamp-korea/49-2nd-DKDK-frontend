import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/pay" className="goSubscribe">
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
