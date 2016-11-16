$(function () {
    var $selectArea = $('select[id="select-area"]')
    var $selectDevice = $('select[id="select-device"]'); 

    alert(document.cookie);
    $("#addDevices").on("click", 
    function () {
        $.ajax({
            url: "http://lingfeng.me/api/createDevice",
            dataType: "json",
            data:{"deviceid":$selectDevice.val() ,"devicename":$("#nickname").val()},
            type: "GET",    
            headers: {'Cookie' : document.cookie },
            success: function (data) {
                var deviceCDK =data.deviceCDK;
                
                $.ajax({
                    url: "http://lingfeng.me/api/createDevice",
                    dataType: "json",
                    data:[{"cdk":deviceCDK ,"local":$selectArea.val()}],
                    type: "GET",
                    // xhrFields: {
                    //     withCredentials: true
                    // },                    
                    headers: {'Cookie' : document.cookie },
                    success: function (data) {
                        $selectArea.append(
                            "<div class='areas' ><button type='button' class='close'>&times;</button><div><h4>厨房</h4><div class='device'>灯：开 <button>开/关</button></div></div></div>");                         
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("XMLHttpRequest: "+XMLHttpRequest);
                        alert("textStatus: "+textStatus);
                        alert("errorThrown: "+errorThrown);        
                    }
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("XMLHttpRequest: "+XMLHttpRequest);
                alert("textStatus: "+textStatus);
                alert("errorThrown: "+errorThrown);        
            }
        });
    });
    selectLoad();

    

function selectLoad(){
    
    $selectArea.empty();
    $selectDevice.empty();

//查询区域 接口
    $.ajax({
        url: "http://lingfeng.me/api/queryLocal",
        dataType: "json",
        type: "GET",
        success: function (data) {
    $selectArea.empty();
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
        url: "http://lingfeng.me/api/querySmartDevice",
        dataType: "json",
        type: "GET",
        success: function (data) {
            var appendStr ="";
            var param = data.param;
            if (data.state == 200){
                for(var i=0 ;i<param.length;i++){
                    $selectDevice.append("<option value='"+param[i].id+"'>"+param[i].name+"</option>"); 
                }
                
            }
        },
        error: function(data) {     
        }
    });


};

});


