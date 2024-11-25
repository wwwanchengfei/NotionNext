import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/notion/getNotionData'  //若为NotionNext 4.3.2+版本，此处应为 @/lib/db/getSiteData
import React from 'react'
import BLOG from '@/blog.config'
import { DynamicLayout } from '@/themes/theme'

const MemosIndex = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutMemosIndex' {...props} />
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
