import React from 'react';
import { Layout, Button, Input } from 'antd';

const { Sider, Content } = Layout

function createNewComponent() {
    // const firstRef = React.createRef();

    const [components, setComponents] = React.useState([(props) => {
        return <Input key="selfmadeInput_0" {...props} />;
    }])

    const [tests, setTests] = React.useState(['0'])

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
                    componentsX.push((props) => { return <Input key={"selfmadeInput_" + (components.length - 1)} {...props} /> });
                    setComponents(componentsX)
                    setTests(['0', '1'])
                }}>生成</Button>
            </Sider>
            <Content style={{ backgroundColor: 'violet' }}>
                {
                    components.map((ComponentX, index) => {
                        // console.log('rendering:', ComponentX);
                        return <ComponentX />
                    })
                }
                {/* {
                    tests.map((test) => {
                        return <div>{test}</div>
                    })
                } */}
            </Content>
        </Layout>
    );
}

export default createNewComponent