<template>
	<div id="noticeList">
		<top :message='title'></top>
		<div class="container">
			<ul class="noticeList">
				<li v-for="(item,index) in noticelist" :key="index" @click="goToNotice(item)">
					<div class="ltop">
						<div class="title">{{item.title}}</div>
						<p>{{item.description}}</p>
					</div>
					<div class="lbottom">
						<div class="timer">
							{{item.create_time}}
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'noticeList',
		components:{
			top,
		},
		data(){
			return{
				title:'消息',
				noticelist:[],
				info:{
					memberid:0,
					page:1,
				},
			}
		},
		methods:{
			getnoticelist(){
				this.info.memberid = window.localStorage.getItem('memberid');
            	this.$store.dispatch('noticeList/getNoticeList',this.info).then(()=>{
            		if(this.$store.state.noticeList.code == 200){
            			this.noticelist = this.$store.state.noticeList.data;
            		}else if(this.$store.state.noticeList.code == 40000){
            			window.localStorage.removeItem('date');
						this.$router.push('/login');
            		}
            		else{
            			this.$toast({
            				message:this.$store.state.noticeList.msg
            			})
            		}
            		
            	}).catch((e)=>{
            		
            	})
            },
            goToNotice(item){ //去公告详情页
				this.$router.push({name:'noticeDetail',params:{id:item.id}});
				window.localStorage.setItem('noticeid',item.id);
			},
		},
		created(){
			this.getnoticelist();
		}
	}
</script>

<style scoped lang="less">
	@import url("../../../static/css/common.css");
	.container{
		min-height: 17rem;
		padding-top:0.4rem;
		.noticeList{
			position: relative;
			width: 100%;
			height: 100%;
			li{
				width: 100%;
				margin-bottom:0.53rem;
				.ltop{
					position:relative;
					z-index:10;
					width: 9.2rem;
					background-color: #262626;
					box-shadow: 0rem 0.05rem 0.26rem 0.01rem 
						rgba(0, 0, 0, 0.4);
					border-radius: 0.13rem;
					padding:0.4rem;
					.title{
						padding-left: 0.4rem;
						font-size: 0.43rem;
						line-height: 0.48rem;
						letter-spacing: 0rem;
						color: #e6cc7e;
					}
					p{
						padding: 0.4rem 0 0.4rem 0;
						width: 8.37rem;
						font-size: 0.37rem;
						font-weight: normal;
						font-stretch: normal;
						line-height: 0.56rem;
						letter-spacing: 0.01rem;
						color: #999999;
					}
				}
				.lbottom{
					position:relative;
					width: 8.4rem;
					background-color: #262626;
					box-shadow: 0rem 0.08rem 0.26rem 0.01rem 
						rgba(0, 0, 0, 0.4);
					border-radius: 0.13rem 0.13rem 0.13rem 0.13rem;
					margin: 0 auto;
					margin-top: -0.1rem;
					.timer{
						text-align: right;
						color: #666666;
						font-size: 0.32rem;
						padding-top: 0.29rem;
						padding-bottom: 0.29rem;
						padding-right: 0.4rem;
					}
				}
			}
		}
	}
	
</style>