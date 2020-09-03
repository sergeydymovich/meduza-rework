import React, {useState} from 'react';
import styles from './App.module.css';
import NewsItem from "../NewsItem/NewsItem.js"
import AdminPanel from "../AdminPanel/AdminPanel.js"
import Login from "../Login/Login.js"
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
      <div className={styles.header}>
          <h1 className={styles.title}>DYMOVICH NEWS</h1>
          { props.isAdmin && <img className={styles.blocknote} src={icon} alt="xxx" onClick={ () => tooglePanel()} />}
          <div className="header-input">
          <input type="text" onChange={ (e) => filterNews(e)} placeholder="Search news.." />
          <Login /> 
          </div>    
      </div> 
      {props.showPanel && <AdminPanel />} 
      <div className={styles.content}>
        {!props.filteredArr.length &&  filter && <strong>НИЧЕГО НЕ НАЙДЕНО...</strong>}
        <ul className={styles.news}>
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
  filterNews: (value) => dispatch(filterNews(value)),
  
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


