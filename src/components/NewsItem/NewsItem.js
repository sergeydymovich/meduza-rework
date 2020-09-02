import React  from 'react';
import { connect } from 'react-redux'

function NewsItem(props) {

    const index = props.content.indexOf(props.filterWord)
    const subStr1 = props.content.slice(0, index)
    const subStr2 = props.content.slice(index + props.filterWord.length, props.content.length)

    const minutesLeft = Math.trunc((new Date() - props.time)/1000/60)
    const hoursLeft = Math.trunc((new Date() - props.time)/1000/60/60)
    const timeLeft = minutesLeft > 59 ? hoursLeft  : minutesLeft; 

    
  return (
   <li className="news-item">
     {subStr1}
      <strong className="finded-text">{props.filterWord}</strong>
      {subStr2}
      <p className="date">
        {timeLeft} 
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