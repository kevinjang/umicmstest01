import { Card, Row, Col, Skeleton, Switch, Avatar } from 'antd'
import { useState } from 'react'
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'

const { Meta, Grid } = Card

const avatarSrc = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201411%2F01%2F20141101171342_xHRH2.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616726693&t=f2620c34a4dc343da0406038b42d8703";

export default () => {
    const [loading, setLoading] = useState(true);

    const onChange = checked => {
        setLoading(!checked)
    }

    return (
        <div style={{ padding: '0 0 10px 0' }}>
            <Row gutter={4} style={{ width: '100%' }}>
                <Col span={4}>
                    <Card title={"Photo Album"} hoverable style={{ width: 260 }} cover={<img src="https://goss.cfp.cn/creative/vcg/veer/800/new/VCG41N647563386.jpg" />} >
                        <Meta title={"title X"} description={"description X"} avatar={<Avatar src={avatarSrc} />}>

                        </Meta>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card hoverable title={"Grid Album"} style={{ width: 'auto' }}
                        cover={<img src="https://alifei03.cfp.cn/creative/vcg/veer/800water/veer-128524042.jpg" />}>
                        <Grid style={{ textAlign: 'center' }}>
                            Content 1
                        </Grid>
                        <Grid style={{ textAlign: 'center' }}>
                            Content 2
                        </Grid>
                        <Grid style={{ textAlign: 'center' }}>
                            Content 3
                        </Grid>
                        <Grid style={{ textAlign: 'center' }}>
                            Content 4
                        </Grid>
                        <Grid style={{ textAlign: 'center' }}>
                            Content 5
                        </Grid>
                        <Grid style={{ textAlign: 'center' }}>
                            Content 6
                        </Grid>
                    </Card>
                </Col>

                <Col span={4}>
                    <div>
                        <Switch checked={!loading} onChange={onChange}></Switch>
                        <Card hoverable style={{ width: 300 }} loading={loading}>
                            <Meta avatar={<Avatar src={avatarSrc} />}
                                title={"骨架屏"} description={"骨架屏加载"}></Meta>
                        </Card>

                        <Card hoverable style={{ width: 300 }}
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}>
                            <Skeleton loading={loading} avatar active>
                                <Meta avatar={<Avatar src={avatarSrc} />}
                                    title={"骨架屏"} description={"骨架屏加载"}></Meta>
                            </Skeleton>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}