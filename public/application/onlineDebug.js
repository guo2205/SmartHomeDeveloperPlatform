$(function () {
    var $selectArea = $('select[id="select-area"]')
    var $selectDevice = $('select[id="select-device"]'); 
    
    selectLoad();

    $("#loginLabel").on("click", 
    function () {
        var deviceid = $();
        $.ajax({
            url:"http://47.89.23.37:3000/api/createDevice",
            dataType: "json",
            data:{"deviceid":$selectDevice.val(),"nickname":$('nickname').val()},
            type: "GET",
            success: function (data) {
                var devCDK = data.deviceCDK
                
                $.ajax({
                    url:"http://47.89.23.37:3000/api/createDevice",
                    dataType: "json",
                    data:[{"cdk":devCDK,"local":$selectArea.val()}],
                    type: "GET",
                    success: function (data) {
                        alert($('select option:selected').text() );
                        $('#devices_area').append(
                            "<div class='areas' ><button type='button' class='close'>&times;</button><div><h4>厨房</h4><div class='device'>灯：开 <button>开/关</button></div></div></div>");
                    },
                    error: function(data) {     
                    }
                });
            },
            error: function(data) {     
            }
        });

function selectLoad(){    
    $selectArea.empty();
    $selectDevice.empty();

//查询区域 接口
    $.ajax({
        url: "http://47.89.23.37:3000/api/queryLocal",
        dataType: "json",
        type: "GET",
        success: function (data) {
            var appendStr ="";
            var param = data.param;
            if (data.state == 200){
                for(var i=0 ;i<param.length;i++){
                    $selectArea.append("<option value='"+param[i].id+"'>"+param[i].name+"</option>"); 
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("XMLHttpRequest: "+XMLHttpRequest);
            alert("textStatus: "+textStatus);
            alert("errorThrown: "+errorThrown);        
        }
    });

//查询设备接口
    $.ajax({
        url: "http://47.89.23.37:3000/api/querySmartDevice",
        dataType: "json",
        type: "GET",
        success: function (data) {
            alert(data.param);
            var param = data.param;
            if (data.state == 200){
                for(var i=0 ;i<param.length;i++){
                    $selectDevice .append("<option value='"+param[i].id+"'>"+param[i].name+"</option>"); 
                }

            }
        },
        error: function(data) {     
        }
    });


};
});



