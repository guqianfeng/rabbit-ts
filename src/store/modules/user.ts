import { ApiRes } from '@/types/data';
import { Profile } from './../../types/data.d';
import { defineStore } from 'pinia';
import request from '@/utils/request';
import { getProfile, removeProfile, setProfile } from '@/utils/localStorage';
export default defineStore('user', {
    state() {
        return {
            profile: getProfile()
        }
    },
    getters: {

    },
    actions: {
        async login(account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password
            })
            this.profile = res.data.result
            setProfile(res.data.result)
        },

        async getMobileCode(mobile: string) {
            const res = await request.get('/login/code', {
                params: {
                    mobile
                }
            })
            console.log(res)
        },

        async mobileLogin(mobile: string, code: string) {
            const res = await request.post<ApiRes<Profile>>('/login/code', {
                mobile,
                code
            })
            this.profile = res.data.result
            setProfile(res.data.result)
        },
        async logout() {
            this.profile = {} as Profile
            removeProfile()
        },
        //  source: 1为pc，2为webapp，3为微信小程序, 4为Android, 5为ios, 6为qq, 7为微信
        async qqLogin(openId: string) {
            const res = await request.post<ApiRes<Profile>>('/login/social', {
                unionId: openId,
                source: 6
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            setProfile(res.data.result)
        },
        // 绑定qq的短信验证码
        async sendQQBindMsg(mobile: string) {
            await request.get('/login/social/code', {
                params: {
                    mobile
                }
            })
        }
    }
})