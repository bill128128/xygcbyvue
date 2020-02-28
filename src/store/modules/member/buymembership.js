import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:{},
		carmember:[], //返回数组+
		directors:[],
		contents:''
	},
	mutations:{
		mtCode(state,data){
		    state.code = data ;
		},
		mtMsg(state,data){
		    state.msg = data ;
		},
		mtData(state,data){
		    state.msg = data ;
		},
		mtcarmember(state,data){
		    state.carmember = data ;
		},
		mtdirectors(state,data){
		    state.directors = data ;
		},
		mtcontents(state,data){
		    state.contents = data ;
		},
	},
	actions:{
		getMemberList:function({commit},memberId){
			return new Promise((resolve,reject)=>{
				let token = window.localStorage.getItem('date');
				axios.get(api+'/User/list',{
					params:{
						memberId:memberId,
					},
					headers:{'token':token},
				}).then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtData',data.data);
					commit('mtcarmember',data.data.carmember);
					commit('mtdirectors',data.data.directors);
					commit('mtcontents',data.data.privilege.contents);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}