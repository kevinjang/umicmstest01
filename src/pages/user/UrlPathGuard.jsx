
import { flatMapDeep } from 'lodash'
import { Redirect } from 'umi';
const UrlPathGuard = ({ routes, history, children }) => {
    const realPaths = flatMapDeep(flatMapDeep(routes, "routes"), "path");
    console.log('realPaths& history:', realPaths, history)
    const currentPath = history.location.pathname;
    var validUrlPath = !!currentPath && realPaths.indexOf(currentPath) > -1;
    // if(){
    // }
    return (
        <>
            {
                validUrlPath? children : <Redirect to="/404" />
            }
        </>
    )
}

export default UrlPathGuard