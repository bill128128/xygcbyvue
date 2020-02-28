<template>
	<div id="notice">
		<top :message='title'></top>
		<div class="container">
			<div class="intro">
				<h2>{{noticetitle}}</h2>
				<div v-html="noticecontent">{{noticecontent}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'notice',
		components:{
			top,
		},
		data(){
			return{
				title:'详情',
				noticetitle:'',  //公告标题
				noticecontent:'', //公告内容
				pageindex:0,
				noticeid:0
			}
		},
		created(){
			//加载完毕调用接口
			this.noticeid = window.localStorage.getItem('noticeid');
			console.log(this.noticeid);
			this.$store.dispatch('noticeDetail/getNoticeDetail',this.noticeid).then(()=>{
				if(this.$store.state.noticeDetail.code == 200){
					this.noticetitle = this.$store.state.noticeDetail.data.title;
					this.noticecontent = this.$store.state.noticeDetail.data.contents;
				}else if(this.$store.state.noticeDetail.code == 40000){
            			window.localStorage.removeItem('date');
						this.$router.push('/login');
            		}
				else{
					this.$toast({
						message:this.$store.state.noticeDetail.msg,
					});
				}
			}).catch((e) => {              
					alert(输入错误);
				});
		},
		methods:{
			checkgologin(uri){
            	const token = window.localStorage.getItem('date');
            	if(token==null || token=='undefined'){
            		this.$toast({
            			message:'请先登录',
            		});
            		this.$router.push('/login')
            	}else{
            		this.$router.push(uri);
            	}
            },
		}
	}
</script>

<style scoped>
	.container{
		width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.8rem;
        min-height: 18rem;
	}
	.intro{
		width: 9.2rem;
		background-color: #262626;
		box-shadow: 0rem 0.05rem 0.26rem 0.01rem 
			rgba(0, 0, 0, 0.4);
		border-radius: 0.13rem;
		padding:0.4rem;
	}
	.intro img{
		width: 100%;
		height: 100%;
	}
	.intro h2{
		color: #E6CC7E;
		text-align: center;
		font-size: 0.37rem;
		margin-bottom: .5rem;
	}
	.intro div{
		color: #999;
		line-height: 0.5rem;
	}
	
</style>