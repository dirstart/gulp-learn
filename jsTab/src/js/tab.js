! function($) {
	var Tab = function(tab) {
		var _this_ = this;
		//保存单个tab组件
		this.tab = tab;
		//默认配置参数
		this.config = {
			// 	用来定义触发类型-click - mouseover
			triggerType: "mouseover",
			// 用来定义切换效果-直接切换-或者淡入淡出效果
			effect: "default",
			// 默认展示第几个Tab
			invoke: 1,
			// 用来定义是否自动切换
			auto: false
		};
		//如果配置参数存在，就扩展掉默认的参数
		if (this.getConfig()) {
			$.extend(this.config,this.getConfig());
		}

		// 保存tab标签列表,将对象引入进来
		this.tabItem = this.tab.find("ul.tab-nav li");
		// console.log(this.tabItem);
		this.contentItem = this.tab.find("div.tab-content-wrap div.tab-content-item");
		// console.log(this.contentItem);
		// 保存配置参数
		var config = this.config;

		if(config.triggerType==="click"){
			this.tabItem.bind(config.triggerType,function(){
				_this_.Invoke($(this));
			});
		}else if (config.triggerType==="mouseover" && config.triggerType!="click"){
			this.tabItem.mouseover(function(){
				_this_.Invoke($(this));
			});
		}

		// 接下来写自动切换功能
		if(config.auto){
			this.timer=null;
			this.loop=0;
			this.autoPlay();

			this.tab.hover(function(){
				console.log("鼠标在上面");
				// ！！！！！！！！！！！！！！！！！！！！1
				// 出现了一个问题，当triggerType为mouseover的时候，默认也触发了hover()!!!:???
				window.clearInterval(_this_.timer);
			},function(){
				console.log("鼠标离开了");
				_this_.autoPlay();
			});
		}


		// 设置默认显示第几个
		if(config.invoke>1){
			this.Invoke(this.tabItem.eq(config.invoke-1));
		}
	};

	Tab.prototype = {
		//获取配置参数
		getConfig: function() {
			var config = this.tab.attr("data-config");
			//做一个配置参数的判断
			if (config && config != "") {
				return $.parseJSON(config);
			}else {
				return null;
			}
		},
		Invoke:function(currentTab){
			var _this_=this;
			// 1.加上class表示当前状态 2.切换内容(效果显示)

			var index=currentTab.index();//存储索引值来传给tab-content
			currentTab.addClass("actived").siblings().removeClass("actived");
			var effect=this.config.effect;
			var contentItem=this.contentItem;
			if(effect==="default" || effect!="fade"){
				contentItem.eq(index).addClass("current").siblings().removeClass("current");
			}else if(effect==="fade"){
				contentItem.eq(index).fadeIn().siblings().fadeOut();
			}

			if(this.config.auto){
				this.loop=index;
			}
		},
		autoPlay:function(){
			var _this_ = this,
				tabItem = this.tabItem,   //tab nav
				tabLength = tabItem.size(),//tab个数
				config = this.config;
			this.timer=window.setInterval(function(){
				_this_.loop++;
				if(_this_.loop>=tabLength){
					_this_.loop=0;
				}
				tabItem.eq(_this_.loop).trigger(config.triggerType);
			},config.auto );
		}
	};

	Tab.Init=function(tabs){
		var _this_=this;
		tabs.each(function(){
			new _this_($(this));
		});

	};


	window.Tab = Tab;
}(jQuery);