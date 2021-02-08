import { Typography, TreeSelect } from 'antd'
const { Title } = Typography
const { TreeNode, SHOW_PARENT } = TreeSelect;
import { useState } from 'react'

const BasicUsage = () => {
    const [value, setValue] = useState(undefined);
    const onChange = value => {
        setValue(value);
    }

    return (
        <>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}>
                <TreeNode value="parent 1" title="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0">
                        <TreeNode value="leaf1" title="my leaf" />
                        <TreeNode value="leaf2" title="your leaf" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1">
                        <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                    </TreeNode>
                </TreeNode>
            </TreeSelect>
        </>
    )
}

const MultipleSelect = () => {
    const [value, setValue] = useState(undefined)
    const onChange = value => {
        setValue(value)
    }

    return (
        <>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                multiple
                treeDefaultExpandAll
                onChange={onChange}>
                <TreeNode value="parent 1" title="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0">
                        <TreeNode value="leaf1" title="my leaf" />
                        <TreeNode value="leaf2" title="your leaf" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1">
                        <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                    </TreeNode>
                </TreeNode>
            </TreeSelect>
        </>
    )
}

const DataFromStream = () => {
    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-1'
                },
                {
                    title: 'Child Node2',
                    value: '0-0-2'
                }
            ]
        },
        {
            title: 'Node2',
            value: '0-1'
        }
    ]

    const [value, setValue] = useState(undefined);
    const onChange = value => {
        setValue(value);
    }

    return (
        <>
            <TreeSelect style={{ width: '100%' }} value={value} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData} placeholder="Please select" treeDefaultExpandAll onChange={onChange} />
        </>
    )
}

const CheckSelect = () => {
    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ];

    const [value, setValue] = useState(['0-0-0'])
    const onChange = value=>{
        setValue(value)
    }

    const tProps = {
        treeData,
        value: value,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
        style: {
            width: '100%'
        }
    }

    return (
        <>
            <TreeSelect {...tProps} />
        </>
    )
}

export default () => {
    return (
        <div>
            <div>
                <Title type="secondary" level={1}>Basic Usage</Title>
                <BasicUsage />
            </div>
            <div>
                <Title type="success" level={1}>MultipleSelect</Title>
                <MultipleSelect />
            </div>
            <div>
                <Title type="danger" level={2}>Data From Stream</Title>
                <DataFromStream />
            </div>
            <div>
                <Title type="danger" level={2}>Check Select</Title>
                <CheckSelect />
            </div>
        </div>
    )
}