<template>
<div>
    <Row>
        <Input class="search-video" search enter-button v-model="keyword" placeholder="Enter something..." @on-search="searchBts"	/>
    </Row>
    <br>

   
    <div v-for="item in btList" :key="item._id">
        <Row>{{item._source.name}}</Row>
        <Row>hash: {{item._source.hashInfo}}</Row>
        <Divider />
    </div>
    
    <br>
    <Page class="video-page" show-elevator :page-size="this.pageSize" :total="this.pageTotal" :current="this.changePageNumber(pageNumber)" @on-change="changePageNumber"/>

</div>
</template>

<script>
export default {
    name:"bt",
    data() {
        return {
            keyword: '',
            btList:[],
            pageTotal: 0,
            pageSize: 20,
            pageNumber: 1,
            showBt:false
        }
    },
    mounted() {
        console.log(this.btList.length)

    },
    methods: {
        changePageNumber(pageNumber){
            this.pageNumber = pageNumber;
            return pageNumber;
        },
        searchBts(){

            this.axios.get("/videoserver/bt/search", {
                params:{
                    keyword: this.keyword,
                    page:this.pageNumber,
                }
            }).then((result) => {
                this.btList = result.data.result.hits.hits
                this.pageTotal = result.data.result.aggregations.count.value
                this.showBt = true
                console.log("btList",this.btList)
            }).catch((err) => {
                this.$Meesage.erorr(err)
            });
        }
    },
    watch:{
        pageNumber(){
            this.searchBts()
        }
    }
}
</script>

<style>

</style>