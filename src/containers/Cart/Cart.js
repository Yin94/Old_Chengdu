import React from 'react';
import classes from './CartStrip.css';
import Button from '../../UI/Button/Button';
import CartList from './CartList/CartList';
import { connect } from 'react-redux';
import LoadingModal from '../../UI/LoadingModal/LoadingModal';
import { Link, Redirect } from 'react-router-dom';
import {
  startFetchList,
  startDeleteItem,
  startClearBasket,
  resetStatus
} from '../../store_redux/basket/basket';
import { logOut } from '../../store_redux/auth/auth';
const mps = state => ({
  token: state.auth.token,
  list: state.basket.list,
  loading: state.basket.loading,
  succeed: state.basket.succeed,
  error: state.basket.error
});
const mpd = dispatch => ({
  resetStatus: () => dispatch(resetStatus()),
  fetchList: token => {
    dispatch(startFetchList(token));
  },
  deleteItem: (id, token) => {
    dispatch(startDeleteItem(id, token));
  },
  clearBasket: token => {
    dispatch(startClearBasket(token));
  },
  logOut: () => dispatch(logOut())
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
    componentWillUnmount() {
      this.props.resetStatus();
    }

    onOrderHandler = () => {
      this.props.clearBasket(this.props.token);
    };
    onDeleteHandler = id => {
      this.props.deleteItem(id, this.props.token);
    };
    render() {
      if (this.props.error === 'invalid token') {
        this.props.logOut();
        return <Redirect to='auth/1' />;
      }
      if (this.props.succeed)
        setTimeout(() => {
          this.props.history.push('/');
        }, 1500);
      const list = this.props.list;
      const total = list.reduce(
        (prev, current) => prev + current.meal.price * current.count,
        0
      );
      if (list.length === 0) {
        return (
          <div className={classes.withBg}>
            <div className={classes.container}>
              <div className={classes.sleepingPanda}>
                {this.props.succeed ? (
                  <>
                    <img
                      src={require('../../assets/images/Cart/sleepingPanda.png')}
                      alt=''
                    />
                    <p>Thanks! We got your order. Will contact you soon!</p>
                  </>
                ) : (
                  <>
                    <img
                      src={require('../../assets/images/Cart/cryingPand.gif')}
                      alt=''
                      style={{
                        paddingTop: '20%'
                      }}
                    />
                    <p>
                      You got nothing in your basket,{' '}
                      <span>
                        <Link to='/menu'>
                          <small>go add some!</small>
                        </Link>
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className={classes.withBg}>
          {this.props.loading && <LoadingModal />}
          <div className={classes.container}>
            <Link to='/'>
              <img
                src={require('../../assets/images/MealList/logo.png')}
                alt='logo'
              />
            </Link>
            <div className={classes.main}>
              <div className={classes.list}>
                <CartList list={list} deleteItem={this.onDeleteHandler} />
                <strong className={classes.total}>
                  <small>Total</small>: {total}
                </strong>
              </div>
              <div className={classes.desc}>
                <div>
                  <img
                    src={require('../../assets/images/Cart/eatingpanda.gif')}
                    alt=''
                  />

                  <Button btn onClick={this.onOrderHandler}>
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
