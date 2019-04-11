import React from 'react';
import classes from './CartStrip.css';
import Button from '../../UI/Button/Button';
import CartList from './CartList/CartList';
import { connect } from 'react-redux';
import { startFetchList } from '../../store_redux/basket/basket';
const mps = state => ({
  token: state.auth.token
});
const mpd = dispatch => ({
  fetchList: token => {
    dispatch(startFetchList(token));
  }
});
export default connect(
  mps,
  mpd
)(
  class extends React.Component {
    componentDidMount() {
      this.props.fetchList(this.props.token);
    }

    render() {
      return (
        <div className={classes.withBg}>
          <div className={classes.container}>
            <div>
              <div className={classes.list}>
                <CartList />
              </div>
              <div className={classes.desc}>
                <img
                  src='http://www.happypandatx.com/wp-content/uploads/2017/12/happypanda_logo.png'
                  alt=''
                />
                <Button>Order Now</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
