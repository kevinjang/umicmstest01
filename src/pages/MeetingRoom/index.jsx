import { DatePicker, Layout } from 'antd'
import moment from 'moment'
import { UserContext, MyUserData } from '../UserContextMock'

const { Sider, Content, Header } = Layout

export default () => {

    const year = moment().year();
    const months = []

    const weeks = [
        {
            key: 7,
            text: 'Sunday',
            abbr: 'Sun',
            style:{
                backgroundColor: 'lightcoral',
                padding: '5px 15px 2px'
            }
        },
        {
            key: 1,
            text: 'Monday',
            abbr: 'Mon',
            style:{
                padding: '5px 15px 2px'
            }
        },
        {
            key: 2,
            text: 'Tuesday',
            abbr: 'Tues',
            style:{
                padding: '5px 15px 2px'
            }
        },
        {
            key: 3,
            text: 'Wednesday',
            abbr: 'Wed',
            style:{
                padding: '5px 15px 2px'
            }
        },
        {
            key: 4,
            text: 'Thursday',
            abbr: 'Thurs',
            style:{
                padding: '5px 15px 2px'
            }
        },
        {
            key: 5,
            text: 'Friday',
            abbr: 'Fri',
            style:{
                padding: '5px 15px 2px'
            }
        },
        {
            key: 6,
            text: 'Saturday',
            abbr: 'Sat',
            style:{
                backgroundColor: 'lightcoral',
                padding: '5px 15px 2px'
            }
        }
    ]

    let currentMonth = moment().month()+1;
    const dates = moment().daysInMonth(currentMonth);

    for(let i = 0;i< 12;i++){
        months.push(i+1);
    }

    console.log("dates in month:", dates)
    return (
        <UserContext.Consumer>
            {value => {
                const { sizeInfo } = value
                const { content } = sizeInfo
                console.log('sizeInfo:', sizeInfo)
                return (<div style={{ width: '100%', backgroundColor: 'lightcyan' }}>
                    <Layout >
                        {/* <Sider id="sider1" theme={"light"}
                            style={{
                                width: 300, maxWidth: 300, height: `calc(100vh - ${sizeInfo.header.height}px - ${sizeInfo.bc.height}px - ${sizeInfo.footer.height}px)`
                            }}>
                            <DatePicker defaultValue={moment()} open={true} ></DatePicker>
                        </Sider> */}
                        <Content theme={"light"} style={{
                            width: 389, height: `calc(100vh - ${sizeInfo.header.height}px - ${sizeInfo.bc.height}px - ${sizeInfo.footer.height}px)`
                        }}>
                            {/* <DatePicker defaultValue={moment()} open={true} ></DatePicker> */}
                            <div style={{border: '1px solid lightgray'}}>
                                <div id="yearNmonth" style={{textAlign: 'center'}}>
                                    {year} - {currentMonth}
                                </div>
                                <div id="weekly">
                                    {weeks.map((weekday, index)=>{
                                        return (
                                            <span key={weekday.key} style={{...weekday.style}}>
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