(function($) {

  $.fn.jOrgChart = function(options) {
    var opts = $.extend({}, $.fn.jOrgChart.defaults, options);
    var $appendTo = $(opts.chartElement);

    // build the tree
    $this = $(this);
    var $container = $("<div class='" + opts.chartClass + "'/>");
    if($this.is("ul")) {
      buildNode($this.find("li:first"), $container, 0, opts);
    }
    else if($this.is("li")) {
      buildNode($this, $container, 0, opts);
    }
    $appendTo.append($container);

  };

  // Option defaults
  $.fn.jOrgChart.defaults = {
    chartElement : 'body',
    depth      : -1,
    chartClass : "jOrgChart",
    dragAndDrop: false
  };

  var nodeCount = 0;
  // Method that recursively builds the tree
  function buildNode($node, $appendTo, level, opts) {
    var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
    var $tbody = $("<tbody/>");

    // Construct the node container(s)
    var $nodeRow = $("<tr/>").addClass("node-cells");
    var $nodeCell = $("<td/>").addClass("node-cell").attr("rowspan", 2);
    var $childNodes = $node.children("ul:first").children("li");
    var $nodeDiv;

    if($childNodes.length > 1) {
      $nodeCell.attr("rowspan", $childNodes.length * 2);
    }
    // Draw the node
    // 获取节点内容
    var $nodeContent = $node.clone()
                            .children("ul,li")
                            .remove()
                            .end()
                            .html();
//  
      //Increaments the node count which is used to link the source list and the org chart
    nodeCount++;
    $node.data("tree-node", nodeCount);
    $nodeDiv = $("<div>").addClass("node")
                                     .data("tree-node", nodeCount)
                                     .append($nodeContent);

    // Expand and contract nodes
    if ($childNodes.length > 0) {
      $nodeDiv.click(function() {
          var $this = $(this);
          //查找祖元素
          var $tr = $this.closest("tr");

          if($tr.hasClass('contracted')){//显示
            $this.css('cursor','n-resize');
            $tr.removeClass('contracted').addClass('expanded');
            $tr.nextAll("tr").show();
            $this.closest("td").nextAll("td").show();
          }else{//隐藏
            $this.closest("td").nextAll("td").hide();
            $this.css('cursor','s-resize');
            $tr.removeClass('expanded').addClass('contracted');
            $tr.nextAll("tr").hide();
          }
        });
    }

    $nodeCell.append($nodeDiv);
    $nodeRow.append($nodeCell);
    $tbody.append($nodeRow);

    if($childNodes.length > 0) {
      // if it can be expanded then change the cursor
      $nodeDiv.css('cursor','n-resize');

      // recurse until leaves found (-1) or to the level specified
      if(opts.depth == -1 || (level+1 < opts.depth)) {
        //创建行数
        for(var i = 0;i<$childNodes.length*2-1;i++){
            var $downLineRow =  $("<tr/>");
            $tbody.append($downLineRow);
        }
        //单元格
        var $downLineCell = $("<td/>").attr("rowspan", $childNodes.length*2);
        $tbody.find("tr:first").append($downLineCell);
        // 引导线
        var $downLine = $("<div></div>").addClass("line down");
        $downLineCell.append($downLine);
        $tbody.append($downLineRow);
        //组合分割线
        for(var i = 0;i<$childNodes.length*2;i++){
            if(i%2==0){
                var $down = $("<td>&nbsp;</td>").addClass("line right downTd");
                $tbody.find("tr").eq(i).append($down);
            }else{
                var $top = $("<td>&nbsp;</td>").addClass("line right top");
                $tbody.find("tr").eq(i).append($top);
            }
        }

        //去除右边的边框线
        $tbody.find("tr").eq($childNodes.length*2-1).find("td:first").removeClass("right");
        $tbody.find("tr").eq(0).find("td:last").removeClass("right");
         //增加子元素
        for(var i = 0;i<$childNodes.length;i++){
          var $td = $("<td class='node-container' />");
          $td.attr("rowspan", 2);
          //递归生成
          buildNode($($childNodes[i]), $td, level+1, opts);
          //插入元素
          $tbody.children("tr").eq(i*2).append($td);  

        }
      }
    }
    $table.append($tbody);
    $appendTo.append($table);

  };

})(jQuery);