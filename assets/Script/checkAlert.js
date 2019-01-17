var checkAlert = {
    _checkAlert: null,
    _title: null,
    _btnTrashbin: null,  //扔进垃圾桶
    _btnGround: null,   //扔在地上
    _btnTrashbinLabel:null,
    _btnGroundLabel:null,
    _transhbinCallback: null,  //扔在垃圾桶回调
    _groundCallback: null,  //随地乱扔回调
    _animSpeed: 0.3
};

checkAlert.show = function (titleString,trashbinString,groundString,trashbinCallback,groundCallback,animSpeed){
    //引用
    var self = this;

    //判断
    if(checkAlert._checkAlert !=undefined) return;

    checkAlert._animSpeed = animSpeed ? animSpeed : checkAlert._animSpeed;

    //加载prefab创建
    cc.loader.loadRes("checkAlert",cc.Prefab, function (error,prefab){

        if (error) {
            cc.error(error);
            return;
        }

        //实例
        var alert = cc.instantiate(prefab);

        //alert 持有
        checkAlert._checkAlert = alert;

         // 动画 
         var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
         var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
         self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(checkAlert._animSpeed, 255), cc.scaleTo(checkAlert._animSpeed, 1.0)), cbFadeIn);
         self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(checkAlert._animSpeed, 0), cc.scaleTo(checkAlert._animSpeed, 2.0)), cbFadeOut);
 
         // 获取子节点
         checkAlert._title = cc.find("alertNodes/title",alert).getComponent(cc.Label);
         checkAlert._btnTrashbin = cc.find("alertNodes/trashbin",alert);
         checkAlert._btnGround = cc.find("alertNodes/ground",alert);
         checkAlert._btnTrashbinLabel = cc.find("alertNodes/trashbin/Label",alert).getComponent(cc.Label);
         checkAlert._btnGroundLabel = cc.find("alertNodes/ground/Label",alert).getComponent(cc.Label);

          // 添加点击事件
        checkAlert._btnTrashbin.on('click', self.onTranshbinClicked, self);
        checkAlert._btnGround.on('click', self.onGroundClicked, self);

        // 父视图
        checkAlert._checkAlert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(titleString,trashbinString,groundString,trashbinCallback,groundCallback,animSpeed);

    });

// 参数

    self.configAlert = function (titleString,trashbinString,groundString,trashbinCallback,groundCallback,animSpeed) {

        // 回调
        checkAlert._transhbinCallback = trashbinCallback;
        checkAlert._groundCallback = groundCallback;

        // 内容
        checkAlert._btnTrashbinLabel.string = trashbinString;
        checkAlert._btnGroundLabel.string = groundString;
        checkAlert._title.string = titleString;

    };

    
    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(checkAlert._checkAlert, true);
        checkAlert._checkAlert.position = cc.p(0, 0);
        checkAlert._checkAlert.setScale(2);
        checkAlert._checkAlert.opacity = 0;
        checkAlert._checkAlert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(checkAlert._checkAlert, true);
        checkAlert._checkAlert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(checkAlert._checkAlert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onTranshbinClicked = function(event) {
        if(event.target.name == "trashbin"){
            if(self._transhbinCallback){
                self._transhbinCallback();
            }
        }
        self.startFadeOut();
    }
    self.onGroundClicked = function(event) {
        if(event.target.name == "ground"){
            if(self._groundCallback){
                self._groundCallback();
            }
        }
        self.startFadeOut();
    }
    
 // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
 self.onDestory = function () {
    checkAlert._checkAlert.destroy();
    _title= null,
    _btnTrashbin= null,  //扔进垃圾桶
    _btnGround= null,   //扔在地上
    _btnTrashbinLabel=null,
    _btnGroundLabel=null,
    _transhbinCallback= null,  //扔在垃圾桶回调
    _groundCallback= null,  //随地乱扔回调
    _animSpeed= 0.3
};
}