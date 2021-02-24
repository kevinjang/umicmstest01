import { Button, Modal, Row, Col } from 'antd';
import { useState } from 'react'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars'

const images = [
    'http://192.168.3.2/ksnl_pics/0.jpg',
    'http://192.168.3.2/ksnl_pics/004212l3usqxvw4w3vxb9v.jpg',
    'http://192.168.3.2/ksnl_pics/004221hb29opsoeamfzwad.jpg',
    'http://192.168.3.2/ksnl_pics/004219qvl44vx45v5xqedi.jpg',
    'http://192.168.3.2/ksnl_pics/004223rk15186xf6co0q0q.jpg',
    'http://192.168.3.2/ksnl_pics/004230i9ujumvo0jj0ggvo.jpg',
    'http://192.168.3.2/ksnl_pics/004232qrji4rngwruvnual.jpg',
    'http://192.168.3.2/ksnl_pics/006ASJZGgy1fgkn7wmk78j30h60m83zw.jpg',
    'http://192.168.3.2/ksnl_pics/006ASJZGgy1fgkn7xeissj30h60m80tt.jpg',
    'http://192.168.3.2/ksnl_pics/006ASJZGgy1fgkn7xlzxqj30h60m8dih.jpg',
    'http://192.168.3.2/ksnl_pics/006ASJZGgy1fgkn7xutw7j30jg0f0dh6.jpg',
    'http://192.168.3.2/ksnl_pics/006ASJZGgy1fgkn80tr8gj30h60m8wg6.jpg',
    'http://192.168.3.2/ksnl_pics/006ASJZGgy1fgkn8122f5j30jg0f0gmw.jpg',
    'http://192.168.3.2/ksnl_pics/01.jpg',
    'http://192.168.3.2/ksnl_pics/02.jpg',
    'http://192.168.3.2/ksnl_pics/03.jpg',
    'http://192.168.3.2/ksnl_pics/04.jpg',
    'http://192.168.3.2/ksnl_pics/063735vy95x33rl19xrz96.jpg'
];

const thumbnailWidth = 50;
const thumbnailHeight = 50

const IC = (props) => {
    const [dialogVisible, setDialogVisible] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentSrc, setCurrentSrc] = useState(images[currentIndex]);
    const [thumbnailOpacity, setThumbnailOpacity] = useState(0.5);

    return <div style={{ backgroundColor: 'darkcyan' }}>
        <Button type="primary" onClick={() => setDialogVisible(true)}>show casourel</Button>
        <Modal visible={dialogVisible} closable={false} maskClosable={true}
            onCancel={() => setDialogVisible(false)} footer={false}
            width={1000} height={1000} style={{ maxHeight: '800px' }}
        >
            <Row gutter={4}>
                <Col span={2} style={{ fontSize: '32px' }}>
                    <LeftCircleOutlined />
                </Col>
                <Col span={20} style={{ justifyContent: 'center', textAlign: 'center',overflowX: 'hidden' }}>
                    <img src={currentSrc} alt={"当前图片"} style={{ width: 'auto', height: '700px' }} />
                </Col>
                <Col span={2} style={{ textAlign: 'right', fontSize: '32px' }}>
                    <RightCircleOutlined />
                </Col>
            </Row>
            <div>
                <Row id={"thumbnails"} style={{
                    marginTop: '-50px',
                    bottom: 110,
                    display: 'flex',
                    position: 'fixed', width: '960px', maxHeight: thumbnailHeight + 10, opacity: thumbnailOpacity,
                    // overflowX: 'scroll', 
                    backgroundColor: 'whitesmoke',

                    overflowY: 'hidden'
                }} onMouseOver={() => setThumbnailOpacity(1)}
                    onMouseLeave={() => { setThumbnailOpacity(0.5) }}
                    onWheel={(ev) => {
                        console.log(`ev.deltaY:`, ev.deltaY) // deltaY > 0 means the wheel was scrolled downward, otherwise upward
                    }}
                    onScroll={(x) => {
                        console.log('onscroll-x:', x)
                    }}>
                    {images.map((item, index) => {
                        return <Col key={index}
                            style={{ marginRight: '5px', marginTop: `${currentIndex === index ? 0 : 5}px` }}
                            onClick={() => {
                                setCurrentSrc(item);
                                setCurrentIndex(index)
                            }}>
                            <img src={item} width={currentIndex === index ? thumbnailWidth + 10 : thumbnailWidth} height={currentIndex === index ? thumbnailHeight + 10 : thumbnailHeight} />
                        </Col>
                    })}
                </Row>
            </div>
        </Modal>
    </div>
}

export default IC;