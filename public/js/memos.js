// Lazyload Start
(function () {
    function logElementEvent(eventName, element) {
        console.log(Date.now(), eventName, element.getAttribute("data-src"));
    }

    var callback_enter = function (element) {
        logElementEvent("馃攽 ENTERED", element);
    };
    var callback_exit = function (element) {
        logElementEvent("馃毆 EXITED", element);
    };
    var callback_loading = function (element) {
        logElementEvent("鈱� LOADING", element);
    };
    var callback_loaded = function (element) {
        logElementEvent("馃憤 LOADED", element);
    };
    var callback_error = function (element) {
        logElementEvent("馃拃 ERROR", element);
    };
    var callback_finish = function () {
        logElementEvent("鉁旓笍 FINISHED", document.documentElement);
    };
    var callback_cancel = function (element) {
        logElementEvent("馃敟 CANCEL", element);
    };

    var ll = new LazyLoad({
        class_applied: "lz-applied",
        class_loading: "lz-loading",
        class_loaded: "lz-loaded",
        class_error: "lz-error",
        class_entered: "lz-entered",
        class_exited: "lz-exited",
        // Assign the callbacks defined above
        callback_enter: callback_enter,
        callback_exit: callback_exit,
        callback_cancel: callback_cancel,
        callback_loading: callback_loading,
        callback_loaded: callback_loaded,
        callback_error: callback_error,
        callback_finish: callback_finish
    });
})();
// Lazyload End

// Memos Start
var memo = {
    host: 'https://memos.wanchengfei.com',
    limit: '10',
    creatorId: '1',
    domId: '#memos',
    username: '博客名',
    name: '用户名'
}
if (typeof (memos) !== "undefined") {
    for (var key in memos) {
        if (memos[key]) {
            memo[key] = memos[key];
        }
    }
}

var limit = memo.limit
var memos = memo.host.replace(/\/$/, '')
var memoUrl = memos + "/api/v1/memo?creatorId=" + memo.creatorId + "&rowStatus=NORMAL"
var page = 1,
    offset = 0,
    nextLength = 0,
    nextDom = '';
var tag='';
var btnRemove = 0
var memoDom = document.querySelector(memo.domId);
var load = '<button class="load-btn button-load">鍔姏鍔犺浇涓€︹€�</button>'
if (memoDom) {
    memoDom.insertAdjacentHTML('afterend', load);
    getFirstList() // 棣栨鍔犺浇鏁版嵁
    // 娣诲姞 button 浜嬩欢鐩戝惉鍣�
    btnRemove = 0;
    var btn = document.querySelector("button.button-load");
    btn.addEventListener("click", function () {
        btn.textContent = '鍔姏鍔犺浇涓€︹€�';
        updateHTMl(nextDom)
        if (nextLength < limit) { // 杩斿洖鏁版嵁鏉℃暟灏忎簬闄愬埗鏉℃暟锛岄殣钘�
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
        getNextList()
    });
}

function getFirstList() {
    var memoUrl_first = memoUrl + "&limit=" + limit;
    fetch(memoUrl_first).then(res => res.json()).then(resdata => {
        updateHTMl(resdata)
        var nowLength = resdata.length
        if (nowLength < limit) { // 杩斿洖鏁版嵁鏉℃暟灏忎簬 limit 鍒欑洿鎺ョЩ闄も€滃姞杞芥洿澶氣€濇寜閽紝涓柇棰勫姞杞�
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
        page++
        offset = limit * (page - 1)
        getNextList()
    });
}
// 棰勫姞杞戒笅涓€椤垫暟鎹�
function getNextList() {
    if (tag){
        var memoUrl_next = memoUrl + "&limit=" + limit + "&offset=" + offset + "&tag=" + tag;
    } else {
        var memoUrl_next = memoUrl + "&limit=" + limit + "&offset=" + offset;
    }
    fetch(memoUrl_next).then(res => res.json()).then(resdata => {
        nextDom = resdata
        nextLength = nextDom.length
        page++
        offset = limit * (page - 1)
        if (nextLength < 1) { // 杩斿洖鏁版嵁鏉℃暟涓� 0 锛岄殣钘�
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
    })
}

// 鏍囩閫夋嫨

document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() === 'a' && target.getAttribute('href').startsWith('#')) {    
        event.preventDefault();
        tag = target.getAttribute('href').substring(1); // 鑾峰彇鏍囩鍚�
        if (btnRemove) {    // 濡傛灉 botton 琚� remove
            btnRemove = 0;
            memoDom.insertAdjacentHTML('afterend', load);
            // 娣诲姞 button 浜嬩欢鐩戝惉鍣�
            var btn = document.querySelector("button.button-load");
            btn.addEventListener("click", function () {
                btn.textContent = '鍔姏鍔犺浇涓€︹€�';
                updateHTMl(nextDom)
                if (nextLength < limit) { // 杩斿洖鏁版嵁鏉℃暟灏忎簬闄愬埗鏉℃暟锛岄殣钘�
                    document.querySelector("button.button-load").remove()
                    btnRemove = 1
                    return
                }
                getNextList()
            });
            
        }        
        getTagFirstList();
        var filterElem = document.getElementById('tag-filter');
        filterElem.style.display = 'block';    // 鏄剧ず杩囨护鍣�
        var tags = document.getElementById('tags');
        var tagresult = `Filter: <span class='tag-span'><a rel='noopener noreferrer' href=''>#${tag}</a></span>`
        tags.innerHTML = tagresult;
        scrollTo(0,0);    // 鍥炲埌椤堕儴
    }
});

