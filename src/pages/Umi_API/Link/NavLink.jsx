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
            <div>
                Exact, when true, the active class/style will only be applied if the location is matched exactly.
                <div>
                    <NavLink exact to="/profile" activeClassName="selected">Exact</NavLink>
                </div>
            </div>
            <div>
                Strict, when true, the trailing slash on a location's pathname will be taken into consideration when determining if the location matches the current URL.
                <div>
                    <NavLink strict to="/profile/" activeClassName="selected">Strict</NavLink>
                </div>
            </div>
            <div>
                A function to add extra logic for determining whether the link is active. This should be used if you want to do more than verify that 
                the link's pathname matches the current URL's pathname.
                <div>
                    <NavLink to="/profile" 
                        exact
                        activeClassName="selected"
                        isActive={(match, location)=>{
                            if(!match){
                                return false;
                            }
                            return location.search.includes('name');
                        }}>Profile</NavLink>
                </div>
            </div>
        </div>
    );
}