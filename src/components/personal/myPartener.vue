<template>
	<div id="myPartener">
		<top :message='title' :notes='notes'></top>
		<ul class="hbbg">
			<li v-for="(item,index) in list" :key="index">
				<img :src="item.avatar">
				{{item.username}}
			</li>
			
		</ul>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'myPartener',
		components:{
			top,
		},
		data(){
			return{
				title:'我的伙伴',
				info:{
					memberid:0,
					page:1,
				},
				list:[],
				notes:'邀请伙伴',
			}
		},
		methods:{
			golist(){
				this.$router.push('/addpartener');
			},
			getlist(){
				this.info.memberid = window.localStorage.getItem('memberid');
				this.$store.dispatch('mypartener/getPartenerList',this.info).then(()=>{
					if(this.$store.state.mypartener.code == 200){
						this.list = this.$store.state.mypartener.data;
					}else if(this.$store.state.mypartener.code==40000){
						this.$toast({
						message:'您还没有登录！'
					})
	               
	                		window.localStorage.removeItem('date');	
	           				this.$router.push('/login');
					}
					else{
						this.$toast({
							message:this.$store.state.mypartener.msg,
						});
					}
				}).catch((e) => {              
	                //console.log(e);
	            });
			}
		},
		created(){
			this.getlist();
		},
	}
</script>

<style scoped lang="less">
	#myPartener{
		min-height: 18rem;
	}
	.hbbg{
		position: relative;
		top: 2rem;
		margin: 0 auto;
		width: 8.27rem;
		height: 13.89rem;
		background-color: #000000;
		box-shadow: 0rem 0.13rem 0.25rem 0.02rem 
			rgba(0, 0, 0, 0.6);
		border-radius: 0.13rem;
		background: url(../../../static/img/hbbg.png) no-repeat;
		background-size: cover;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: flex-start;
		align-items: flex-start;
		padding: 0.6rem;
		li{
			width: 1.1rem;
			height: 1.75rem;
			color: #ccc;
			font-size: 0.32rem;
			line-height: 0.59rem;
			text-align: center;
			display: flex;
			flex-direction: column;
			margin-right: 0.3rem;
			margin-bottom: 0.3rem;
			overflow: hidden;
			img{
				width: 1.07rem;
				height: 1.07rem;
				border-radius: 0.13rem;
			}
		}
	}
</style>