import React from 'react'

import { Card, } from 'antd'

// const {  } = Car

function CardDND() {
    return (
        <div style={{ bottom: '0px', backgroundColor: 'lightcoral', width: '97%', top: '0px', position: 'absolute' }}
        onDrop={(e)=>{            
            console.log('ondrop-e:', e);
            // e.preventDefault();
            e.stopPropagation();
        }}
        >
            <Card title="Card" style={{ width: '100px', height: '200px' }}
                cover={
                    <img src="https://images.pexels.com/photos/1884306/pexels-photo-1884306.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                }
                onDrag={(e) => {
                    console.log('ondrag - e:', e.movementX);
                    e.preventDefault();
                }}
                draggable>

            </Card>
        </div>
    );
}

export default CardDND