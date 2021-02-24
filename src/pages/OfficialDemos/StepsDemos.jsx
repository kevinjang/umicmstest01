import { Card, Steps, Divider, Button, message } from 'antd'
import { useState } from 'react'
import { StepForwardFilled, UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons'
import styles from './style.scss'

const { Step } = Steps
export default () => {
    const steps = [
        { title: 'First', content: 'First-content' },
        { title: 'Second', content: 'Second-content' },
        { title: 'Last', content: 'Last-content' }
    ]

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1);
    }

    return (
        <>
            <Card title={false}>
                <Steps current={1} size="small">
                    <Step title="Finished" description="This is a description."></Step>
                    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description."></Step>
                    <Step title="Waiting" description="This is a description."></Step>
                </Steps>
                <Steps current={1}>
                    <Step title="Finished" description="This is a description."></Step>
                    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description."></Step>
                    <Step title="Waiting" description="This is a description."></Step>
                </Steps>
            </Card>
            <Divider orientation="right"><StepForwardFilled /> Basic</Divider>
            <Card title={false}>
                <Steps>
                    <Step status="finish" title="Login" icon={<UserOutlined />}></Step>
                    <Step status="finish" title="Vertical" icon={<SolutionOutlined />}></Step>
                    <Step status="process" title="Pay" icon={<LoadingOutlined />}></Step>
                    <Step status="wait" title="Done" icon={<SmileOutlined />}></Step>
                </Steps>
            </Card>
            <Divider orientation="left">Status</Divider>
            <Card title={false}>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} ></Step>
                    ))}
                </Steps>
                <div className={styles["steps-content"]}>
                    {steps[current].content}
                </div>
                <div className={styles["steps-action"]}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {
                        current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
                            </Button>
                        )
                    }
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </Card>
            <Divider orientation="right">按钮控制</Divider>
            <Card title={false}>
                <Steps current={current} onChange={current=>setCurrent(current)}>
                    <Step title="Finished" description="This is a description."></Step>
                    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description."></Step>
                    <Step title="Waiting" description="This is a description."></Step>
                </Steps>
            </Card>
            <Divider orientation="left">可点击状态</Divider>
        </>
    )
}