import React from 'react'

import { List, Avatar, Button, Tag, message } from 'antd'

import styles from './ListItem.css'

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onTagClicked = (item) =>{
        console.log('onTagClicked-item:',item)
        if(this.props.callSetState){

            this.props.callSetState(item);
        }
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
                        return <List.Item extra={item.type === 'todo' ? (
                        <Tag 
                            color={item.completed ? "red" : "#87d068"} //style={{ float: 'right' }} 
                            onClick={(e)=>{
                                // message.info('tag clicked');
                                console.log('tag-item:', item);
                                const itemNew = {
                                    ...item, 
                                    completed: !item.completed
                                }
                                this.onTagClicked(itemNew);
                            }}
                            >
                            {item.completed ? '未完成' : '已完成'}
                        </Tag>
                        ) : ''}>

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