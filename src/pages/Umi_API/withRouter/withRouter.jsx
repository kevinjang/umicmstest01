import { withRouter, useHistory, useParams, useRouteMatch } from 'umi'

export default withRouter(({ history, location, match }) => {
    const history1 = useHistory();
    const params = useParams();
    const match1 = useRouteMatch();
    return (
        <div>
            withRouter
            <ul>
                <li>history:{history.action}</li>
                <li>location:{location.pathname}</li>
                <li>match:{`${match.isExact}`}</li>
            </ul>
            <div>
                useHistory：
                <div>
                    {history1.action}
                </div>
            </div>
            <div>
                <div>
                    useParams
                    <div>
                        <ul>
                            <li>
                                params:{JSON.stringify(params)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                useRouteMatch
                <div>
                    <ul>
                        <li>
                            useRouteMatch:{`${match1}`}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
})