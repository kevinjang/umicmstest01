import NoticeIcon from '../NoticeIcon/'
import {connect} from 'umi'

class GlobalHeaderDropdown extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const {dispatch} = this.props;
        if(dispatch){
            dispatch({
                type: 'global/fetchNotices'
            })
        }
    }

    render(){
        return (<NoticeIcon >
            <NoticeIcon.Tab title="通知" tabKey="notification"  />
        </NoticeIcon>);
    }
}

export default connect(({global, loading})=>({
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices
}))(GlobalHeaderDropdown);