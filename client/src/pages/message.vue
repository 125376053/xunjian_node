<template>

    <div>

        <HeaderNav style="display: block;" :title="title"></HeaderNav>

        <div class="overAuto2" style="margin-top:0rem;top:.89rem;">

            <!--消息管理列表页面分为 养护消息 工单消息 报警消息-->
            <div class="yh_list xiaoxiGuanli">
                <ul>
                    <BetterScroll class="wrapper" ref="scroll" :data="MessageList" :pullUpLoad="pullUpLoad" @pullingUp="onPullingUp">
                        <!--进入详情页-->
                        <li class="JustifyFlex" :key="index" :id="item.WorkOrderId"
v-for="(item,index) in MessageList" @click="gotoXq(item)">
                            <!--图标-->
                            <div class="left">
                                <img v-if="true" :src="imgsType[index%imgsType.length]">
                            </div>
                            <div class="right">
                                <p class="title ellipse">{{item.name}}</p>
                                <p class="dataAndText JustifyFlex">
                                    <span class="ellipse" style="display: inline-block;width:3.2rem;font-size: .28rem;">
                                        {{item.address}}
                                    </span>
                                    <span>{{item.createdAt}}</span>
                                </p>
                            </div>
                        </li>
                    </BetterScroll>
                </ul>
            </div>

        </div>

        <FooterNav :MessageLength="messageNum" :MyLength="renwuNum"></FooterNav>

    </div>


</template>
<script>
    import Header from "../components/Header.vue"
    import Footer from "../components/Footer.vue"
    import BetterScroll from '../components/BetterScrollSlot'
    import {mapState,mapGetters,mapActions} from 'vuex'
    export default{
        //name:'message',
        components:{
            HeaderNav:Header,
            FooterNav:Footer,
            BetterScroll
        },
        data(){
            return{
                title:'消息管理',
                imgsType:[
                    'static/images/yhicon1.jpg', //1报警图标 static目录下的不需要模块打包进入
                    'static/images/yhicon2.jpg', //2维护图标
                    'static/images/yhicon3.jpg',  //3工单
                    'static/images/yhicon4.jpg'  //4 科目
                ],
                //设施id 空是片区 跳转到选择设施
                sheshiId:'',
                MessageList:[],
                pullUpLoad:true,
                count:0,
                pages:0,
                pageIndex:1,
                pageSize: 10,
                renwuNum:window.localStorage.getItem('renwuNum')||0,
                messageNum:window.localStorage.getItem('messageNum')||0,
            }
        },
        computed:{
            jinji(item){
                return (item)=>{
                    if(item.Emergency==1){
                        return "不急"
                    }
                    if(item.Emergency==2){
                        return "一般"
                    }
                    if(item.Emergency==3){
                        return "紧急"
                    }
                    if(item.Emergency==4){
                        return "非常紧急"
                    }
                }
            },
            ...mapGetters([
                'user'
            ]),
        },
        watch:{
            messageNum(){},
            renwuNum(){}
        },
        methods:{
            getData(){
                this.$indicator.open('加载中...');
                this.$http.get('/api/message/list?pageindex='+this.pageIndex+'&pagesize='+this.pageSize).then((d) => {
                    this.$indicator.close();
                    let data=d.data;
                    this.MessageList=this.MessageList.concat(data.data.dataList||[]);
                    this.pages=data.data.pages||0;
                }).catch((e) => {
                    this.$indicator.close()
                })
            },
            //下拉加载数据
            onPullingUp () {
                //如果还有下一页
                if(this.pages>this.pageIndex){
                    this.pageIndex++;
                    this.getData()
                }else{
                    //如果没有新数据
                    this.$refs.scroll.forceUpdate()
                }
            },
            gotoXq(item){
                console.log(item);
                this.$router.push({
                    path:'/selectSheshi',
                    query:{
                        sheshiid:item.SheshiId,
                        sheshiname:item.SheshiName
                    }
                })
            }
        },
        mounted(){
            this.getData()
        },
    }
</script>
<style scoped>
    .wrapper{
        top:0!important;
        bottom:1.2rem!important;
    }
</style>
