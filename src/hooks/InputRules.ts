//  InputRules.ts - 定义输入框验证规则和错误时返回的信息
interface RuleProp {
  type: 'required' | 'email' | 'valid' | 'user';
  message: string;
}
export type RulesProp = RuleProp[]

export const emailRules: RulesProp = [
  { type: 'required', message: '电子邮件不能为空' },
  { type: 'email', message: '请输入正确的邮件格式' }
]

export const pwdRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]

export const userRules: RulesProp = [
  { type: 'required', message: '用户名不能为空' },
  { type: 'user', message: '请输入正确的用户名格式（6-12字符，不含有特殊符号）' }
]

export const validPwdRules: RulesProp = [
  { type: 'required', message: '密码不能为空' },
  { type: 'valid', message: '两次密码不一致' }
]

export const titleRules: RulesProp = [
  { type: 'required', message: '专栏标题不能为空' }
]

export const contentRules: RulesProp = [
  { type: 'required', message: '文章不能为空' }
]
