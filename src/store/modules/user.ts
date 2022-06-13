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
        }
    }
})