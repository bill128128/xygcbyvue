<template>
	<div id="tchj">
		<div v-html="content">{{content}}</div>
	</div>
</template>

<script>
	export default{
		name:'tchj',
		data(){
			return{
				content:''
			}
		},
		methods:{
			getcontent(){
				this.$store.dispatch('buyCarPath/getBuyCarPath').then(()=>{
					if(this.$store.state.buyCarPath.code == 200){
						this.content = this.$store.state.buyCarPath.data[3].contents;
					}else{
						this.$toast({
							message:this.$store.state.buyCarPath.msg
						});
					}
				}).catch((e) => {              
					console.log(e);
				})	
			}
		},
		created(){
			this.getcontent();
		}
	}
</script>

<style scoped lang="less">
	#tchj{
		width: 100%;
		min-height: 100vh;
		background: url(../../../../static/img/tchj.png) no-repeat;
		background-size: contain;
		padding: 3rem 0.4rem 1.5rem;
		line-height: 0.48rem;
		color: #666;
		font-size: 0.32rem;
	}
</style>