import { DatePicker, Layout, Row, Col, Card, Timeline, Divider, Slider, message } from 'antd'
import moment from 'moment'
import { UserContext, MyUserData } from '../UserContextMock'
import React, { useState, useEffect } from 'react'
import { LeftCircleTwoTone, RightCircleTwoTone, ClockCircleOutlined, UpCircleTwoTone, SettingTwoTone, ThunderboltTwoTone } from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars'
import classnames from 'classnames'
import styles from './index.css'

const { Sider, Content, Header } = Layout

export default () => {

    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month() + 1)
    const [date, setDate] = useState(moment().date())
    const months = []

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

    return (
        <UserContext.Consumer>
            {value => {
                const { sizeInfo } = value
                const { content } = sizeInfo
                // console.log('sizeInfo:', sizeInfo)
                return (<div style={{ width: '100%', backgroundColor: 'lightcyan' }}>
                    <Layout >
                        <Content theme={"light"} style={{
                            width: '100%',
                            height: `calc(100vh - ${sizeInfo.header.height}px - ${sizeInfo.bc.height}px - ${sizeInfo.footer.height}px)`,
                            display: 'flex'
                        }}>
                            <Scrollbars >
                                <div style={{ display: 'flex' }}>
                                    <div style={{ border: '1px solid lightgray', width: '390px' }} id="calendar">
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
                                    <div style={{ width: '100%', marginLeft: '10px' }} id="booking">
                                        <Card title={1504} extra={
                                            <>
                                                <a>预定</a>
                                                <Divider type="vertical"/>
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
                                                <Card title={1503} extra={<a>预定</a>}>
                                                    <Slider range marks={timeSpans} defaultValue={[[20, 30], [45, 60]]} step={10} tipFormatter={null}></Slider>
                                                </Card>
                                                <Divider orientation="center">Slider</Divider>
                                                <Card title={1501} hoverable extra={
                                                    <a>预定</a>
                                                }>
                                                    {timeSpan.map((time, index) => {
                                                        return (
                                                            <Card.Grid key={time.key} style={{
                                                                textAlign: 'center',
                                                                padding: '10px 0'
                                                            }}>
                                                                {time.text}
                                                            </Card.Grid>
                                                        )
                                                    })}
                                                </Card>
                                                <Card title={1502} extra={<a>预定</a>}>
                                                    <Timeline>
                                                        <Timeline.Item>
                                                            Create a services site 2015-09-01
                                        </Timeline.Item>
                                                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                                    </Timeline>
                                                    <Divider orientation="left">基础</Divider>
                                                    <Timeline>
                                                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                                        <Timeline.Item color="red">
                                                            <p>Solve initial network problems 1</p>
                                                            <p>Solve initial network problems 2</p>
                                                            <p>Solve initial network problems 3 2015-09-01</p>
                                                        </Timeline.Item>
                                                        <Timeline.Item>
                                                            <p>Technical testing 1</p>
                                                            <p>Technical testing 2</p>
                                                            <p>Technical testing 3 2015-09-01</p>
                                                        </Timeline.Item>
                                                        <Timeline.Item color="gray">
                                                            <p>Technical testing 1</p>
                                                            <p>Technical testing 2</p>
                                                            <p>Technical testing 3 2015-09-01</p>
                                                        </Timeline.Item>
                                                        <Timeline.Item color="gray">
                                                            <p>Technical testing 1</p>
                                                            <p>Technical testing 2</p>
                                                            <p>Technical testing 3 2015-09-01</p>
                                                        </Timeline.Item>
                                                    </Timeline>
                                                    <Divider orientation="right">圆圈颜色</Divider>
                                                    <Timeline>
                                                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                                        <Timeline.Item dot={<ClockCircleOutlined className={styles["timeline-clock-icon"]} />} color="red">
                                                            Technical testing 2015-09-01
                                                </Timeline.Item>
                                                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                                                    </Timeline>
                                                    <Divider orientation="left">自定义时间节点</Divider>
                                                </Card>
                                            </div>
                                </div>
                            </Scrollbars>
                        </Content>
                    </Layout>
                </div>)
            }}
        </UserContext.Consumer>
    )
}