import {Button} from 'antd'
export default ({history})=>{
    console.log("history:", history);
    return <div>
        404 Page
        <div>
            <Button type="link" href="/">回到登录页面</Button>
        </div>
    </div>
}