const MenusModel = {
    namespace: "menus",
    /* 43了*/
    state: {
        menus: [
            {
                id: "1",
                level: 1,
                title: "Option 1",
                icon: "PieChart",
                children: [
                    {
                        id: "4",
                        level: 2,
                        title: "Table数据展示",
                        icon: "PieChart",
                        urlPath: "/mainframe/dashboard",
                        // path: '',
                        nodeInfo: "./dashboard/dashboard"
                    }, {
                        id: "5",
                        level: 2,
                        title: "窗口编辑",
                        icon: "PieChart",
                        // path: '/mainframe/treetest',
                        urlPath: "/mainframe/newaladin",
                        nodeInfo: "./EditInModal/index"
                    }
                ]
            },
            {
                id: "2",
                level: 1,
                title: "Option 2",
                icon: "Weibo",
                children: [
                    {
                        id: "6",
                        level: 2,
                        title: "弹窗编辑示例",
                        icon: "Weibo",
                        urlPath: "/mainframe/aladin",
                        path: 'aladin',
                        nodeInfo: "./treetest/Aladin"
                    }, {
                        id: "7",
                        level: 2,
                        title: "网格内编辑示例",
                        icon: "PieChart",
                        urlPath: "formtest",
                        nodeInfo: "./treetest/FormTest"
                    }
                ]
            },
            {
                id: "3",
                level: 1,
                title: "数据管理中心",
                icon: "Weibo",
                children: [
                    {
                        id: "17",
                        level: 2,
                        title: "离职查询授权",
                        icon: "Weibo",
                        urlPath: "/mainframe/LeaveAuthorization",
                        nodeInfo: "./BPM_RM/LeaveAuthorization"
                    },
                    {
                        id: "22",
                        level: 2,
                        title: "员工BP号维护",
                        icon: "Windows",
                        urlPath: "/mainframe/EmployeeBPMaintain",
                        nodeInfo: "./BPM_RM/EmployeeBPMaintain"
                    },
                    {
                        id: "27",
                        level: 2,
                        title: "员工年假标准维护",
                        icon: "Twitter",
                        urlPath: "VacationStandardMaintain",
                        nodeInfo: "./BPM_RM/VacationStandardMaintain"
                    }
                ]
            },
            {
                id: "8",
                level: 1,
                title: "Form表单学习",
                icon: "Form",
                children: [
                    {
                        id: "9",
                        level: 2,
                        title: "水平排列登陆表单",
                        icon: "Form",
                        urlPath: "HorizontalLoginForm",
                        nodeInfo: "./treetest/HorizontalLoginForm"
                    },
                    {
                        id: "10",
                        level: 2,
                        title: "正常登录表单",
                        icon: "Form",
                        level: 2,
                        urlPath: "NormalLoginForm",
                        nodeInfo: "./treetest/NormalLoginForm"
                    },
                    {
                        id: "11",
                        level: 2,
                        title: "注册新用户",
                        icon: "Form",
                        urlPath: "NewUserRegistration",
                        nodeInfo: "./treetest/NewUserRegistration"
                    },
                    {
                        id: "12",
                        level: 2,
                        title: "高级搜索",
                        icon: "Form",
                        urlPath: "MultiConditionSearch",
                        nodeInfo: "./treetest/MultiConditionSearch"
                    },
                    {
                        id: "13",
                        level: 2,
                        title: "弹出层中的新建表单",
                        icon: "Form",
                        urlPath: "CollectionCreateForm",
                        nodeInfo: "./treetest/CollectionCreateForm"
                    },
                    {
                        id: "14",
                        level: 2,
                        title: "动态增减表单项",
                        icon: "Form",
                        urlPath: "DynamicFieldSet",
                        nodeInfo: "./treetest/DynamicFieldSet"
                    },
                    {
                        id: "15",
                        level: 2,
                        title: "时间类控件",
                        icon: "Form",
                        urlPath: "TimeRelatedForm",
                        nodeInfo: "./OtherForms/TimeRelatedForm"
                    },
                    {
                        id: "16",
                        level: 2,
                        title: "自定义表单控件",
                        icon: "Form",
                        urlPath: "PriceInput",
                        nodeInfo: "./OtherForms/PriceInput"
                    }
                ]
            },
            {
                id: "18",
                level: 1,
                title: "官方模块测试",
                icon: "Windows",
                children: [
                    // {
                    //     id: "19",
                    //     level: 2,
                    //     title: "Spin测试",
                    //     icon: "Windows",
                    //     urlPath: "/mainframe/spnningTest",
                    //     nodeInfo: "./compoTests/spnningTest"
                    // },
                    // {
                    //     id: "20",
                    //     level: 2,
                    //     title: "TreeSelect",
                    //     icon: "Windows",
                    //     urlPath: "treeSelectTest",
                    //     nodeInfo: "./compoTests/treeSelectTest"
                    // },
                    // {
                    //     id: "21",
                    //     level: 2,
                    //     title: "异步加载树形",
                    //     icon: "Windows",
                    //     urlPath: "treeAsyncTest",
                    //     nodeInfo: "./compoTests/treeAsyncTest"
                    // },
                    // {
                    //     id: "28",
                    //     level: 2,
                    //     title: "照片墙",
                    //     icon: "Windows",
                    //     urlPath: "UploadMain",
                    //     nodeInfo: "./UploadTest/UploadMain"
                    // },
                    // {
                    //     id: "29",
                    //     level: 2,
                    //     title: "拖拽上传",
                    //     icon: "Windows",
                    //     urlPath: "DragDropUpload",
                    //     nodeInfo: "./UploadTest/DragDropUpload"
                    // },
                    {
                        id: "38",
                        level: 2,
                        title: "Table基本用法",
                        icon: "Windows",
                        urlPath: "/mainframe/BasicTableDemo",
                        nodeInfo: "./TableDemos/BasicTableDemo"
                    },
                    {
                        id: "39",
                        level: 2,
                        title: "JSX Stylish Api",
                        icon: "Windows",
                        urlPath: "/mainframe/JSXAPI",
                        nodeInfo: "./TableDemos/JSXAPI"
                    },
                    {
                        id: "40",
                        level: 2,
                        title: "行点击选中",
                        icon: "Windows",
                        urlPath: "/mainframe/RowClickSelect",
                        nodeInfo: "./TableDemos/RowClickSelect"
                    },
                    {
                        id: "41",
                        level: 2,
                        title: "自定义选择项",
                        icon: "Html5",
                        urlPath: "/mainframe/CustomSelect",
                        nodeInfo: "./TableDemos/CustomSelect"
                    },
                    {
                        id: "42",
                        level: 2,
                        title: "筛选与排序",
                        icon: "Fund",
                        urlPath: "/mainframe/FilterAndSort",
                        nodeInfo: "./TableDemos/FilterAndSort"
                    },
                    {
                        id: "43",
                        level: 2,
                        title: "多列排序",
                        icon: "Fund",
                        urlPath: "/mainframe/MultipleSort",
                        nodeInfo: "./TableDemos/MultipleSort"
                    },
                    {
                        id: "44",
                        level: 2,
                        title: "远程加载数据",
                        icon: "Fund",
                        urlPath: "/mainframe/RemateFetch",
                        nodeInfo: "./TableDemos/RemateFetch"
                    },
                    {
                        id: "45",
                        level: 2,
                        title: "可展开",
                        icon: "Fund",
                        urlPath: "/mainframe/Expandable",
                        nodeInfo: "./TableDemos/Expandable"
                    },
                    {
                      id: "46",
                      level: 2,
                      title: "受控的筛选和排序",
                      icon: "Fund",
                      urlPath: "/mainframe/ControlledFilterAndSort",
                      nodeInfo: "./TableDemos/ControlledFilterAndSort"
                    },
                    {
                        id: "47",
                        level: 2,
                        title: "行列合并",
                        icon: "Fund",
                        urlPath: "/mainframe/RowColMerge",
                        nodeInfo: "./TableDemos/RowColMerge"
                    },
                ]
            },
            {
                id: "23",
                level: 1,
                title: "嵌套路由测试",
                icon: "Html5",
                children: [
                    {
                        id: "24",
                        level: 2,
                        title: "员工BP号维护",
                        icon: "Windows",
                        urlPath: "test_layout_index",
                        nodeInfo: "./test_layout/index"
                    },
                ]
            },
            {
                id: "25",
                level: 1,
                title: "Uncontrolled Components",
                icon: "Html5",
                children: [
                    {
                        id: "26",
                        level: 2,
                        title: "FileInput",
                        icon: "Windows",
                        urlPath: "FileInput",
                        nodeInfo: "./UncontrolledComponents/FileInput"
                    },
                ]
            },
            {
                id: "30",
                level: 1,
                title: "拖动实验",
                icon: "Html5",
                children: [
                    {
                        id: "31",
                        level: 2,
                        title: "Card Drag N Drop",
                        icon: "Windows",
                        urlPath: "CardDragNDrop",
                        nodeInfo: "./DragNDrop/CardDND"
                    },
                    {
                        id: "32",
                        level: 2,
                        title: "CreateNewComponent",
                        icon: "Windows",
                        urlPath: "CreateNewComponent",
                        nodeInfo: "./compoTests/createNewComponent"
                    }
                ]
            },
            {
                id: "33",
                level: 1,
                title: "上传测试",
                icon: "File",
                children: [
                    {
                        id: "34",
                        level: 2,
                        title: "ImageUploadTest",
                        icon: "Windows",
                        urlPath: "ImageUploadTest",
                        nodeInfo: "./FileUploadTest/ImageUploadTest1"
                    },
                    {
                        id: "35",
                        level: 2,
                        title: "FileUploadTest",
                        icon: "Windows",
                        urlPath: "FileUploadTest",
                        nodeInfo: "./FileUploadTest/FileUploadTest1"
                    }
                ]
            },
            {
                id: '36',
                level: 1,
                title: '数据维护',
                icon: 'Setting',
                children: [
                    {
                        id: "37",
                        level: 2,
                        title: "黄页结构",
                        icon: "Windows",
                        urlPath: "/mainframe/OUUsersMaintenance",
                        // nodeInfo: "./OUUsersMaintenance/index"
                    },
                ]
            }
        ],
        activeSubMebu: '',
        selectedMenuItem: ''
    }
}

export default MenusModel
