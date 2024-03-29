$(function () {

    let layer = layui.layer
    // 1.1 获取裁剪区域的 img 标签
    let $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 给上传按钮框绑定点击事件
    $('#btnChooseImage').click(function () {
        $('#file').click()
    })

    /* 实现裁剪区域图片的替换 */
    // 给文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        let fileList = e.target.files
        if (fileList.length === 0) {
            return
        }
        // 1. 拿到选择的文件
        let file = e.target.files[0]
        // 2. 将文件转化为路径
        let imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options)  // 重新初始化裁剪区域
    })

    /* 将裁剪后的头像上传到服务器 */
    // 为确定按钮绑定点击事件
    $('#btnUpload').click(function () {
        // 1. 拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
                //
            }
        })
    })



})

