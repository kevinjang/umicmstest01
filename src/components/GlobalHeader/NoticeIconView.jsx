import NoticeIcon from '../NoticeIcon/'

class GlobalHeaderDropdown extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (<NoticeIcon >
            <NoticeIcon.Tab title="通知" tabKey="notification"  />
        </NoticeIcon>);
    }
}

export default GlobalHeaderDropdown