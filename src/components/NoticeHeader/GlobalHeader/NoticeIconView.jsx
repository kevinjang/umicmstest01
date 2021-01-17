
import {connect} from 'umi'
import NoticeIcon from '../NoticeIcon/index'

class GlobalHeaderDropdown extends React.Component {
    constructor(props){
        super(props);
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
        return <NoticeIcon style={{height: '500px', width: '300px'}} >
            <NoticeIcon.Tab>
            </NoticeIcon.Tab>
        </NoticeIcon>
    }
}

export default connect(({global, loading})=>({
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices
}))(GlobalHeaderDropdown);
