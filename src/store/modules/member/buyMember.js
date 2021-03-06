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
		buyMember:function({commit},info){
			return new Promise((resolve,reject)=>{
				let token = window.localStorage.getItem('date');
				let memberId = info[0];
				let directorsId = info[1];
				let payPassword = info[2];
				axios.post(api+'/User/PurUser',{
						memberId:memberId,
						directorsId:directorsId,
						payPassword:payPassword,
				},
				{headers:{'token':token}}
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