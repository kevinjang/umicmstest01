import {Prompt} from 'umi'

export default ()=>{
    return (
        <div>
            Used to prompt the user before navigating away from a page. When your application enters a state that should prevent the user from navigating away(like a form is half-filled out), render a {`<Prompt>`}
            <div>
                <Prompt message="Are you leaving?" />
            </div>
            <div>
                <Prompt message={location=>{
                    return location.pathname !== "/" ? true : "Are you sure you want to back to home page?";
                }}></Prompt>
            </div>
        </div>
    );
}