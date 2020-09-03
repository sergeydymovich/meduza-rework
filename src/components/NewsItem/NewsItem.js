import React  from 'react';
import { connect } from 'react-redux'
import { declOfNum }  from "../../utils/date.utils.js"
import { filterString }  from "../../utils/string.utils.js"
import styles from "./NewsItem.module.css"

function NewsItem(props) {


    const minutesLeft = Math.trunc((new Date() - props.time)/1000/60); 

    const timeLeft = (minutesLeft) => {
      if (minutesLeft < 60) return minutesLeft;
      if (minutesLeft >= 60 && minutesLeft < 1440) return  Math.trunc((new Date() - props.time)/1000/60/60);
      return Math.trunc((new Date() - props.time)/1000/60/60/24);
    }

    const textForms = (minutesLeft) => {
      if (minutesLeft < 59) return [' минута ', ' минуты ', ' минут '];
      if (minutesLeft > 59 && minutesLeft < 1440) return  [' час ', ' часа ', ' часов '];
      return [' день ', ' дня ', ' дней '] 
    } 

    let filteredArr = props.filterWord ? filterString(props.content, props.filterWord) : "";

  return (
   <li className={styles.item}>
     {props.filterWord.length > 0 ?
        filteredArr.map(elem => (
          elem === props.filterWord ? <strong className={styles.text}>{elem}</strong> : elem
        )) 
        :
        props.content
     }
      <p className={styles.date}>
        {timeLeft(minutesLeft) ? timeLeft(minutesLeft) : ""} {declOfNum( timeLeft(minutesLeft), textForms(minutesLeft) )} назад 
        </p>
   </li>
  );
}

const mapStateToProps = state => ({
  filterWord: state.news.filterWord,
})

export default connect(
  mapStateToProps,
  null
)(NewsItem)