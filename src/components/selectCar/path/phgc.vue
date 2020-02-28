<template>
	<div id="phgc">
		<div v-html="content">{{content}}</div>
	</div>
</template>

<script>
	export default{
		name:'phgc',
		data(){
			return{
				content:''
			}
		},
		methods:{
			getcontent(){
				this.$store.dispatch('buyCarPath/getBuyCarPath').then(()=>{
					if(this.$store.state.buyCarPath.code == 200){
						this.content = this.$store.state.buyCarPath.data[2].contents;
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
	#phgc{
		width: 100%;
		min-height: 100vh;
		background: url(../../../../static/img/phgc.png) no-repeat;
		background-size: contain;
		padding: 3rem 0.4rem 1.5rem;
		line-height: 0.48rem;
		color: #666;
		font-size: 0.32rem;
	}
</style>