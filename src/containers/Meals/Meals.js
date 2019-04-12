import React, { Component } from 'react';
import classes from './MealList.css';
import MealList from './MealList/MealList';
import { connect } from 'react-redux';
import { startFetchList } from '../../store_redux/meals/meals';

const mps = state => ({
  list: state.meals.list
});
const mpd = dispatch => ({
  fetchList: () => {
    dispatch(startFetchList());
  }
});
export default connect(
  mps,
  mpd
)(
  class Meals extends Component {
    onSelectHandler = id => {
      this.props.history.push(`meal/${id}`);
    };
    componentDidMount() {
      this.props.fetchList();
    }

    render() {
      return (
        <div className={classes.container}>
          <section className={classes.main}>
            <img
              src='http://www.happypandatx.com/wp-content/uploads/2017/12/happypanda_logo.png'
              alt=''
            />
            <img
              className={classes.panda}
              src='https://dejpknyizje2n.cloudfront.net/marketplace/products/cute-panda-icon-sticker-1539641331.8735018.png'
              alt=''
            />
            <img
              className={classes.panda}
              src='https://cdn3.iconfinder.com/data/icons/spa-flat-colorful/614/4600_-_Bamboo_Stick-512.png'
              alt=''
            />
            <div className={classes.searchBar}>
              <input type='text' />
              <button>search</button>
            </div>
            <MealList list={this.props.list} onClick={this.onSelectHandler} />
          </section>
        </div>
      );
    }
  }
);
