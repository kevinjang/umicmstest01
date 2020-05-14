import React from 'react';
import { Layout, Button, Input } from 'antd';

const { Sider, Content } = Layout

function createNewComponent() {
    const [components, setComponents] = React.useState([(props) => { return <Input key={"selfmadeInput_" + (components.length - 1)} {...props} /> }])

    const [tests, setTests ] = React.useState([])
    return (
        <Layout style={{ bottom: '0px', backgroundColor: 'lightcyan', width: '97%', top: '0px', position: 'absolute' }}>
            <Sider width={"100px"} >
                <Button type="primary" onClick={() => {
                    // import('antd/es/input/Input').then(item => {
                    //     const componentsX = components;
                    //     componentsX.push(item.default);
                    //     setComponents(componentsX)
                    // });
                    const componentsX = components;
                    componentsX.push((props) => { return <Input {...props} /> });
                    setComponents([...componentsX]);
                    // console.log('after pushed:', components)
                    // setTests(['0', '1'])

                    // const ComponentX = (props)=>{
                    //     return <Input key="componentX_1" type="text" />
                    // }

                    // const What = React.createElement(ComponentX);

                    // console.log('what:', What);

                    // setComponents([...])

                    // document.querySelector('#content_1').appendChild();
                }}>生成</Button>
            </Sider>
            <Content style={{ backgroundColor: 'violet' }} id="content_1">
                {
                    components.map((ComponentX, index) => {
                        return <ComponentX key={"selfmade_" + index} />
                    })
                }
                {/* {
                    tests.map((test,index)=>{
                    return <div key={index}>{test}</div>
                    })
                } */}
            </Content>
        </Layout>
    );
}

export default createNewComponent