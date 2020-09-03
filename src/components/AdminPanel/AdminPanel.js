import React, {useState} from 'react';
import { connect } from 'react-redux'
import { addNew } from '../../actions/news.actions.js';
import styles from "./AdminPanel.module.css"

function AdminPanel(props) {

  const [news, setNews] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    props.addNew(news);
    setNews("");
  }

  

  return (
   <form className={styles.form} onSubmit={(e) => submitForm(e)}>
     <label>Заголовок</label>
     <textarea value={news} onChange={ (e) => setNews(e.target.value)} />
     <button type="submit"  >Добавить</button>
   </form>
  );
}

const mapDispatchToProps =  dispatch => ({
  addNew: (value) => dispatch(addNew(value)),
})

export default connect(
  null,
  mapDispatchToProps
)(AdminPanel)