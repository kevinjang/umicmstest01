export default {
    antd: {
        dark: false,
        compact: false
    },
    dva: {
        hmr: true
    },
    alias:{
        'ksnlSearchSquare': '@/CommonUtility/BPM_RM/SearchSquare',
        'ksnlUserService': '@/services/UserService',
        'ksnlUtils': '@/utils/utils',
        'ksnlFilterDropdown': '@/CommonUtility/FilterDropdown/FilterDropdown'
    },
    // dynamicImport: {
    //     loading: '@/components/PageLoading/index'
    // },
    routes: [
        {
            path: '/', component: '@/pages/Login', title: '登陆'
        },
        {
            path: '/mainframe', component: '@/pages/MainFrameNew',
            title: 'KSNL',
            wrappers: ['@/pages/user/UrlPathGuard'],
            routes: [
                { path: '/mainframe/dashboard', component: '@/pages/dashboard/dashboard' },
                { path: '/mainframe/EmployeeBPMaintain', component: '@/pages/bpm_rm/EmployeeBPMaintain', title: '员工BP号维护' },
                { path: '/mainframe/newaladin', component: '@/pages/EditInModal/index' },
                { path: '/mainframe/spnningTest', component: '@/pages/compoTests/spnningTest' },
                { path: '/mainframe/aladin', component: '@/pages/treetest/Aladin' },
                { path: '/mainframe/LeaveAuthorization', component: '@/pages/BPM_RM/LeaveAuthorization' },
                { path: '/mainframe/OUUsersMaintenance', component: '@/pages/OUUsersMaintenance/index' },
                { path: '/mainframe/BasicTableDemo', component: '@/pages/TableDemos/BasicTableDemo' },
                { path: '/mainframe/JSXAPI', component: '@/pages/TableDemos/JSXAPI' },
                { path: '/mainframe/RowClickSelect', component: '@/pages/TableDemos/RowClickSelect' },
                { path: '/mainframe/CustomSelect', component: '@/pages/TableDemos/CustomSelect' },
                { path: '/mainframe/FilterAndSort', component: '@/pages/TableDemos/FilterAndSort' },
                { path: '/mainframe/MultipleSort', component: '@/pages/TableDemos/MultipleSort' },
                { path: '/mainframe/ControlledFilterAndSort', component: '@/pages/TableDemos/ControlledFilterAndSort' },
                { path: '/mainframe/RemateFetch', component: '@/pages/TableDemos/RemateFetch' },
                { path: '/mainframe/Expandable', component: '@/pages/TableDemos/Expandable' },
                { path: '/mainframe/Link01', component: '@/pages/Umi_API/Link/Link01' },
                { path: '/mainframe/NavLink', component: '@/pages/Umi_API/Link/NavLink' },
                { path: '/mainframe/Prompt', component: '@/pages/Umi_API/Prompt/Prompt' },
                { path: '/mainframe/withRouter', component: '@/pages/Umi_API/withRouter/withRouter' },
                { path: '/mainframe/lineChartWithComment', component: '@/pages/AntVSamples/Line/withComment' },
                { path: '/mainframe/withStyling', component: '@/pages/AntVSamples/Line/withStyling' },
                { path: '/mainframe/withSlider', component: '@/pages/AntVSamples/Line/withXAxis' },
                { path: '/mainframe/ColoredLines', component: '@/pages/AntVSamples/Line/ColoredLines' },
                { path: '/mainframe/MultipleLinesAnimation', component: '@/pages/AntVSamples/Line/MultipleLinesAnimation' },
                { path: '/mainframe/ColumnLineMixed', component: '@/pages/AntVSamples/DualAxes/ColumnLineMixed' },
                { path: '/mainframe/RowColMerge', component: '@/pages/TableDemos/RowColMerge' } ,
                { path: '/mainframe/TreeData', component: '@/pages/TableDemos/TreeData' } ,
                { path: '/mainframe/FixedTableHead', component: '@/pages/TableDemos/FixedTableHead' } ,
                {
                    path: '/mainframe/404', component: '@/pages/404'
                }

            ]
        },
        {
            path: '/404', component: '@/pages/404'
        }, {
            path: '/*'
        }
    ],
}
