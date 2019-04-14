import React from 'react';
import Modal from '../../hoc/Modal/Modal';
import GoogleMapReact from 'google-map-react';
import classes from './AboutUs.css';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function AboutUs({
  center = {
    lat: 59.95,
    lng: 30.33
  },
  zoom = 11
}) {
  return (
    <Modal>
      <div className={classes.container}>
        <img
          src={require('../../assets/images/MealList/logo.png')}
          className={classes.icon}
          alt='panda'
        />
        <header>
          <h1>Lao ChengDu</h1>
        </header>
        <h2>We deliver best Szechuan food upstate NY</h2>
        <div className={classes.positionMap}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyA8hW0bjEmztS19igbPMnJ9h1jed7BQDFU'
            }}
            defaultCenter={center}
            defaultZoom={zoom}>
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text='My Marker'
            />
          </GoogleMapReact>
        </div>
        <div className={classes.contact}>
          <p>
            <img src={require('../../assets/images/NavBar/6.png')} alt='' />
            <span>6072325699</span>
          </p>

          <p>
            <img
              src={require('../../assets/images/AboutUs/email.png')}
              alt=''
            />
            <span>laochengdu@gmail.com</span>
          </p>
        </div>
        <div className={classes.main}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          aspernatur nobis vel nostrum natus, nam recusandae sit repellendus a
          doloremque porro possimus distinctio explicabo, animi laudantium odit?
          Mollitia, illo eaque? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quae aspernatur nobis vel nostrum natus, nam
          recusandae sit repellendus a doloremque porro possimus distinctio
          explicabo, animi laudantium odit? Mollitia, illo eaque? Lorem ipsum
         fugit? Itaque,
          laborum molestiae. Quae soluta maiores labore neque ex voluptas
          doloribus ratione enim. Quidem sunt sequi est quas ipsa alias magnam
          repellat autem repudiandae deleniti! Facere aliquam eveniet illo
          reiciendis, et officiis veritatis! Eos odio, omnis numquam qui atque
          quo provident, vel fuga hic libero accusantium. Quam praesentium
          dolore voluptatem officiis delectus assumenda, commodi totam error
          eius, modi quis quae laboriosam soluta architecto? Officia aperiam
          praesentium placeat facere ea officiis iure molestias hic nulla ut,
          deserunt dicta accusantium consequuntur delectus mollitia architecto
          voluptatum, veniam nobis expedita rerum nemo perferendis nisi
          veritatis! Laboriosam, quaerat. Quod doloremque corrupti facilis dolor
          officia asperiores molestias error, sequi quidem deserunt!
          Exercitationem, consequatur maiores? Necessitatibus magnam dignissimos
          ad libero, at labore illum numquam sed, qui odio pariatur neque enim.
          Autem, sed nostrum maiores sequi modi rerum pariatur ipsum voluptate
          perspiciatis reprehenderit quae minima natus nemo ex sunt cum fugiat.
          Reiciendis beatae voluptas, aut pariatur recusandae rem saepe sit
          aliquam?
        </div>
      </div>
    </Modal>
  );
}
