/*
 * @Author: wan.chengfei wan.chengfei@rongzer.com
 * @Date: 2024-10-31 19:23:28
 * @LastEditors: wan.chengfei wan.chengfei@rongzer.com
 * @LastEditTime: 2024-10-31 19:24:30
 * @FilePath: /NotionNext/themes/example/components/Footer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DarkModeButton from '@/components/DarkModeButton'
import { GongAnBeiAn } from '@/components/GongAnBeiAn'
import { siteConfig } from '@/lib/config'

export const Footer = props => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='z-10 relative w-full bg-white px-6 border-t dark:border-hexo-black-gray dark:bg-hexo-black-gray '>
      <DarkModeButton className='text-center pt-4' />

      <div className='container mx-auto max-w-4xl py-6 md:flex flex-wrap md:flex-no-wrap md:justify-between items-center text-sm'>
        <div className='text-center'>
          {' '}
          &copy;{`${copyrightDate}`} {siteConfig('AUTHOR')}. All rights
          reserved.
        </div>
        <div className='md:p-0 text-center md:text-right text-xs'>
          {/* 右侧链接 */}
          {/* <a href="#" className="text-black no-underline hover:underline">Privacy Policy</a> */}
          {siteConfig('BEI_AN') && (
            <a
              href='https://beian.miit.gov.cn/'
              className='text-black dark:text-gray-200 no-underline hover:underline ml-4'>
              {siteConfig('BEI_AN')}{' '}
            </a>
          )}
          <GongAnBeiAn />
          <span className='dark:text-gray-200 no-underline ml-4'>
            Powered by
            <a
              href='https://github.com/tangly1024/NotionNext'
              className=' hover:underline'>
              {' '}
              NotionNext {siteConfig('VERSION')}{' '}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
