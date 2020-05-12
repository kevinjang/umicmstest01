export default {
    namespace: 'menus',
    /* 32了*/
    state: [
        {
            id: '1',
            level: 1,
            title: 'Option 1',
            icon: 'pie-chart',
            children: [
                {
                    id: '4',
                    level:2,
                    title: 'Table数据展示',
                    icon: 'pie-chart',
                    urlPath: 'dashboard',
                    nodeInfo: './dashboard/dashboard'
                }, {
                    id: '5',
                    level:2,
                    title: 'Option 5',
                    icon: 'pie-chart',
                    urlPath: 'treetest',
                    nodeInfo: './treetest/treetest'
                }
            ]
        },
        {
            id: '2',
            level: 1,
            title: 'Option 2',
            icon: 'weibo',
            children: [
                {
                    id: '6',
                    level:2,
                    title: '弹窗编辑示例',
                    icon: 'weibo-square',
                    urlPath: 'aladin',
                    nodeInfo: './treetest/Aladin'
                }, {
                    id: '7',
                    level:2,
                    title: '网格内编辑示例',
                    icon: 'pie-chart',
                    urlPath: 'formtest',
                    nodeInfo: './treetest/FormTest'
                }
            ]
        },
        {
            id: '3',
            level: 1,
            title: '数据管理中心',
            icon: 'weibo',
            children: [
                {
                    id: '17',
                    level:2,
                    title: '离职查询授权',
                    icon: 'weibo',
                    urlPath: 'LeaveAuthorization',
                    nodeInfo: './BPM_RM/LeaveAuthorization'
                },
                {
                    id: '22',
                    level:2,
                    title: '员工BP号维护',
                    icon: 'windows',
                    urlPath: 'EmployeeBPMaintain',
                    nodeInfo: './BPM_RM/EmployeeBPMaintain'
                },
                {
                    id: '27',
                    level:2,
                    title: '员工年假标准维护',
                    icon: 'twitter',
                    urlPath: 'VacationStandardMaintain',
                    nodeInfo: './BPM_RM/VacationStandardMaintain'
                }
            ]
        },
        {
            id: '8',
            level: 1,
            title: 'Form表单学习',
            icon: 'form',
            children: [
                {
                    id: '9',
                    level:2,
                    title: '水平排列登陆表单',
                    icon: 'form',
                    urlPath: 'HorizontalLoginForm',
                    nodeInfo: './treetest/HorizontalLoginForm'
                },
                {
                    id: '10',
                    level:2,
                    title: '正常登录表单',
                    icon: 'form',
                    level:2,
                    urlPath: 'NormalLoginForm',
                    nodeInfo: './treetest/NormalLoginForm'
                },
                {
                    id: '11',
                    level:2,
                    title: '注册新用户',
                    icon: 'form',
                    urlPath: 'NewUserRegistration',
                    nodeInfo: './treetest/NewUserRegistration'
                },
                {
                    id: '12',
                    level:2,
                    title: '高级搜索',
                    icon: 'form',
                    urlPath: 'MultiConditionSearch',
                    nodeInfo: './treetest/MultiConditionSearch'
                },
                {
                    id: '13',
                    level:2,
                    title: '弹出层中的新建表单',
                    icon: 'form',
                    urlPath: 'CollectionCreateForm',
                    nodeInfo: './treetest/CollectionCreateForm'
                },
                {
                    id: '14',
                    level:2,
                    title: '动态增减表单项',
                    icon: 'form',
                    urlPath: 'DynamicFieldSet',
                    nodeInfo: './treetest/DynamicFieldSet'
                },
                {
                    id: '15',
                    level:2,
                    title: '时间类控件',
                    icon: 'form',
                    urlPath: 'TimeRelatedForm',
                    nodeInfo: './OtherForms/TimeRelatedForm'
                },
                {
                    id: '16',
                    level:2,
                    title: '自定义表单控件',
                    icon: 'form',
                    urlPath: 'PriceInput',
                    nodeInfo: './OtherForms/PriceInput'
                }
            ]
        },
        {
            id: '18',
            level: 1,
            title: '官方模块测试',
            icon: 'windows',
            children: [
                {
                    id: '19',
                    level:2,
                    title: 'Spin测试',
                    icon: 'windows',
                    urlPath: 'spnningTest',
                    nodeInfo: './compoTests/spnningTest'
                },
                {
                    id: '20',
                    level:2,
                    title: 'TreeSelect',
                    icon: 'windows',
                    urlPath: 'treeSelectTest',
                    nodeInfo: './compoTests/treeSelectTest'
                },
                {
                    id: '21',
                    level:2,
                    title: '异步加载树形',
                    icon: 'windows',
                    urlPath: 'treeAsyncTest',
                    nodeInfo: './compoTests/treeAsyncTest'
                },
                {
                    id: '28',
                    level:2,
                    title: '照片墙',
                    icon: 'windows',
                    urlPath: 'UploadMain',
                    nodeInfo: './UploadTest/UploadMain'
                },
                {
                    id: '29',
                    level:2,
                    title: '拖拽上传',
                    icon: 'windows',
                    urlPath: 'DragDropUpload',
                    nodeInfo: './UploadTest/DragDropUpload'
                },
            ]
        },
        {
            id: '23',
            level: 1,
            title: '嵌套路由测试',
            icon: 'html5',
            children: [
                {
                    id: '24',
                    level:2,
                    title: '员工BP号维护',
                    icon: 'windows',
                    urlPath: 'test_layout_index',
                    nodeInfo: './test_layout/index'
                },
            ]
        },
        {
            id: '25',
            level: 1,
            title: 'Uncontrolled Components',
            icon: 'html5',
            children: [
                {
                    id: '26',
                    level:2,
                    title: 'FileInput',
                    icon: 'windows',
                    urlPath: 'FileInput',
                    nodeInfo: './UncontrolledComponents/FileInput'
                },
            ]
        },
        {
            id: '30',
            level: 1,
            title: '拖动实验',
            icon: 'html5',
            children: [
                {
                    id: '31',
                    level:2,
                    title: 'Card Drag N Drop',
                    icon: 'windows',
                    urlPath: 'CardDragNDrop',
                    nodeInfo: './DragNDrop/CardDND'
                },                
                {
                    id: '32',
                    level:2,
                    title: 'CreateNewComponent',
                    icon: 'windows',
                    urlPath: 'CreateNewComponent',
                    nodeInfo: './compoTests/createNewComponent'
                }
            ]
        }
    ]
}