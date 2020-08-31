export default {
    antd: {
        dark: false,
        compact: false
    },
    dva: {
        hmr: true
    },
    routes: [
        {
            path: '/', component: '../layout',
            routes: [
                { path: '/login', component: './Login/Login' },
                {
                    path: '/', component: './MainFrame',
                    routes: [
                        {
                            path: '/dashboard', component: './dashboard/dashboard'
                        },
                        {
                            path: '/treetest', component: './treetest/treetest'
                        },
                        {
                            path: '/aladin', component: './treetest/aladin'
                        },
                        {
                            path: '/formtest', component: './treetest/FormTest'
                        },
                        {
                            path: '/LeaveAuthorization', component: './BPM_RM/LeaveAuthorization'
                        },
                    ]
                },
                { component: './404' }
            ]
        }
    ]
}