<template>
    <div class="header_" >
        <div class="logo" style="width: 5%" @click="home">
            <svg t="1730099095949" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5495" width="40" height="40"><path d="M917.4 507c-27.8-98.4-66-189.8-79.3-214.7-16.8-31.4-39.9-55.5-68.7-71.5-29.8-16.6-66.7-25.1-109.6-25.1H364c-42.9 0-79.8 8.4-109.6 25.1-28.7 16-51.8 40.1-68.7 71.5-13.4 24.9-51.5 116.3-79.3 214.7-37.1 131.4-42.1 224.8-14.7 277.7 15.2 29.3 40.4 47 73.1 51.1 13.5 1.7 26 2.5 37.7 2.5 87.6 0 127.7-44.2 163.5-83.8 21.2-23.4 41.3-45.6 70.9-57.9h166.3c29.4 12.3 46.5 33.8 66.1 58.5 18 22.7 36.7 46.1 65.9 62.6 32.8 18.5 73.3 24.5 123.9 18.1 32.7-4.1 57.9-21.8 73.1-51.1 27.3-52.9 22.3-146.3-14.8-277.7z m-29.7 254.8c-7.7 14.8-18.4 22.4-34.9 24.4-11.4 1.4-21.8 2.1-31.3 2.1-61.9 0-85-29-113.1-64.4-22-27.6-46.9-59-91.7-75.8-2.8-1.1-5.8-1.6-8.8-1.6H432.1c-3 0-6 0.5-8.8 1.6-43.2 16.2-70.4 46.3-94.4 72.8-38.7 42.7-69.2 76.4-158 65.3-16.5-2.1-27.2-9.6-34.9-24.4-20.7-40.1-14.2-125.7 18.4-241.1 27.3-96.7 64.4-184.4 75.3-204.7 25.6-47.9 68.3-70.1 134.2-70.1h295.8c65.9 0 108.6 22.3 134.2 70.1 10.9 20.3 48 108 75.3 204.7 32.7 115.4 39.2 201 18.5 241.1z" fill="#2c2c2c" p-id="5496"></path><path d="M450 444.9h-70.3v-70.5c0-11-9-20-20-20s-20 9-20 20v70.5H270c-11 0-20 9-20 20s9 20 20 20h69.7v69.5c0 11 9 20 20 20s20-9 20-20v-69.5H450c11 0 20-9 20-20s-9-20-20-20z" fill="#2c2c2c" p-id="5497"></path><path d="M640.5 427m-41.9 0a41.9 41.9 0 1 0 83.8 0 41.9 41.9 0 1 0-83.8 0Z" fill="#2c2c2c" p-id="5498"></path><path d="M739.1 525.6m-41.9 0a41.9 41.9 0 1 0 83.8 0 41.9 41.9 0 1 0-83.8 0Z" fill="#2c2c2c" p-id="5499"></path></svg>
        </div>
        <div class="title_name" style="width: 5%">
            <h3>
                <!-- 自己可以更换 -->
                文文
            </h3>
        </div>

        <div style="width: 15%;" class="heard_search"> 
            <el-input
                v-model="desText"
                style="max-width: 600px;color: #409eff;"
                placeholder="搜索"
                class="input-with-select"
                @keyup.enter="search">
                <template #append>
                    <el-button :icon="SearchIcon" type="primary"></el-button>
                </template>
            </el-input>
        </div>

        <div class="touxiang">
            <el-popover
                placement="bottom"
                :width="150"
                trigger="hover"
                content="this is content, this is content, this is content"
                popper-style="width:250px"
            >
                <template #reference>
                    <el-avatar :size="50" :src="fileOps.getFile+currentUser.avatar"></el-avatar>
                </template>
                <div>
                    <div class="pro_top" style="width:100%;height:40px;border-bottom:1px solid #eee;">
                        <h2 style="text-align: center;">{{currentUser.name}}</h2>
                    </div>
                    <div style="width:100%;height:35px;padding-left:10px;display:flex;align-items:center;" class="c202410301423" @click="per">
                        <svg t="1730268038472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6899" width="20" height="20"><path d="M756.385986 581.803809c42.774199-54.392818 66.561975-121.847116 66.561975-191.867866 0-171.46007-139.491984-310.952055-310.952055-310.952055s-310.952055 139.491984-310.952055 310.952055c0 70.028936 23.77345 137.490398 66.547649 191.875029-92.967368 73.611531-203.841571 230.290967-203.841571 318.646294 0 24.607444 19.951401 44.558845 44.558845 44.558845s44.558845-19.951401 44.558845-44.558845c0-64.241117 130.114406-237.993392 201.76733-269.439592 13.953803-6.121418 23.809265-18.957771 26.130124-34.020838 2.320858-15.063067-3.213181-30.264281-14.678304-40.300868-48.249911-42.252313-75.925227-103.033631-75.925227-166.760025 0-122.317837 99.516528-221.834364 221.834364-221.834364s221.834364 99.516528 221.834364 221.834364c0 63.712067-27.675316 124.493385-75.946716 166.760025-11.458983 10.037611-16.999163 25.244964-14.678304 40.309054s12.183484 27.89942 26.137287 34.020838c71.66725 31.42471 201.788819 205.175963 201.788819 269.432429 0 24.607444 19.944238 44.558845 44.558845 44.558845 24.614607 0 44.558845-19.951401 44.558845-44.558845C960.249047 812.080449 849.375867 655.408177 756.385986 581.803809z" fill="#1A1A1A" p-id="6900"></path></svg>
                        <div style="width:5px"></div>
                        <h3>个人中心</h3>
                    </div>
                    <!-- 购物车 -->
                    <!-- <div style="width:100%;height:35px;padding-left:10px;display:flex;align-items:center;" class="c202410301423" @click="toMyWant">
                        <svg t="1730268355916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9915" width="20" height="20"><path d="M512.042667 193.237333a255.914667 255.914667 0 0 1 351.658666 9.728 256 256 0 0 1 10.069334 351.402667l-361.813334 362.325333-361.728-362.325333a256 256 0 0 1 361.813334-361.130667z m291.242666 70.016a170.581333 170.581333 0 0 0-234.24-6.528l-56.96 51.114667-57.002666-51.072a170.666667 170.666667 0 0 0-242.602667 239.146667L512 795.904l299.52-299.946667a170.666667 170.666667 0 0 0-8.234667-232.704z" fill="#000000" p-id="9916"></path></svg>                        <div style="width:5px"></div>
                        <h3>我的想要</h3>
                    </div>
                    <div style="width:100%;height:35px;padding-left:10px;display:flex;align-items:center;" class="c202410301423" @click="toRecord">
                        <svg t="1730268394768" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10962" width="20" height="20"><path d="M778.24 61.44a122.88 122.88 0 0 1 122.88 122.88v655.36a122.88 122.88 0 0 1-122.88 122.88H245.76a122.88 122.88 0 0 1-122.88-122.88V184.32a122.88 122.88 0 0 1 122.88-122.88h532.48z m0 61.44H245.76a61.44 61.44 0 0 0-61.3376 57.83552L184.32 184.32v655.36a61.44 61.44 0 0 0 57.83552 61.3376L245.76 901.12h532.48a61.44 61.44 0 0 0 61.3376-57.83552L839.68 839.68V184.32a61.44 61.44 0 0 0-57.83552-61.3376L778.24 122.88zM563.2 532.48a30.72 30.72 0 0 1 0 61.44h-266.24a30.72 30.72 0 0 1 0-61.44h266.24z m163.84-225.28a30.72 30.72 0 0 1 0 61.44h-430.08a30.72 30.72 0 0 1 0-61.44h430.08z" fill="#131415" p-id="10963"></path></svg>
                        <div style="width:5px"></div>
                        <h3>购买记录</h3>
                    </div> -->
                    <div style="width:100%;height:35px;padding-left:10px;display:flex;align-items:center; position: relative;" class="c202410301423">
                        <svg t="1730881623016" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5442" width="20" height="20"><path d="M401.30892 960.182765c-226.542584 0-336.631614-52.980346-336.631614-162.209306 0-76.718293 114.389384-127.118428 229.982866-144.663867l0-6.536536c-86.351083-66.053418-97.876029-184.055098-97.876029-281.071057 0-132.106837 77.750378-211.061314 208.137074-211.061314l6.880564 0c130.386696 0 208.137074 78.954477 208.137074 211.061314 0 97.015958-11.524945 214.845624-97.876029 281.071057l0 6.536536c115.593482 17.545439 229.982866 67.77356 229.982866 144.663867C752.045691 872.11154 691.152696 960.182765 401.30892 960.182765zM404.921216 218.801949c-95.639845 0-144.147825 49.540064-144.147825 147.072065 0 91.339493 9.804804 190.763649 83.082815 237.379473 9.288762 5.84848 14.793214 15.997312 14.793214 27.006215l0 51.260205c0 16.341341-12.385016 30.102469-28.554342 31.82261-121.097934 12.729044-201.428523 59.344868-201.428523 84.630942 0 65.193348 91.683521 98.220057 272.642365 98.220057 182.162943 0 286.747522-35.778935 286.747522-98.220057 0-25.286074-80.33059-71.901898-201.428523-84.630942-16.341341-1.720141-28.554342-15.48127-28.554342-31.82261l0-51.260205c0-11.008903 5.676466-21.157736 14.793214-27.006215 73.105997-46.615824 83.082815-146.211994 83.082815-237.379473 0-97.532001-48.507979-147.072065-144.147825-147.072065L404.921216 218.801949 404.921216 218.801949z" fill="#2c2c2c" p-id="5443"></path><path d="M899.117756 763.742651c-17.717453 0-31.994625-14.277171-31.994625-31.994625 0-24.426004-91.167479-83.942886-196.956157-95.123803-16.341341-1.720141-28.726356-15.48127-28.726356-31.82261L641.440618 538.404166c0-11.008903 5.676466-21.157736 14.793214-27.006215 82.738787-52.636318 91.683521-169.777927 91.683521-217.769864 0-110.433059-74.654124-133.654964-137.26726-133.654964-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625c124.194188 0 201.256509 75.686209 201.256509 197.644213 0 55.732572-10.664875 188.699479-106.476734 261.289434l0 22.18982c102.176382 18.577524 225.682513 79.986561 225.682513 154.640685C931.284394 749.46548 916.835209 763.742651 899.117756 763.742651z" fill="#2c2c2c" p-id="5444"></path></svg>
                        <div style="width:5px"></div>
                        
                        <h3 @click="toMessage">我的朋友</h3>

                        <div style="position: absolute;right: 10px;">
                            <el-tooltip content="您有未处理的好友申请,点击小铃铛前去处理吧" >
                                <svg v-if="friendApplyList.length>0" @click="reOpen = true"  
                                    t="1730881513582" class="icon" viewBox="0 0 1024 1024" version="1.1" 
                                    xmlns="http://www.w3.org/2000/svg" p-id="4293" width="20" height="20">
                                    <path d="M808 712l-48-108.8V448c0-102.4-65.6-195.2-160-232-3.2-44.8-41.6-80-88-80s-83.2 35.2-88 80c-96 36.8-160 129.6-160 232v155.2l-48 108.8c-6.4 14.4-4.8 30.4 3.2 43.2 8 12.8 22.4 20.8 38.4 20.8h508.8c16 0 30.4-8 38.4-20.8s9.6-30.4 3.2-43.2zM512 880c44.8 0 80-35.2 80-80H432c0 44.8 35.2 80 80 80z" fill="#d81e06" p-id="4294">
                                        </path>
                                </svg>
                            </el-tooltip>
                        </div>
                        
                    </div>
                    <div style="width:100%;height:35px;padding-left:10px;display:flex;align-items:center;" class="c202410301423" @click="toMessage">
                        <svg t="1730268431615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12907" width="20" height="20"><path d="M469.333333 85.333333h85.333334v85.333334h-85.333334z" fill="#323233" p-id="12908"></path><path d="M512 938.666667a170.752 170.752 0 0 1-165.290667-128l91.392 0.042666a85.333333 85.333333 0 0 0 147.797334 0h91.392A170.752 170.752 0 0 1 512 938.666667zM512 128a278.186667 278.186667 0 0 1 277.248 255.146667L810.666667 640l102.4 136.533333a21.333333 21.333333 0 0 1-17.066667 34.133334H128a21.333333 21.333333 0 0 1-17.066667-34.133334L213.333333 640l21.418667-256.853333A278.186667 278.186667 0 0 1 512 128z m0 85.333333a192.853333 192.853333 0 0 0-191.274667 167.850667l-0.938666 9.002667-23.466667 281.386666L256 725.333333h512l-40.32-53.76-23.466667-281.386666A192.853333 192.853333 0 0 0 512 213.333333z" fill="#323233" p-id="12909"></path></svg>
                        <div style="width:5px"></div>
                        <h3>我的交易</h3>
                    </div>
                    <div style="width:100%;height:35px;padding-left:10px;display:flex;align-items:center;" class="c202410301423" @click="toAdminPage">
                        <svg t="1730268488324" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15136" width="20" height="20"><path d="M881.277 512c0-44.845 19.861-85.167 51.471-113.064 14.694-12.967 18.4-34.383 8.483-51.286l-70.568-120.292c-9.686-16.511-29.496-23.989-47.756-18.242-15.148 4.768-31.307 7.344-48.084 7.344-75.071 0-137.788-51.579-152.902-120.374C617.805 77.343 601.188 64 581.998 64H442.004c-19.19 0-35.807 13.343-39.925 32.086-15.114 68.795-77.831 120.374-152.904 120.374-16.775 0-32.932-2.576-48.079-7.344-18.259-5.747-38.069 1.73-47.756 18.241L82.767 347.649c-9.917 16.903-6.211 38.32 8.483 51.288 31.611 27.897 51.47 68.218 51.47 113.063 0 44.844-19.859 85.166-51.47 113.063-14.694 12.968-18.4 34.384-8.483 51.288l70.571 120.292c9.686 16.511 29.497 23.988 47.756 18.241 15.147-4.768 31.304-7.344 48.079-7.344 75.075 0 137.791 51.578 152.905 120.374C406.195 946.657 422.813 960 442.003 960H582c19.19 0 35.808-13.343 39.925-32.086 15.113-68.796 77.829-120.374 152.902-120.374 16.776 0 32.933 2.576 48.081 7.344 18.26 5.748 38.07-1.73 47.756-18.241l70.569-120.291c9.917-16.904 6.211-38.321-8.484-51.289-31.611-27.898-51.472-68.22-51.472-113.063zM824.37 749.075a224.648 224.648 0 0 0-49.543-5.535c-29.523 0-58.211 5.657-85.266 16.814-26.204 10.806-49.75 26.288-69.984 46.015-20.347 19.838-36.344 42.99-47.547 68.815A214.314 214.314 0 0 0 564.251 896H459.75a213.987 213.987 0 0 0-7.779-20.816c-11.203-25.825-27.2-48.978-47.547-68.815-20.234-19.728-43.78-35.209-69.984-46.015-27.056-11.157-55.744-16.814-85.267-16.814a224.63 224.63 0 0 0-49.541 5.535l-52.341-89.218a217.351 217.351 0 0 0 28.408-37.07A213.395 213.395 0 0 0 206.72 512a213.407 213.407 0 0 0-31.02-110.788 217.39 217.39 0 0 0-28.408-37.07l52.341-89.218a224.683 224.683 0 0 0 49.541 5.535c29.523 0 58.211-5.657 85.267-16.814 26.204-10.806 49.75-26.287 69.984-46.015 20.347-19.838 36.344-42.99 47.547-68.815a214.248 214.248 0 0 0 7.779-20.816h104.5a213.873 213.873 0 0 0 7.779 20.815c11.203 25.824 27.2 48.977 47.547 68.815 20.234 19.728 43.78 35.209 69.983 46.016 27.056 11.157 55.743 16.814 85.266 16.814a224.65 224.65 0 0 0 49.544-5.535l52.338 89.217A217.344 217.344 0 0 0 848.3 401.21a213.396 213.396 0 0 0-31.022 110.789A213.39 213.39 0 0 0 848.3 622.786a217.274 217.274 0 0 0 28.409 37.071l-52.339 89.218z" p-id="15137"></path><path d="M512 320c-106.039 0-192 85.961-192 192s85.961 192 192 192 192-85.961 192-192-85.961-192-192-192z m90.51 282.51C578.334 626.686 546.19 640 512 640s-66.334-13.314-90.51-37.49C397.314 578.333 384 546.19 384 512s13.314-66.334 37.49-90.51C445.666 397.314 477.81 384 512 384s66.334 13.314 90.51 37.49C626.686 445.666 640 477.81 640 512s-13.314 66.333-37.49 90.51z" p-id="15138"></path></svg>
                        <div style="width:5px"></div>
                        <h3>管理后台</h3>
                    </div>
                    <div style="width:100%;height:35px;padding-left:10px;display:flex;align-items:center;" class="c202410301423" @click="logout">
                        <svg t="1730268544105" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16141" width="20" height="20"><path d="M957.44 716.8c-22.528 0-40.96 18.432-40.96 40.96v92.16c0 33.792-27.648 61.44-61.44 61.44H174.08c-33.792 0-61.44-27.648-61.44-61.44V168.96c0-33.792 27.648-61.44 61.44-61.44h680.96c33.792 0 61.44 27.648 61.44 61.44v40.96c0 22.528 18.432 40.96 40.96 40.96s40.96-18.432 40.96-40.96v-40.96c0-78.848-64.512-143.36-143.36-143.36H174.08C95.232 25.6 30.72 90.112 30.72 168.96v680.96c0 78.848 64.512 143.36 143.36 143.36h680.96c78.848 0 143.36-64.512 143.36-143.36v-92.16c0-22.528-18.432-40.96-40.96-40.96z" fill="#333333" p-id="16142"></path><path d="M807.936 633.344c8.192 8.192 18.432 11.776 29.184 11.776s20.992-4.096 29.184-11.776l120.32-120.32 0.512-0.512 2.56-2.56c0.512-0.512 1.024-1.024 1.024-1.536 0.512-0.512 1.024-1.024 1.024-1.536 0.512-0.512 1.024-1.024 1.024-2.048 0.512-0.512 0.512-1.024 1.024-1.536 0.512-0.512 0.512-1.536 1.024-2.048 0.512-0.512 0.512-1.024 1.024-1.536 0.512-0.512 0.512-1.536 0.512-2.048 0-0.512 0.512-1.024 0.512-2.048 0-0.512 0.512-1.536 0.512-2.048 0-0.512 0.512-1.024 0.512-2.048s0-1.536 0.512-2.56v-1.536c0.512-2.56 0.512-5.632 0-8.192v-1.536c0-1.024 0-1.536-0.512-2.56 0-0.512-0.512-1.024-0.512-2.048 0-0.512-0.512-1.536-0.512-2.048 0-0.512-0.512-1.024-0.512-2.048 0-0.512-0.512-1.536-0.512-2.048 0-0.512-0.512-1.024-1.024-1.536-0.512-0.512-0.512-1.536-1.024-2.048-0.512-0.512-0.512-1.024-1.024-1.536-0.512-0.512-0.512-1.024-1.024-2.048-0.512-0.512-1.024-1.024-1.024-1.536-0.512-0.512-0.512-1.024-1.024-1.536-0.512-1.024-1.536-2.048-2.56-2.56l-0.512-0.512-120.32-120.32c-15.872-15.872-41.984-15.872-57.856 0-15.872 15.872-15.872 41.984 0 57.856l50.176 50.176h-344.064c-22.528 0-40.96 18.432-40.96 40.96s18.432 40.96 40.96 40.96h344.064l-50.176 50.176c-16.384 17.92-16.384 43.52-0.512 59.904z" fill="#333333" p-id="16143"></path></svg>
                        <div style="width:5px"></div>
                        <h3 style="text-align: center;color:red;">退出登录</h3>
                    </div>
                </div>
            </el-popover>

            <!-- <el-avatar :size="50" :src="currentUser.avatar"></el-avatar> -->
        </div>
        <div class="pub_button" @click="isOpen=true" v-if="isVisible">
            <el-button type="primary"  :icon="PubIcon">发布</el-button>
        </div>
    </div>
    <!-- 发布 -->
    <el-drawer v-model="isOpen" direction="rtl" size="45%" :before-close="handleClose" :with-header="false" @open="init">
            <div style="display: flex;align-items: center;height:10%">
                <el-avatar :size="50" :src="currentUser.avatar" style="margin-right:2%"></el-avatar>
                <span style="font-size:30px">{{currentUser.name}}</span>
            </div>
            <div>
                <el-form
                    ref="ruleFormRef"
                    style="max-width: 600px"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="80px"
                    class="demo-ruleForm"
                    status-icon>
                    <el-form-item label="游戏名称" prop="gameName">
                        <el-input v-model="ruleForm.gameName" />
                    </el-form-item>
                    <el-form-item label="游戏ID" prop="gameId">
                        <el-input v-model="ruleForm.gameId" />
                    </el-form-item>
                    <el-form-item label="类型" prop="gameType">
                        <el-select v-model="ruleForm.gameType" placeholder="请选择" >
                            <el-option v-for="(item,index) in gameTypesList" :key="index" :label="item.name" :value="item.name" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="期望价格" prop="price">
                        <el-input-number v-model="ruleForm.price"></el-input-number>
                    </el-form-item>
                    <el-form-item label="展示图" prop="showImg">
                        <el-upload
                            class="avatar-uploader"
                            action="#"
                            :show-file-list="true"
                            :on-success="handleAvatarSuccess"
                            accept=".png,.jpe,.jpeg"
                            :http-request="handleUpload"
                            :limit="1"
                            :before-upload="handleChange"
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
                            :http-request="handleUpload_"

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
                    <el-form-item label="账号介绍" prop="desText">
                        <el-input v-model="ruleForm.desText" type="textarea"/>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="isOpen = false">取消</el-button>
                    <el-button type="primary" @click="save">发布</el-button>
                </div>
            </template>

    </el-drawer>

    <!-- 好友申请 -->
    <el-drawer v-model="reOpen" v-loading="agreeLoading" direction="ltr" title="好友申请">
        <div  
            style="padding: 10px;width: 100%;height: 90px;display: flex;align-items: center;position: relative;"
            v-for="item in friendApplyList" :key="item.id"
            >
            <el-avatar :src="fileOps.getFile+item.avatar"/>
            <div style="margin-left: 10px;max-width: 60%">
                <div>
                    <span style="font-size:20px">{{item.name}}</span>
                </div>
                <div>
                    <span>{{item.reason}}</span>
                </div>
            </div>

            <div style="display: flex;align-items: center;position: absolute;right: 5px;">
                <el-button type="danger" style="font-size: 16px;" text size="large" @click="reject(item)">拒绝</el-button>
                <el-button type="primary" style="font-size: 16px;" text size="large" @click="agree(item)">同意</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
    import {ref,onMounted,defineProps,reactive} from 'vue'
    import PubIcon from '../icons/PubIcon.vue';
    import SearchIcon from '../icons/SearchIcon.vue';
    import fileOps from '../js/file'
    import { useRouter } from 'vue-router'
    import { ElMessageBox } from 'element-plus'
    import {service} from '@/components/js/http.js';
    import { ElMessage } from 'element-plus'
    import { ElLoading } from 'element-plus'

    const props = defineProps({
        pubVis: Boolean
    })
    let ruleFormRef = ref(null)

    const emit = defineEmits({
        searchTarget:(item)=>{
            return item;
        }
    })
    let ruleForm = ref(
        {
            gameName:'',
            gameId:'',
            desText:'',
            gameType:'',
            price:0.0,
            showImg:'',
            desFile:''
        }
    )
    let showImg_ = ref('')
    let uploadBanner = ref(null)
        
    let desText = ref('')

    const router = useRouter();

    let currentUser = ref({});

    let isOpen = ref(false); 
    let isVisible = ref(props.pubVis);

    var gameTypesList = ref([])

    let fileList = ref([])

    let friendApplyList = ref([])
    let reOpen = ref(false)

    let agreeLoading = ref(false)

    onMounted(() => {
        currentUser.value = JSON.parse(sessionStorage.getItem('user'));
        getFriendApply()
    })


    function logout(){
        sessionStorage.removeItem('token')
        router.push('/game/login')
    }
    const home = () => router.push('/game/home')
    const per = () => router.push('/game/per')
    const toAdminPage = ()=>{
        service.get('/user/toAdmin/'+currentUser.value.id).then(res=>{
            if(res.data.code==200 && res.data.data){
                ElMessage.success('管理员登录成功')
                router.push('/game/admin')
            }else{
                ElMessage.error('非管理员账号，无法进入')
            }
        })

        
    };
    const toMyWant = ()=>router.push('/game/myWant');
    const toMessage = ()=>router.push('/chat/chat');
    const toRecord = () => router.push('/game/record');
    const confirmClick = ()=>{
        ElMessageBox.confirm('请确认信息是否正确，是否提交？')
            .then(() => {
               isOpen.value = false
            })
    }
    function search(){
        console.log("触发"+desText.value)
        emit('searchTarget',desText.value)
    }

    const handleClose = ()=>{
        ElMessageBox.confirm('发布内容还未保存，是否确认离开','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            isOpen.value = false
            ruleFormRef.value.resetFields()
        })
    }

    const rules = reactive({
        gameName:[
            { required: true, message: '请输入游戏的名称', trigger: 'blur' },
            { min: 1, message: '游戏名不能为空', trigger: 'blur' },
        ],
        gameId:[
            { required: true, message: '请输入游戏ID', trigger: 'blur' },
            { min: 1, message: '游戏ID不能为空', trigger: 'blur' },
        ],
        desText:[
            { required: true, message: '请输入对账号的简单介绍', trigger: 'blur' },
            { min: 20,max:100, message: '账号介绍最少20字', trigger: 'blur' },
        ],
        gameType:[
            { required: true, message: '请选择游戏类型', trigger: 'blur' },
            { min: 1, message: '游戏类型不能为空', trigger: 'blur' },
        ],
        price:[
            { required: true, message: '请选择游戏类型', trigger: 'blur' }
        ]
        ,
        showImg:[
            { required: false, message: '请上传账号展示图', trigger: 'blur' },
        ]
    })
    const handleAvatarSuccess = (a,b,c)=>{
        console.log("+++++++++"+a)
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

    const handleUpload = (file) => {
        let fd = new FormData();
        fd.append("files", file.file);
            // 这里是请求上传接口
        service.post('/game/files',fd)
            .then(res=>{
                if(res.data.code === 200){
                    ruleForm.value.showImg = res.data.data[0]
                    showImg_.value = fileOps.getFile + ruleForm.value.showImg 
                }else{
                    ElMessage.error(result.message);
                    uploadBanner.value.handleRemove(file);
                }
            })

    };

    let videos = [];
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
 
    //用户发布账号交易信息
    const save = ()=>{
        if (!ruleFormRef) {
            return;
        }
        ruleFormRef.value.validate(function (valid, fields) {
            if (valid) {
                const loading = ElLoading.service({
                    lock: true,
                    text: '拼命加载中...',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                ruleForm.value.desFile = JSON.stringify({video:videos})
                service.post('/game',ruleForm.value).then(res=>{
                    let data = res.data;
                    loading.close()
                    
                    if(data.code===200 && data.data){
                        ElMessage.success('发布成功')
                        isOpen.value = false
                        ruleFormRef.value.resetFields()
                        showImg_.value = ''
                    }else{
                        ElMessage.error('发布失败')
                    }

                })
            } else {
                console.log('error submit!', fields);
                ElMessage.error('发布失败')
                return;
            }
        });
    }

    const init = (e)=>{
        console.log(e)

        service.get('/game/type').then(res=>{
            if(res.data.code === 200){
                gameTypesList.value = res.data.data
            }
        })
    }

    // 获取好友申请
    const getFriendApply = ()=>{
        service.get('/user/get/fre').then(res=>{
            if(res.data.code === 200){
                friendApplyList.value = res.data.data
            }
        })
    }

    const agree = async (item) => {
        agreeLoading.value = true
        await service.post('/user/fri/req/'+item.id+'/1').then(res=>{
            if(res.data.code === 200){
                ElMessage.success('已同意')
            }
            
        })
        agreeLoading.value = false
        getFriendApply()
    }

    const reject = async (item) => {
        await service.post('/user/fri/req/'+item.id+'/0').then(res=>{
            if(res.data.code === 200){
                ElMessage.success('已拒绝')
            }
            
        })
        getFriendApply()
    }
</script>
<style scoped>
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .header_{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .logo{
        padding-top: 5px;
        padding-left: 10px ;
        margin-right:10px ;
    }
    .title_name{
        display: flex;
        align-items: center;
        height: 100%;

    }
    .input-with-select{
        border-radius: 20px;
        color: #409eff;
    }
    .pub_button{
        position: absolute;
        right: 1%;
    }
    .touxiang{
        position: absolute;
        right:7%;
    }
    .heard_search{
        position: absolute;
        right: 18%;
    }
    .c202410301423:hover{
        cursor: pointer;
    }
    .logo:hover{
        cursor: pointer;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #CECECE;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
        }

        .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
        }
</style>
