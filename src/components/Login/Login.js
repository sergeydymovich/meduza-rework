import React from 'react';
import { connect } from 'react-redux'
import { tooglePopap } from '../../actions/news.actions.js';
import styles from "./Login.module.css";

function Login(props) {


  const showPopap = () => {
    props.showPopap();
  }
  

  return (
      <>         
        <button className={styles.login}  onClick={() => showPopap()}>log in</button>
      </>
  );
}

const mapDispatchToProps =  dispatch => ({
  showPopap: () => dispatch(tooglePopap()),
})

export default connect(
  null,
  mapDispatchToProps
)(Login)