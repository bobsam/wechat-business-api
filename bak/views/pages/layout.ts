export default function(html, store){
    return `
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="renderer" content="webkit">
        <meta http-equiv="x-dns-prefetch-control" content="on">
        <title>微商系统</title>
    </head>
    <body>
        <div id="app">${html}</div>
    </body>
</html>
<script src="/js/bundle.js"></script>
<script src="/js/vendor.js"></script>
    `
}

  