<template>
	<div id="choseCity">
		<top :message='title'></top>
		<ul class="choseCity">
			<li>北京</li>
			<li>上海</li>
			<li class="active">盘锦</li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'choseCity',
		components:{
			top,
		},
		data(){
			return{
				title:'选择城市',
				
			}
			
		},
		methods:{
			
		},
		created:{
			
		}
	}
</script>

<style scoped lang="less">
	.choseCity{
		background: url(../../../static/img/xzcsbg.png) no-repeat ;
		background-size: cover;
		width: 100%;
		height: 16.3rem;
		padding: 0.8rem;
		position: relative;
		top: 1.4rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		li{
			width: 30%;
			height: 0.96rem;
			border-radius: 0.13rem;
			border: solid 0.03rem #333333;
			text-align: center;
			line-height: 0.96rem;
			font-size: 0.48rem;
			color: #666;
		}
		.active{
			width: 30%;
			height: 0.96rem;
			border-radius: 0.13rem;
			border: solid 0.03rem #e5cc7e;
			text-align: center;
			line-height: 0.96rem;
			font-size: 0.48rem;
			color: #e6cc7e;
		}
	}
</style>