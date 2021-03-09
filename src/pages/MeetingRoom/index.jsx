import { DatePicker, Layout, Row, Col, Card, Timeline, Divider, Slider, message, Modal, Form, Select, Input, InputNumber, Alert, Typography, Avatar } from 'antd'
// import {TextArea} from 'antd/lib/text'
import moment from 'moment'
import { UserContext, MyUserData } from '../UserContextMock'
import React, { useState, useEffect, createRef } from 'react'
import { LeftCircleTwoTone, RightCircleTwoTone, ClockCircleOutlined, UpCircleTwoTone, SettingTwoTone, ThunderboltTwoTone, FormOutlined } from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars'
import classnames from 'classnames'
import styles from './index.css'
import DraggableModal from '../../components/DraggableModal/index'
import Draggable from 'react-draggable'

const { Sider, Content, Header } = Layout
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const { Title, Paragraph } = Typography


export default () => {

    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month() + 1)
    const [date, setDate] = useState(moment().date())
    const months = []
    const calendarWidth = 300;
    const [modalVisible, setModalVisible] = useState(false)
    const [newVisi, setNewVisi] = useState(false);
    const [form] = Form.useForm();
    const formRef = createRef();
    const formItemLen = 350;
    const [bounds, setBounds] = useState({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    })
    const [disabled, setDisabled] = useState(true)
    const draggableRef = createRef();

    const weeks = [
        {
            key: 7,
            text: 'Sunday',
            abbr: 'Sun',
            style: {
                backgroundColor: '#91d5ff',
                padding: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        {
            key: 1,
            text: 'Monday',
            abbr: 'Mon',
            style: {
                backgroundColor: '#91d5ff',
                padding: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        {
            key: 2,
            text: 'Tuesday',
            abbr: 'Tue',
            style: {
                backgroundColor: '#91d5ff',
                padding: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        {
            key: 3,
            text: 'Wednesday',
            abbr: 'Wed',
            style: {
                backgroundColor: '#91d5ff',
                padding: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        {
            key: 4,
            text: 'Thursday',
            abbr: 'Thu',
            style: {
                backgroundColor: '#91d5ff',
                padding: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        {
            key: 5,
            text: 'Friday',
            abbr: 'Fri',
            style: {
                backgroundColor: '#91d5ff',
                padding: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        {
            key: 6,
            text: 'Saturday',
            abbr: 'Sat',
            style: {
                backgroundColor: '#91d5ff',
                padding: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white'
            }
        }
    ]

    const timeSpan = [
        {
            key: 0,
            text: '8:00',
            value: 800,
            type: 'worktime'
        },
        {
            key: 5,
            text: '8:30',
            value: 830
        },
        {
            key: 10,
            text: '9:00',
            value: 900
        },
        {
            key: 15,
            text: '9:30',
            value: 930,
        },
        {
            key: 20,
            text: '10:00',
            value: 1000
        },
        {
            key: 25,
            text: '10:30',
            value: 1030
        },
        {
            key: 30,
            text: '11:00',
            value: 1100
        },
        {
            key: 35,
            text: '11:30',
            value: 1130
        },
        {
            key: 40,
            text: '12:00',
            value: 1200
        },
        {
            key: 45,
            text: '13:00',
            value: 1300
        },
        {
            key: 50,
            text: '13:30',
            value: 1330
        },
        {
            key: 55,
            text: '14:00',
            value: 1400
        },
        {
            key: 60,
            text: '14:30',
            value: 1430
        },
        {
            key: 65,
            text: '15:00',
            value: 1500
        },
        {
            key: 70,
            text: '15:30',
            value: 1530
        },
        {
            key: 75,
            text: '16:00',
            value: 1600
        },
        {
            key: 80,
            text: '16:30',
            value: 1630
        },
        {
            key: 85,
            text: '17:00',
            value: '1700'
        },
        {
            key: 90,
            text: '17:30',
            value: 1730
        },
        {
            key: 95,
            text: '18:00',
            value: 1800
        }
    ];

    const [selected, setSelected] = useState([])

    let timeSpans = {}

    for (let i = 0; i < timeSpan.length; i++) {
        timeSpans = {
            [`${timeSpan[i].key}`]: timeSpan[i].text,
            ...timeSpans
        }
    }

    // let currentMonth = moment().month() + 1;
    let daysInMonth = moment(`${year - month - date}`).daysInMonth();

    // useEffect(()=>{

    // }, [month])

    let dateInWeek = [];

    for (let i = 0; i < daysInMonth; i++) {
        let date = moment(`${year}-${month}-${i + 1}`).format("YYYY-MM-DD");
        let dIW = moment(date).format('ddd');
        // console.log('dIW:', dIW);
        dateInWeek.push({
            key: i + 1,
            date,
            weekday: dIW
        })
    }
    const dinWeekIndex = weeks.findIndex(item => item.abbr === dateInWeek[0].weekday);

    for (let i = 0; i < dinWeekIndex; i++) {
        dateInWeek.unshift({
            key: i - 1,
            date: '',
            weekday: ''
        })
    }

    const gutterSpan = 24;

    // let date = moment().format("YYYY-MM-DD");

    // const newMome = moment(date);
    // console.log(moment().weekday()); // 数字，当天是当周哪天
    // console.log(moment.weekdays()); // 当月天数

    // console.log(moment().weeks());console.log(moment().week());  // 数字，当前是全年第几周
    // console.log(moment().day()); // 数字，当前是周几
    // console.log(moment.weekdaysMin()); // 字符串数组，2字母缩写各周天
    // console.log(moment.weekdaysShort());  // 字符串数组，3字母缩写各周天
    // console.log(moment("2021-02-27").format("ddd")); // dd-Th, ddd-Thu,dddd-Thursday


    for (let i = 0; i < 12; i++) {
        months.push(i + 1);
    }

    const rootDivNode = [];
    let divNode = null;
    for (let i = 0; i < dateInWeek.length; i++) {
        if (i % 7 === 0) {
            divNode = React.createElement("div", {
                children: [],
                key: i % 7,
                style: {
                    display: 'flex'
                }
            });

            rootDivNode.push(divNode)
        }
        const spanNode = React.createElement(Card.Grid, {
            children: [`${dateInWeek[i].date === '' ? '' : moment(dateInWeek[i].date).date()}`],
            style: {
                textAlign: 'center',
                width: '14.3%',
                padding: '10px 0',
                backgroundColor: `${moment(dateInWeek[i].date).month() + 1 === month && moment(dateInWeek[i].date).date() === date ? '#4380D3' : 'white'}`,
                opacity: '0.5',
                fontWeight: 'bold',
                cursor: 'pointer',

            },
            key: i,
            onClick: (x, item = { ...dateInWeek[i] }) => {
                console.log('dateInWeek item:', item);
                const { date } = item;
                const d = moment(date).date();
                setDate(d);
            }
        });
        // spanNode.appendChild(React.createElement("",));
        if (divNode)
            divNode.props.children.push(spanNode);
    }

    const timeSpanStyle = classnames(styles.timeSpan, (item) => ({
        backgroundColor: `${selected.indexOf(item.value) > -1 ? 'darkblue' : 'transparent'}`
    }));

    const calendarActions = [
        {
            key: '1',
            icon: <SettingTwoTone />,
            text: '设置',
            onClick: () => {
                message.info('嘿哈~')
            }
        },
        {
            key: '2',
            icon: <ThunderboltTwoTone />,
            text: '今天',
            onClick: () => {
                const date = moment();
                setYear(date.year())
                setMonth(date.month() + 1);
                setDate(date.date());
            }
        }
    ].map((action, index) => {
        return (<div onClick={action.onClick} key={action.key}>
            {action.icon} {action.text}
        </div>)
    })

    const book = (ev, item) => {
        setModalVisible(true);
    }

    return (
        <UserContext.Consumer>
            {value => {
                const { sizeInfo } = value
                const { content } = sizeInfo
                // console.log('value:', value)
                return (
                    <>
                        <div style={{ width: '100%', backgroundColor: 'lightcyan' }}>
                            <Layout >
                                <Content theme={"light"} style={{
                                    width: '100%',
                                    height: `calc(100vh - ${sizeInfo.header.height}px - ${sizeInfo.bc.height}px - ${sizeInfo.footer.height}px)`,
                                    display: 'flex'
                                }}>
                                    <Scrollbars >
                                        <div style={{ display: 'flex' }}>
                                            <Sider width={calendarWidth} theme={"light"}>
                                                <div style={{ border: '1px solid lightgray', width: `${calendarWidth}px` }} id="calendar">
                                                    <div id="yearNmonth" style={{ textAlign: 'center', padding: '10px 0', backgroundColor: 'white' }}>
                                                        <Row gutter={4}>
                                                            <Col span={4}>
                                                                <LeftCircleTwoTone onClick={() => {
                                                                    setMonth(month - 1)
                                                                }} />
                                                            </Col>
                                                            <Col span={16}>
                                                                {year} - {moment(`${year}-${month}-${date}`).format("MM")} - {moment(`${year}-${month}-${date}`).format("DD")}
                                                            </Col>
                                                            <Col span={4}>
                                                                <RightCircleTwoTone onClick={() => {
                                                                    setMonth(month + 1);
                                                                }} />
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                    <div id="weekly" style={{ display: 'flex' }}>
                                                        {weeks.map((weekday, index) => {
                                                            return (
                                                                <div key={weekday.key} style={{ width: '14.3%', ...weekday.style }}>
                                                                    {weekday.abbr}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <Card title={false} bodyStyle={{ padding: '0' }} actions={calendarActions}>
                                                        {
                                                            rootDivNode.map((div, index) => {
                                                                return (
                                                                    <span key={index}>
                                                                        {div}
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </Card>
                                                </div>

                                            </Sider>
                                            <Content>
                                                <div style={{ width: '99%', marginLeft: '10px' }} id="booking">
                                                    <Card title={1504} extra={
                                                        <>
                                                            <a onClick={(ev, item) => book(ev, item)}>预定</a>
                                                            <Divider type="vertical" />
                                                            <a> <UpCircleTwoTone />  收起 </a>
                                                        </>
                                                    }>
                                                        <Row style={{ backgroundColor: '#91d5ff' }}>
                                                            {timeSpan.map((item, index) => {
                                                                return (
                                                                    <Col key={item.value} className={timeSpanStyle}//{styles.timeSpan} 
                                                                        onClick={(ev, ite = { ...item }) => {
                                                                            console.log(ite);
                                                                            let selectedNew = [...selected]
                                                                            if (selectedNew.indexOf(ite.value) > -1) {
                                                                                selectedNew.splice(selectedNew.indexOf(ite.value), 1)
                                                                            }
                                                                            else {
                                                                                selectedNew.push(ite.value);
                                                                                selectedNew = selectedNew.sort();
                                                                            }
                                                                            setSelected(selectedNew);
                                                                            console.log('selectedNew:', selectedNew);
                                                                        }}>
                                                                        {item.text}
                                                                    </Col>
                                                                )
                                                            })}
                                                        </Row>
                                                    </Card>
                                                    <Divider orientation="center"><UpCircleTwoTone /> 自定义</Divider>
                                                    <Card title={1503} extra={<a onClick={() => {
                                                        setNewVisi(true)
                                                    }}>预定</a>}>
                                                        <Slider range marks={timeSpans} defaultValue={[[20, 30], [45, 60]]} step={10} tipFormatter={null}></Slider>
                                                    </Card>
                                                    <Divider orientation="center">Slider</Divider>
                                                </div>
                                            </Content>

                                        </div>
                                    </Scrollbars>
                                </Content>
                            </Layout>
                            <DraggableModal visible={modalVisible} width={1000} closable={true}
                                okText="提交"
                                maskClosable={false} onCancel={() => setModalVisible(false)}
                                title={"1504 - 预定申请"} centered
                                onOk={() => {
                                    const form = formRef.current;
                                    form.validateFields().then(values => {
                                        console.log('validate values:', values)
                                    });
                                }}

                            >
                                <div style={{ width: '100%' }}>
                                    <Alert type="info" message="注：投影仪、电话会议设备（八爪鱼）、录音笔、激光笔，如有需要，请提前联系7500/7501，办理借用手续。"></Alert>
                                    <Divider orientation="center"><FormOutlined /> 填写内容</Divider>
                                    <Form ref={formRef} size={"middle"} style={{ marginTop: '5px' }} >

                                        <Row gutter={4} style={{ width: '100%' }}>
                                            <Col span={12} >
                                                <Form.Item name="roomname" label="会议室" required rules={[
                                                    {
                                                        required: true,
                                                        message: '必选'
                                                    }
                                                ]} labelCol={{
                                                    span: 4,

                                                }} initialValue={1504}>
                                                    <Select style={{ width: `${formItemLen}px` }}>
                                                        <Option value={1504} >1504</Option>
                                                        <Option value={1503}>1503</Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item name="daterange" label="会议时间" required labelCol={{
                                                    span: 4
                                                }} rules={[
                                                    {
                                                        required: true,
                                                        message: '必选'
                                                    }
                                                ]} initialValue={[moment(`${year} - ${month} - ${date}`, "YYYY-MM-DD"), moment(`${year} - ${month} - ${date}`, "YYYY-MM-DD")]}>
                                                    <RangePicker showTime ></RangePicker>
                                                </Form.Item>

                                                <Form.Item name="meetingtitle" label={"会议主题"} required labelCol={{
                                                    span: 4
                                                }} rules={[
                                                    { required: true, message: '必填' }
                                                ]}>
                                                    <Input style={{ width: `${formItemLen}px` }} />
                                                </Form.Item>
                                                <Form.Item name="peoplenumber" label={"会议人数"} labelCol={{
                                                    span: 4
                                                }} initialValue={0}>
                                                    <InputNumber style={{ width: `${formItemLen}px` }} />
                                                </Form.Item>
                                                <Form.Item name="meetingcontent" label={"会议内容"} labelCol={{
                                                    span: 4
                                                }}>
                                                    <TextArea style={{ width: `${formItemLen}px` }}>

                                                    </TextArea>
                                                </Form.Item>
                                                <Form.Item name="otherinquiries" label={"其他要求"} labelCol={{
                                                    span: 4
                                                }}>
                                                    <TextArea style={{ width: `${formItemLen}px` }}>

                                                    </TextArea>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="contact" label={"联系人"} required labelCol={{
                                                    span: 4
                                                }} initialValue={value.userRow.Username} >
                                                    <Input style={{ width: `${formItemLen}px` }} />
                                                </Form.Item>
                                                <Form.Item name="department" label={"所属部门"} required labelCol={{
                                                    span: 4
                                                }} initialValue={value.userRow.OULongName}>
                                                    <Input style={{ width: `${formItemLen}px` }} />
                                                </Form.Item>
                                                <Form.Item name="workphone" label="办公电话" required labelCol={{
                                                    span: 4
                                                }} initialValue={value.userRow.WorkPhone}>
                                                    <Input style={{ width: `${formItemLen}px` }} />
                                                </Form.Item>
                                                <Form.Item name="mobilephone" label="手机" required labelCol={{
                                                    span: 4
                                                }} initialValue={value.userRow.MobilePhone}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '必填'
                                                        }
                                                    ]}
                                                >
                                                    <Input style={{ width: `${formItemLen}px` }} />
                                                </Form.Item>
                                                <Form.Item name="email" label="邮箱" labelCol={{
                                                    span: 4
                                                }} initialValue={value.userRow.Email}>
                                                    <Input style={{ width: `${formItemLen}px` }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Divider />
                                    <div>
                                        <Title level={3}>会议室预定申请注意事项：</Title>
                                        <Paragraph>
                                            <ol>
                                                <li>考虑使用方便，在同等情况下十四层的经理人和员工尽量首先预定十四层会议室，十五层的经理人和员工首先预定十五层会议室。 </li>
                                                <li>会议如临时取消，预定人员需第一时间在网上取消预定，以免耽误其他人使用。如外出不方便上网取消，需第一时间告知前台人员，由前台人员代为取消预定。 </li>
                                                <li>预定会议室最多提前七天，超出预定期限将不予以批准；单次预定会议室不得超过半天。杜绝浪费公司会议室资源的行为，如：长期占用会议室或一次性占用多个会议室等。 </li>
                                                <li>因特殊情况一次性预定超过半天，需申请人填写中粮酒业会议室使用申请表，并报所在部门总经理批准，经中粮酒业投资有限公司办公室审批后方可使用。 </li>
                                                <li>本规定由中粮酒业投资有限公司办公室制定，并负责解释和修订。 </li>
                                            </ol>

                                        </Paragraph>
                                    </div>
                                </div>
                            </DraggableModal>
                        </div>
                    </>)
            }}
        </UserContext.Consumer>
    )
}