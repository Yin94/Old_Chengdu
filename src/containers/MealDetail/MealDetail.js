import React, { Component, createRef } from 'react';
import classes from './MealDetail.css';
import Button from '../../UI/Button/Button';
import SpicePanel from '../../components/SpicePanel/SpicePanel';
import {
  startQueryMeal,
  startAddToBasket
} from '../../store_redux/meals/meals';
import { connect } from 'react-redux';

const mps = state => ({
  token: state.auth.token,
  list: state.meals.list,
  currentMeal: state.meals.cur
});
const mpd = dispatch => ({
  fetchMeal: id => {
    dispatch(startQueryMeal(id));
  },
  addToBasket: (id, count, token) => {
    dispatch(startAddToBasket(id, count, token));
  }
});
export default connect(
  mps,
  mpd
)(
  class MealDetail extends Component {
    state = {
      count: 1
    };
    countRef = createRef();
    componentDidMount() {
      if (this.props.currentMeal === {}) return;
      const id = this.props.match.params.id;
      this.props.fetchMeal(id);
    }

    onAddHandler = (id, count) => {
      const token = this.props.token;
      this.props.addToBasket(id, count, token);
    };
    onSelectHandler = e => {
      const count = e.target.value;
      this.setState({ count });
    };
    render() {
      const meal = this.props.currentMeal;
      return (
        <div className={classes.container}>
          <div className={classes.modal}>
            <img
              src='https://i.pinimg.com/originals/c0/09/de/c009de8da90e99fd96c72eb4a8194a37.png'
              alt=''
            />
            <img
              className={classes.latern}
              src='https://images.vexels.com/media/users/3/158473/isolated/preview/6240a4222abfa5dc8290ef557f17bed8-chinese-lantern-flat-by-vexels.png'
              alt=''
            />
            <div className={classes.mainArea}>
              <div className={classes.mainPic}>
                <img src={meal.img} alt='' />
              </div>
              <div className={classes.detail}>
                <h2>{meal.name}</h2>
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
                    style={{
                      gridArea: 'btn',
                      display: 'block',
                      width: '80%',
                      border: '0',
                      padding: '5%',
                      margin: '0 auto',
                      color: 'white',
                      fontSize: '1.2em',
                      backgroundColor: 'green'
                    }}
                    onClick={() =>
                      this.onAddHandler(meal.id, this.state.count)
                    }>
                    Add to Basket
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
