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
		upload:function({commit},info){
			const memberId = info.memberid;
			const img = info.submit;
			return new Promise((resolve,reject)=>{
				axios.post(api+'/Member/updateAvatar',{
					memberId:memberId,
					img:img,
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