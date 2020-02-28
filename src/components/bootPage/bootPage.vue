<template>
	<div id="bootPage">
		<div class="bootPage"></div>
		<div class="cl">
			<img src="../../../static/img/go.png" @click="goindex">
		</div>
		<div class="count">{{content}}s</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				content:0, //显示的内容
                totalTime:5, //记录具体倒计时的时间
				list:[],
			}
		},
		mounted(){
			this.content = 5;
			var timer = setInterval(
				this.countdown,1000);
			if(content=0){
				clearInterval(timer);
			}
        },
		created() {
			this.getBootPage();
		},
		methods:{
			getBootPage(){
				this.$store.dispatch('bootPage/getBootPage').then(()=>{
					if(this.$store.state.bootPage.code == 200){
//						this.$toast({
//							message:this.$store.state.bootPage.msg,
//						});
						this.list = this.$store.state.bootPage.data;
						//console.log(this.list);
					}
				})
			},
			countdown(){
				this.content --;
			},
			goindex(){
				this.$router.push('/index');
			}
		},
		watch:{
			'content':function(newVal,oldVal){
       			if(newVal==0){
//                  if(JSON.parse(localStorage.getItem('guideCode')) == "" || JSON.parse(localStorage.getItem('guideCode')) == null){
//                      this.$router.push('/guide/guideguidAddPartner');
//                  }else{
//                      this.$router.push('/index/index');
//                  }
					this.$router.push('/index/');
					this.content = 0;
		        }
       		}
		}
	}
</script>

<style scoped lang="less">
	#bootPage{
		width: 10rem;
		min-height: 18rem;
		height: 100%;
        
	}
	.bootPage{
		position: fixed;
        top:0;
        left:0;
        width:100%;
        height:17.79rem;
		background: url("../../../static/img/bootPage.png") no-repeat;
		height: 17.79rem;
		width: 10rem;
		background-size:cover;
	}
	.cl{
		position: fixed;
		bottom: 1.7rem;
		left: 50%;
		margin-left: -1.35rem;
		width: 2.69rem;
		height: 2.73rem;
		background: url(../../../static/img/clb.png) no-repeat;
		background-size: cover;
		padding: 0.4rem;
		img{
			width: 1.87rem;
			height: 1.88rem;
		}
	}
	.count{
        position: fixed;
        top:0.5rem;
        right:0.5rem;
        color:#fff;
        border-radius: 50%;
        width:1.33rem;
        height:0.64rem;
        line-height:0.64rem;
        text-align:center;
        background-color:#e6cc7e;
        border-radius: 0.32rem;
        font-size:0.37rem;
    }
</style>
