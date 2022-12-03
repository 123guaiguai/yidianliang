//检查密码强度的函数
export default function checkStrength(passwd) {
    if ((/[a-z]/.test(passwd) && /[A-Z]/.test(passwd)&& /[0-9]/.test(passwd))) {
        return {
            flag:true,
        }
    }
    else {
        return {
            message: "密码必须包含大小写字母和数字！",
            flag: false
        }
    }
}