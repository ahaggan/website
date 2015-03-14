var subTables = $("table").find("table");
var headerColumns = $("table:first").find("tr:first").find("th:not(:first)");
var widths = new Array();

for (i = 0; i < 9; i++){
     widths.push($(headerColumns.get(i)).width());
}

$.each(subTables.find("tr"), function(){
    var row = this;
    var rowCells = $(row).find("td");
    
    for (x = 0; x < 9; x++){
         var td = rowCells.get(x);
        
        if ($(td).width() > widths[x]){
               widths[x] =  $(td).width();
        }
    }
});
       
$.each(headerColumns, function(index){
    $(this).width(widths[index] + "px");
});

$.each(subTables.find("tr"), function(){
    var row = this;
    var rowCells = $(row).find("td");
    
    $.each(rowCells, function(index){
        $(this).width(widths[index] + "px");
    });
});