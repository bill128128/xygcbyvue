import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0, //返回状态码
		msg:'', //返回状态信息
		data:[], //返回数组
		webTitle:'',//项目名称
		guideTitle:'',//导航标题
		guideBanner:[], //banner数组
		
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
		mtWebTitle(state,data){
		    state.webTitle = data ;
		},
		mtGuideTitle(state,data){
		    state.guideTitle = data ;
		},
		mtGuideBanner(state,data){
		    state.guideBanner = data ;
		},
	},
	actions:{
		getBootPage:function({commit}){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/index/guide').then((res)=>{
					const data = res.data;
					commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtData',data.data);
					commit('mtWebTitle',data.data.webTitle);
					commit('mtGuideTitle',data.guideTitle);
					commit('mtGuideBanner',data.data.guideBanner);
					resolve(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}