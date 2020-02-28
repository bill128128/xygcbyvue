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
		doit:function({commit},info){
			return new Promise((resolve,reject)=>{
				let token = window.localStorage.getItem('date');
				let memberId = info.memberid;
				let type = info.type;
				let olpassword = info.oldpwd;
				let password = info.newpwd;
				let newPassword = info.repwd;
				console.log(type,memberId,olpassword,password,newPassword);
				axios.post(api+'/Member/modPass',{
						memberId:memberId,
						type:type,
						olpassword:olpassword,
						password:password,
						newPassword:newPassword,
				},
				{
					headers:{'token':token},
				}
					).then((res)=>{
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