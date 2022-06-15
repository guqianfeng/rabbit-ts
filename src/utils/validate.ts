export function accountRule(value: string) {
    if (!value) return '请输入用户名'
    if (!/^\w{6,20}$/.test(value)) return '密码必须是6-20位字符'
    return true
}
export function passwordRule(value: string) {
    if (!value) return '请输入密码'
    if (!/^\w{6,20}$/.test(value)) return '密码必须是6-20位字符'
    return true;
}
export function isAgreeRule(value: boolean) {
    if (!value) return '请先同意'
    return true;
}
export function mobileRule(value: string) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式有误'
    return true;
}
export function codeRule(value: string) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码格式有误'
    return true;
}

export function rePasswordRule(value: string, { form }: any) {
    if (!value) return '请输入确认密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    // 校验密码是否一致  form表单数据对象
    if (value !== form.password) return '两次输入的密码不一致'
    return true
}