function getTagFirstList() {
    page = 1;
    offset = 0;
    nextLength = 0;
    nextDom = '';
    memoDom.innerHTML = "";
    var memoUrl_tag = memoUrl + "&limit=" + limit + "&tag=" + tag;
    fetch(memoUrl_tag).then(res => res.json()).then(resdata => {
        updateHTMl(resdata);
        var nowLength = resdata.length
        if (nowLength < limit) { // 杩斿洖鏁版嵁鏉℃暟灏忎簬 limit 鍒欑洿鎺ョЩ闄も€滃姞杞芥洿澶氣€濇寜閽紝涓柇棰勫姞杞�
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
        page++
        offset = limit * (page - 1)
        getNextList()
    });
}

// 鏍囩閫夋嫨 end

// 鎻掑叆 html
function updateHTMl(data) {
    var memoResult = "", resultAll = "";

    // 瑙ｆ瀽 TAG 鏍囩锛屾坊鍔犳牱寮�
    const TAG_REG = /#([^\s#]+?)(?=\s|$)/g;

    // 瑙ｆ瀽 BiliBili
    const BILIBILI_REG = /<a\shref="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?">.*<\/a>/g;
    // 瑙ｆ瀽缃戞槗浜戦煶涔�
    const NETEASE_MUSIC_REG = /<a\shref="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g;
    // 瑙ｆ瀽 QQ 闊充箰
    const QQMUSIC_REG = /<a\shref="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
    // 瑙ｆ瀽鑵捐瑙嗛
    const QQVIDEO_REG = /<a\shref="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
    // 瑙ｆ瀽 Spotify
    const SPOTIFY_REG = /<a\shref="https:\/\/open\.spotify\.com\/(track|album)\/([\s\S]+)".*?>.*<\/a>/g;
    // 瑙ｆ瀽浼橀叿瑙嗛
    const YOUKU_REG = /<a\shref="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;
    //瑙ｆ瀽 Youtube
    const YOUTUBE_REG = /<a\shref="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;

    // Marked Options
    marked.setOptions({
        breaks: true,
        smartypants: true,
        langPrefix: 'language-',
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
    });

    // Memos Content
    for (var i = 0; i < data.length; i++) {
        var memoContREG = data[i].content
            .replace(TAG_REG, "<span class='tag-span'><a rel='noopener noreferrer' href='#$1'>#$1</a></span>")

        // For CJK language users
        // 鐢� PanguJS 鑷姩澶勭悊涓嫳鏂囨贩鍚堟帓鐗�
        // 鍦� index.html 寮曞叆 JS锛�<script type="text/javascript" src="assets/js/pangu.min.js?v=4.0.7"></script>
        // 鎶婁笅闈㈢殑 memoContREG = marked.parse(memoContREG) 鏀逛负锛歮emoContREG = marked.parse(pangu.spacing(memoContREG))

        memoContREG = marked.parse(memoContREG)
            .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true' style='position:absolute;height:100%;width:100%;'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")
            .replace(NETEASE_MUSIC_REG, "<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>")
            .replace(QQMUSIC_REG, "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>")
            .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
            .replace(SPOTIFY_REG, "<div class='spotify-wrapper'><iframe style='border-radius:12px' src='https://open.spotify.com/embed/$1/$2?utm_source=generator&theme=0' width='100%' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe></div>")
            .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")

        // 瑙ｆ瀽鍐呯疆璧勬簮鏂囦欢
        if (data[i].resourceList && data[i].resourceList.length > 0) {
            var resourceList = data[i].resourceList;
            var imgUrl = '', resUrl = '', resImgLength = 0;
            for (var j = 0; j < resourceList.length; j++) {
                var resType = resourceList[j].type.slice(0, 5);
                var resexlink = resourceList[j].externalLink;
                var resLink = ''
                if (resexlink) {
                    resLink = resexlink
                } else {
                    fileId = resourceList[j].publicId || resourceList[j].name
                    resLink = memos+'/o/r/'+fileId
                }
                if (resType == 'image') {
                    imgUrl += '<div class="resimg"><img loading="lazy" src="' + resLink + '"/></div>'
                    resImgLength = resImgLength + 1
                }
                if (resType !== 'image') {
                    resUrl += '<a target="_blank" rel="noreferrer" href="' + resLink + '">' + resourceList[j].filename + '</a>'
                }
            }
            if (imgUrl) {
                var resImgGrid = ""
                if (resImgLength !== 1) { var resImgGrid = "grid grid-" + resImgLength }
                memoContREG += '<div class="resource-wrapper "><div class="images-wrapper">' + imgUrl + '</div></div>'
            }
            if (resUrl) {
                memoContREG += '<div class="resource-wrapper "><p class="datasource">' + resUrl + '</p></div>'
            }
        }
        memoResult += '<li class="timeline"><div class="memos__content"><div class="memos__text"><div class="memos__userinfo"><div>' + memo.name + '</div><div><svg viewBox="0 0 24 24" aria-label="璁よ瘉璐﹀彿" class="memos__verify"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg></div><div class="memos__id">@' + memo.username + '</div></div><p>' + memoContREG + '</p></div><div class="memos__meta"><small class="memos__date">' + moment(data[i].createdTs * 1000).twitter() + ' 鈥� 鏉ヨ嚜銆�<a href="' + memo.host + 'm/' + data[i].id + '" target="_blank">Memos</a>銆�</small></div></div></li>'
    }
    var memoBefore = '<ul class="">'
    var memoAfter = '</ul>'
    resultAll = memoBefore + memoResult + memoAfter
    memoDom.insertAdjacentHTML('beforeend', resultAll);
    //鍙栨秷杩欒娉ㄩ噴瑙ｆ瀽璞嗙摚鐢靛奖鍜岃眴鐡ｉ槄璇�
    // fetchDB()
    document.querySelector('button.button-load').textContent = '鍔犺浇鏇村';
    // 鏇存柊DOM鍚庤皟鐢╤ighlightAll杩涜浠ｇ爜楂樹寒
    if (window.hljs) {
        window.hljs.highlightAll();
    }
}
// Memos End

// 瑙ｆ瀽璞嗙摚 Start
// 鏂囩珷鍐呮樉绀鸿眴鐡ｆ潯鐩� https://immmmm.com/post-show-douban-item/
// 瑙ｆ瀽璞嗙摚蹇呴』瑕丄PI锛岃鎵炬湅鍙嬭鏉冮檺锛屾垨鑷繁鎸� https://github.com/eallion/douban-api-rs 杩欎釜鏋惰 API锛岄潪甯哥畝鍗曪紝璧勬簮娑堣€楀緢灏�
// 宸插唴缃牱寮忥紝淇敼 API 鍗冲彲浣跨敤
function fetchDB() {
    var dbAPI = "https://api.example.com/";  // 淇敼涓鸿嚜宸辩殑 API
    var dbA = document.querySelectorAll(".timeline a[href*='douban.com/subject/']:not([rel='noreferrer'])") || '';
    if (dbA) {
        for (var i = 0; i < dbA.length; i++) {
            _this = dbA[i]
            var dbHref = _this.href
            var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
            var db_type = dbHref.replace(db_reg, "$1");
            var db_id = dbHref.replace(db_reg, "$2").toString();
            if (db_type == 'movie') {
                var this_item = 'movie' + db_id;
                var url = dbAPI + "movies/" + db_id;
                if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
                    fetch(url).then(res => res.json()).then(data => {
                        let fetch_item = 'movies' + data.sid;
                        let fetch_href = "https://movie.douban.com/subject/" + data.sid + "/"
                        localStorage.setItem(fetch_item, JSON.stringify(data));
                        movieShow(fetch_href, fetch_item)
                    });
                } else {
                    movieShow(dbHref, this_item)
                }
            } else if (db_type == 'book') {
                var this_item = 'book' + db_id;
                var url = dbAPI + "v2/book/id/" + db_id;
                if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
                    fetch(url).then(res => res.json()).then(data => {
                        let fetch_item = 'book' + data.id;
                        let fetch_href = "https://book.douban.com/subject/" + data.id + "/"
                        localStorage.setItem(fetch_item, JSON.stringify(data));
                        bookShow(fetch_href, fetch_item)
                    });
                } else {
                    bookShow(dbHref, this_item)
                }
            }
        }// for end
    }
}

function movieShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>銆�" + data.name + "銆�</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>瀵兼紨锛�" + data.director + " / 绫诲瀷锛�" + data.genre + " / " + data.year + "</time><section class='post-preview--excerpt'>" + data.intro.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.img + "></div>"
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']"
    var qs_dom = document.querySelector(qs_href)
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html
}

function bookShow(fetch_href, fetch_item) {
    var storage = localStorage.getItem(fetch_item);
    var data = JSON.parse(storage);
    var db_star = Math.ceil(data.rating.average);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' rel='noreferrer' href='" + fetch_href + "'>銆�" + data.title + "銆�</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>浣滆€咃細" + data.author + " </time><section class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.images.medium + "></div>"
    var db_div = document.createElement("div");
    var qs_href = ".timeline a[href='" + fetch_href + "']"
    var qs_dom = document.querySelector(qs_href)
    qs_dom.parentNode.replaceChild(db_div, qs_dom);
    db_div.innerHTML = db_html
}
// 瑙ｆ瀽璞嗙摚 End

// Images lightbox
window.ViewImage && ViewImage.init('.container img');

// Memos Total Start
// Get Memos total count
function getTotal() {
    var totalUrl = memos + "/api/v1/memo/stats?creatorId=" + memo.creatorId
    fetch(totalUrl).then(res => res.json()).then(resdata => {
        if (resdata) {
            var allnums = resdata.length
            var memosCount = document.getElementById('total');
            memosCount.innerHTML = allnums;
        }
    }).catch(err => {
        // Do something for an error here
    });
};
window.onload = getTotal();
// Memos Total End

// Toggle Darkmode
// const localTheme = window.localStorage && window.localStorage.getItem("theme");
// const themeToggle = document.querySelector(".theme-toggle");

// if (localTheme) {
//     document.body.classList.remove("light-theme", "dark-theme");
//     document.body.classList.add(localTheme);
// }

// themeToggle.addEventListener("click", () => {
//     const themeUndefined = !new RegExp("(dark|light)-theme").test(document.body.className);
//     const isOSDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

//     if (themeUndefined) {
//         if (isOSDark) {
//             document.body.classList.add("light-theme");
//         } else {
//             document.body.classList.add("dark-theme");
//         }
//     } else {
//         document.body.classList.toggle("light-theme");
//         document.body.classList.toggle("dark-theme");
//     }

//     window.localStorage &&
//         window.localStorage.setItem(
//             "theme",
//             document.body.classList.contains("dark-theme") ? "dark-theme" : "light-theme",
//         );
// });
// Darkmode End