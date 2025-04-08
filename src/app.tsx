import { Flex } from 'antd'
import webpackLogo from '@/assets/images/webpack.jpg'
import antdLogo from '@/assets/images/antd.svg' 
import reactLogo from '@/assets/images/react.png'

import styles from './app.less'

function App() {
  return (
    <Flex className={styles.app} vertical>
      <div className={styles.logos}>
        {/* <svg
          className={styles.logo}
          viewBox='-10.5 -9.45 21 18.9'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='rgb(8, 126, 164)'
        >
          <circle cx='0' cy='0' r='2' fill='currentColor'></circle>
          <g stroke='currentColor' strokeWidth='1' fill='none'>
            <ellipse rx='10' ry='4.5'></ellipse>
            <ellipse rx='10' ry='4.5' transform='rotate(60)'></ellipse>
            <ellipse rx='10' ry='4.5' transform='rotate(120)'></ellipse>
          </g>
        </svg> */}
        <img className={styles.logo} src={reactLogo} alt='Antd' />
        <img className={styles.logo} src={antdLogo} alt='Antd' />
        <img className={styles.logo} src={webpackLogo} alt='Webpack' />
      </div>
      <h1>React 19 + Ant Design 5 + Webpack 5</h1>
      <p className={styles.welcome}>Hello World</p>
    </Flex>
  )
}

export default App
