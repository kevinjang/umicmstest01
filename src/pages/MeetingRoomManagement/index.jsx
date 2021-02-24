import { Card, Col, PageHeader, Row, DatePicker, Slider } from 'antd'
// import {UserOutlined} from '@ant-design/icons'
import moment from 'moment'

const horu = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:30', '14:00', '14:30', '15:00',
    '15:30', '16:00', '16:30', '17:00', '17:30', '18:00']
const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
        style: {
            color: '#f50',
        },
        label: <strong>100°C</strong>,
    },
};

const App = () => {
    return (
        <div>
            <PageHeader title="会议室预约" extra={<DatePicker value={moment()}></DatePicker>}>
                <Card title={"1502"} style={{ border: '1px solid black' }} hoverable={true} extra={<DatePicker value={moment()}></DatePicker>}>
                    <Row gutter={4}>
                        <Col span={4}>
                            {horu.map((item, index) => {
                                return (
                                    <span key={index} style={{ height: '20px', backgroundColor: 'coral', padding: '10px 15px', color: 'white' }}>
                                        {item}
                                    </span>
                                )
                            })}
                        </Col>
                    </Row>
                </Card>
                <Card title={"1503"} style={{ border: '1px solid black', marginTop: '10px' }} hoverable={true} extra={<DatePicker value={moment()}></DatePicker>}>
                    <Row gutter={4}>
                        <Col span={4}>
                            {horu.map((item, index) => {
                                return (
                                    <span key={index} style={{ height: '20px', backgroundColor: 'coral', padding: '10px 15px', color: 'white' }}>
                                        {item}
                                    </span>
                                )
                            })}
                        </Col>
                    </Row>
                </Card>
                <Card title={"1504"} style={{ border: '1px solid black', marginTop: '10px' }} hoverable={true} extra={<DatePicker value={moment()}></DatePicker>}>
                    <Slider marks={marks} step={null} defaultValue={37}></Slider>
                </Card>
            </PageHeader>
        </div>
    )
}

export default App;