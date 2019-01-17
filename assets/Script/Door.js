
cc.Class({
    extends: cc.Component,




    properties: {
        _noHeadBackground:null,

       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this._noHeadBackground = cc.find("Canvas/bg");
        this._noHeadBackground.active = false;
      
     
    },

    start:function () {

    },



    showWarnAlertText: function () {
     
        if(Index.isEnter){

            cc.director.loadScene("Check");
            console.log("转换场景");
            //转换场景
        }else{
            Alert.show("警告","身份识别失败",function(){
                console.log("123421312311");
            });
        }
    
    },

    showHeadAlert:function(){
        if(Index.isEnter){
            Index.score += 0;
        }else{
            Index.score += 5;
            Alert.show("恭喜","获得头套",function(){
                console.log("123421312311");
            });
        }

        Index.isEnter = true;
       
        console.log(Index.score);
        this._noHeadBackground.active = true;
    }


    // update (dt) {},
});
