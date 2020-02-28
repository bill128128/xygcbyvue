<template>
	<div id="brand">
		<top :message='title'></top>
		<div class="brand">
			<ul class="brandbox">
				<li v-for="(item,index) in tlist" :key="index" @click="getbrandid(item.id)">
					<img :src="item.avatar"/>
					{{item.title}}
				</li>
			</ul>
			<ul class="brandlist">
				<li ref="clickitem" v-for="(item,index) in pinpai" :key='index' @click="changeys(index);search(index)" :class='{active:changecolor == index}'>{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'brand',
		components:{
			top,
		},
		data(){
			return{
				title:'品牌',
				changecolor:0,
				cityid:0,
				pinpai:[],
				brandlist:[],
				str:'',
				tlist:[],
			}
		},
		methods:{
			changeys(index){
				this.changecolor = index;
			},
			getbrand(){
				this.cityid = window.localStorage.getItem('cityid');
				this.$store.dispatch('brand/getBrand',this.cityid).then(()=>{
					if(this.$store.state.brand.code == 200){
						this.brandlist = this.$store.state.brand.brand;
						this.tlist = this.$store.state.brand.brand;
						this.pinpai = this.$store.state.brand.initials;
					}else{
						this.$toast({
							message:this.$store.state.brand.msg
						})
					}
				}).catch((e)=>{
					
				})
			},
			doit(str){				
				var mlist = [];
				this.brandlist.forEach(function(item){
					if(item.initials == str){
						mlist.push(item);
					}
					
				});
				return mlist;
			},
			search(index){
				let getText = this.$refs.clickitem[index].innerText;
				this.tlist = this.doit(getText);
			},
			getbrandid(index){
				this.$router.push({
					name:'selectCar',
					params:{
						id:index,
					}
				});
				//window.localStorage.setItem('brandid',index);
			},
		},
		created(){
			this.getbrand();
			
		},
		
//		mounted(){//这里必须是mouted钩子
//			this.str = document.querySelector('.active');
//			console.log(this.str);
//		}
	}
</script>

<style scoped lang="less">
	#brand{
		min-height: 18rem;
	}
	.brand{
		width: 8.27rem;
		position: relative;
		top: 2rem;
		margin: 0 auto;
		.brandbox{
			width: 8.27rem;
			height: 12.3rem;
			background: url(../../../static/img/ppbg.png) no-repeat;
			background-size:cover ;
			padding-top: 1.3rem;
			padding-left: 0.8rem;
			padding-right: 0.8rem;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: flex-start;
			align-content:flex-start;
			margin-bottom:1rem;
			li{
				width: 1.3rem;
				height: 1.8rem;
				margin-right: 0.32rem;
				text-align: center;
				color: #000;
				font-size: 0.32rem;
				line-height: 0.59rem;
				
				img{
					width: 1.28rem;
					height: 1.28rem;
				}
			}
		}
		.brandlist{
			width: 6.31rem;
			margin: 0 auto;
			font-size: 0.37rem;
			color: #433e2e;
			display: flex;
			justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;
			li{
				width:0.701rem ;
				line-height: 0.7rem;
				text-align: center;
			}
			.active{
				font-size: 0.64rem;
				color: #E6CC7E;
			}
		}
	}
</style>