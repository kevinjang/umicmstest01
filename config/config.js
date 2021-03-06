// import Index from "../src/layout";

export default {
    plugins: [
        ['umi-plugin-react', {
            locale: {
                default: 'zh-CN',
                antd: true
            },
            antd: true,
            dva: true//,
            // ant-deisgn-pro: true
        }]
    ],
    chainWebpack:(config,{webpack})=>{
        // console.log('webpackchain',config.resolve.alias)
        config.resolve.alias.set('dashboard','/pages/dashboard/dashboard')
    },
    routes: [
        {
            path: '/', component: '../layout',
            routes: [
                { path: '/', component: './Login/Login' },
                {
                    path: '/mainframe', 
                    // component: './MainFrame/MainFrame'
                    component: './MainFrame'
                },
                {
                    path: '/treetest',
                    component: './treetest/treetest'
                },
                // {
                //     path: '/test_layout',
                //     component: './test_layout/_layout',
                //     routes:[
                //         {
                //             path: '/test_layout/',
                //             component: './test_layout/index',
                //         }
                //     ]
                // },
                { component: './404' }
            ]
        }
    ]
}