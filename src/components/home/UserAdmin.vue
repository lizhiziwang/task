<template>
        <div style="height: 100%;width: 100%;margin-top: 10px;">
            <div class="search-top" style="height: 30%;">
                <el-form :inline="true" :model="searchUser" class="demo-form-inline" ref="searchUserForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="searchUser.name" placeholder="user name" clearable />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select
                            v-model="searchUser.gender"
                            placeholder="请选择"
                            clearable
                            style="width: 180px;"
                        >
                            <el-option label="男" value="1" />
                            <el-option label="女" value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="昵称" prop="alia">
                        <el-input  v-model="searchUser.alia" placeholder="user name" clearable />
                    </el-form-item>
                    <el-form-item label="在线状态" prop="isOnline">
                        <el-select
                        style="width: 180px;"
                            v-model="searchUser.isOnline"
                            placeholder="请选择"
                            size="default"
                            clearable>
                            <el-option label="在线" value="1" />
                            <el-option label="离线" value="0" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号" prop="alia">
                        <el-input  v-model="searchUser.phone" placeholder="例：130..." clearable />
                    </el-form-item>
                    <el-form-item label="出生年月" >
                        <el-col :span="10">
                            <el-date-picker
                            v-model="searchUser.startTime"
                            type="date"
                            aria-label="Pick a date"
                            placeholder="Pick a date"
                            style="width: 100%"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            />
                        </el-col>
                        <el-col class="text-center" :span="1" style="margin: 0 0.5rem">至</el-col>
                        <el-col :span="10">
                            <el-date-picker
                                v-model="searchUser.endTime"
                                type="date"
                                aria-label="Pick a date"
                                placeholder="Pick a date"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                style="width: 100%"/>
                        </el-col>
                    </el-form-item>
                    <br/>
                    <el-form-item style="float: right;">
                        <el-button @click="resetForm">清空</el-button>
                        <el-button type="primary" @click="submitForm">
                            查询
                        </el-button>
                        
                    </el-form-item>
                </el-form>
            </div>

            <div class="table-container">
                <el-table :data="userList" max-height="650" style="width: 99%">
                    <el-table-column align="center" prop="name" label="账号名" width="200" />
                    <el-table-column align="center" prop="alia" label="昵称" width="200" />
                    <el-table-column  align="center" prop="sex" label="性别" width="200" />
                    <el-table-column align="center" prop="phone" label="手机号" width="200" />
                    <el-table-column align="center" prop="status" label="在线状态" width="200" />
                    <el-table-column align="center" prop="ruler" label="用户身份" width="200" />
                    <el-table-column align="center" prop="birthday" label="生日" width="200" />
                    <el-table-column align="center" fixed="right" label="操作" min-width="120">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="updateUser(scope.row)">
                                编辑
                            </el-button>
                            <el-button link type="primary" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
                            <el-button link type="primary" v-if="scope.row.status==='在线'" size="small" @click="loginOut(scope.row.id)">下线</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-toolbar">
                <el-pagination
                    style="float: right;"
                    v-model:current-page="pageParams.current"
                    v-model:page-size="pageParams.size"
                    :page-sizes="[10, 20, 40, 60]"
                    :size="pageParams.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageParams.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
            </div>
        </div>

        <el-drawer v-model="isOpen" direction="rtl" size="45%" :before-close="handleClose" :with-header="false">
            <div style="display: flex;align-items: center;height:10%">
                <el-avatar :size="50" :src="fileOps.getFile+modifyingUser.avatar" style="margin-right:2%"></el-avatar>
                <span style="font-size:30px">{{modifyingUser.name}}</span>
            </div>

            <div>
                <el-form
                    ref="ruleFormUser"
                    style="max-width: 600px"
                    :model="modifyingUser"
                    :rules="rules"
                    label-width="80px"
                    class="demo-ruleForm"
                    status-icon>
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="modifyingUser.name" />
                    </el-form-item>
                    <el-form-item label="昵称" prop="gameId">
                        <el-input v-model="modifyingUser.alia" />
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input v-model="modifyingUser.pwd" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="modifyingUser.gender" placeholder="请选择" >
                            <el-option label="男" value="1" ></el-option>
                            <el-option label="女" value="0" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="用户身份" prop="identity">
                        <el-select v-model="modifyingUser.identity" placeholder="请选择" >
                            <el-option label="管理员" value="0" ></el-option>
                            <el-option label="尊贵会员" value="1" ></el-option>
                            <el-option label="普通用户" value="2" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="钱包" prop="purse">
                        <el-input-number v-model="modifyingUser.purse"></el-input-number>
                    </el-form-item>

                    <el-form-item label="个性签名" prop="idiograph">
                        <el-input v-model="modifyingUser.idiograph" type="textarea"/>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="isOpen = false">取消</el-button>
                    <el-button type="primary" @click="save">保存</el-button>
                </div>
            </template>
        </el-drawer>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { service } from '../js/http';
    import fileOps from '../js/file'
    import { ElMessageBox, ElMessage,ElLoading} from 'element-plus'


    let searchUser = ref({
        name:'',
        gender:'',
        alia:'',
        isOnline:'',
        startTime:'',
        endTime:'',
        phone:''
    })
    let pageParams = ref({
        current:1,
        size:20,
        total:0
    })
    let searchUserForm = ref(null)
    let modifyingUser = ref(null)
    let isOpen = ref(false)
    let ruleFormUser = ref(null)

    var userList = ref([]);

    onMounted(()=>{
        console.log('mounted')
        search();
    })
    const submitForm = ()=>{
        search();
    }

    function search(){
        service.post(
            '/user/search?current='+pageParams.value.current+'&size='+pageParams.value.size,
            searchUser.value
        ).then(res=>{
            if(res.data.code === 200){
                userList.value = res.data.data.records;
                pageParams.value.total = res.data.data.total;
                pageParams.value.size = res.data.data.size;
                pageParams.value.current = res.data.data.current;
            }
        })
    }

    const handleSizeChange = (val)=>{ //每页显示条数改变
        pageParams.value.size = val;
        search(); 
    }
    const handleCurrentChange = (val)=>{ //页码改变
        pageParams.value.current = val;
        search(); 
    }
    const resetForm = ()=>{
        searchUserForm.value.resetFields();
    }

    const deleteUser = (id) =>{
        ElMessageBox.confirm('是否删除该用户?','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            console.log("当前删除的用户",id);
            //执行删除操作
            reUser(id)
        })
        
    }
    const reUser = (id)=>{
        service.post('/user/rem/'+id).then(res=>{
            console.log("执行删除哇");
            if(res.data.code==200){
                if(res.data.data == true){
                    ElMessage({
                        type:'success',
                        message:'删除成功'
                    })
                }else{
                    ElMessage({
                        type:'error',
                        message:'删除失败'
                    })
                }
                search();
            }else{
                ElMessage({
                    type:'error',
                    message:'删除失败'
                })
            }
        })
    }

    const updateUser = (user)=>{
        modifyingUser.value=user;
        isOpen.value = true;
    }

    const handleClose = ()=>{
        ElMessageBox.confirm('修改内容还未保存，是否确认离开','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            isOpen.value = false
            modifyingUser.value = {}
        })
    }

    const save = ()=>{
        const loading = ElLoading.service({
            lock: true,
            text: '拼命加载中...',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        service.post('/user/update',modifyingUser.value).then(res=>{
            loading.close()
            if(res.data.code == 200 && res.data.data){
                ElMessage.success('修改成功')
            }else{
                ElMessage.error('修改失败')
            }
            isOpen.value=false
        })
    }
    
    const loginOut = (id)=>{
        service.get('/user/down/'+id).then(res=>{
            if(res.data.code==200){
                ElMessage.success('成功将用户下线')
                sessionStorage.removeItem('token')
                router.push('/game/login')

            }else{
                ElMessage.error('下线失败')
            }
        })
    }
</script>

<style  scoped>
    .search-top{
        width: 100%;
    }
    .table-container{
        height: 60%;
        width: 100%;
    }
    .page-toolbar{
        width: 100%;
        height: 10%;
        padding-top: 10px;
    }
</style>