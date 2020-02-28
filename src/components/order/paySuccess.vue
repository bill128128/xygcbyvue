<template>
	<div id="paySuccess">
		<div class="payss">
			<div class="pays">
				<div class="success">√</div>
	        	<p>支付成功</p>
			</div>
			
	        <div class="pay">
	        	{{num}}
	        </div>
	        <div class="title">您的排号码</div>
	        <ul>
	            <li @click="goSrc('/selectCar')">再次选购</li>
	            <li @click="goSrc('/myOrder')">查看订单</li>
	        </ul>
		</div>
		<div class="fd">
        	<div class="ftop"  @click="goSrc('/memindex')"><img src="../../../static/img/tc.png"></div>
        	<div class="fbottom" @click="goSrc('/personal')"><img src="../../../static/img/me.png"></div>
        </div>
	</div>
</template>

<script>
	export default{
		name:'paySuccess',
		data(){
			return{
				num:0,
			}
		},
		methods:{
			getnum(){
				this.num = window.localStorage.getItem('num');
			},
			goSrc(str){
				this.$router.push(str);
			},
		},
		created(){
			this.getnum();
		}
	}
</script>

<style scoped lang="less">
	#paySuccess{
		padding: 2.1rem 0.8rem 2.1rem 0.8rem;
		min-height: 18rem;
	}
	.fd{
    	width: 1.17rem;
		height: 2.37rem;
		background-color: #262626;
		border-radius: 0.13rem;
		position: fixed;
		bottom: 0.2rem;
		left: 0.1rem;
		opacity: 0.9;
		display: flex;
		flex-direction: column;
		.ftop{
			padding: 0.2rem;
			border-bottom: 1px solid #1a1a1a;
		}
		.fbottom{
			padding: 0.2rem;
		}
    }
	.payss{
		background: url(../../../static/img/pbg.png) no-repeat;
		width: 8.4rem;
		height: 13.55rem;
		background-size: cover;
		border-radius: 0.13rem;
	}
	.pays{
		padding-top: 2.1rem;
		width: 3.5rem;
		margin: 0 auto;
		margin-bottom: 1rem;
		display: flex;
		p{
			font-size:0.64rem;
	        color:#E6CC7E;
	        text-align:center;
	        line-height: 0.7rem;
		}
	}
	.success{
        width: 0.74rem;
		height: 0.74rem;
        line-height:0.7rem;
        text-align:center;
        border-radius: 50%;
        box-sizing: border-box;
        border:0.05rem solid #ffbb33;
        margin:0 auto;
        font-size:0.5rem;
        color:#ffbb33;
    }
    .pay{
        width: 2.67rem;
		height: 2.67rem;
		border-radius: 50%;
		background-image: linear-gradient(-45deg, 
			#e5cc7e 0%, 
			#ffecb2 100%);
		border-style: solid;
		border-width: 0.08rem;
		border-color: #ccb17a;
    	border-radius: 50%;
		border-image-slice: 1;
		margin: 0 auto;
		font-size: 1.6rem;
		text-align: center;
		line-height: 2.4rem;
		color: #fff;
		margin-bottom: 0.5rem;
    }
    .title{
    	text-align: center;
    	font-size: 0.47rem;
    	color: #ccb570;
    	margin-bottom: 2rem;
    }
   
    ul{
        width:6.14rem;
        display: flex;
        justify-content: space-between;
        margin:0 auto;
    }
    li{
        width: 2.67rem;
        height: 1.07rem;
        line-height:1.07rem;
	    background-color: #e6cc7e;
        border-radius: 0.13rem;
        color:#fff;
        font-size:0.43rem;
        text-align:center;
    }
</style>