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
            // path: '/', component: '../layout',
            // routes: [
            //     { path: '/', component: './Login/Login' },
            //     {
            //         path: '/', component: './MainFrame',
            //         routes: [
            //             {
            //                 path: '/dashboard', component: './dashboard/dashboard'
            //             },
            //             {
            //                 path: '/treetest', component: './treetest/treetest'
            //             },
            //             {
            //                 path: '/aladin', component: './treetest/aladin'
            //             },
            //             {
            //                 path: '/formtest', component: './treetest/FormTest'
            //             },
            //             {
            //                 path: '/LeaveAuthorization', component: './BPM_RM/LeaveAuthorization'
            //             },
            //         ]
            //     },
            //     { component: './404' }
            // ]
            path: '/', component: '@/pages/Login'
        },
        {
            path:'/mainframe', component:'@/pages/MainFrame',
            routes:[
                {path: '/mainframe/dashboard', component: '@/pages/dashboard/dashboard'},
                {path: '/mainframe/EmployeeBPMaintain', component: '@/pages/bpm_rm/EmployeeBPMaintain'},
                {path: '/mainframe/treetest', component: '@/pages/treetest/index'}

            ]
        }
    ]
}