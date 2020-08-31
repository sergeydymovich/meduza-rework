import React from 'react';
import './App.css';
import NewsItem from "./NewsItem.js"
import AdminPanel from "./AdminPanel.js"
import icon from "./images/icon.png"
import { connect } from 'react-redux'
import { toogleAdminPanel, filterNews } from './actions.js';


function App(props) {

const tooglePanel = () => {
  props.tooglePanel()
}
const filterNews = (e) => {
  props.filterNews(e.target.value)
}
const news = props.filteredArr.length > 0 ? props.filteredArr : props.newsArr;

  return (
    <div className="App">
      <div className="header">
          <h1>DYMOVICH NEWS</h1>
          { props.isAdmin && <img className="main-img" src={icon} alt="xxx" onClick={ () => tooglePanel()} />}
          <div className="header-input">
            <input type="text" onChange={ (e) => filterNews(e)} />
            <button>log in</button>
          </div>    
      </div> 
      {props.showPanel && <AdminPanel />} 
      <div className="content">
        <ul className="news">
          {news.map( (elem) => (
            <NewsItem
            content={elem.content}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const mapDispatchToProps =  dispatch => ({
  tooglePanel: () => dispatch(toogleAdminPanel()),
  filterNews: (value) => dispatch(filterNews(value))
})

const mapStateToProps = state => ({
  isAdmin: state.news.isAdmin,
  showPanel: state.news.showAdminPanel,
  newsArr: state.news.newsArr,
  filteredArr: state.news.filteredArr
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


