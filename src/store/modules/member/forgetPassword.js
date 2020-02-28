import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息		
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
	},
	actions:{
		doit:function({commit},userInfo){
			let username = userInfo.name;
			let mobile = userInfo.mobile;
			let verify = userInfo.vertify;
			let password = userInfo.password;
			let repassword = userInfo.repassword;			
			return new Promise((resolve,reject)=>{
				axios.post(api+'/member/forgetPassword',{
					username:username,
					mobile:mobile,
					verify:verify,
					password:password,
					repassword:repassword,
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}