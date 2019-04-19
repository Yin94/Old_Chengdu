import React from 'react';
import Modal from '../../hoc/Modal/Modal';
import GoogleMapReact from 'google-map-react';
import classes from './AboutUs.css';
import MapMarker from '../../UI/MapMarker/MapMarker';
import { Link } from 'react-router-dom';
export default function AboutUs({
  center = {
    lat: 43.04872179240851,
    lng: -76.1333629488945
  },
  zoom = 16
}) {
  return (
    <Modal>
      <div className={classes.container}>
        <img
          src={require('../../assets/images/MealDetail/panda.png')}
          alt='panda'
          className={classes.panda}
        />
        <Link to='/' className={classes.icon}>
          <img
            src={require('../../assets/images/MealList/logo.png')}
            alt='panda'
          />
        </Link>
        <header>
          <h1>Lao ChengDu</h1>
        </header>
        <h2>We deliver best Szechuan food upstate NY</h2>
        <div className={classes.positionMap}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_LAO_CHENGDU_APIKEY
            }}
            defaultCenter={center}
            defaultZoom={zoom}>
            <MapMarker
              lat={43.04872179240851}
              lng={-76.1333629488945}
              text='My Marker'
            />
          </GoogleMapReact>
        </div>
        <div className={classes.contact}>
          <strong
            style={{
              paddingBottom: '20px',
              paddingTop: '5px',
              display: 'block',
              color: '#E5001C',
              textAlign: 'left'
            }}>
            1113 E Fayette St, Syracuse, NY 13210
          </strong>
          <p>
            <img
              src={require('../../assets/images/NavBar/6.png')}
              alt='phone'
            />
            <span>6072325699</span>
          </p>

          <p>
            <img
              src={require('../../assets/images/AboutUs/email.png')}
              alt='email'
            />
            <span>laochengdu@gmail.com</span>
          </p>
        </div>
        <div className={classes.main}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            similique assumenda iste expedita inventore beatae aut alias optio!
            Nesciunt veritatis quos, nostrum eos similique perferendis delectus
            impedit illum repudiandae perspiciatis. Sequi autem in dicta earum
            vitae sapiente quisquam, sint consequuntur dolore officia debitis
            delectus, similique iste quasi corrupti modi tenetur magnam iure ab
            rerum. Odio eum minus dolore vero numquam. Quae illum ipsum
            inventore vero in magnam dolor dolore est? Laudantium magnam
            doloribus sint et fugit sapiente voluptate. Amet, recusandae
            voluptates fuga voluptatem dicta consectetur modi sit dolorum.
            Eaque, saepe! Nihil quasi itaque quaerat ducimus obcaecati quas
            vitae optio quo? Nobis eaque laborum architecto ipsa quisquam atque
            quibusdam. Nam saepe vitae nisi velit itaque enim dicta mollitia in
            reprehenderit nulla. Atque, quas qui autem in tenetur rem doloribus
            inventore enim labore, odio omnis accusamus tempore dolores!
            Adipisci, exercitationem libero assumenda ullam, fugiat id quaerat
            rerum voluptas cumque praesentium esse vero.
          </p>
        </div>
      </div>
    </Modal>
  );
}
