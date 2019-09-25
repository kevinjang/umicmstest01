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
            icon: 'weibo',
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
            icon: 'weibo',
            children:[
                {
                    id: '17',
                    title: '离职查询授权',
                    icon: 'weibo',
                    nodeInfo: './BPM_RM/LeaveAuthorization'
                },
                {
                    id: '22',
                    title: '员工BP号维护',
                    icon: 'windows',
                    nodeInfo: './BPM_RM/EmployeeBPMaintain'
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
        },
        {
            id: '18',
            title: '官方模块测试',
            icon: 'windows',
            children: [
                {
                    id: '19',
                    title: 'Spin测试',
                    icon: 'windows',
                    nodeInfo: './compoTests/spnningTest'
                },
                {
                    id: '20',
                    title: 'TreeSelect',
                    icon: 'windows',
                    nodeInfo: './compoTests/treeSelectTest'
                },
                {
                    id: '21',
                    title: 'TreeAsync',
                    icon: 'windows',
                    nodeInfo: './compoTests/treeAsyncTest'
                },
            ]
        },
        {
            id: '23',
            title: '嵌套路由测试',
            icon: 'html5',
            children:[
                {
                    id: '24',
                    title: '员工BP号维护',
                    icon: 'windows',
                    nodeInfo: './test_layout/index'
                },
            ]
        }
    ]
}