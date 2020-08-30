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
                { path: '/', component: './Login/Login' },
                {
                    path: '/mainframe', 
                    component: './MainFrame'
                },
                {
                    path: '/treetest',
                    component: './treetest/treetest'
                },
                { component: './404' }
            ]
        }
    ]
}