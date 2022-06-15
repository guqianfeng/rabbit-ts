<script lang="ts" setup name="LoginForm">
import Message from '@/components/message';
import useStore from '@/store';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate'
import { useCountdown } from '@/utils/hooks'
import { accountRule, codeRule, isAgreeRule, mobileRule, passwordRule } from '@/utils/validate';

const { user } = useStore()
const router = useRouter()
const activeName = ref<'account' | 'mobile'>('account')

const handleChange = (value: boolean) => {
    // console.log(value)
}

const { validate, resetForm } = useForm({
    initialValues: {
        mobile: '13666666666',
        code: '123456',
        account: 'xiaotuxian001',
        password: '123456',
        isAgree: true
    },
    validationSchema: {
        account: accountRule,
        password: passwordRule,
        isAgree: isAgreeRule,
        mobile: mobileRule,
        code: codeRule,
    }
})

const { value: account, errorMessage: accountError } = useField<string>('account')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeError } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileError, validate: mobileValidate } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')

const login = async () => {
    const res = await validate()
    // if (!res.valid) return;
    if (activeName.value === 'account') {
        // console.log('账号登录')
        if (res.errors.account || res.errors.password || res.errors.isAgree) return;
        await user.login(account.value, password.value)
    } else {
        // console.log('手机登录')
        if (res.errors.mobile || res.errors.code || res.errors.isAgree) return;
        await user.mobileLogin(mobile.value, code.value)
    }
    Message.success('登录成功')
    router.push('/')
}

watch(activeName, () => {
    resetForm()
})

const { time, start } = useCountdown()
const mobileRef = ref<null | HTMLInputElement>(null)
const sendCode = async () => {
    // 13012345678
    if (time.value > 0) return;
    const res = await mobileValidate()
    if (!res.valid) {
        mobileRef.value?.focus()
        return;
    }
    await user.getMobileCode(mobile.value)
    Message.success('发送验证码成功')
    start()
}
</script>
<template>
    <div class="account-box">
        <div class="toggle">
            <a href="javascript:;" v-if="activeName === 'mobile'" @click="activeName = 'account'">
                <i class="iconfont icon-user"></i> 使用账号登录
            </a>
            <a href="javascript:;" v-else @click="activeName = 'mobile'">
                <i class="iconfont icon-msg"></i> 使用短信登录
            </a>
        </div>
        <div class="form">
            <template v-if="activeName === 'account'">
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input v-model="account" type="text" placeholder="请输入用户名" />
                    </div>
                    <div class="error" v-if="accountError"><i class="iconfont icon-warning" />{{ accountError }}</div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-lock"></i>
                        <input v-model="password" type="password" placeholder="请输入密码" />
                    </div>
                    <div class="error" v-if="passwordError"><i class="iconfont icon-warning" />{{ passwordError }}</div>
                </div>
            </template>
            <template v-else>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input v-model="mobile" type="text" placeholder="请输入手机号" ref="mobileRef" />
                    </div>
                    <div class="error" v-if="mobileError"><i class="iconfont icon-warning" />{{ mobileError }}</div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-code"></i>
                        <input v-model="code" type="text" placeholder="请输入验证码" />
                        <span class="code" @click="sendCode">
                            {{ time === 0 ? '发送验证码' : `${time}s后发送` }}
                        </span>
                    </div>
                    <div class="error" v-if="codeError"><i class="iconfont icon-warning" />{{ codeError }}</div>
                </div>
            </template>
            <div class="form-item">
                <div class="agree">
                    <XtxCheckbox v-model="isAgree" @change="handleChange">我已同意</XtxCheckbox>
                    <a href="javascript:;">《隐私条款》</a>
                    <span>和</span>
                    <a href="javascript:;">《服务条款》</a>
                </div>
                <div class="error" v-if="isAgreeError"><i class="iconfont icon-warning" />{{ isAgreeError }}</div>
            </div>
            <a href="javascript:;" class="btn" @click="login">登录</a>
        </div>
        <div class="action">
            <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
                <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
            </a>
            
            <div class="url">
                <a href="javascript:;">忘记密码</a>
                <a href="javascript:;">免费注册</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: @xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 40px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: @priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: @xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: @priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: @xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            cursor: pointer;
        }

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}
</style>