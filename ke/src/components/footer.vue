<template>
	<div>
		<nav class="bar bar-tab">
	  		<router-link  class="tab-item external" to="/" v-bind:class="[tabIndex == 0 ? 'active' : '']">
	    		<span class="icon icon-home"></span>
	    		<span class="tab-label">首页</span>
	  		</router-link>
		   	<router-link  class="tab-item external"  to="/cate" v-bind:class="[tabIndex == 1 ? 'active' : '']">
		    	<span class="icon icon-app"></span>
		    	<span class="tab-label">分类</span>
		  	</router-link>
		  	<router-link  class="tab-item external" to="/plan" v-bind:class="[tabIndex == 2 ? 'active' : '']">
		    	<span class="icon icon-edit"></span>
		    	<span class="tab-label">课程表</span>
		  	</router-link>
		  	<router-link class="tab-item external" to="/mine" v-bind:class="[tabIndex == 3 ? 'active' : '']">
		    	<span class="icon  icon-me"></span>
		    	<span class="tab-label">我的</span>
		  	</router-link>
		</nav>
	</div>
</template>

<script>
	export default{
		data() {
			return {
			}
		},
		props:["tabIndex"],
	}
</script>