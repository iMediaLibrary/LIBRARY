cc.Class({
    extends: cc.Component,

    properties: {
  
    },

    // LIFE-CYCLE CALLBACKS:

 
    showWarnText: function() {
        Alert.show("提示","请出示ID卡");
    },
    showCheckInfor: function(){
        checkAlert.show("你要如何对待你的头套？","扔进垃圾桶","随地乱扔");
    }

    // update (dt) {},
});
