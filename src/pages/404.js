import styles from './404.css'
export default ({ history }) => {
    console.log("history:", history);
    return <div>
        <div className={styles.root}>
            <div className={styles.text}>
                404 Page
                <div className={styles.lost}> 
                    Looks like you are lost!
                </div>
            </div>
        </div>
    </div>
}