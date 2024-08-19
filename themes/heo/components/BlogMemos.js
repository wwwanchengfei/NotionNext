import React, { useEffect, useState } from 'react';
import { loadExternalResource } from '@/lib/utils';

const BlogMemos = () => {
    const [isResourcesLoaded, setResourcesLoaded] = useState(false);

    useEffect(() => {
        // 并行加载CSS文件
        Promise.all([
            loadExternalResource('/css/memos.css', 'css'),
            loadExternalResource('/css/highlight.github.min.css', 'css'),
            loadExternalResource('/js/lazyload.min.js?v=17.8.3', 'js'),
            loadExternalResource('/js/marked.min.js?v=11.1.1', 'js'),
            loadExternalResource('/js/view-image.min.js?v=2.0.2', 'js'),
            loadExternalResource('/js/highlight.min.js?v=11.9.0', 'js'),
            loadExternalResource('/js/moment.min.js?v=2.30.1', 'js'),
        ])
        .then(() => {
            // 保证moment.js加载完成后再加载moment.twitter.js
            return loadExternalResource('/js/moment.twitter.js', 'js');
        })
        .then(() => {
            setResourcesLoaded(true); // 设置资源加载完成的状态
        })
        .catch(console.error);
    }, []);

    useEffect(() => {
        if (isResourcesLoaded) {
            // 当所有资源加载完成后，加载 memos.js
            const script = document.createElement('script');
            script.src = '/js/memos.js';
            script.async = true;
            document.body.appendChild(script);
            return () => {
                // 组件卸载时移除script
                document.body.removeChild(script);
            };
        }
    }, [isResourcesLoaded]); // 依赖于资源加载状态
    
    return (
        <section id="main" className="container">
						{/* 可以按需修改这里显示的标题和统计文本 */}
            {/* <h2>回到生活中去</h2> */}
            {/* <div className="total">瞎逼逼了 <span id="total">0</span> 次</div> */}
            <blockquote id="tag-filter" className="filter">
                <div id="tags"></div>
            </blockquote>

            <div id="memos" className="memos">
                {/* Memos Container */}
            </div>
        </section>
    );
};

export default BlogMemos;