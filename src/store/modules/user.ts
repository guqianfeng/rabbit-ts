import { ApiRes } from '@/types/data';
import { Profile } from './../../types/data.d';
import { defineStore } from 'pinia';
import request from '@/utils/request';
export default defineStore('user', {
    state() {
        return {
            profile: {} as Profile
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
            localStorage.setItem('xtx_profile', JSON.stringify(this.profile))
        },

        setLocalStorageProfile () {
            const str = localStorage.getItem('xtx_profile')
            if (str) {
                const profile = JSON.parse(str)
                // console.log(profile)
                this.profile = profile
            }
        },

        async getMobileCode (mobile: string) {
            const res = await request.get('/login/code', {
                params: {
                    mobile
                }
            })
            console.log(res)
        }
    }
})