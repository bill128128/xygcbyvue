<template>
	<div id="mopaypassword">
		<form action="" class="form">
                 <label for="">原支付密码：
                    <input type="password" placeholder="请输入登录密码" v-model="pwdInfo.oldpwd" name="oldpwd">
                    </label>
                <label for="">新密码：
                    <input type="password" placeholder="请输入新密码" v-model="pwdInfo.newpwd" name='password'>
                </label>
                <label for="">确认新密码：
                    <input type="password" placeholder="请再次输入新密码" v-model="pwdInfo.repwd" name="repassword">
                </label>
                <div class="tc">
                    <button class="submit" type="button" @click="doit">提交</button>
                </div>
            </form> 
	</div>
</template>

<script>
	export default{
		name:'mopaypassword',
		data(){
			return{
				title:'修改密码',
				pwdInfo:{
            		oldpwd:'',
	            	newpwd:'',
	            	repwd:'',
	            	type:2,
	            	memberid:0,
            	},
			}
		},
		methods:{
			doit(e){
				e.preventDefault();
				this.pwdInfo.memberid = window.localStorage.getItem('memberid');
				this.$store.dispatch('mopass/doit',this.pwdInfo).then(()=>{
					if(this.$store.state.mopass.code == 200){
						this.$toast({
							message:this.$store.state.mopass.msg,
						});
						this.$router.go(-1);
					}else if(this.$store.state.mopass.code==40000){
						window.localStorage.removeItem('date');
						this.$router.push('/login');
					}
					else{
						this.$toast({
							message:this.$store.state.mopass.msg,
						});
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			}
		}
	}
</script>

<style scoped lang="less">
	#mopassword{
		/*margin: 0 auto;
		width: 8.4rem;
		height: 13.01rem;
		background-color: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
		border-radius: 0.13rem;*/
	}
	form{
    	width: 8.4rem;
		height: 13.01rem;
		background-color: #262626;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
		border-radius: 0.13rem;
	    margin:0 auto;
	    padding:1.35rem 0;
}
form h3{
    font-size:0.53rem;
    color:#fff;
    margin-bottom:1.05rem;
}
form label{
    display: block;
    width:6.8rem;
    height:1.2rem;
    line-height:1.2rem;
    box-sizing: border-box;
    background:#000;
    margin:0 auto 0.8rem;
    border-radius:0.13rem;
    color:#999;
    font-size:0.37rem;
    padding:0 0.2rem;
}
.submit{
    width:5.33rem;
    height:1.07rem;
    line-height:1.07rem;
    background-color:#1a1a1a;
    box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.2);
	border-radius: 0.13rem;
    text-align:center;
    margin-left:1.45rem;
    font-size:0.43rem;
    color:#E6CC7E;
    border: none;
    /*box-sizing: border-box;*/
}
form label input{
    width:68%;
    background-color:transparent;
    padding:0.2rem 0;
    color: #4d4d4d;
    outline: none;
    border: none;
}
.placeholderDiv{
        width:100%;
        height:1.2rem;
        margin-bottom:0.8rem;
}
::-webkit-input-placeholder{  color:#666; font-size:0.37rem;}
:-moz-placeholder{ color:#666; font-size:0.37rem;}
::-moz-placeholder{ color:#666; font-size:0.37rem;}
:-ms-input-placeholder{ color:#666; font-size:0.37rem;}
	.select_list li{ width:50%; }
    form{margin-top:0.53rem;}
    form label{ width:6.8rem; }
    form label input{width:63%;}
    form button.submit{margin-top:0.27rem;}
</style>