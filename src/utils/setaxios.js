import axios from 'axios'
const setAxios = () => {

    axios.interceptors.request.use(request => {
        console.log('request.headers["Access-Control-Allow-Origin"]', request.headers["Access-Control-Allow-Origin"]);
        // config//headers["Access-Control-Allow-Credentials","true"]
        request.headers["Access-Control-Allow-Credentials"] = true;
        request.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, OPTIONS, DELETE, PATCH";
        request.headers["Access-Control-Max-Age"] = 3600;
        request.headers["Access-Control-Allow-Headers"]
            = "token,Origin, X-Requested-With, Content-Type, Accept,mid,X-Token";
        request.headers["Access-Control-Allow-Origin"] = "*";

        console.log('request.headers["Access-Control-Allow-Origin"]-after', request.headers["Access-Control-Allow-Origin"]);
        return request
    },error=>{
        console.log(error)
    })

    axios.interceptors.response.use(response => {
        // console.log('response.setHeader', response.setHeader);
        // response.headers["Access-Control-Allow-Credentials"] = true;
        // response.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, OPTIONS, DELETE, PATCH";
        // response.headers["Access-Control-Max-Age"] = 3600;
        // response.headers["Access-Control-Allow-Headers"]
        //     = "token,Origin, X-Requested-With, Content-Type, Accept,mid,X-Token";
        // response.headers["Access-Control-Allow-Origin"] = "*";

        return response
    },error=>{
        console.log(error)
    })
}

export { setAxios }