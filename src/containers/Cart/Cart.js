import React from 'react';
import classes from './CartStrip.css';
import Button from '../../UI/Button/Button';
import CartList from './CartList/CartList';
import { connect } from 'react-redux';
import LoadingModal from '../../UI/LoadingModal/LoadingModal';
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
    state = {
      loading: false
    };
    componentDidMount() {
      this.props.token
        ? this.props.fetchList(this.props.token)
        : this.props.fetchList(
            JSON.parse(localStorage.getItem('auth'))['token']
          );
    }
    onOrderHandler = () => {
      this.setState({ loading: true });
      setTimeout(
        () =>
          this.setState({ loading: false }, () =>
            this.props.history.push('/order-succeed')
          ),
        1000
      );
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
          {this.state.loading && <LoadingModal />}
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
                <Button btn onClick={this.onOrderHandler}>
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
