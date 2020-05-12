import React from 'react'

import { Card, } from 'antd'

// const {  } = Car

// const { offsetX, offsetY } = {
//     offsetX: 217,
//     offsetY: 105
// }

let { startClientX, startClientY } = {
    startClientX: 0,
    startClientY: 0
};


function CardDND() {
    return (
        <div style={{ bottom: '0px', backgroundColor: 'lightcoral', width: '97%', top: '0px', position: 'absolute' }}
            onDrop={(e) => {
                // console.log('ondrop-e:', e.dataTransfer.getData('id'));
                e.preventDefault();
                // e.stopPropagation();

            }}
            onDragEnter={(e) => {
                // console.log('ondragenter-e:', e.m);

            }}
            onDragLeave={(e) => {
                // console.log('ondragleave-e:', e.clientX);
                // console.log('onDragLeave-startClientX:', e.dataTransfer.getData('startClientX'));
            }}
        >
            <Card title="Card" style={{ width: '200px' }}
                id="card_one"
                cover={
                    <img src="https://images.pexels.com/photos/1884306/pexels-photo-1884306.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                }
                onDrag={(e) => {
                    // console.log('ondrag - e:', e.movementX);
                    e.preventDefault();
                    e.dataTransfer.setData('id', e.target.id)
                }}

                onDragStart={(e) => {
                    // console.log('ondragstart-e:', e.clientX);
                    // e.dataTransfer.setData('offsetX', e.clientX);
                    startClientX = e.clientX;
                    startClientY = e.clientY;
                }}

                onDragEnd={(e) => {
                    // console.log('ondragend-startClientX:',startClientX);

                    let left = parseFloat(e.target.style.left.toString().replace('px', ''));
                    left = isNaN(left) ? 0 : left;

                    let top = parseFloat(e.target.style.top.toString().replace('px', ''));
                    top = isNaN(top) ? 0 : top;
                    // console.log('ondragend-left:', left)
                    const offsetX = e.clientX - startClientX;
                    const offsetY = e.clientY - startClientY;
                    e.target.style.left = (offsetX + left) + 'px';
                    e.target.style.top = (offsetY + top) + 'px';
                    // console.log('left:', (offsetX + left + e.movementX) + 'px')
                }}
                draggable>

            </Card>
        </div>
    );
}

export default CardDND