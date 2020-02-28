<template>
	<div id="cwhy">
		<div v-html="content">{{content}}</div>
	</div>
</template>

<script>
	export default{
		name:'cwhy',
		data(){
			return{
				content:''
			}
		},
		methods:{
			getcontent(){
				this.$store.dispatch('buyCarPath/getBuyCarPath').then(()=>{
					if(this.$store.state.buyCarPath.code == 200){
						this.content = this.$store.state.buyCarPath.data[0].contents;
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
	#cwhy{
		width: 100%;
		min-height: 100vh;
		background: url(../../../../static/img/cwhy.png) no-repeat;
		background-size: contain;
		padding: 3rem .4rem 1.5rem;
		line-height: 0.48rem;
		color: #666;
		font-size: 0.32rem;
	}
</style>