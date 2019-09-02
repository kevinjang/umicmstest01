import axios from 'axios'
const setAxios = () => {

    axios.defaults.baseURL = "http://localhost:3000";

    axios.interceptors.request.use(request => {
        // console.log('request.headers',request.headers)
        request.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
        // request.setHeader
        console.log('axios-request-set', request.headers);
        // // request.headers
        // // console.log('request.headers["Access-Control-Allow-Origin"]', request.headers["Access-Control-Allow-Origin"]);
        // // config//headers["Access-Control-Allow-Credentials","true"]
        // // 启用此项后，上面的域名不能为'*'，必须指定具体的域名，否则浏览器会提示错误
        // // request.headers["Access-Control-Allow-Credentials"] = true;

        request.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, OPTIONS, DELETE, PATCH";
        // request.headers["Access-Control-Max-Age"] = 3600;
        // request.headers["access-control-allow-headers"]
        //     = " X-Requested-With, Content-Type,Origin,";// token, Accept,mid,X-Token
        request.headers["Content-Type"] = "application/json";
        // console.log('request.headers["Content-Type"]',request.headers["Content-Type"])
        // console.log('request headers["Access-Control-Allow-Origin"]:', request.headers["Access-Control-Allow-Origin"]);
        // console.log('request.headers["Access-Control-Allow-Origin"]-after', request.headers["Access-Control-Allow-Origin"]);
        return request
    }, error => {
        console.error('request error:',error)
    })

    axios.interceptors.response.use(response => {
        // console.log('response.setHeader', response.setHeader);
        // response.headers["Access-Control-Allow-Credentials"] = true;
        // response.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, OPTIONS, DELETE, PATCH";
        // response.headers["Access-Control-Max-Age"] = 3600;
        // response.headers["Access-Control-Allow-Headers"]
        //     = "token,Origin, X-Requested-With, Content-Type, Accept,mid,X-Token";
        console.log('axios-response-set:', response)
        // response.headers["content-type"] = "application/json";
        // response.headers["access-control-allow-origin"] = "*";
        // response.headers['Access-Control-Allow-Origin']= '*';

        return response
    }, error => {
        console.error('response error:',error)
    })


}

export { setAxios }

// axios.defaults.baseURL = "http://localhost:3000/";
// const instance = axios.create({
//     xsrfCookieName: 'xsrf-token'
// });

// instance.interceptors.request.use(function(config){
//     config.headers["Access-Control-Allow-Origin"] = "*";
//     return config;
// },function(error){
//     return Promise.reject(error);
// });

// instance.interceptors.response.use(function(response){

//     return response.data;
// },function(error){
//     return Promise.reject(error);
// });

// export default instance;