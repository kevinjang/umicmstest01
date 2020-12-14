import { NavLink } from 'umi';

export default () => {
    return (
        <div>
            A special version of the {`<`}Link{`>`} that will add styling attributes to the rendered element when it matches the current URL.
            <div>
                Same as Link
                <div>
                    <NavLink to="/about">About</NavLink>
                </div>
            </div>
            <div>The class to give the element when it is active. The default given class is active. This will be joined with the className prop.
                <div>
                    <NavLink to="/faq" activeClassName="selected">FAQs</NavLink>
                </div>
            </div>
            <div>
                The styles to apply to the element when it is active.
                <div>
                    <NavLink to="/faq" style={{
                        fontWeight: 'bold',
                        color:"red"
                    }}>FAQs</NavLink>
                </div>
            </div>
        </div>
    );
}