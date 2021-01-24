
import Vue from 'vue'
// 注册一个全局自定义指令 `v-scroll`
Vue.directive('scroll', {
    update: function (el, binding) {
        if (binding.value !== binding.oldValue) {
            // let dragDiv = el;
            el.style.left = `0px`
            el.style.top = `0px`
            el.style.transform = `scale(1)`;
            el.childNodes[0].style.transform = `rotate(0deg)`;
        }
    },
    // 当绑定元素插入到 DOM 中
    // 指令的定义
    inserted: function (el) {
        let dragDiv = el;
        function getStyle(ele) {
            var style = null;
            if (window.getComputedStyle) {
                style = window.getComputedStyle(ele, null);
            } else {
                style = ele.currentStyle;
            }
            return style;
        }
        function handle(delta) {
            var s = delta + ": ";
            if (delta < 0) {
                return true
            }
            else {
                return false
            }
        }

        function wheel(event) {
            var delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } else if (event.detail) {
                delta = -event.detail / 3;
            }
            console.log(delta)
            if (delta)
                return handle(delta);
        }
        let zoom = 0

        dragDiv.addEventListener("mousewheel", function (e) {
            // console.log('最开始时', originLeft, originTop)
            // console.log('transform-origin', getStyle(dragDiv)['transformOrigin'])
            // console.log('transform-origin', dragDiv.style.transformOrigin)
            var scale = dragDiv.style.transform;
            var scaleNum = +scale.slice(6).slice(0, -1);
            // console.log(e)
            // console.log(e.deltaY)
            console.log(wheel(e))
            if (wheel(e)) {
                if (scaleNum <= 1) return;
                // console.log(zoom)
                // console.log(parseInt(getStyle(dragDiv)["left"]))
                // console.log(parseInt(getStyle(dragDiv)["left"]) / zoom)
                dragDiv.style.left = `${parseInt(getStyle(dragDiv)["left"]) - parseInt(getStyle(dragDiv)["left"]) / zoom}px`
                dragDiv.style.top = `${parseInt(getStyle(dragDiv)["top"]) - parseInt(getStyle(dragDiv)["top"]) / zoom}px`
                // console.log(parseInt(getStyle(dragDiv)["left"]))
                zoom--
                // const leftOffset = parseInt(getStyle(dragDiv)["left"]);
                // const topOffset = parseInt(getStyle(dragDiv)["top"]);
                // dragDiv.style.transformOrigin = `${originLeft - leftOffset}px ${originTop - topOffset}px`
                // console.log('缩小时', getStyle(dragDiv)['transformOrigin'])
                dragDiv.style.transform = `scale(${scaleNum - 0.05})`;
            } else {
                // dragDiv.style.transformOrigin = `${originLeft}px ${originTop}px`
                // console.log('放大时', getStyle(dragDiv)['transformOrigin'])
                zoom++
                // console.log(zoom)
                dragDiv.style.transform = `scale(${scaleNum + 0.05})`;
            }
            // var direction = e.deltaY > 0 ? "down" : "up";
            return false;
        });
        // /\((\d+)\)/.exec(str)
        // 鼠标按下事件 处理程序
        let putDown = function (event) {
            // 去除图片默认事件
            event.preventDefault()
            const parentHeight = parseInt(
                getStyle(dragDiv.parentNode)["height"]
            ); //父元素的高
            const parentWidth = parseInt(getStyle(dragDiv.parentNode)["width"]); // 当前元素的宽
            // 边界判断
            //当前元素的高
            const currentHeight = parseInt(getStyle(dragDiv)["height"]);
            const currentWidth = parseInt(getStyle(dragDiv)["width"]); // 当前元素的宽
            // const originLeft = parseInt(getStyle(dragDiv.parentNode)["width"]) / 2; // 缩放中心点
            // const originTop = parseInt(getStyle(dragDiv.parentNode)["height"]) / 2; // 缩放中心点
            dragDiv.style.marginLeft = 0
            dragDiv.style.cursor = "pointer";
            let offsetX = parseInt(dragDiv.style.left); // 获取当前的x轴距离
            let offsetY = parseInt(dragDiv.style.top); // 获取当前的y轴距离
            let innerX = event.clientX - offsetX; // 获取鼠标在方块内的x轴距
            let innerY = event.clientY - offsetY; // 获取鼠标在方块内的y轴距
            // console.log(event)
            // console.log('event.clientX:'+event.clientX)
            // console.log('event.clientY:'+event.clientY)
            // console.log(offsetX, offsetY, innerX, innerY)
            // 按住鼠标时为div添加一个border
            // dragDiv.style.borderStyle = "solid";
            // dragDiv.style.borderColor = "yellow";
            // dragDiv.style.borderWidth = "3px";
            // // 鼠标移动的时候不停的修改div的left和top值
            document.onmousemove = function (event) {
                dragDiv.style.left = event.clientX - innerX + "px";
                dragDiv.style.top = event.clientY - innerY + "px";
                // 当前元素缩放后的高
                const scaleHeight = dragDiv.getBoundingClientRect().height;
                // 当前元素缩放后的宽
                const scaleWidth = dragDiv.getBoundingClientRect().width;
                //因为缩放是等比缩放，所以改变的宽高差要/2
                const changeValueL = (currentWidth - scaleWidth) / 2;
                const changeValueT = (currentHeight - scaleHeight) / 2;
                // console.log('currentHeight',currentHeight)
                // console.log('scaleHeight',scaleHeight)
                // console.log('changeValueT',changeValueT)
                // 实际高度与缩放后高度差/2 得到   父级高度-实际高度
                const changeValueB = (Math.abs((currentHeight - scaleHeight)) / 2) + (parentHeight - currentHeight);
                const changeValueR = (Math.abs((currentWidth - scaleWidth)) / 2) + (parentWidth - currentWidth);
                // console.log('(Math.abs((currentWidth - scaleWidth)) / 2)', (Math.abs((currentWidth - scaleWidth)) / 2))
                // console.log('(parentWidth - currentWidth)', (parentWidth - currentWidth))
                const leftVal = currentWidth - scaleWidth; // 最左边的边界值
                const topVal = currentHeight - scaleHeight; // 最上边的边界值
                const left = parseInt(getStyle(dragDiv)["left"]);
                const top = parseInt(getStyle(dragDiv)["top"]);
                // 左
                if (left <= (leftVal - changeValueL)) {
                    // console.log('左 ', left, '<= ', leftVal - changeValueL)
                    dragDiv.style.left = `${leftVal - changeValueL}px`;
                }

                // 右
                if (left >= (changeValueR)) {
                    // console.log('右', left, '>=', changeValueR)
                    dragDiv.style.left = `${changeValueR}px`;
                }
                // console.log('上:',topVal)
                // console.log('上:',changeValueT)
                // console.log('上:',topVal - changeValueT)
                // console.log('下:',changeValueB)
                // 上
                if (top <= (topVal - changeValueT)) {
                    // console.log('上', top, '<= ', topVal - changeValueT)
                    dragDiv.style.top = `${topVal - changeValueT}px`;
                }
                // 下
                if (top >= (changeValueB)) {
                    // console.log('下', top, ' >= ', changeValueB)
                    dragDiv.style.top = `${changeValueB}px`;
                }
            };
            // 鼠标抬起时，清除绑定在文档上的mousemove和mouseup事件
            // 否则鼠标抬起后还可以继续拖拽方块
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                // 清除border
                dragDiv.style.borderStyle = "";
                dragDiv.style.borderColor = "";
                dragDiv.style.borderWidth = "";
            };
        };
        el.addEventListener("mousedown", putDown, false);
    }
})