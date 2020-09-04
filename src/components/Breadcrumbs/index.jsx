import { Breadcrumb } from 'antd'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import { connect } from 'umi'
import {ChromeOutlined, MailOutlined} from '@ant-design/icons'

const KsnlBreadCrumbs = ({ breadcrumbs, menus }) => {
    return (
        <Breadcrumb style={{padding: '10px'}}>
            {breadcrumbs.map((breadcrumb, index) => {
                let path = breadcrumb.match.path;
                if (path === '/') {
                    return <Breadcrumb.Item>
                        {/* <Icon type='chrome' /> */}
                        <ChromeOutlined size="small" />
                        KSNL
                    </Breadcrumb.Item>
                }

                if (path === '/mainframe') {
                    return <Breadcrumb.Item>
                        {/* <Icon type="mail" /> */}
                        <MailOutlined size="small" />
                        主页
                    </Breadcrumb.Item>
                }

                const itemY = find(flatMapDeep(menus, 'children'), (xItem) => {
                    return xItem.urlPath === path;
                })

                return <Breadcrumb.Item>
                    <Icon type={itemY.icon} />{itemY.title}
                </Breadcrumb.Item>
            })}
        </Breadcrumb>
    )
}

export default withBreadcrumbs()(
    connect(({ menus }) => ({
        menus
    }))(KsnlBreadCrumbs)
);