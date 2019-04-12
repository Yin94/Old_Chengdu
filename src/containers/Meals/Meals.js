import React, { Component, createRef } from 'react';
import classes from './MealList.css';
import MealList from './MealList/MealList';
import { connect } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import { startFetchList } from '../../store_redux/meals/meals';

const mps = state => ({
  list: state.meals.list,
  firstSearch: state.meals.firstSearch,
  currentPage: state.meals.pageIndex + 1,
  totalCount: state.meals.totalCount,
  error: state.meals.error,
  succeed: state.meals.succeed
});
const mpd = dispatch => ({
  fetchList: (pageIndex, query, firstSearch) => {
    dispatch(startFetchList(pageIndex, query, firstSearch));
  }
});
export default connect(
  mps,
  mpd
)(
  class Meals extends Component {
    searchRef = createRef();
    onSelectHandler = id => {
      this.props.history.push(`meal/${id}`);
    };
    onSearchHandler = e => {
      if (e.target.name === 'searchBtn' || e.keyCode === 13) {
        const query = this.searchRef.current.value;
        this.props.fetchList(0, query, true);
      }
    };
    onPageNavHandler = index => {
      const query = this.searchRef.current.value;

      this.props.fetchList(index - 1, query);
    };
    componentDidMount() {
      this.props.fetchList(0, null, true);
    }

    render() {
      if (!this.props.succeed) return <div />;
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
              <input
                onKeyDown={this.onSearchHandler}
                type='text'
                ref={this.searchRef}
              />
              <button name='searchBtn' onClick={this.onSearchHandler}>
                search
              </button>
            </div>
            <MealList list={this.props.list} onClick={this.onSelectHandler} />
            <Pagination
              totalCount={this.props.totalCount}
              pageSelected={this.onPageNavHandler}
              currentPage={this.props.currentPage}
            />
          </section>
        </div>
      );
    }
  }
);
