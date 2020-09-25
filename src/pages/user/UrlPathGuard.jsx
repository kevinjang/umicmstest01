
import { flatMapDeep } from 'lodash'
import { Redirect, connect } from 'umi';
import moment from 'moment'
// import Encryption from 'encrypt-decrypt-library';
import AESEncryption, { AESTYPE } from 'aes-crypto';
import { notification } from 'antd'

const UrlPathGuard = ({ routes, history, children, loginState }) => {
    const realPaths = [...flatMapDeep(flatMapDeep(routes, "routes"), "path"), ...flatMapDeep(routes, "path")];
    // console.log('realPaths:', realPaths)
    const currentPath = history.location.pathname;
    var validUrlPath = !!currentPath && realPaths.indexOf(currentPath) > -1;
    // if(){
    // }
    // const {} = 

    const currentDateTime = new Date();
    return (
        <>
            {
                loginState ? (validUrlPath ? children : <Redirect to="/404" />) : <Redirect to="/" />
            }
        </>
    )
}

export default connect(({ login }) => ({
    loginState: login.loginState
}))(UrlPathGuard)