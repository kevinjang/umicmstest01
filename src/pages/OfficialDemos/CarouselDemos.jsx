import { Carousel, Card, Divider } from 'antd'

import { UserContext, MyUserData } from '../UserContextMock'

const onChange = (a, b, c) => {
    console.log(a, b, c);
}



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
    'http://192.168.3.2/ksnl_pics/09.jpg',
    'http://192.168.3.2/ksnl_pics/063735vy95x33rl19xrz96.jpg',
    'http://192.168.3.2/ksnl_pics/064836dv83b3k5m3a80s83.jpg',
    'http://192.168.3.2/ksnl_pics/064838oiz4vrakwi3n3or7.jpg',
    'http://192.168.3.2/ksnl_pics/064847ux5bng65gknbpzqn.jpg',
    'http://192.168.3.2/ksnl_pics/073134rjr1svz6jp8djtar.jpg',
    'http://192.168.3.2/ksnl_pics/1.JPG',
    'http://192.168.3.2/ksnl_pics/2.JPG',
    'http://192.168.3.2/ksnl_pics/3.JPG',
    'http://192.168.3.2/ksnl_pics/4.JPG',
    'http://192.168.3.2/ksnl_pics/5.JPG',
    'http://192.168.3.2/ksnl_pics/6.jpg',
    'http://192.168.3.2/ksnl_pics/7.jpg',
    'http://192.168.3.2/ksnl_pics/8.jpg',
    'http://192.168.3.2/ksnl_pics/9.jpg',
    'http://192.168.3.2/ksnl_pics/10.jpg',
    'http://192.168.3.2/ksnl_pics/11.JPG',
    'http://192.168.3.2/ksnl_pics/12.JPG',
    'http://192.168.3.2/ksnl_pics/111559gu7bzusbmmbom0cz.jpg',
    'http://192.168.3.2/ksnl_pics/112219q12716s7s7r5s6l2.jpg',
    'http://192.168.3.2/ksnl_pics/112810w5yevdvrmemdmd2y.jpg',
    'http://192.168.3.2/ksnl_pics/112838dt1nyh0dnennaez9.jpg',
    'http://192.168.3.2/ksnl_pics/113554was41asa111q1j74.jpg',
    'http://192.168.3.2/ksnl_pics/113555gpp541h4pgc95gf0.jpg',
    'http://192.168.3.2/ksnl_pics/113859ykrzt7k4gtdgtd5h.jpg',
    'http://192.168.3.2/ksnl_pics/114224a0v63vofkdtofv3d.jpg',
    'http://192.168.3.2/ksnl_pics/114239ajfzdfj171dag7l1.jpg',
    'http://192.168.3.2/ksnl_pics/114239kxq1yqav8zggzcm2.jpg',
    'http://192.168.3.2/ksnl_pics/133029xhkuhezyyxywyykz.jpg',
    'http://192.168.3.2/ksnl_pics/133621he50v5begavn3vbc.jpg',
    
];

const CarouselX = () => {
    return (
        <UserContext.Consumer>
            {value => {
                console.log(value)
                const { sizeInfo } = value;
                const { content } = sizeInfo
                const contentStyle = {
                    height: `650px`,
                    color: '#fff',
                    lineHeight: `650px`,
                    textAlign: 'center',
                    background: '#364d79',
                    justifyContent: 'center',
                    margin: '0 auto'
                }
                console.log(contentStyle)
                return (
                    <div>
                        <Card title={false}>
                            <Carousel afterChange={onChange} autoplay={3000} thumbnails>
                                {images.map((item, index)=>{
                                    return (
                                        <div key={index}>
                                            <h3 style={contentStyle}>
                                                <img src={item} style={{margin: '10px auto', height: '100%', width: 'auto'}} alt=""/>
                                            </h3>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </Card>
                        <Divider orientation="right">基础用法</Divider>
                    </div>
                )
            }}
        </UserContext.Consumer>
    )
}

export default CarouselX;