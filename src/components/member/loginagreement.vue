<template>
	<div id="loginagreement">
		<top :message='title'></top>
		<div class="agreement">
			<div v-html="agreement.contents">{{agreement.contents}}</div>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'loginagreement',
		components:{
			top,
		},
		data(){
			return{
				title:'用户协议',
				agreement:{},
			}
		},
		created(){
			this.getloginagreement();
		},
		methods:{
			getloginagreement(){
				this.$store.dispatch('loginagreement/getloginagreement').then(()=>{
					if(this.$store.state.loginagreement.code == 200){
						this.agreement = this.$store.state.loginagreement.data;
					}else{
						this.$toast({
							message:this.$store.state.loginagreement.msg,
						});
					}
				}).catch((e)=>{
					console.log(e);
				})
			}
		}
	}
</script>

<style>
	.agreement{
		background: url(../../../static/img/agreementBg.png) no-repeat;
		width: 8.4rem;
		height: 14.35rem;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(0, 0, 0, 0.8);
		border-radius: 0.13rem;
		opacity: 0.8;
		background-size: cover;
		margin:0 auto 0.4rem;
	    overflow: auto;
	    position: relative;
	    top:1.4rem;
	    padding: 0.4rem;
	    font-size: 0.32rem;
	    color: #999;
	    line-height: 0.48rem;
	    letter-spacing: 0.01rem;
	}
</style>