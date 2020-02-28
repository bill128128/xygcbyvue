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
		register:function({commit},userInfo){
			let username = userInfo.name;
			let mobile = userInfo.mobile;
			let verify = userInfo.vertify;
			let number = userInfo.tj;
			let car_region = userInfo.car_region;
			let password = userInfo.password;
			let repassword = userInfo.repassword;
			let pay_password = userInfo.paypassword;
			let repay_password = userInfo.repaypassword;
			return new Promise((resolve,reject)=>{
				axios.post(api+'/member/reg',{
					username:username,
					mobile:mobile,
					verify:verify,
					number:number,
					car_region:car_region,
					password:password,
					repassword:repassword,
					pay_password:pay_password,
					repay_password:repay_password,
				}).then((res)=>{
					const data = res.data;
					console.log(data);
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