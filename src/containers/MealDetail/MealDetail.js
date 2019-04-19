import React, { Component, createRef } from 'react';
import classes from './MealDetail.css';
import Modal from './Modal/Modal';
import Button from '../../UI/Button/Button';
import SpicePanel from '../../components/SpicePanel/SpicePanel';
import { startQueryMeal } from '../../store_redux/meals/meals';
import { startAddToBasket, resetStatus } from '../../store_redux/basket/basket';
import LoadingModal from '../../UI/LoadingModal/LoadingModal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const mps = state => ({
  token: state.auth.token,
  list: state.meals.list,
  currentMeal: state.meals.cur,
  succeed: state.basket.succeed,
  addItemSucceed: state.basket.addItemSucceed
});
const mpd = dispatch => ({
  fetchMeal: id => {
    dispatch(startQueryMeal(id));
  },
  addToBasket: (id, count, token) => {
    dispatch(startAddToBasket(id, count, token));
  },
  resetStatus: () => dispatch(resetStatus())
});
export default connect(
  mps,
  mpd
)(
  class MealDetail extends Component {
    state = {
      count: 1,
      mode: false,
      index: 0
    };
    countRef = createRef();
    btnTextRef = createRef();
    componentDidMount() {
      if (this.props.currentMeal === {}) return;
      const id = this.props.match.params.id;
      this.props.fetchMeal(id);
      window.addEventListener(
        'keyup',
        e => this.onModalKeyPressHandler(e),
        false
      );
    }
    componentWillUnmount = () => {
      window.removeEventListener('keyup', this.onCloseModalHandler, false);
    };
    onModalKeyPressHandler = e => {
      const key = e.keyCode;
      if (key === 27) this.onCloseModalHandler();
      if (key === 37 && this.state.index !== 0)
        this.setState(prevState => ({ index: prevState.index - 1 }));
      if (
        key === 39 &&
        this.state.index !== this.props.currentMeal.imgs.length - 1
      )
        this.setState(prevState => ({ index: prevState.index + 1 }));
    };
    onCloseModalHandler = () => {
      this.setState({ mode: false });
    };
    onAddHandler = (id, count) => {
      const token = this.props.token;

      this.props.addToBasket(id, count, token);
    };
    onSelectHandler = e => {
      const count = e.target.value;
      this.setState({ count });
    };
    onImgChangeHandler = index => {
      this.setState({ index });
    };
    galleryClickHandler = index => {
      this.setState({
        index
      });
    };
    render() {
      const meal = this.props.currentMeal;
      if (this.props.addItemSucceed) {
        this.btnTextRef.current.innerHTML = '<span>&#10003;</span>';
        setTimeout(() => {
          if (this.btnTextRef.current)
            this.btnTextRef.current.innerHTML = '<span>Add to Basket</span>';
        }, 1000);
      }

      this.props.resetStatus();
      return !this.props.currentMeal ? (
        <LoadingModal />
      ) : (
        <div className={classes.container}>
          {this.state.mode && (
            <Modal
              closed={this.onCloseModalHandler}
              imgs={meal.imgs}
              index={this.state.index}
              selected={this.onImgChangeHandler}
            />
          )}
          <div className={classes.modal}>
            <img
              src={require('../../assets/images/MealList/logo.png')}
              onClick={() => this.props.history.push('/')}
              alt=''
            />

            <img
              className={classes.latern}
              src={require('../../assets/images/MealDetail/lantern.png')}
              alt=''
            />
            <div className={classes.mainArea}>
              <div className={classes.mainPic}>
                <div className={classes.mainPicContainer}>
                  <img
                    onClick={() => {
                      this.setState({ mode: true });
                    }}
                    src={meal.imgs[this.state.index]}
                    alt='mainImg'
                  />
                </div>
                <div className={classes.gallery}>
                  {meal.imgs.map((ele, i) => (
                    <div
                      key={ele + i}
                      onClick={() => this.galleryClickHandler(i)}>
                      <img src={ele} alt={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.detail}>
                <h2>{meal.name}</h2>
                <p>{meal.chineseName}</p>

                <div className={classes.specs}>
                  <SpicePanel spiceDegree={5} />
                  <p className={classes.MonthlyCount}>
                    monthly sales: {meal.monthlySaleCount}
                  </p>
                  <strong className={classes.price}>
                    Price: {meal.price}$
                  </strong>
                  <div className={classes.selectPanel}>
                    <small>Count:</small>
                    <select
                      value={this.state.count}
                      onChange={this.onSelectHandler}>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </select>
                  </div>

                  <Button
                    btn
                    onClick={() =>
                      this.onAddHandler(meal.id, this.state.count)
                    }>
                    <p ref={this.btnTextRef}>
                      <span>Add to Basket</span>
                    </p>
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
