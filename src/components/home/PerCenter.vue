<template>
    <div class="common-layout" >
        <el-container style="height:100%">
            <el-header class="header" height="6%">
                <MyHeader :pubVis="true"></MyHeader>
            </el-header>
            <el-main class="home_main_per" style="height:94%">
                <el-scrollbar height="100%">
                    <el-descriptions title="个人信息" border="true">

                        <template #extra>
                            <el-button type="primary" text style="font-size: 15px;" @click="userUpdate = true">修改</el-button>
                        </template>
                        <el-descriptions-item
                            :rowspan="2"
                            :width="140"
                            label="头像"
                            align="center">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="fileOps.getFile+currentUser.avatar"/>
                        </el-descriptions-item>
                        <el-descriptions-item :width="140"  label="用户名">{{ currentUser.name }}</el-descriptions-item>
                        <el-descriptions-item  :width="140"  label="手机号">{{ currentUser.phone }}</el-descriptions-item>
                        <el-descriptions-item label="性别">{{ currentUser.gender ===1?"男":"女" }}</el-descriptions-item>
                        <el-descriptions-item   label="钱包">
                            <div style="display: flex; align-items: center;">
                                <span>{{ currentUser.purse }}</span>
                                <el-button style="margin-left: 10px;" type="primary" link @click="showPurse">充值</el-button>
                                <el-button type="primary" link @click="showTx">提现</el-button>
                            </div>
                        </el-descriptions-item>
                        
                        <el-descriptions-item span="4" label="个性签名">
                            {{ currentUser.idiograph }}
                        </el-descriptions-item>
                        <el-descriptions-item label="位置">
                            {{ currentUser.location }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="mywant">
                        <h4>我的想要(购物车)</h4>
                        <el-table :data="myWant" :highlight-current-row="true" row-key="id" @selection-change="handleSelectionChange" :default-sort="{ prop: 'price', order: 'descending' }" style="width: 100%" height="550px">
                          <el-table-column type="selection" width="55" />
                            <el-table-column type="index" width="70"  label="序号"></el-table-column>
                            <el-table-column prop="gameName" label="商品名称" ></el-table-column>
                            <el-table-column align="center"  label="展示图" min-width="120">
                                <template #default="scope">
                                    <el-image
                                        style="width: 140px; height: 80px"
                                        :src="fileOps.getFile+scope.row.showImg"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="gameId" label="剩余数（库存）" align="center"></el-table-column>
                            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
                            <el-table-column prop="desText" label="账号介绍" width="300" align="center"></el-table-column>
                            <el-table-column prop="price" label="价格" sortable></el-table-column>
                            <el-table-column prop="createTime" label="发布时间" sortable></el-table-column>
                            <el-table-column align="center" fixed="right" label="操作" min-width="120">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="gameAccountInfo_(scope.row)">详情</el-button>
                                    <el-button link type="primary" size="small" @click="deleteWant(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="display: flex; justify-content: flex-end;margin-top: 20px">
                            <el-pagination
                                v-model:current-page="wantPageParams.current"
                                v-model:page-size="wantPageParams.size"
                                :page-sizes="[5,10, 20, 40, 60]"
                                :size="'default'"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="wantPageParams.total"
                                @size-change="wantListInit()"
                                @current-change="wantListInit()"
                                />
                          <el-button type="primary"  @click="allAddOrder()" style="margin-right: 20px;margin-left: 20px">下单</el-button>
                          <el-button type="danger"  @click="allRemove" style="margin-right: 20px;">删除</el-button>

                        </div>
                    </div>
                  <div class="myTrad">
                    <h4>我的商品</h4>
                    <el-table :data="myTrads" style="width: 100%" height="550px">
                      <el-table-column type="index" width="70"  label="序号"></el-table-column>
                      <el-table-column prop="gameName" label="商品名"></el-table-column>
                      <el-table-column align="center" label="展示图" min-width="120">
                        <template #default="scope">
                          <el-image
                              style="width: 140px; height: 80px"
                              :src="fileOps.getFile+scope.row.show_img"/>
                        </template>
                      </el-table-column>
                      <el-table-column prop="desText" label="农产品介绍"></el-table-column>
                      <el-table-column prop="gameId" label="库存" sortable></el-table-column>
                      <el-table-column prop="unit" label="单位"></el-table-column>
                      <el-table-column prop="wantNum" label="想要人数" sortable></el-table-column>
                      <el-table-column prop="price" label="金额" sortable></el-table-column>
                      <el-table-column prop="createTime" label="发布时间" sortable></el-table-column>
                      <el-table-column align="center" fixed="right" label="操作" >
                        <template #default="scope">
                          <el-button link
                                     type="primary" size="small" @click="openTraDraw(scope.row)">编辑</el-button>

                          <el-button link type="primary" size="small" @click="delete_(scope.row.id)">删除</el-button>
                          <!-- <el-button link
                              v-if="scope.row.state === 'NOPAID'"
                              type="primary" size="small" @click="pay_1(scope.row.id)">支付</el-button> -->
                        </template>
                      </el-table-column>
                    </el-table>
                    <div style="display: flex; justify-content: flex-end;">
                      <el-pagination
                          v-model:current-page="myTradPageParam.current"
                          v-model:page-size="myTradPageParam.size"
                          :page-sizes="[5,10, 20, 40, 60]"
                          :size="'default'"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="myTradPageParam.total"
                          @size-change="findMyTrad"
                          @current-change="findMyTrad"
                      />
                    </div>
                  </div>
                    <div class="buyRecord">
                        <h4>订单记录</h4>
                        <el-table :data="buyRecords" :size="large" style="width: 100%" height="550px">
                            <el-table-column type="index" min-width="20"  label="序号"></el-table-column>
                            <el-table-column prop="id"  label="订单号"></el-table-column>
<!--                            <el-table-column align="center"  label="展示图" min-width="120">-->
<!--                                <template #default="scope">-->
<!--                                    <el-image-->
<!--                                        style="width: 140px; height: 80px"-->
<!--                                        :src="fileOps.getFile+scope.row.showImg"/>-->
<!--                                </template>-->
<!--                            </el-table-column>-->
                            <el-table-column prop="state_" label="订单状态" sortable></el-table-column>
                            <el-table-column prop="createTime" label="下单时间" sortable></el-table-column>
                            <el-table-column prop="sum" label="订单金额" sortable></el-table-column>
                            <el-table-column align="center" fixed="right" label="操作" >
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="gameAccountInfo_2(scope.row)">详情</el-button>
                                    <el-button link 
                                        v-if="scope.row.state !== 'NOPAID'&& scope.row.state !== 'CANCELED'&& scope.row.state !== 'REFUNDED'
                                        && scope.row.state !== 'COMPLETE'" 
                                        type="primary" size="small" @click="refund(scope.row.id)">退款</el-button>
                                    <el-button link 
                                        v-if="scope.row.state === 'DELIVERED'" 
                                        type="primary" size="small" @click="singfor(scope.row.id)">签收</el-button>
                                    <el-button link 
                                        v-if="scope.row.state === 'NOPAID'" 
                                        type="primary" size="small" @click="pay_1(scope.row.id)">支付</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="display: flex; justify-content: flex-end;">
                            <el-pagination
                                v-model:current-page="RecordPageParams.current"
                                v-model:page-size="RecordPageParams.size"
                                :page-sizes="[5,10, 20, 40, 60]"
                                :size="'default'"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="RecordPageParams.total"
                                @size-change="orderListGet"
                                @current-change="orderListGet"
                                />
                        </div>
                    </div>

                </el-scrollbar>
            </el-main>
        </el-container>

        <el-dialog v-model="tx" title="提现" width="25%" align-center="true" :before-close="closeBe">
            <div style="display: flex; align-items: center;">
                <svg t="1730786677725" style="margin-right: 20px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5336" width="25" height="25"><path d="M511.44 22.95c-270.4 0-489.6 218.88-489.6 488.89 0 174.66 93.32 336.05 244.8 423.39 151.49 87.33 338.12 87.33 489.6 0 151.49-87.33 244.8-248.72 244.8-423.39 0.01-270-219.2-488.89-489.6-488.89z m0 760.5c-30.04 0-54.4-24.32-54.4-54.32 0-19.4 10.37-37.34 27.2-47.04 16.83-9.7 37.57-9.7 54.4 0s27.2 27.64 27.2 47.04c0 29.99-24.35 54.32-54.4 54.32z m54.4-217.29c0 32.59-21.76 54.32-54.4 54.32s-54.4-21.73-54.4-54.32v-271.6c0-32.59 21.76-54.32 54.4-54.32s54.4 21.73 54.4 54.32v271.6z" fill="#1296db" p-id="5337"></path></svg>
                <span >
                    请输入您所需要提现的金额
                </span>
            </div>
            <div style="margin-top: 20px;display: flex; align-items: center;margin-bottom: 20px;">
                <span style="width: 90px;">
                    充值金额：
                </span>
                <el-input
                    v-model="txSize"
                    style="width: 260px"
                    placeholder="请输入"
                    :formatter="(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/¥\s?|(,*)/g, '')"
                />
                <span>
                    &nbsp;&nbsp;人民币
                </span>
            </div>
            <div style="display: flex; align-items: center;">
                <span style="width: 90px;">支付宝账号：</span>
                <el-input v-model="aliId" style="width: 260px;" placeholder="请输入" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                  <el-button @click="tx = false">取消</el-button>
                  <el-button v-loading.fullscreen.lock="lock_1" type="primary" @click="handleTx">
                    确定
                  </el-button>
                </div>
              </template>
        </el-dialog>

        <el-dialog v-model="cz" title="充值" width="25%" align-center="true" :before-close="closeBe">
            <div style="display: flex; align-items: center;">
                <svg t="1730786677725" style="margin-right: 20px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5336" width="25" height="25"><path d="M511.44 22.95c-270.4 0-489.6 218.88-489.6 488.89 0 174.66 93.32 336.05 244.8 423.39 151.49 87.33 338.12 87.33 489.6 0 151.49-87.33 244.8-248.72 244.8-423.39 0.01-270-219.2-488.89-489.6-488.89z m0 760.5c-30.04 0-54.4-24.32-54.4-54.32 0-19.4 10.37-37.34 27.2-47.04 16.83-9.7 37.57-9.7 54.4 0s27.2 27.64 27.2 47.04c0 29.99-24.35 54.32-54.4 54.32z m54.4-217.29c0 32.59-21.76 54.32-54.4 54.32s-54.4-21.73-54.4-54.32v-271.6c0-32.59 21.76-54.32 54.4-54.32s54.4 21.73 54.4 54.32v271.6z" fill="#1296db" p-id="5337"></path></svg>
                <span >
                    请输入您所需要充值的金额
                </span>
            </div>
            <div style="margin-top: 20px;display: flex; align-items: center;margin-bottom: 20px;">
                <span>
                    充值金额：
                </span>
                <el-input
                    v-model="czSize"
                    style="width: 260px"
                    placeholder="请输入"
                    :formatter="(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/¥\s?|(,*)/g, '')"
                />
                <span>
                    &nbsp;&nbsp;人民币
                </span>
            </div>
            <template #footer>
                <div class="dialog-footer">
                  <el-button @click="cz = false">取消</el-button>
                  <el-button v-loading.fullscreen.lock="lock_1" type="primary" @click="handleCz">
                    确定
                  </el-button>
                </div>
              </template>
        </el-dialog>

        <!-- 用户信息修改 -->
        <el-drawer v-model="userUpdate" title="修改信息" size="40%" @open="init" :before-close="handleClose">
            <div style="width: 80%;">
                <el-form :model="userForm" label-width="90px"  ref="userFormRef">
                    <el-form-item label="头像" prop="avatar">
                        <div style="display: flex;align-items: center;">
                            <el-image :src="fileOps.getFile + userForm.avatar" style="width: 150px;height: 150px;margin-right: 20px;"></el-image>
                            <el-upload
                                class="avatar-uploader"
                                action="#"
                                accept=".png,.jpe,.jpeg,.jfif"
                                :http-request="handleUpload"
                                :show-file-list="false"
                                :before-upload="handleChange__">
                                <el-icon class="avatar-uploader-icon" style="width: 100px;height: 100px;"><Plus /></el-icon>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="userForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="alia">
                        <el-input v-model="userForm.alia"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="userForm.gender" placeholder="请选择" >
                            <el-option label="男" value="1" ></el-option>
                            <el-option label="女" value="0" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="userForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月" prop="birthday">
                        <el-date-picker
                            v-model="userForm.birthday"
                            type="date"
                            aria-label="Pick a date"
                            placeholder="Pick a date"
                            style="width: 100%"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            />
                    </el-form-item>
                    <el-form-item label="个人介绍" prop="idiograph">
                        <el-input v-model="userForm.idiograph" type="textarea"/>
                    </el-form-item>
                    <el-form-item label="位置" prop="location">
                        <el-input v-model="userForm.location"  disabled="true"/>
                        <el-button link type="primary" @click="getlon">获取当前位置</el-button>
                    </el-form-item> 
                </el-form>
            </div>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="userUpdate = false">取消</el-button>
                    <el-button type="primary"  @click="saveUserInfo">确定</el-button>
                </div>
            </template>
        </el-drawer>
        <!-- 游戏账号详细信息 -->

        <el-drawer v-model="gameAccountInfo" size="45%" @open="init2" @close="ckeardata" :with-header="false">
          <h2>订单商品详情</h2>

          <div v-for="item in batchAddOrders">
            <ProductDet :data="item" :dealObj="null" ></ProductDet>
<!--            <div>-->
<!--              <el-input-number v-model="dataCom[index].goodNum" >-->
<!--                <template #suffix>-->
<!--                  <span>{{item.unit}}</span>-->
<!--                </template>-->
<!--              </el-input-number>-->
<!--            </div>-->
          </div>



          <template #footer>
            <div style="flex: auto">
              <el-button @click="gameAccountInfo = !gameAccountInfo">取消</el-button>
              <el-button type="primary" @click="addOrder">添加下单 </el-button>
            </div>
          </template>
        </el-drawer>
      <OrderDet :open="isopen_order" @close="child_method" :dataCom="dataCom" @pay="payiii"/>


<!--      订单处 -->
        <el-drawer v-model="currentPros" size="45%" :with-header="false">
            <ProductDet v-for="item in currentProsObj" :data="item" :dealObj="null" ></ProductDet>
        </el-drawer>
        <el-dialog
            v-model="diaOpen"
            width="600"
            @closed="sdsder"
            align-center>
            <order :order="orderObj" @closeTarget="WANCHEGDINGDAN"></order>
        </el-dialog>

      <!-- 修改商品 -->
      <el-drawer v-model="editTradOpen" direction="rtl" size="45%" :before-close="handleCloseTrad" :with-header="false" @open="initTrad">
        <!--        <el-scrollbar height="100%"  noresize="true">-->
        <div style="display: flex;align-items: center;height:10%">
          <el-avatar :size="50" :src="fileOps.getFile+currentUser.avatar" style="margin-right:2%"></el-avatar>
          <span style="font-size:30px">{{currentUser.name}}</span>
        </div>
        <div style="margin-top: 20px">
          <el-form
              style="max-width: 600px"
              label-width="80px"
              class="demo-ruleForm"
              status-icon>
            <el-form-item label="商品名称" prop="gameName">
              <el-input v-model="currentEditTra.gameName" />
            </el-form-item>
            <el-form-item label="商品库存" prop="gameId">
              <el-input v-model="currentEditTra.gameId" />
            </el-form-item>
            <el-form-item label="库存单位" prop="unit">
              <el-select v-model="currentEditTra.unit" placeholder="请选择" >
                <el-option label="斤" value="JIN" ></el-option>
                <el-option label="千克" value="KG" ></el-option>
                <el-option label="个" value="GE" ></el-option>
                <el-option label="棵" value="KE" ></el-option>
                <!--                <el-option label="棵" value="KE" ></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="gameType">
              <el-select v-model="currentEditTra.gameType" placeholder="请选择" >
                <el-option v-for="(item,index) in gameTypesList" :key="index" :label="item.name" :value="item.name" >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期望价格" prop="price">
              <el-input-number v-model="currentEditTra.price"></el-input-number>
            </el-form-item>
            <el-form-item label="展示图" prop="showImg">
              <el-upload
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="true"
                  :on-success="handleAvatarSuccess"
                  accept=".png,.jpe,.jpeg"
                  :http-request="handleUpload__"
                  :limit="1"
                  :before-upload="handleChange__"
                  ref="uploadBanner">
                <img v-if="showImg_!=''" :src="showImg_" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="展示视频" prop="desFile">
              <el-upload
                  class="upload-demo"
                  drag
                  action="#"
                  v-model:file-list="fileList"
                  :http-request="handleUpload__"

              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text" style="width: 100%">
                  拖拽文件到此处 <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    mp3/mp4 files with a size less than 10MB
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品介绍" prop="desText">
              <el-input v-model="ruleForm.desText" type="textarea" :autosize="{ minRows: 2, maxRows: 10 }"/>
            </el-form-item>
          </el-form>
        </div>
        <!--        </el-scrollbar>-->

        <template #footer>
          <div style="flex: auto">
            <el-button @click="isOpen = false">取消</el-button>
            <el-button type="primary" @click="save">发布</el-button>
          </div>
        </template>

      </el-drawer>

    </div>
</template>

<script setup>
    import MyHeader from '../home/MyHeader.vue'
    import fileOps from '../js/file'
    import { ref, onMounted } from 'vue'
    import { ElMessage, ElMessageBox,ElLoading} from 'element-plus'
    import {service} from '@/components/js/http.js';
    import ProductDet from './ProductDet.vue'
    import OrderDet from './OrderDet.vue'
    import order from './Order.vue'

    let currentUser = ref(JSON.parse(sessionStorage.getItem('user')))
    let cz = ref(false)
    let tx = ref(false)
    let czSize = ref('')
    let currentEditTra = ref({})

    let txSize = ref('')
    let aliId = ref('2088722008879139')

    let lock_1 = ref(false)

    let re = {}

    let userForm = ref({})
    var userUpdate = ref(false)

    let myWant = ref([])

    let wantPageParams = ref({
        current:1,
        total:1000,
        size:20,
        
    })
    let RecordPageParams = ref({
        current:1,
        total:1000,
        size:20,
        
    })
    let gameAccountInfo = ref(false)

    onMounted(()=>{
        updateUserInfo()
        wantListInit()
        orderListGet()
        findMyTrad()
        console.log(currentUser.value)
    })

    // const showPurse = ()=>{
    //     ElMessageBox.confirm('请输入您所需要充值的金额','充值',{
    //         confirmButtonText: '确认',
    //         cancelButtonText: '取消',
    //         type: 'success',
    //         draggable: true,
            
    //     }).then(()=>{}).catch(()=>{})
    // }
    const showPurse = ()=>{
        console.log(czSize.value)
        cz.value = true
    }
    const closeBe = ()=>{
        ElMessageBox.confirm('操作还未完成，是否退出','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            draggable: true,
            
        }).then(()=>{
            cz.value = false
            tx.value = false
        }).catch(()=>{})
    }

    const handleCz = ()=>{
        lock_1.value = true
        let var3 = Number(czSize.value)
        if(var3<=0){
            ElMessage({
                message: '充值金额必须大于0',
                type: 'warning',
                duration: 1000
            })
            lock_1.value = false
            return
        }

        service.post('/game/money/add?m='+czSize.value+'&type=TOPUP')
            .then(res=>{
                if(res.data.code==200){
                    ElMessage({
                        message: '跳转支付页面',
                        type: 'success',
                        duration: 1000
                    })
                    re = res.data.data
                    lock_1.value = false
                    cz.value = false
                    pay() 
                }
            })
    }

    const pay = () =>{
        const payUrl = 'http://113.45.182.107:8062/alipay/pay?subject=账号充值&traceNo=' + re.id + '&totalAmount=' + re.operatorAmount+'&currentUserId='+currentUser.value.id;
        window.open(payUrl, '_blank');
    }

    const handleTx = ()=>{
        lock_1.value = true
        service.post('/game/money/add?m='+txSize.value+'&type=WITHDRAW')
            .then(res=>{
                if(res.data.code==200){
                    ElMessage({
                        message: '正在进行提现，请稍后...',
                        type: 'success',
                        duration: 1000
                    })
                    re = res.data.data
                    service.get('/alipay/money?orderId='+re.id+'&amount='+txSize.value+'&aliId='+aliId.value).then(
                        res=>{
                            let data = res.data;
                            if(data.code==200&&data.data){
                                //更新用户数据
                                updateUserInfo()
                                lock_1.value = false
                                tx.value = false
                                ElMessage({
                                    message: '提现成功！',
                                    type: 'success',
                                })
                            }
                        }
                    )
                }
            })
    }

     function updateUserInfo(){
         service.get('/user/current').then(res=>{
            if(res.data.code == 200){
                currentUser.value = res.data.data
                // currentUser.value.avatar = fileOps.getFile + currentUser.value.avatar;
                sessionStorage.setItem('user',JSON.stringify(res.data.data))
            }
        })
    }
    const showTx = ()=>{
        tx.value = true
    }

    const init=()=>{
        userForm.value = JSON.parse(sessionStorage.getItem('user'))
    }
    const handleClose = ()=>{
        ElMessageBox.confirm('您所修改的内容尚未保存，是否离开', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            userUpdate.value = false
        })
    }
    const handleChange = (rawFile) => {
        if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
            ElMessage.error("只能上传jpeg/jpg/png图片");
            return false;
        } else if (rawFile.size / 1024 / 1024 > 10) {
            ElMessage.error("上传图片最大不超过10MB!");
            return false;
        }
        return true;
    };
    const handleUpload = (file)=>{
        let fd = new FormData();
        fd.append("files", file.file);
            // 这里是请求上传接口
        service.post('/game/files',fd)
            .then(res=>{
                if(res.data.code === 200){
                    userForm.value.avatar = res.data.data[0]
                    ElMessage.success('上传成功');
                }else{
                    ElMessage.error(result.message);
                }
            })
    }
    const saveUserInfo=()=>{
        const loading_ = ElLoading.service({
            lock: true,
            text: '正在努力保存中~~',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        userForm.value.pwd = null
        service.post('/user/update',userForm.value).then(res=>{
            if(res.data.code === 200&&res.data.data){
                uploadLocal()
                ElMessage.success('修改成功');
                userUpdate.value = false
            }else{
                ElMessage.error(result.message);
            }
            loading_.close()
        })
    }

    const uploadLocal = async()=> {
        await service.get('/user/current').then(res=>{
            if(res.data.code === 200){
                // ElMessage.success('上传成功');
                sessionStorage.setItem('user',JSON.stringify(res.data.data))
            }else{
                ElMessage.error(result.message);
            }
        })
    }

    const wantListInit = ()=>{
        service.get('/game/want/page?current='+wantPageParams.value.current+'&size='+wantPageParams.value.size).then(res=>{
            if(res.data.code === 200){
                myWant.value = res.data.data.records
                wantPageParams.value.total = res.data.data.total
            }
        })
    }

    let currentgameAccountInfo_ = ref({})
    let dealObj = ref({})

    function gameAccountInfo_ (row){
      multipleSelection.value.push(row)
      batchAddOrders.value =  [row]
        
        gameAccountInfo.value = true

    }


    function deleteWant(row){
        service.post('/game/want?userId='+currentUser.value.id+'&accId='+row).then(res=>{
            if(res.data.code==200){
                ElMessage.success('删除成功')
                wantListInit()
            }
        })
    }

    //下单
    let orderObj = ref({})
    let diaOpen = ref(false)
    // const addOrder = (row)=>{
    //     service.post('/order?accIds='+row.id).then(res=>{
    //         if(res.data.code === 200){
    //             ElMessage({
    //                 type: 'success',
    //                 message: '下单成功！'
    //             })
    //
    //             orderObj.value = res.data.data
    //             orderObj.value.products = []
    //             orderObj.value.products.push(row)
    //
    //             ElMessageBox.confirm('该游戏账号已成功下单，请前往支付','提示',{
    //                 confirmButtonText: '确认',
    //                 cancelButtonText: '取消',
    //                 type: 'success'
    //             }).then(()=>{
    //
    //                 diaOpen.value = true
    //             })
    //
    //         }else{
    //             ElMessage({
    //                 type: 'warning',
    //                 message: res.data.message
    //             })
    //         }
    //     })
    // }

    // buyRecords
    let buyRecords = ref([])
    const orderListGet = ()=>{
        service.post('/order/page',
            {
                createUser: currentUser.value.id,
                current: RecordPageParams.value.current,
                size: RecordPageParams.value.size
            }
        ).then(res=>{
            if(res.data.code==200){
                buyRecords.value = res.data.data.records
                RecordPageParams.value.total = res.data.data.total
            }else{
                ElMessage({
                    type: 'error',
                    message: res.data.message
                })
            }
        })
    }

    const pay_1 = (id)=>{
        ElMessageBox.confirm('是否确认支付？','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            service.get('/order/pay/'+id).then(res=>{
                if(res.data.code==200){
                    ElMessage({
                        type: 'success',
                        message: '支付成功！'
                    })
                }else{
                    ElMessage({
                        type: 'warning',
                        message: res.data.message
                    })
                }
            })
        })
    }

    let currentPros = ref(false)
    let currentProsObj = ref([])
    const gameAccountInfo_2 = (item)=>{
        // console.log(item)
      currentPros.value = true;
      let tra = item.accounts;
      currentProsObj.value = tra

    }
    const refund = (id)=>{
      ElMessageBox.confirm(
          '是否确定发起退款',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(()=>{
        service.post('/order/refund/'+id).then(res=>{
          if(res.data.code===200){
            ElMessage({
              type: 'success',
              message: '退款成功！'
            })
          }else{
            ElMessage({
              type: 'warning',
              message: res.data.message
            })
          }
        })
      })

    }


    const singfor = (id) =>{
        service.post('/order/singfor/'+id).then(res=>{
            if(res.data.code===200&&res.data.data){
                orderListGet()
                ElMessage({
                    type: 'success',
                    message: '签收成功！'
                })
            }else{
                ElMessage({
                    type: 'warning',
                    message: res.data.message
                })
            }
        })
    }


  const getlon = ()=>{
    console.log('浏览器地理定位。');
    if (navigator.geolocation) {
        try{
            navigator.geolocation.getCurrentPosition((position)=>{
                ElMessage.success('定位成功！');

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log('纬度:', latitude);
                console.log('经度:', longitude);
                userForm.value.lon = longitude;
                userForm.value.lat = latitude;
                userForm.value.location = longitude+','+latitude;
            })
        }catch(e){
            ElMessage.error('定位失败！');
        }
    } else {
        ElMessage.error('浏览器不支持地理定位。');
    }
}

    let multipleSelection = ref([])
    const handleSelectionChange = (val)=>{
      multipleSelection.value = val
    }

    let batchAddOrders = ref([])
    const allAddOrder = ()=>{

      gameAccountInfo.value = true

      batchAddOrders.value = multipleSelection.value;

    }
    const allRemove = ()=>{
      let accIds = [];
      multipleSelection.value.forEach(e=>accIds.push(e.id))

      let param = {
        'userId':currentUser.value.id,
        'accId':accIds
      }
      if(accIds.length===0){
        ElMessage.warning('请选择需要清除的商品！')
        return;
      }

      service.post('/game/batch/want',param)
          .then(res =>{
            if(res.data.code===200&&res.data.data){
              wantListInit()
              ElMessage({
                type: 'success',
                message: '清除成功！'
              })
            }
          })
    }
    let dataCom = ref([])
    function init2(){
      multipleSelection.value.forEach(po=>{
        dataCom.value.push({
          goodId :po.id,
          goodNum:1,
          createUser:currentUser.value.id,
          show_name:po.gameName,
          show_png:po.showImg,
          show_price:po.price,
          show_unit:po.unit
        })
      })
    }
    let isopen_order = ref(false)
    const addOrder = ()=>{
      // order_show.value.createUser = currentUser.value.id

      isopen_order.value = !isopen_order.value
    }
    const child_method = (arg)=>{
      isopen_order.value = arg
    }
    const payiii = (arg)=>{
      orderObj.value = arg
      orderObj.value.products = []
      arg.accounts.forEach(e=>{
        orderObj.value.products.push(e)
      })
      // orderObj.value.products.push(arg.accounts)
      diaOpen.value = true
      gameAccountInfo.value = false
      // isOpen.value = false
    }

    const ckeardata = ()=>{
      dataCom.value = []
      multipleSelection.value = []
    }
    const sdsder = ()=>{
      wantListInit()
    }
    const WANCHEGDINGDAN = ()=>{
      wantListInit()
      diaOpen.value = false

      console.log("执行回调")
    }

    let myTrads = ref([])
    let myTradPageParam = ref({
      current: 1,
      size: 20,
      total: 100
    })

    const findMyTrad = ()=>{
      service.post('/game/page_',
          {
            "gameType": "MY",
            "current":myTradPageParam.value.current,
            "size":myTradPageParam.value.size,
          }).then(res => {
            if (res.data.code === 200){
              myTrads.value = res.data.data.records
              myTradPageParam.value.size = res.data.data.size
              myTradPageParam.value.current = res.data.data.current
              myTradPageParam.value.total = res.data.data.total
            }
      })
    }

    const handleChange__ = (rawFile) => {
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        ElMessage.error("只能上传jpeg/jpg/png图片");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 10) {
        ElMessage.error("上传图片最大不超过10MB!");
        return false;
      }
      return true;
    };

    const handleUpload__ = (file) => {
      let fd = new FormData();
      fd.append("files", file.file);
      // 这里是请求上传接口
      service.post('/game/files',fd)
          .then(res=>{
            if(res.data.code === 200){
              currentEditTra.value.showImg = res.data.data[0]
              showImg_.value = fileOps.getFile + currentEditTra.value.showImg
            }else{
              ElMessage.error(result.message);
              uploadBanner.value.handleRemove(file);
            }
          })

    };

    let videos = [];
    let fileList = ref([])
    let uploadBanner = ref(null)
    const handleUpload_ = ()=>{
      let fd = new FormData();
      console.log(fileList.value.length)
      for (let i = 0; i < fileList.value.length; i++) {
        fd.append("files", fileList.value[i].raw);
        console.log(fileList.value[i].raw)
      }
      service.post('/game/files',fd)
          .then(res=>{
            if(res.data.code === 200){
              videos.push(res.data.data[0])
            }else{
              ElMessage.error(result.message);
              uploadBanner.value.handleRemove(file);
            }
          })

    }


    const openTraDraw = row =>{
      currentEditTra.value = row;
      editTradOpen.value = true
    }
</script>

<style scoped>
.common-layout{
        width: 100%;
        height: 100%;
    }
    .header{
        background-color: #c6e2ff;
    }
    .home_main_per{
        background-color: #ecf5ff;
        /* height: 94%; */
        overflow: auto;
    }
</style>