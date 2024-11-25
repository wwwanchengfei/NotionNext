import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import React from 'react'
import BLOG from '@/blog.config'
import { DynamicLayout } from '@/themes/theme'

const MemosIndex = props => {
  const Layout = getLayoutByTheme({ 
    theme: siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  })
  return <DynamicLayout theme={theme} layoutName='LayoutPostList' {...props} />
}

export async function getStaticProps() {
  const from = 'tag-index-props'
  const props = await getGlobalData({ from })
  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default MemosIndex