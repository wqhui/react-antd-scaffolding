import React from 'react'
import ReactDOM from 'react-dom'
import styles from './app.less'
import up from './assets/images/up.jpeg'
import xiaoxin from './assets/images/xiaoxin.jpeg'
import { Rate } from 'antd';

function App(){
    return <div>
        <h1 className={styles.h1}>Hello, world!</h1>
        <Rate />
        <div>
            <img src={xiaoxin}  style={{width:'50px'}}  alt="xiaoxin" />
            <img src={up} style={{width:'50px'}}   alt="up" />
        </div>
    </div>
}

function renderApp() {
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );
}

export default renderApp
