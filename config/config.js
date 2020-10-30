export default {
    antd: {
        dark: false,
        compact: false
    },
    dva: {
        hmr: true
    },
    // dynamicImport: {
    //     loading: '@/components/PageLoading/index'
    // },
    routes: [
        {
            path: '/', component: '@/pages/Login'
        },
        {
            path: '/mainframe', component: '@/pages/MainFrame',
            wrappers: ['@/pages/user/UrlPathGuard'],
            routes: [
                { path: '/mainframe/dashboard', component: '@/pages/dashboard/dashboard' },
                { path: '/mainframe/EmployeeBPMaintain', component: '@/pages/bpm_rm/EmployeeBPMaintain' },
                { path: '/mainframe/newaladin', component: '@/pages/EditInModal/index' },
                { path: '/mainframe/spnningTest', component: '@/pages/compoTests/spnningTest' },
                { path: '/mainframe/aladin', component: '@/pages/treetest/Aladin' },
                { path: '/mainframe/LeaveAuthorization', component: '@/pages/BPM_RM/LeaveAuthorization' },
                { path: '/mainframe/OUUsersMaintenance', component: '@/pages/OUUsersMaintenance/index' }

            ]
        },
        {
            path: '/404', component: '@/pages/404'
        }, {
            path: '/*'
        }
    ]
}