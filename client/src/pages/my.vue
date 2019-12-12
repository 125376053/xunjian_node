<template>
    <div>
        <div class="bigImg centerFlex">
            <div class="myTou JustifyFlex">
                <p class="left">
                    <img src="static/images/myTou.png" alt="">
                </p>
                <div class="right" v-if="userObj">
                    <p class="title">{{userObj.name}}</p>
                    <p>
                        <span>{{userObj.name}}</span>
                        <span>丨</span>
                        <span>{{userObj.iat}}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="rc" style="background:#f0f2f5;">
            <ul>
                <router-link class="JustifyFlex" :to="{path:'/renwuManage',query:{
                    step:1
                }}" tag="li">
                    <img class="bq" src="static/images/my1.jpg">
                    <span class="wt">待办任务</span>
                    <img class="jt" src="static/images/myLeft.jpg">
                </router-link>

                <router-link class="JustifyFlex" :to="{path:'/myRichengXuncha'}" tag="li">
                    <img class="bq" src="static/images/my2.jpg">
                    <span class="wt">日常巡检</span>
                    <img class="jt" src="static/images/myLeft.jpg">
                </router-link>

                <li @click="gotoYijian()" class="JustifyFlex" style="margin-top: .2rem;">
                    <img class="bq" src="static/images/my3.jpg">
                    <span class="wt">意见反馈</span>
                    <img class="jt" src="static/images/myLeft.jpg">
                </li>

                <router-link class="JustifyFlex" :to="{path:'/myhelp'}" tag="li">
                    <img class="bq" src="static/images/my4.jpg">
                    <span class="wt">帮助文档</span>
                    <img class="jt" src="static/images/myLeft.jpg">
                </router-link>

                <router-link class="JustifyFlex" :to="{path:'/myabout'}" tag="li">
                    <img class="bq" src="static/images/my5.jpg">
                    <span class="wt">关于应用</span>
                    <img class="jt" src="static/images/myLeft.jpg">
                </router-link>
            </ul>

            <div class="logout" v-if="user" @click="logout">退出登录</div>

        </div>

        <FooterNav :MessageLength="messageNum" :MyLength="renwuNum"></FooterNav>

        <!--弹出-->
        <div class="imgBigList gdTan" v-if="modiaFlag">
            <div class="save">
                <h1 style="font-size:.38rem">确定注销</h1>
                <div class="content">
                    <p style="font-size:.32rem; text-align: left;">确定注销当前账号？</p>
                    <div class="logout2" style="margin-left:2.1rem;">
                        <button class="quxiao" @click="modiaFlag=false">取消</button>
                        <span class="enter" @click="enterLogout">确定</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import Footer from "../components/Footer.vue"
    export default{
        components: {
            FooterNav: Footer
        },
        data(){
            return {
                MyLength: 0,
                modiaFlag: false,
                renwuNum: 0,
                messageNum:0,
                userObj:{}
            }
        },
        computed: {
            ...mapGetters([
                'user',
            ])
        },
        methods: {
            //通过方法  用mapActions将事件转发给仓库的actions动作
            ...mapActions([
                'removeLocal'
            ]),
            //mapActions传递参数 单独定义一个方法调用 mapactions里面的方法
            // enterLogout(){ this.removeLocal('定义方法') }
            logout(){
                this.modiaFlag = true;
            },
            enterLogout(){
                this.modiaFlag = false;
                this.$store.dispatch("removeLocal")
            },
            gotoYijian(){
                if (window.disposal) {
                    window.disposal.feedbackSuggest();
                }
            },
            //获取当前用户
            //GET api/User/GetLoginedUser
            getUser(){
                let token = JSON.parse(window.localStorage.getItem('user')).token;
                this.$indicator.open('加载中...');
                this.$http.get('/api/users/getUser?token='+token).then((d) => {
                    this.$indicator.close();
                    this.userObj=d.data.decoded;
                    console.log(d.data.decoded);
                }).catch((e) => {
                    this.$indicator.close();
                })
            }
        },
        //刷新vuex数据丢失 vuex可以共享数据 但是共享的数据在刷新丢失 所以将本地缓存设置到vuex
        mounted(){
            this.getUser()
        }
    }
</script>
<style scoped>

    .save{
        height: 4rem;
    }

    .quxiao {
        font-size: .28rem;
        background: #2b6dcb;
        display: inline-block;
        text-align: center;
        padding:.15rem .4rem .15rem;
        color: #999;
    }

    .logout2{
        margin-top:.3rem;
    }

    .enter {
        font-size: .28rem;
        background: #2b6dcb;
        display: inline-block;
        text-align: center;
        padding:.15rem .4rem .15rem;
        color: #fff !important;
        border-radius: 5px;
    }
</style>
