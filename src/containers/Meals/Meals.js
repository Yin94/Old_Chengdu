import React, { Component, createRef } from 'react';
import classes from './MealList.css';
import MealList from './MealList/MealList';
import { connect } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import LoadingModal from '../../UI/LoadingModal/LoadingModal';
import { startFetchList } from '../../store_redux/meals/meals';

const mps = state => ({
  list: state.meals.list,
  firstSearch: state.meals.firstSearch,
  currentPage: state.meals.pageIndex + 1,
  totalCount: state.meals.totalCount,
  error: state.meals.error,
  succeed: state.meals.succeed,
  loading: state.meals.loading
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
      return (
        <div className={classes.container}>
          <section className={classes.main}>
            <img
              src={require('../../assets/images/MealList/logo.png')}
              alt='logo'
            />
            <img
              className={classes.panda}
              src={require('../../assets/images/MealList/panda_eating.png')}
              alt='panda_eating'
            />
            <img
              className={classes.panda}
              src={require('../../assets/images/MealList/bamboo.png')}
              alt='bamboo'
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
            {this.props.loading && <LoadingModal />}
          </section>
        </div>
      );
    }
  }
);
