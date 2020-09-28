# 数据模式

##### pages 渲染页面，

###### 		只实现数据的渲染，数据的修改都保存到models中去，临时数据修改都在页面的state中保存，只有点击确定时才推送到models。

###### 		但是又感觉不合理。推送到models以后就必须和数据库同步了，否则没有时点可以完成models和数据库的同步工作。

###### 		也就是在推送到models时就需要同步到数据库里了。

##### models数据逻辑

1. ###### effects - 远程请求数据，也可以调用reducers中定义的函数用于处理数据，如请求回来的数据调用一个保存的reducer函数以更新state中的数据；

2. ###### reducers - 处理state中的数据

3. ###### state - 数据存储中心

4. ###### namespace - 数据中心名称用于区别

##### services发起网络请求

##### mock响应网络请求



# 加解密库



https://www.npmjs.com/package/aes-crypto









# 笔记：

1. 在useEffect钩子中直接使用useState时会导致内存溢出，正确的方法就是：

   ```javascript
   useEffect(()=>{
       const fetchData = async ()=>{
           const result = await axios( 'https://hn.algolia.com/api/v1/search?query=redux',);
           setData(result.data)
       }
       fetchData(); // 闭包的方式不会避免useState和useEffect反复调用的问题，此处要注意！
       // 另外，之所以新增加一个内部函数，原因是因为async会返回一个Promise对象，而useEffect必须返回空或者一个清理函数，所以包裹一层，防止报错！
   }, [])
   ```

   

2. 上述代码中useEffect的第二参数是指其依赖项，字符串数组，表达哪些内容发生变化时才会触发这个useEffect；**当指定空数组时也就是只有在最初mount时才会触发这个useEffect**。

3. useEffect的返回值就是一个函数，概念是清理函数，用于在组件卸载或者useEffect重新执行时时清理上一次渲染的副效应（side effects)。

4. useEffect是可以多次调用的，不要把内容都混杂的写在一起。

5. 在useEffect中直接使用async是不被允许的，因为async是会返回Promise对象的；使用async/await就会resolve由async返回的Promise对象，并解析出返回结果。

6. 自定义钩子的学习

   ```javascript
   const useDataApi = (initialUrl, initialData) => {
       const [data, setData] = useState(initialData);
       const [url, setUrl] = useState(initialUrl);
       const [isLoading, setIsLoading] = useState(false);
       const [isError, setIsError] = useState(false);
       
       useEffect(()=>{
               const fetchData = async ()=>{
               try{
                   setIsError(false)
                   setIsLoading(true)
                   const result = await axios(url);
                   setData(result.data)
               }
               catch(error){
                   setIsError(true)
               }
       	};
       	fetchData();
       }, [url]);
       
       return [{data, isLoading, isError}, setUrl];    
   }
   ```

   ```javascript
   // 在别的地方调用这个钩子
   const [{data, isLoading, isError}, doFetch] = useDataApi('https://hn.algolia.com/api/v1/search?query=redux',
                                                           { hits: [] })
   ```

   *doFetch这个函数就是setUrl，每次把新的查询条件url传过去就会自动触发副效应useEffect，进而对页面产生影响。*

7. 

