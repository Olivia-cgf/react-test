import axios from 'axios';
 
export function post(url:string, data = {},) {
	let postData = data;
 	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: url,
			data: postData,
		}).then(response => {
			resolve(response.data);
		})
	})
};


// 添加请求拦截
/* axios.interceptors.request.use(
	config => {
		var token = sessionStorage.getItem("token");
		if(token){
			config?.headers?.Authorization = 'bearer	'+token;
		}
		if(config?.url != '/accounts/loginByCode'){
			config?.headers?.saasTenantToken = 'xxxxxx'
		} 
		return config;
	},
	err => {
		return Promise.reject(err);
	});*/
//添加响应拦截器
axios.interceptors.response.use((response) => {
	return response;
}, function(error) {
	if(error.response.status === 401) {
		// router.push({
		// 	path: "/login",
		// });
	}

	return Promise.reject(error);
})
  
