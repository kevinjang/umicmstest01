import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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
    'http://192.168.3.2/ksnl_pics/006ASJZGgy1fgkn7xutw7j30jg0f0dh6.jpg'
];

const Carousel = ()=>{
    const settings = {
        customPaging: function(i){
            return (
                <a>
                    <img src={`${images[i]}`} style={{width: 50,margin:'auto'}} alt=""/>
                </a>
            )
        },
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div style={{height: 650}}>
            <Slider {...settings}>
                {images.map((item, index)=>{
                    return (
                        <div key={index}>
                            <img src={`${item}`} key={index}  style={{margin: '10px auto', height: '100%', width: 'auto'}} alt=""/>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default Carousel