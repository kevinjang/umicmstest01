import GlobalHeader from '@ant-design/pro-layout/lib/GlobalHeader';
import {connect} from 'umi'

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


}

export default connect(({global, loading})=>({
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices
}))(GlobalHeaderDropdown);