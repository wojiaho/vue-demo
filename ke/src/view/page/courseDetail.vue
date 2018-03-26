<template>
    <div>
        <div class="top">
            <search-bar></search-bar>
        </div>
        <div class="container">
            <div class="video-wrap" >
                <video class="video" controls width="100%" poster="../../../img/test2.png">
                    <source :src="detail.url" type="video/mp4">
                </video>
            </div>
            <div>
                <div class="buttons-tab">
                    <a href="#tab1" class="tab-link active button">详情</a>
                    <a href="#tab2" class="tab-link button" @click="getCatalog">目录</a>
                    <a href="#tab3" class="tab-link button">相关课程</a>
                </div>
                <div class="tabs">
                    <div class="tab active" id="tab1">
                        <div class="basic-info">
                            <div class="js-title-bar">
                                <h1 class="js-title-bar-title">{{detail.title}}</h1>
                                <div class="title-bar-info">
                                    <p>
                                        <span class="title-bar-info-item">最近在学{{detail.isLearn | personFilter}}人</span>
                                        <span class="title-bar-info-item">累计报名{{detail.inClass | personFilter}}人</span>
                                        <span class="title-bar-info-item">好评度{{detail.praise}}</span>
                                    </p>
                                    <p>
                                        <span class="title-bar-info-price p-free" v-show="detail.price == 0">免费</span>
                                        <span class="title-bar-info-price" v-show="detail.price != 0">￥{{detail.price | toThousands}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="js-item-teacher"></div>
                        </div>
                        <div class="teacher-info">
                            <div class="teacher-info-title">
                            老师介绍
                            <span class="teacher-info-number">(2)</span>
                            </div>
                        </div>
                    </div>
                    <div class="tab" id="tab2">
                        <div class=" infinite-scroll infinite-scroll-bottom" data-distance="100">
                            <div class="">
                                <ul class="list-container">
                                    <li class="item-content" v-for="(catelog,index) in catelogList">
                                        <div class="item-main">
                                            <div class="item-title">
                                                <span class="catelog-index">{{index + 1 | twoTigits}}</span>
                                                <span class="catelog-title">{{catelog.title}}</span>
                                                <i class="catelog-icon icon icon-down"  v-bind:class="{'icon-up':catelog.isShow}" @click="showCourse(index)"></i>
                                            </div>
                                        </div>
                                        <ul class="item-course-detail" v-show="catelog.isShow">
                                            <li v-for="course in catelog.courseList">
                                                <div>
                                                    <!-- <i class="i-course-live"></i> -->
                                                    <div>
                                                        <h5 class="course-live-title">{{course.title}}</h5>
                                                        <p>
                                                            <span class="course-live-time">
                                                                {{course.startTime | formatDate("MM-dd hh : mm")}} - {{course.endTime | formatDate("hh : mm")}}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <!-- 加载提示符 -->
                            <div class="infinite-scroll-preloader" v-show="isloading">
                                <div class="preloader"></div>
                            </div>
                            <div class="js-no-more" v-show="noMore">
                                已经到底咯！
                            </div>
                        </div>
                    </div>
                    <div class="tab" id="tab3">
                        <div class="recommand-title">老师推荐课程</div>
                        <ul>
                            <li class="live-list" v-for="recommand in recommands">
                                <a href="javascript:;" @click="getCourseDetail(recommand.pid)">
                                    <div class="live-left"><img v-bind:src="recommand.img" alt=""></div>
                                    <div class="live-right">
                                        <h3 class="live-title">{{recommand.title}}</h3>
                                        <p class="live-teacher">{{recommand.teacher}}</p>
                                        <div class="live-info">
                                            <div v-show="recommand.isLive">
                                                <span class="live-inclass-wrap">
                                                    <i class="live-inclass"></i>
                                                    直播中
                                                </span>
                                                {{recommand.inClassNum}}在上课
                                            </div>
                                            <div v-show="!recommand.isLive">
                                                直播时间：{{recommand.time}}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<style scope>
    @import '../../assets/css/page/courseDetail.css'
</style>

<script>
    import SearchBar from '../page/search.vue'
    export default{
        components: {
            SearchBar
        },
        data(){
            return {
                detail: {},
                catelogList: [],
                isFirst: true,
                isloading: false,
                noMore: false,
                recommands: [
                    {
                        "pid":"0",
                        "img": "http://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCiaibomDIERy8hBhEOYVE1V6F2Pia9lwYG7rXDWkFkGibo2gpSeL4LI4QBhnj9YBoV80Y/220?tp=webp",
                        "title": "暗色系海报思路讲解",
                        "teacher": "「涵品讲师」- 老庞",
                        "isLive": true,
                        "inClassNum":515,
                        "time": ""
                    },
                ]
            }
        },
        created(){
            this.init();
        },
        mounted(){
            let _this = this;
            window.addEventListener('scroll',function(){
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight){
                    if(!_this.isloading && !_this.noMore){
                        _this.isloading = true;
                        _this.$http.get('./././data/catelogList.json').then((response) => {
                            _this.catelogList = _this.catelogList.concat(response.body.datas);
                            for(let i = 0 ;i<_this.catelogList.length;i++){
                                _this.catelogList[i].isShow = false;
                            }
                            _this.isloading = false;
                            if(response.body.paging.pages - 1 == response.body.paging.offset / response.body.paging.limit  ){
                                _this.noMore = true;                
                            }
                        })
                    }
                    
                }
                
            })
        },
        methods: {
            init(){
                var pid = this.$route.params.courseId;
                this.getCourseDetail(pid);
            },
            getCourseDetail(pid){
                this.$http.get('./././data/courseDetail.json').then((response) => {
                    this.detail = response.body;
                })
            },
            getCatalog(){
                if(this.isFirst){
                    this.isloading = true;
                    this.$http.get('./././data/catelogList.json').then((response) => {
                            this.catelogList = this.catelogList.concat(response.body.datas);
                            for(let i = 0 ;i<this.catelogList.length;i++){
                                this.catelogList[i].isShow = false;
                            }
                            this.isloading = false;
                            this.isFirst = false;
                            if(response.body.paging.pages - 1 == response.body.paging.offset / response.body.paging.limit  ){
                                this.noMore = true;
                            }
                    })
                }
                
            },
            showCourse(index){
                this.catelogList[index].isShow = this.catelogList[index].isShow ? false : true;
                this.catelogList.splice(index, 1, this.catelogList[index]);
            }
        }
    }
    
</script>