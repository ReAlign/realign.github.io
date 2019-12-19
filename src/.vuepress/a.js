const wrap = (render) => (...args) => {
    var a = args[0][args[1]].content;
    return render.apply(this, args)
        .replace('</pre>', '<div class="copyToClipboard" data-a="' + a + '" onclick="AAA.a(this)"><i class="far fa-clipboard"></i><span>Copy</span></div></pre>')
}

const copy = (md) => {
    md.renderer.rules.code_block = wrap(md.renderer.rules.code_block);
    md.renderer.rules.fence = wrap(md.renderer.rules.fence)
    // console.log('__a__');
    // console.log(Object.keys(md.block.ruler));
    // md.renderer.rules.fence = md.renderer.rules.code_block = function (tokens, idx, options, env, slf) {
    //     var token = tokens[idx];

    //     return  '<pre' + slf.renderAttrs(token) + '><code></code><div class="copyToClipboard" data-aaa="' + tokens[idx].content + '">Copy</div></pre>\n';
    // };
};

module.exports = copy;