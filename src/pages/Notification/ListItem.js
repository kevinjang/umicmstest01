import React from 'react'

import { List, Avatar, Button } from 'antd'

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <List split={true} style={{ cursor: 'pointer' }}
                    loadMore={
                        <Button style={{ width: '100%', marginTop: '5px' }} type="default">
                            加载更多
                                </Button>
                    }
                    dataSource={this.props.dataSource}
                    itemLayout="horizontal"
                    renderItem={(item) => {

                        return <List.Item>
                            <List.Item.Meta avatar={<Avatar
                                src={item.avatar ? item.avatar : ''}
                                icon={item.icon ? item.icon : ''}></Avatar>}
                                title={item.title}
                                description={item.description}>

                            </List.Item.Meta>
                        </List.Item>
                    }}>
                </List>
            </div>
        )
    }
}

export default ListItem;