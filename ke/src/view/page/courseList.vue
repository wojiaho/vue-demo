<template>
    <div>
        <div class="top">
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
        <div class="main">
            <ul>
                <li class="course-list" v-for="course in courseList">
                    <a href="javascript:;" @click="getCourseDetail(course.pid)">
                        <div class="course-left" v-bind:style="{'background-image':'url('+course.img+')'}">
                        <span class="course-tip">4868人最近报名</span>
                        </div>
                        <div class="course-right">
                            <h3 class="course-title">{{course.title}}</h3>
                            <p class="course-info">
                                <span class="course-info-price course-info-free" v-show="course.price == 0">免费</span>
                                <span class="course-info-price" v-show="course.price != 0">￥{{course.price | toThousands}}</span>
                            </p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    @import '../../assets/css/page/courseList.css'
</style>

<script>
    export default{

        data() {
            return {
                courseList : [],
                searchkey: ""
            }
        },
        mounted(){
            this.searchkey = this.$route.query.searchkey
        },
        created() {
            this.$axios.get('data/courseList.json').then((response) => {
                 this.courseList = response.data;
            })
        },
        methods : {
            searchCourse(){
            },
            getCourseDetail(pid){
                this.$router.push({name:'CourseDetail', params: {id : pid}});
            }
        }
    }
</script>