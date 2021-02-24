import { UpCircleFilled } from '@ant-design/icons';
import {Card, Divider, Transfer} from 'antd'
import {useState} from 'react'

const mockData = [];
for(let i = 0;i< 20;i++){
    mockData.push({
        key: i.toString(),
        title: `content${i+1}`,
        description:    `descritption of content${i+1}`
    })
}

const initialTargetKeys = mockData.filter(item=>+item.key>10).map(item=>item.key);
const App = () => {
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const onChange = (nextTargetKeys, direction, moveKeys) =>{
        console.log('nextTargetKeys:', nextTargetKeys)
        setTargetKeys(nextTargetKeys);
    }

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) =>{
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    }

    const onScroll = (direction , e) => {

    }

    return (
        <>
        <Card title={false}>
            <Transfer dataSource={mockData} titles={['Source', 'Target']} 
                targetKeys={targetKeys} selectedKeys={selectedKeys}
                onChange={onChange} onSelectChange={onSelectChange}
                onScroll={onScroll} render={item=>item.title} />
        </Card>
        <Divider orientation="right" ><UpCircleFilled/>基本用法</Divider>
        </>
    )
}

export default App