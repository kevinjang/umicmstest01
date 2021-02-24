import { Card, Row, Col, PageHeader, Button, message, Space } from 'antd'
import { PlusCircleTwoTone, ExpandAltOutlined, ExpandOutlined } from '@ant-design/icons'
import { useState } from 'react'


export default () => {
    const [rooms, setRooms] = useState([
        {
            key: 'room1',
            name: '1501',
            description: 'hahahahahahaha'
        },
        {
            key: 'room2',
            name: '1502',
            description: 'hahahahahahaha'
        },
        {
            key: 'room3',
            name: '1503',
            description: 'hahahahahahaha'
        },
        {
            key: 'room4',
            name: '1504',
            description: 'hahahahahahaha'
        },
        {
            key: 'room5',
            name: '1505',
            description: 'hahahahahahaha'
        },
    ]);

    return (
        <div >
            <PageHeader title="会议室管理" extra={<PlusCircleTwoTone style={{ fontSize: 24 }} onClick={() => {
                message.info("test")
                const max = rooms.length;
                const roomsNew = [...rooms];
                roomsNew.push({
                    key: `room${max + 1}`,
                    name: max + 1 >= 10 ? `15${max + 1}` : `150${max + 1}`,
                    description: 'hahahahahahaha'
                });
                setRooms(roomsNew);
            }} />}>
                <Row gutter={4}>
                    {rooms.map((item, index) => {
                        return (
                            <Col key={index} span={6}>
                                <Card title={item.name}
                                    hoverable
                                    size={"small"}
                                    key={item.key} style={{ width: 250, height: 150, marginTop: '5px' }}

                                >
                                    <div>
                                        {item.description}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '0px', width: '100%', left: 0, padding: '5px 10px' }}>
                                        <ExpandAltOutlined style={{ float: 'right' }} onClick={()=>{
                                            message.success("扩大显示");
                                        }} />
                                    </div>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </PageHeader>
        </div>
    )
}