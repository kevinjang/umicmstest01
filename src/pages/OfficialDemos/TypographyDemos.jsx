import { Typography, Space, Card, Switch, Slider } from 'antd'
const { Text, Link, Paragraph } = Typography
import { useState } from 'react'
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons'

export default () => {

    const [editableStr, setEditableStr] = useState("This is an editable text.");
    const [customIconStr, setCustomIconStr] = useState("Custom Edit icon and replace tooltip text.")
    const [hideTooltipStr, setHideTooltipStr] = useState("Hide Edit tooltip")
    const [lengthLimitedStr, setLengthLimitedStr] = useState(
        'This is an editable text with limited length.',
    );


    const [ellipsis, setEllipsis] = React.useState(true);

    const [rows, setRows] = useState(1);

    const onChange = (rows)=>{
        setRows(rows)
    }
    const article =
    "To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life";
  
    return (
        <>
            <Card title="Basic">
                <Space>
                    <div><Text>Ant Design(default)</Text></div>
                    <div><Link type="secondary">Ant Design(secondary)</Link></div>

                    <Text type="success">Ant Design (success)</Text>
                    <Text type="warning">Ant Design (warning)</Text>
                    <Text type="danger">Ant Design (danger)</Text>
                    <Text disabled>Ant Design (disabled)</Text>


                    <Text mark >Ant Design (mark)</Text>
                    <Text code>Ant Design (code)</Text>
                    <Text keyboard>Ant Design (keyboard)</Text>
                    <Text underline>Ant Design (underline)</Text>
                    <Text delete>Ant Design (delete)</Text>
                    <Text strong>Ant Design (strong)</Text>
                    <Link href="https://ant.design" target="_blank">
                        Ant Design (Link)
                    </Link>
                </Space>
            </Card>
            <Card title="可交互的">
                <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
                <Paragraph editable={{
                    icon: <HighlightOutlined />,
                    tooltip: 'click to edit text',
                    onChange: setCustomIconStr
                }}>{customIconStr}</Paragraph>
                <Paragraph editable={{
                    tooltip: false,
                    onChange: setHideTooltipStr
                }} >{hideTooltipStr}</Paragraph>
                <Paragraph editable={{
                    onChange: setLengthLimitedStr,
                    maxLength: 50,
                    autoSize: {
                        maxRows: 5, minRows: 3
                    }
                }}>
                    {lengthLimitedStr}
                </Paragraph>
                <Paragraph copyable>This is a copyable text.</Paragraph>
                <Paragraph copyable={{
                    text: 'Hello, Ant Design!'
                }}>Replace copy text.</Paragraph>
                <Paragraph copyable={{
                    icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />],
                    tooltips: ['click here', 'you clicked!!']
                }}>Custom Copy icon and replace tooltips text.</Paragraph>
                <Paragraph copyable={{ tooltips: false }}>Hide Copy tooltips.</Paragraph>
            </Card>
            <Card title="省略号">
                <Switch checked={ellipsis} onChange={() => {
                    setEllipsis(!ellipsis);
                }}>
                </Switch>
                <Paragraph ellipsis={ellipsis}>
                    Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team.
                    </Paragraph>
                <Paragraph
                    ellipsis={
                        ellipsis
                            ? {
                                rows: 2,
                                expandable: true,
                                symbol: 'more',
                                onEllipsis:()=>{
                                    setEllipsis(!ellipsis)
                                }
                            }
                            : false
                    } 
                    
                >
                    Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team. Ant
                    Design, a design language for background applications, is refined by Ant UED Team.
                    </Paragraph><Text
                    style={
                        ellipsis
                            ? {
                                width: 100,
                            }
                            : undefined
                    }
                    ellipsis={
                        ellipsis
                            ? {
                                tooltip: 'I am ellipsis now!',
                            }
                            : false
                    }
                >
                    Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Text>
            </Card>
            <Card title="后缀">
                <Slider value={rows} min={1} max={10} onChange={onChange}></Slider>
                <Paragraph
                    ellipsis={{
                        rows,
                        expandable: true,
                        suffix: '--William Shakespeare',
                        onEllipsis: ellipsis=>{
                            console.log('Ellipsis changed:', ellipsis);
                        }
                    }}
                    title={`${article}--William Shakespeare`}>{article}</Paragraph>
            </Card>
        </>
    )
}