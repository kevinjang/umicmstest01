import { Card, Row, Col, PageHeader, Button, message, Space } from 'antd'
import { PlusCircleTwoTone, ExpandAltOutlined, ExpandOutlined } from '@ant-design/icons'
import { useState } from 'react'
import DraggableModal from '../../components/DraggableModal/index'

const { Meta } = Card


export default () => {
    const [rooms, setRooms] = useState([
        {
            key: 'room1',
            name: '1501',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(1).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room2',
            name: '1502',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(2).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room3',
            name: '1503',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(3).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room4',
            name: '1504',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(4).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room5',
            name: '1505',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(5).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room6',
            name: '1506',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(6).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room7',
            name: '1507',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(7).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room8',
            name: '1508',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(8).jpeg',
            description: 'hahahahahahaha'
        },
        {
            key: 'room9',
            name: '1509',
            backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(9).jpeg',
            description: 'hahahahahahaha'
        },
    ]);
    const [visible, setVisible] = useState(false)

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
                <Row gutter={2}>
                    {rooms.map((item, index) => {
                        return (
                            <Col key={index} span={4}>
                                <Card title={false}
                                    hoverable
                                    size={"small"}
                                    key={item.key} style={{ width: 249, marginTop: '20px', marginBottom: '15px' }}//height: 200, 
                                    cover={item.backgroundImageSrc ? <img src={item.backgroundImageSrc} /> : null}
                                // extra={
                                //     <div>
                                //         test
                                //     </div>
                                // }
                                // footer={
                                //     <div>
                                //         test footer
                                //     </div>
                                // }
                                >
                                    {/* <div>
                                        {item.description}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '0px', width: '100%', left: 0, padding: '5px 10px' }}>
                                        <ExpandAltOutlined style={{ float: 'right' }} onClick={() => {
                                            // message.success("扩大显示");
                                            setVisible(true);
                                        }} />
                                    </div> */}
                                    <Meta title={item.name} description={
                                        <div style={{ position: 'absolute', bottom: '0px', width: '100%', left: 0, padding: '5px 10px' }}>
                                            <ExpandAltOutlined style={{ float: 'right' }} onClick={() => {
                                                setVisible(true);
                                            }} />
                                        </div>
                                    }>

                                    </Meta>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </PageHeader>
            <DraggableModal title={"编辑会议室信息"} visible={visible} closable={true} onOk={() => {
                setVisible(false);
            }} onCancel={() => {
                setVisible(false);
            }} centered >

            </DraggableModal>
        </div>
    )
}