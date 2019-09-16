import React from 'react'

import { Tree, message } from 'antd'
const { TreeNode, DirectoryTree } = Tree;

class TreeSelectTest extends React.Component {
    constructor(props) {
        super(props)
    }

    onSelect = (keys, event) => {
        message.info('Trigger Select:keys-' + keys + ";event-" + event);
    }

    onExpand = () => {
        message.info('Trigger Expand');
    }

    render() {
        return <div id="tstContainer">
            <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                <TreeNode title="parent 0" key="0-0">
                    <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                    <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                </TreeNode>
                <TreeNode title="parent 1" key="0-1">
                    <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                    <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                </TreeNode>
            </DirectoryTree>
        </div>
    }
}

export default TreeSelectTest