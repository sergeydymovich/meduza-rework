import React, {useState} from 'react';
import './App.css';
import NewsItem from "../NewsItem/NewsItem.js"
import AdminPanel from "../AdminPanel/AdminPanel.js"
import icon from "../../assets/icon.png"
import { connect } from 'react-redux'
import { toogleAdminPanel, filterNews } from '../../actions/news.actions.js';


function App(props) {

const [filter, setFilter] = useState("");
const tooglePanel = () => {
  props.tooglePanel()
}
const filterNews = (e) => {
  setFilter(e.target.value)
  props.filterNews(e.target.value)
}
const news = props.filteredArr.length > 0 || filter  ? props.filteredArr : props.newsArr;

  return (
    <div className="App">
      <div className="header">
          <h1 className="title">DYMOVICH NEWS</h1>
          { props.isAdmin && <img className="main-img" src={icon} alt="xxx" onClick={ () => tooglePanel()} />}
          <div className="header-input">
            <input type="text" onChange={ (e) => filterNews(e)} placeholder="Search..." />
            
            <button>log in</button>
          </div>    
      </div> 
      {props.showPanel && <AdminPanel />} 
      <div className="content">
        {!props.filteredArr.length &&  filter && <strong>НИЧЕГО НЕ НАЙДЕНО...</strong>}
        <ul className="news">
          {news.map( (elem, i) => (
            <NewsItem
            key={i}
            content={elem.content}
            time={elem.date}
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


