import React, {Component} from 'react'
import rickImg from '../../images/rick.png'
import styles from './styles.css';

class Home extends Component{
  render() {
    return (
      <div className={styles.root}>
        {'天天号线123'}
        <img src={rickImg} alt="hotspot" />
      </div>
    );
  }
}

export default Home
