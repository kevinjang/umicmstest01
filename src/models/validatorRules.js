export default {
    namespace: 'vrules',
    state: [
        {
            userNameRules: [
                {
                    required: true,
                    message: '用户名必填'
                },
                {
                    min: 3,
                    message: '用户名长度至少为3'
                },
                {
                    max: 15,
                    message: '用户名长度最长为15'
                }
            ],
            pwRules: [
                {
                    required: true,
                    message: '请输入密码'
                }
            ],
            mobileRules: [
                {
                    required: true,
                    message: '请输入手机号'
                },
                {
                    min: 11,
                    message: '请填写正确的手机号'

                },
                {
                    max: 11,
                    message: '请填写正确的手机号'

                }
            ]
        }
    ]
}