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
                    title: '弹窗编辑示例',
                    icon: 'weibo-square',
                    nodeInfo: './treetest/Aladin'
                }, {
                    id: '7',
                    title: '网格内编辑示例',
                    icon: 'pie-chart',
                    nodeInfo: './treetest/FormTest'
                }
            ]
        },
        {
            id: '3',
            title: 'Option 3',
            icon: 'inbox'
        },
        {
            id: '8',
            title: 'Form表单学习',
            icon: 'form',
            children: [
                {
                    id: '9',
                    title: '水平排列登陆表单',
                    icon: 'form',
                    nodeInfo: './treetest/HorizontalLoginForm'
                },
                {
                    id: '10',
                    title: 'NormalLoginForm',
                    icon: 'form',
                    nodeInfo: './treetest/NormalLoginForm'
                }
            ]
        }
    ]
}