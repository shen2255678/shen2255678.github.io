<template>
    <div>
    <h3>预订表单</h3>
         <form @submit.prevent="submitBooking">
           <label for="check-in">入住日期:</label>
           <input type="date" id="check-in" v-model="checkInDate">
           <label for="check-out">离开日期:</label>
           <input type="date" id="check-out" v-model="checkOutDate">
           <button type="submit">提交预订</button>
         </form>
       </div>
     </template>

<script>
     export default 
    {
       data() {
         return {
             checkInDate: '',
           checkOutDate: '',
           // 其他数据
         };
       },
       methods: {
         submitBooking() {
           // 提交预订的逻辑
         }
       }
     }
</script>
