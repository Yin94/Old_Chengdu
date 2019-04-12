import React from 'react';
import classes from './CartStrip.css';
import Button from '../../UI/Button/Button';
import CartList from './CartList/CartList';
import { connect } from 'react-redux';
import {
  startFetchList,
  startDeleteItem
} from '../../store_redux/basket/basket';
const mps = state => ({
  token: state.auth.token,
  list: state.basket.list
});
const mpd = dispatch => ({
  fetchList: token => {
    dispatch(startFetchList(token));
  },
  deleteItem: (id, token) => {
    dispatch(startDeleteItem(id, token));
  }
});
export default connect(
  mps,
  mpd
)(
  class extends React.Component {
    componentDidMount() {
      this.props.token
        ? this.props.fetchList(this.props.token)
        : this.props.fetchList(
            JSON.parse(localStorage.getItem('auth'))['token']
          );
    }
    onDeleteHandler = id => {
      this.props.deleteItem(id, this.props.token);
    };
    render() {
      return (
        <div className={classes.withBg}>
          <div className={classes.container}>
            <div>
              <div className={classes.list}>
                <CartList
                  list={this.props.list}
                  deleteItem={this.onDeleteHandler}
                />
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
