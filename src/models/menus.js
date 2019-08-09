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
            title: '数据管理中心',
            icon: 'inbox',
            children:[
                {
                    id: '17',
                    title: '离职授权查询',
                    icon: 'form',
                    nodeInfo: './BPM_RM/LeaveAuthorization'
                },
            ]
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
                    title: '正常登录表单',
                    icon: 'form',
                    nodeInfo: './treetest/NormalLoginForm'
                },
                {
                    id: '11',
                    title: '注册新用户',
                    icon: 'form',
                    nodeInfo: './treetest/NewUserRegistration'
                },
                {
                    id: '12',
                    title: '高级搜索',
                    icon: 'form',
                    nodeInfo: './treetest/MultiConditionSearch'
                },
                {
                    id: '13',
                    title: '弹出层中的新建表单',
                    icon: 'form',
                    nodeInfo: './treetest/CollectionCreateForm'
                },
                {
                    id: '14',
                    title: '动态增减表单项',
                    icon: 'form',
                    nodeInfo: './treetest/DynamicFieldSet'
                },
                {
                    id: '15',
                    title: '时间类控件',
                    icon: 'form',
                    nodeInfo: './OtherForms/TimeRelatedForm'
                },
                {
                    id: '16',
                    title: '自定义表单控件',
                    icon: 'form',
                    nodeInfo: './OtherForms/PriceInput'
                }
            ]
        }
    ]
}