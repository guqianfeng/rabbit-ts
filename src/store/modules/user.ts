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
        async login (account: string, password: string) {
            const res = await request.post<ApiRes<Profile>>('/login', {
                account,
                password
            })
            this.profile = res.data.result
            setProfile(res.data.result)
        },

        async getMobileCode (mobile: string) {
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
        async logout () {
            this.profile = {} as Profile
            removeProfile()
        }
    }
})