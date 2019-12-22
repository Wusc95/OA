//手机号验证规则
export const checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("手机号不能为空"));
    } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == true) {
            callback();
        } else {
            return callback(new Error("请输入正确手机号"));
        }
    }
};
//邮箱验证规则
export const checkEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("邮箱不能为空"));
    } else {
        const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (regEmail.test(value) == true) {
            callback();
        } else {
            return callback(new Error("请输入正确的邮箱"));
        }
    }
};