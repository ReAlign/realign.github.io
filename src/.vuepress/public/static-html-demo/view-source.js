// var S = {
//     hj: {
//         css: 'https://cdn.bootcss.com/highlight.js/9.15.10/styles/default.min.css',
//         js: 'https://cdn.bootcss.com/highlight.js/9.15.10/highlight.min.js'
//     },
// };
// var X = {
//     insertCss(link) {
//         var headDom = document.querySelector('head');
//         var cssDom = document.createElement('link');

//         cssDom.href = link;
//         cssDom.rel = 'stylesheet';

//         headDom.appendChild(cssDom);
//     },
//     insertJs(link, cb) {
//         var bodyDom = document.querySelector('body');
//         var jsDom = document.createElement('script');

//         jsDom.src = link;
//         jsDom.async = true;
//         jsDom.onload = function() {
//             cb && cb();
//         };

//         bodyDom.appendChild(jsDom);
//     },
// };
var E = {
    initHj() {
        var bodyDom = document.querySelector('body');
        var viewDom = document.createElement('div');
        viewDom.className = 'm-view-source-area';
        var htmlCode = document.getElementById('j-source').innerHTML;

        var preDom = document.createElement('pre');
        var codeDom = document.createElement('code');
        codeDom.className = 'html';

        var pre = htmlCode;
        codeDom.innerText = pre;
        preDom.appendChild(codeDom);
        viewDom.appendChild(preDom);
        bodyDom.appendChild(viewDom);

        console.log(hljs);
        hljs.initHighlighting();
    },
};
window.onload = function() {
    E.initHj();

    // var bodyDom = document.querySelector('body');
    // var btnDom = document.createElement('div');

    // btnDom.className = 'u-view-source-btn';

    // btnDom.onclick = function() {
    //     var x = document.getElementById('j-source');
    //     console.log(x.innerHTML);
    // };

    // bodyDom.appendChild(btnDom);
};