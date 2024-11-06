/*
 * @Author: wan.chengfei wan.chengfei@rongzer.com
 * @Date: 2024-11-06 15:12:05
 * @LastEditors: wan.chengfei wan.chengfei@rongzer.com
 * @LastEditTime: 2024-11-06 15:13:27
 * @FilePath: /NotionNext/themes/example/components/Footer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import CopyRightDate from '@/components/CopyRightDate'
import DarkModeButton from '@/components/DarkModeButton'
import PoweredBy from '@/components/PoweredBy'

export const Footer = props => {
  return (
    <footer className='z-10 relative w-full bg-white px-6 space-y-1 border-t dark:border-hexo-black-gray dark:bg-hexo-black-gray '>
      <DarkModeButton className='text-center pt-4' />

      <div className='container mx-auto max-w-4xl py-6 md:flex flex-wrap md:flex-no-wrap md:justify-between items-center text-sm'>
        <CopyRightDate />
        <div className='md:p-0 text-center md:text-right text-xs'>
          {/* 右侧链接 */}
          {/* <a href="#" className="text-black no-underline hover:underline">Privacy Policy</a> */}
          <div className='flex flex-wrap'>
            {' '}
            <BeiAnSite />
            <BeiAnGongAn />
          </div>
          <PoweredBy />
        </div>
      </div>
    </footer>
  )
}
