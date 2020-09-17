// import { connect } from 'umi'
import MainFrame from '../MainFrame'
import { Redirect, connect } from 'umi'

const Wrapper = (props) => {
    const { loginState } = props
    return (
        loginState ? <MainFrame >
            <div style={{ backgroundColor: 'coral' }}>
                {props.children}
            </div>
        </MainFrame> : <Redirect to="/" />
    )
}

export default connect(({ login }) => ({
    loginState: login.loginState
}))(Wrapper)