<template>
	<div>
		<div class="bar">
  			<div class="searchbar">
    			<a class="searchbar-cancel">取消</a>
    			<div class="search-input">
      				<label class="icon icon-search" for="search"></label>
      				<input type="search" id='search' placeholder='搜索老师、机构、课程' @keyup.enter="searchCourse" v-model="searchkey"/>
    			</div>
  			</div>
		</div>
	</div>
</template>

<script>
  export default{
    data(){
        return {
            searchkey : ""
        }
    },
    methods : {
        searchCourse(){
            this.$router.push({path:'/CourseList', query: { searchkey: this.searchkey }});
            
        }
      },
  }
</script>