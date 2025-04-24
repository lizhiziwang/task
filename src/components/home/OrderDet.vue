<template>
  <div>
    <el-drawer v-model="po.open" direction="rtl" size="45%" @open="addOrderInfo" :with-header="false" >
      <div style="width: 100%;height: 100%">
        <h3>订单信息</h3>

        <div>
          <el-form
              ref="fromref"
              style="max-width: 600px"
              :model="from"
              :rules="rules"
              label-width="80px"
              class="demo-ruleForm"
              status-icon>
            <el-form-item label="收件人" prop="deliveryUser">
              <el-input v-model="from.deliveryUser" />
            </el-form-item>
            <el-form-item label="手机号" prop="deliveryPhone">
              <el-input v-model="from.deliveryPhone" />
            </el-form-item>
            <el-form-item label="收件地址" prop="deliveryAddress">
              <el-input v-model="from.deliveryAddress" />
            </el-form-item>


          </el-form>
        </div>
        <h3>商品信息</h3>
        <div>
          <el-table ref="multipleTableRef" :data="po.dataCom" :highlight-current-row="true" row-key="id" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="70"  label="序号"></el-table-column>
            <el-table-column prop="show_name"  label="商品名"></el-table-column>
            <el-table-column align="center"  label="展示图" min-width="120">
              <template #default="scope">
                <el-image
                    style="width: 140px; height: 80px"
                    :src="fileOps.getFile+scope.row.show_png"/>
              </template>
            </el-table-column>
            <el-table-column prop="goodNum"  label="数量"></el-table-column>
            <el-table-column prop="show_unit"  label="单位"></el-table-column>
            <el-table-column prop="show_price"  label="价格"></el-table-column>

          </el-table>
        </div>
      </div>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="close_cu">取消</el-button>
          <el-button type="primary" @click="addOrder">下单 </el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>

<script setup>
  import {onMounted,defineProps,ref,defineEmits,nextTick} from "vue";
  import fileOps from "../js/file";

  import {service} from "../js/http";
  import {ElMessage, ElMessageBox,ElLoading } from "element-plus";

  let po = defineProps({
    dataCom:{
      type:Array,
      default:() => []
    },
    open:Boolean
    // imgHe:String,
    // imgMe:String
  })

  let emits = defineEmits(['close','pay'])
  // let isopen_order = ref(po.open)
  let currentUser= JSON.parse(sessionStorage.getItem("user"));
  let fromref = ref(null)

  let from = ref({
    deliveryUser:currentUser.name,
    deliveryPhone:currentUser.phone,
    deliveryAddress:currentUser.location
  })


  let data = ref(po.dataCom)
  // from.value=


  onMounted(()=>{
    // console.log(from.value)
  })
  // 定义表单验证规则
  const rules = ref({
    deliveryUser: [
      { required: true, message: '请输入收件人姓名', trigger: 'blur' }
    ],
    deliveryPhone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    deliveryAddress: [
      { required: true, message: '请输入收件地址', trigger: 'blur' }
    ]
  });
  const close_cu = ()=>{
    po.open = !po.open;
    console.log('执行关闭')
    emits('close', false)
  }

  const addOrderInfo = ()=>{
    from.value = {
      deliveryUser:currentUser.name,
      deliveryPhone:currentUser.phone,
      deliveryAddress:currentUser.location
    }
  }
  let multipleSelection = ref([])
  const handleSelectionChange = (val)=>{
    multipleSelection.value = val
  }

  const addOrder = ()=>{

    let goods = []
    let orderInfo = {
      deliveryAddress:from.value.deliveryAddress,
      deliveryUser:from.value.deliveryUser,
      deliveryPhone:from.value.deliveryPhone,
      goods:goods
    }
    multipleSelection.value.forEach(e=>{
      goods.push({
        goodId:e.goodId,
        goodNum:e.goodNum,
        price:e.show_price
      })
    })
    if(goods.length===0){
      ElMessage.error("请至少选择一件商品进行下单！")
      return;
    }
    const loadingInstance = ElLoading.service({
      text:'正在努力锁单中！'
    })

    // console.error(goods)
    service
        .post('/order',orderInfo)
        .then(res=>{
      if(res.data.code == 200){
        // console.log('添加订单成功！')
        nextTick(() => {
          // Loading should be closed asynchronously
          loadingInstance.close()
        })
        ElMessageBox.confirm('已成功下单，请前往支付','提示',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'success'
        }).then(()=>{
          emits('pay',res.data.data)
          emits('close',false)
        })
      }else {
        ElMessage({
          type: 'error',
          message: res.data.message
        })
        // ElMessage.success(res.data.message)
      }
    })
  }
</script>
