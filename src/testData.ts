import { ColumnProps, PostProps } from './store'

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220506141820_mid.jpg'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220506141820_mid.jpg'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是test3专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220506141820_mid.jpg'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是test4专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220506141820_mid.jpg'
  }
]

export const PostData: PostProps[] = [
  {
    id: 1,
    title: 'My first post',
    content: '这是test1专栏里面的一篇post，有一段非常有意思的简介，可以更新一下哦',
    image: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220506141820_mid.jpg',
    createAt: '2022-05-24',
    columnId: 1
  },
  {
    id: 2,
    title: 'My second post',
    content: '这是test1专栏里面的一篇post，有一段非常有意思的简介，可以更新一下哦',
    image: '',
    createAt: '2022-05-24',
    columnId: 1
  },
  {
    id: 3,
    title: 'My third post',
    content: '这是test1专栏里面的一篇post，有一段非常有意思的简介，可以更新一下哦',
    image: '',
    createAt: '2022-05-24',
    columnId: 1
  }
]
