<template>
	<div id="modifypassword">
		<top :message='title'></top>
		<div class="container">
			<div class="select_box">
                <ul class="select_list">
                    <li v-for="(item,index) in tab" :key="index" @click="changeActive(index),tabChange('select' + (index + 1))" :class="{active:index == tabIndex}">{{item}}</li>
                </ul>
            </div>
            <!-- 可用招募积分+可用招募红利 -->
            <keep-alive> 
		        <component v-bind:is="tabView"></component>
		    </keep-alive>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	import select1 from './modifypassword/mopassword'
    import select2 from './modifypassword/mopaypassword'
	export default{
		name:'modifypassword',
		components:{
			top,select1,select2
		},
		data(){
			return{
				title:'修改密码',
				tabView: 'select1',
				tab:['登录密码','支付密码'],    //tab
                tabIndex:0,  //tab默认选中第一个
			}
		},
		methods:{
			changeActive(index){    //tab切换
                this.tabIndex = index ;
            },
            tabChange:function(tab){
		        this.tabView = tab;
		    },
		}
	}
</script>

<style scoped lang="less">
	#modifypassword{
		min-height: 18rem;
	}
	.container{
		position: relative;
		top: 2rem;
		width: 9.2rem;
		overflow: auto;
		margin: 0 auto;
		height: 17.05rem;
	}
	.select_box{
	    width:100%;
	    height:1.2rem;
	    position: relative;
	    border-bottom:1px solid #666;
	    box-sizing: border-box;
	    margin:0 auto;
	}
	.select_box .select_list{
	    width:100%;
	    position: absolute;
	    top:0;
	    left:0;
	    box-sizing: border-box;
	}
	.select_box .select_list li{
	    float:left;
	    text-align:center;
	    height:1.2rem;
	    line-height:1.2rem;
	    font-size:0.37rem;
	    color:#fff;
	    box-sizing: border-box;
	}
	.select_box .select_list li.active{
	    border-bottom:2px solid #E6CC7E;
	    color:#E6CC7E;
	}
	/* 分段选择器 */
    .select_list li{ width:50%; }
    .main_available .item{  width:50%;  }
    /* form */
    .selected .select_menu{ display:block }
</style>