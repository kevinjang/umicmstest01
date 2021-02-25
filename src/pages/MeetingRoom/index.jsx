import { DatePicker, Layout } from 'antd'
import moment from 'moment'
import { UserContext, MyUserData } from '../UserContextMock'
import {useState} from 'react'

const { Sider, Content, Header } = Layout

export default () => {

    const [year, setYear] = useState(moment().year());
    const [month, setMonth] = useState(moment().month() + 1)
    const months = []

    const weeks = [
        {
            key: 7,
            text: 'Sunday',
            abbr: 'Sun',
            style: {
                backgroundColor: 'lightcoral',
                padding: '5px 15px 2px'
            }
        },
        {
            key: 1,
            text: 'Monday',
            abbr: 'Mon',
            style: {
                backgroundColor: 'lightsteelblue',
                padding: '5px 15px 2px'
            }
        },
        {
            key: 2,
            text: 'Tuesday',
            abbr: 'Tues',
            style: {
                backgroundColor: 'lightsteelblue',
                padding: '5px 15px 2px'
            }
        },
        {
            key: 3,
            text: 'Wednesday',
            abbr: 'Wed',
            style: {
                backgroundColor: 'lightsteelblue',
                padding: '5px 15px 2px'
            }
        },
        {
            key: 4,
            text: 'Thursday',
            abbr: 'Thurs',
            style: {
                backgroundColor: 'lightsteelblue',
                padding: '5px 15px 2px'
            }
        },
        {
            key: 5,
            text: 'Friday',
            abbr: 'Fri',
            style: {
                backgroundColor: 'lightsteelblue',
                padding: '5px 15px 2px'
            }
        },
        {
            key: 6,
            text: 'Saturday',
            abbr: 'Sat',
            style: {
                backgroundColor: 'lightcoral',
                padding: '5px 15px 2px'
            }
        }
    ]

    // let currentMonth = moment().month() + 1;
    const daysInMonth = moment().daysInMonth();
    let dateInWeek = [];

    for(let i=0;i<daysInMonth;i++){
        let date = moment(`${year}-${month}-${i}`).format("YYYY-MM-DD");
        let dIW = moment().weekday(25);
        // console.log('dIW:', dIW);
    }

    // let date = moment().format("YYYY-MM-DD");

    // const newMome = moment(date);
    // console.log(moment().weekday()); // 数字，当天是当周哪天
    // console.log(moment.weekdays()); // 当月天数

    // console.log(moment().weeks());console.log(moment().week());  // 数字，当前是全年第几周
    // console.log(moment().day()); // 数字，当前是周几
    // console.log(moment.weekdaysMin()); // 字符串数组，2字母缩写各周天
    // console.log(moment.weekdaysShort());  // 字符串数组，3字母缩写各周天
    console.log(moment().format("dddd"))
    

    for (let i = 0; i < 12; i++) {
        months.push(i + 1);
    }

    // console.log("daysInMonth:", daysInMonth);
    return (
        <UserContext.Consumer>
            {value => {
                const { sizeInfo } = value
                const { content } = sizeInfo
                // console.log('sizeInfo:', sizeInfo)
                return (<div style={{ width: '100%', backgroundColor: 'lightcyan' }}>
                    <Layout >
                        <Content theme={"light"} style={{
                            width: 389, height: `calc(100vh - ${sizeInfo.header.height}px - ${sizeInfo.bc.height}px - ${sizeInfo.footer.height}px)`
                        }}>
                            <div style={{ border: '1px solid lightgray' }}>
                                <div id="yearNmonth" style={{ textAlign: 'center' }}>
                                    {year} - {month}
                                </div>
                                <div id="weekly">
                                    {weeks.map((weekday, index) => {
                                        return (
                                            <span key={weekday.key} style={{ ...weekday.style }}>
                                                {weekday.abbr}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                        </Content>
                        <Content >

                        </Content>
                    </Layout>
                </div>)
            }}
        </UserContext.Consumer>
    )
}