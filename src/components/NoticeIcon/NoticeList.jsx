import {List} from 'antd'

const NoticeList = (props)=>{
    return (
        <div>
            <List dataSource={[]} renderItem={(item, index)=>{
                return (
                    <List.Item extra={<div>extra info like status,etc.</div>}>
                        <List.Item.Meta title={""} description={""} />
                    </List.Item>
                );
            }}>
                
            </List>
        </div>
    );
}

export default NoticeList;