import styles from './BannerDocker.css'

const BannerDocker = (props) => {
    const {mode} = props
    console.log('mode:', mode)
    return (
        <div {...props} className={styles.root}>
            {props.children}
        </div>
    )
}

BannerDocker.mode = "vertical" || "horizontal"

export default BannerDocker;