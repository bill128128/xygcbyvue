import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		token:'', //返回token		
		memberid:0,
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
		mtToken(state,data){
		    state.token = data ;
		    window.localStorage.setItem('date',data);
		    
		},
	},
	actions:{
		login:function({commit},userInfo){
			const username = userInfo.name.trim();
			const password = userInfo.password.trim();
			return new Promise((resolve,reject)=>{
				axios.post(api+'/member/login',{
					username:username,
					password:password,
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtToken',data.token);
					
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}