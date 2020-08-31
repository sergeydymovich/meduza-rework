import React from 'react';


function NewsItem(props) {
  return (
   <li className="news-item">
     {props.content}
   </li>
  );
}

export default NewsItem;