import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:{}, //返回对象
		expiring_in:'', //有效期		
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
		mtData(state,data){
		    state.data = data ;
		},
		mtExpiring_in(state,data){
		    state.expiring_in = data ;
		},
	},
	actions:{
		getVerify({commit,state},mobile){   		
			return axios.get(api+'/member/getForgetVerify?mobile='+mobile).then((res)=>{
				const data = res.data;
				commit('mtCode', data.code);
				commit('mtMsg',data.msg);
				commit('mtMsg',data.data);
				commit('mtData',data.data.expiring_in);
			}).catch(error=>{
				//console.log(res.data.code);
			});
		},
	}
}