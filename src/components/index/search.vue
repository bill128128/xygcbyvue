<template>
	<div id="search">
		<div class="content">
			<div class="search">
				<img src="../../../static/img/search.png" />
				<form action="javascript:;">
					<input type="search" placeholder="搜索" @keypress="searchcar" v-model="keyword" />
				</form>
				<img src="../../../static/img/cb.png" @click="resetkeyword">
			</div>
			<p @click="goback">取消</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:'search',
		data(){
			return{
				keyword:'',
			}
			
		},
		methods:{
			resetkeyword(){
				this.keyword = '';
			},
			goback:function(){
				this.$router.go(-1);
			},
			searchcar(e){
				if(e.keyCode == 13){
					this.$router.push({name:'selectCar',params:{keyword:this.keyword}})
				}				
			},
		},
		created:{
			
		}
	}
</script>

<style scoped lang="less">
	.content{
		width: 100%;
		padding: 0.4rem;
		display: flex;
		justify-content: space-between;
		min-height: 18rem;
		p{
			color: #E6CC7E;
			font-size: 0.4rem;
			line-height: 1.2rem;
			height: 1.2rem;
		}
		.search{
			width: 8rem;
			height: 0.85rem;
			background-color: #333333;
			border-radius: 0.43rem;
			margin-top: .2rem;
			padding:0 .27rem;
			display: flex;
			align-items: center;
		}
		.search img{
			width: .37rem;
			height: .37rem;
		}
		.search form{
			display: flex;
			align-items: center;
		}
		.search form input{
			background-color: #333;
			border: none;
			outline: none;
			width: 6.67rem;
			color: #666;
			padding-left:0.2rem;
			font-size:.37rem;
			color:#666;
		}
		::-webkit-input-placeholder { /* WebKit, Blink, Edge */
			font-size:.37rem;
			color:#666;
		}
		:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			font-size:.37rem;
			color:#666;
		}
		::-moz-placeholder { /* Mozilla Firefox 19+ */
			font-size:.37rem;
			color:#666;
		}
		:-ms-input-placeholder { /* Internet Explorer 10-11 */
			font-size:.37rem;
			color:#666;
		}
	}
</style>