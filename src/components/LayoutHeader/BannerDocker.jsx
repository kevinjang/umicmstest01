import styles from './BannerDocker.css'
import {Space} from 'antd'

const BannerDocker = (props) => {
    const {mode} = props
    console.log('mode:', mode)
    return (
        <div {...props} className={styles.root}>
            {/* <Space>{props.children}</Space> */}
            {props.children}
        </div>
    )
}

BannerDocker.mode = "vertical" || "horizontal"

export default BannerDocker;