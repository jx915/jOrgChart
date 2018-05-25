**预期效果**：

![自上而下](https://img-blog.csdn.net/20180524165203633?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p4OTUwOTE1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



**开发**：

插件：`jOrgChart`  
扩展：`jOrgChart-tree`
下载：[jOrgChart](https://github.com/jx915/jOrgChart)

**实操**：

`html`
```
<link rel="stylesheet" href="asset/jquery.jOrgChart.css">
<style>
a {
     text-decoration: none;
     color: #fff;
     font-size: 12px;
 }

 .jOrgChart .node {
     width: 120px;
     height: 50px;
     line-height: 50px;
     border-radius: 4px;
     margin: 0 8px;
 }
</style>
<div id='jOrgChart'></div>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="asset/jquery.jOrgChart.js"></script>
```
`javascript`
```

var data = {
    "data": [{
        "id": 1,
        "name": "企业主体信用得分",
        "pid": null,
        "childrens": [{
                "id": 2,
                "name": "企业素质",
                "pid": 1,
                "childrens": [{
                        "id": 5,
                        "name": "基本信息",
                        "pid": 2,
                        "childrens": [{
                                "id": 10,
                                "name": "企业主体信息识别",
                                "pid": 5,
                                "childrens": []
                            },
                            {
                                "id": 11,
                                "name": "企业持续注册时间",
                                "pid": 5,
                                "childrens": []
                            },
                            {
                                "id": 12,
                                "name": "注册资本",
                                "pid": 5,
                                "childrens": []
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "name": "管理认证",
                        "pid": 2,
                        "childrens": [{
                            "id": 13,
                            "name": "国际性管理认证",
                            "pid": 6,
                            "childrens": []
                        }]
                    }
                ]
            },
            {
                "id": 3,
                "name": "履约记录",
                "pid": 1,
                "childrens": [{
                        "id": 7,
                        "name": "税务执行情况",
                        "pid": 3,
                        "childrens": [{
                            "id": 14,
                            "name": "是否按时缴纳税款",
                            "pid": 7,
                            "childrens": []
                        }]
                    },
                    {
                        "id": 8,
                        "name": "网贷情况",
                        "pid": 3,
                        "childrens": [{
                            "id": 15,
                            "name": "网贷逾期",
                            "pid": 8,
                            "childrens": []
                        }]
                    }
                ]
            },
            {
                "id": 4,
                "name": "公共监督",
                "pid": 1,
                "childrens": [{
                    "id": 9,
                    "name": "行政处罚",
                    "pid": 4,
                    "childrens": [{
                        "id": 16,
                        "name": "处罚信息",
                        "pid": 9,
                        "childrens": []
                    }]
                }]
            }
        ]
    }]
}

function showall(menu_list, parent) {
    $.each(menu_list, function (index, val) {
        console.log(val);
        if (val.childrens.length > 0) {
            var li = $("<li></li>");
            li.append("<a href='javascript:void(0)' onclick=getOrgId(" + val.id + ");>" + val.name +
                "</a>").append("<ul></ul>").appendTo(parent);
            //递归显示
            showall(val.childrens, $(li).children().eq(1));
        } else {
            $("<li></li>").append("<a href='javascript:void(0)' onclick=getOrgId(" + val.id + ");>" +
                val.name + "</a>").appendTo(parent);
        }
    });

}
var showlist = $("<ul id='org' style='display:none'></ul>");
showall(data.data, showlist);
$("#jOrgChart").append(showlist);
$("#org").jOrgChart({
    chartElement: '#jOrgChart', //指定在某个dom生成jorgchart
    dragAndDrop: false //设置是否可拖动
});

function getOrgId(val) {
    console.log(val);
}
```

**效果图**：

![这里写图片描述](https://img-blog.csdn.net/20180524170321640?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p4OTUwOTE1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**细节**

在节点点击事件中会发现有显示隐藏功能，这一点的话在源码中可以找到：`jquery.jOrgChart.js`
```
if ($childNodes.length > 0) {
  $nodeDiv.click(function() {
      var $this = $(this);
      var $tr = $this.closest("tr");

      if($tr.hasClass('contracted')){
        $this.css('cursor','n-resize');
        $tr.removeClass('contracted').addClass('expanded');
        $tr.nextAll("tr").css('visibility', '');

        // Update the <li> appropriately so that if the tree redraws collapsed/non-collapsed nodes
        // maintain their appearance
        $node.removeClass('collapsed');
      }else{
        $this.css('cursor','s-resize');
        $tr.removeClass('expanded').addClass('contracted');
        $tr.nextAll("tr").css('visibility', 'hidden');

        $node.addClass('collapsed');
      }
    });
}
```

**扩展**

![从左至右](https://img-blog.csdn.net/20180524170640340?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p4OTUwOTE1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**扩展使用**：`替换其中两个文件即可`


