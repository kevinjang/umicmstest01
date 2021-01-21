import React from 'react'
import { Layout, Spin, ConfigProvider } from 'antd'
import { connect } from 'umi'
import { UserContext, GetData, MyUserData } from './UserContextMock';
import config from '../../config/config'
import zhCN from 'antd/lib/locale/zh_CN'
import GlobalHeader from '../components/LayoutHeader/Header'
import GlobalContainer from '../components/LayoutContianer/Container'

class KLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            selectedKeys: ['1'],
            theme: 'dark',
            spinning: false,
            textAlign: 'center',
            paddingTop: '25%',
            pathname: './Index',
            MyUserData:{},
            UserContext: React.createContext({})
        }

        // this.contentRef = React.createRef();
        this.globalContext = React.createContext({});

    }

    componentWillMount() {
        if (window.location.pathname === '/') {
            history.go('/login')
        }
        this.setState({
            spinning: true
        }, () => {
            GetData("zhanghaoming").then(({UserContext, MyUserData}) => {
                this.setState({
                    spinning: false,
                    textAlign: 'initial',
                    paddingTop: '0',
                    MyUserData
                })
            });


        })
    }

    componentDidMount() {
        const { routes } = config
        console.log('config:', routes)
        this.setState({
            breadcrumbs: this.props.breadcrumbs || [{ title: 'KSNL', level: 0, icon: 'Chrome' }]
        })
    }

    render() {
        return <div style={{
            width: '100%', height: 'calc(100vh - 0px)'
            , textAlign: `${this.state.textAlign}`, paddingTop: `${this.state.paddingTop}`
        }}>
            <ConfigProvider locale={
                zhCN
            }>
                <Spin spinning={this.state.spinning && !UserContext}
                    size="large" >
                    {UserContext ?
                        <UserContext.Provider value={MyUserData}>
                            <Layout style={{ height: '100vh' }}>
                                <GlobalHeader MyUserData={MyUserData} />
                                <GlobalContainer {...this.props} />
                            </Layout>
                        </UserContext.Provider>
                        : ''}
                </Spin>
            </ConfigProvider>
        </div>
    }
}

const KLayoutX = connect(({ login, menus, ERColumns }) => ({
    login, menus, ERColumns
}))(KLayout)

export default KLayoutX;