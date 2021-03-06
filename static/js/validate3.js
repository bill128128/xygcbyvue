import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
})
Vue.use(VeeValidate, {
    i18n,
    i18nRootKey: 'validation',
    dictionary: {
        zh_CN
    }
});


// 自定义validate 
const dictionary = {
   zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: ( field )=> "请输入" + field
      },
      attributes:{
        email:'邮箱',
        password:'密码',
        repassword:'确认密码',
        name: '账号',
        phone: '手机',
        realname: '真实姓名'
      }
  }
};



Validator.extend('phone', {
  messages: {
    zh_CN:field => field + '必须是11位手机号码',
    en:(field, args) => field + '必须是11位手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

const dict = {  
	zh: {    
		custom: {      
			email: {        
				required: '邮箱不能为空' // messages can be strings as well.     
			},      
			phone: {        
				required: '手机不能为空'      
			},      
			realname: {        
				required: '真实姓名不能为空'     
			}
		}  
	}
}
