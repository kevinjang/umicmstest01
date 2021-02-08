import { Table } from 'antd'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { MenuOutlined } from '@ant-design/icons'
import arrayMove from 'array-move'
import styles from './table.css'
import React from 'react'

const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const columns = [
    {
        title: 'Sort', dataIndex: 'sort', width: 30, className: styles['drag-visible'],
        render: () => <DragHandle />
    },
    {
        title: 'Name', dataIndex: 'name', className: styles['drag-visible']
    },
    {
        title: 'Age', dataIndex: 'age' // , className: 'drag-visible'
    },
    {
        title: 'Address', dataIndex: 'address'
    }
];

const data = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No.1 Lake Park', index: 0 },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No.1 Lake Park', index: 1 },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No.1 Lake Park', index: 2 }
];

const SortableItem = SortableElement(props=><tr {...props} />)
const SortableContainer1 = SortableContainer(props=><tbody {...props} />)

class SortableTable extends React.Component {
    state = {
        dataSource: data
    }

    onSortEnd = ({oldIndex, newIndex})=>{
        const {dataSource} = this.state;
        if(oldIndex != newIndex){
            const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el=>!!el);
            this.setState({
                dataSource: newData
            })
        }
    }

    DraggableContainer = props => (
        <SortableContainer1
            useDragHandle
            disableAutoscroll
            helperClass={styles["row-dragging"]}
            onSortEnd={this.onSortEnd} 
            {...props}/>
    )

    DraggableBodyRow = ({className, style, ...restProps}) =>{
        const {dataSource} = this.state;
        const index = dataSource.findIndex(x=>x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />
    }

    render(){
        const {dataSource} = this.state;
        return (
            <Table 
                pagination={false}
                dataSource={dataSource}
                columns={columns}
                rowKey={"index"}
                components={{
                    body:{
                        wrapper: this.DraggableContainer,
                        row: this.DraggableBodyRow
                    }
                }}></Table>
        )
    }
}

/*
export default ()=>{
    return <SortableTable />
};

*/

// export default ()=>{
//     return (
//         <SortableTable />
//     )
// }

export default SortableTable