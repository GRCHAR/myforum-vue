<template>
<div>
    <div style="overflow-y:scroll;" v-for="item in messageList" :key="item.userId">
        <Row>{{item.userId}}</Row>
        <Row>{{item.message}}</Row>
        <Divider />
    </div>
</div>

   
</template>

<script>
export default {
    name: "Message",
    data() {
        return {
            meesgaList:[],
        }
    },
    mounted(){

    },
    watch:{
        
    }
}
</script>

<style>

</style>