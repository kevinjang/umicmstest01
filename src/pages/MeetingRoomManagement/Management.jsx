import { Card, Row, Col, PageHeader, Button, message, Space, Form, Input, InputNumber, Select } from 'antd'
import { PlusCircleTwoTone, ExpandAltOutlined, ExpandOutlined } from '@ant-design/icons'
import { useState, useEffect, } from 'react'
import DraggableModal from '../../components/DraggableModal/index'
import { connect } from 'umi'
// import Form from 'antd/lib/form/Form'

const { Meta } = Card
const { TextArea } = Input


const Management = (props) => {
    const { meeting_room, dispatch, getRoomInfo } = props;

    // const roomsOri = props.rooms || [];
    // const [rooms, setRooms] = useState([
    //     ...props.rooms
    // ]);
    var rooms = [...props.rooms]

    useEffect(() => {
        // getRoomInfo && getRoomInfo();
        dispatch && dispatch({
            type: 'meeting_room/getMeetingRoomInfo'
        });
        // console.log('props.rooms:', props.rooms)
        // setRooms(props.rooms);
    }, [])

    const len = 10;
    rooms = rooms.map((item, index) => {
        if (index < len) {
            // Object.keys(item).push("backgroundImageSrc")
            Object.assign(item, {
                backgroundImageSrc: `http://localhost:8000/images/card-images/card-background-image%20(${index + 1}).jpeg`
            })
            // item['backgroundImageSrc'] = `http://localhost:8000/images/card-images/card-background-image%20(${index + 1}).jpeg`
        } else {
            const repeat = index / len;
            // Object.keys(item).push("backgroundImageSrc")
            Object.assign(item, {
                backgroundImageSrc: `http://localhost:8000/images/card-images/card-background-image%20(${index  - (len * repeat) + 1}).jpeg`
            })
            // item['backgroundImageSrc'] = `http://localhost:8000/images/card-images/card-background-image%20(${index - (len * repeat) + 1}).jpeg`
        }
    })
    // getRoomInfo && getRoomInfo();

    // dispatch && dispatch({
    //     type: 'meeting_room/getMeetingRoomInfo'
    // });

    // console.log("roomsOri:", roomsOri)
    // [
    //     {
    //         key: 'room1',
    //         roomno: 1,
    //         roomname: '1501',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(1).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room2',
    //         roomno: 2,
    //         roomname: '1502',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(2).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room3',
    //         roomno: 3,
    //         roomname: '1503',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(3).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room4',
    //         roomno: 4,
    //         roomname: '1504',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(4).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room5',
    //         roomno: 5,
    //         roomname: '1505',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(5).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room6',
    //         roomno: 6,
    //         roomname: '1506',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(6).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room7',
    //         roomno: 7,
    //         roomname: '1507',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(7).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room8',
    //         roomno: 8,
    //         roomname: '1508',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(8).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    //     {
    //         key: 'room9',
    //         roomno: 9,
    //         roomname: '1509',
    //         roomsize: 20,
    //         roompos: '15F(近人力资源办公区)',
    //         projector: '0',
    //         backgroundImageSrc: 'http://localhost:8000/images/card-images/card-background-image%20(9).jpeg',
    //         notes: '如需支持,请联系分机：7500/7501',
    //         avail: 1
    //     },
    // ]
    const [visible, setVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState({

    })



    return (
        <div >
            <PageHeader title="会议室管理" extra={<PlusCircleTwoTone style={{ fontSize: 24 }} onClick={() => {
                // message.info("test")
                const max = rooms.length;
                const roomsNew = [...rooms];
                roomsNew.push({
                    key: `room${max + 1}`,
                    name: max + 1 >= 10 ? `15${max + 1}` : `150${max + 1}`,
                    description: '如需支持,请联系分机：7500/7501'
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
                                    key={item.key} style={{ width: 249, marginTop: '20px', marginBottom: '15px' }}
                                    cover={item.backgroundImageSrc ? <img src={item.backgroundImageSrc} /> : null}
                                >
                                    <Meta title={item.roomname} description={
                                        <div style={{ position: 'absolute', bottom: '0px', width: '100%', left: 0, padding: '5px 10px' }}>
                                            <ExpandAltOutlined style={{ float: 'right' }} onClick={(ev, it = { ...item }) => {
                                                setVisible(true);
                                                setCurrentItem(item)
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
            <DraggableModal title={"编辑会议室信息"} visible={visible} closable={true}
                destroyOnClose={true}
                onOk={() => {
                    setVisible(false);
                }} onCancel={() => {
                    setVisible(false);
                }} centered >
                <Form >
                    <Form.Item label="会议室名称" name="roomname" required initialValue={currentItem.roomname} labelCol={{
                        span: 6
                    }} rules={[
                        { required: true, message: '必填' }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="会议室容量" name="roomsize" required initialValue={currentItem.roomsize} labelCol={{
                        span: 6
                    }} rules={[
                        { required: true, message: '必填' }
                    ]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="会议室位置" name="roompos" required initialValue={currentItem.roompos} labelCol={{
                        span: 6
                    }} rules={[
                        { required: true, message: '必填' }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="是否有投影" name="projector" required initialValue={currentItem.projector} labelCol={{
                        span: 6
                    }} rules={[
                        { required: true, message: '必选' }
                    ]}>
                        <Select >
                            <Select.Option value={'1'}>
                                有
                            </Select.Option>
                            <Select.Option value={'0'}>
                                无
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="会议室状态" name="avail" required initialValue={currentItem.avail} labelCol={{
                        span: 6
                    }} rules={[
                        { required: true, message: '必选' }
                    ]} >
                        <Select >
                            <Select.Option value={1}>
                                有效
                            </Select.Option>
                            <Select.Option value={0}>
                                无效
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="备注" initialValue={currentItem.avail} labelCol={{
                        span: 6
                    }} >
                        <TextArea>

                        </TextArea>
                    </Form.Item>
                </Form>
            </DraggableModal>
        </div>
    )
}
export default connect(({ meeting_room, loading }) => {
    console.log('meeting_room.data:', meeting_room.data)
    return {
        getRoomInfo: loading.effects['meeting_room/getMeetingRoomInfo'],
        rooms: meeting_room.data,
        // meeting_room
    }
})(Management);