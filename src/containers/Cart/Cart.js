import React from 'react';
import classes from './CartStrip.css';
import Button from '../../UI/Button/Button';
import CartList from './CartList/CartList';
import { connect } from 'react-redux';
import LoadingModal from '../../UI/LoadingModal/LoadingModal';
import {
  startFetchList,
  startDeleteItem,
  startClearBasket
} from '../../store_redux/basket/basket';
const mps = state => ({
  token: state.auth.token,
  list: state.basket.list,
  loading: state.basket.loading,
  succeed: state.basket.succeed
});
const mpd = dispatch => ({
  fetchList: token => {
    dispatch(startFetchList(token));
  },
  deleteItem: (id, token) => {
    dispatch(startDeleteItem(id, token));
  },
  clearBasket: token => {
    dispatch(startClearBasket(token));
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
    onOrderHandler = () => {
      this.props.clearBasket(this.props.token);
    };
    onDeleteHandler = id => {
      this.props.deleteItem(id, this.props.token);
    };
    render() {
      const list = this.props.list;
      const total = list.reduce(
        (prev, current) => prev + current.meal.price * current.count,
        0
      );
      return (
        <div className={classes.withBg}>
          {this.props.loading && <LoadingModal />}
          <div className={classes.container}>
            <div>
              <div className={classes.list}>
                <CartList list={list} deleteItem={this.onDeleteHandler} />
                <strong className={classes.total}>
                  <small>Total</small>: {total}
                </strong>
              </div>
              <div className={classes.desc}>
                <img
                  src={require('../../assets/images/MealList/logo.png')}
                  alt=''
                />
                {this.props.succeed ? (
                  <strong style={{}}>
                    Thanks! We got your order. Will be contacting you soon!
                  </strong>
                ) : (
                  <Button btn onClick={this.onOrderHandler}>
                    Order Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
