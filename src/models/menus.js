export default {
    namespace: 'menus',
    state: [
        {
            id: '1',
            title: 'Option 1',
            icon: 'pie-chart',
            children: [
                {
                    id: '4',
                    title: 'Table数据展示',
                    icon: 'pie-chart',
                    nodeInfo: './dashboard/dashboard'
                }, {
                    id: '5',
                    title: 'Option 5',
                    icon: 'pie-chart',
                    nodeInfo: './treetest/treetest'
                }
            ]
        },
        {
            id: '2',
            title: 'Option 2',
            icon: 'desktop',
            children: [
                {
                    id: '6',
                    title: 'Option 6',
                    icon: 'weibo-square',
                    nodeInfo: './treetest/treetest_x'
                }, {
                    id: '7',
                    title: 'Option 7',
                    icon: 'pie-chart',
                    nodeInfo: './treetest/treetest'
                }
            ]
        },
        {
            id: '3',
            title: 'Option 3',
            icon: 'inbox'
        }
    ]
}