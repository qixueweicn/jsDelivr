$(document).ready(function(){
		$.fn.gamelist();
	var temp = $.cookie('useropens');
	
	if (!temp && typeof(temp)!="undefined" && temp!=0)
	{
		$.fn.pop_window()	
	}
	
})
//弹窗
$.fn.pop_window=function(){
	var pop_window=$("#pop_window"),
		pop_window_zz	=	$("#pop_window_zz"),
		bodyobj			=	$("html,body"),
		time			=	5000,
		time2			=	5
		pop_window.hide()
		pop_window_zz.hide()
		if (pop_window.length>0)
		{
			time=parseInt(pop_window.data("opentime"))	
			time2=parseInt(pop_window.data("opentime2"))	
			if (typeof(time)!="undefined" && typeof(time)=="number")
			{
					setTimeout(function(){
							pop_window.fadeIn()
							pop_window_zz.show()
							bodyobj.css("overflow","hidden");
					},time)
			}
		}
		
		pop_window.on("click",".pop_window_btnclose",function(){
							pop_window.fadeOut()
							pop_window_zz.hide()
							bodyobj.css("overflow-y","auto");
		})
		if (typeof(time)!="undefined" && typeof(time)=="number" && time2!=0)
		{
			//设置5分钟弹一次
			$.cookie('useropens',"1",{ expires:time2/24/60,path:'/'}); 
		}
}
jQuery.cookie = function(name, value, options) { 
if (typeof value != 'undefined') { // name and value given, set cookie 
options = options || {}; 
if (value === null) { 
value = ''; 
options.expires = -1; 
} 
var expires = ''; 
if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) { 
var date; 
if (typeof options.expires == 'number') { 
date = new Date(); 
date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); 
} else { 
date = options.expires; 
} 
expires = '; expires=' + date.toUTCString(); 
} 
var path = options.path ? '; path=' + (options.path) : ''; 
var domain = options.domain ? '; domain=' + (options.domain) : ''; 
var secure = options.secure ? '; secure' : ''; 
document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); 
} else { 
var cookieValue = null; 
if (document.cookie && document.cookie != '') { 
var cookies = document.cookie.split(';'); 
for (var i = 0; i < cookies.length; i++) { 
var cookie = jQuery.trim(cookies[i]); 
if (cookie.substring(0, name.length + 1) == (name + '=')) { 
cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
break; 
} 
} 
} 
return cookieValue; 
} 
};


//浮动头部
		$.fn.floatheader=function(config){
			var self=$(this);
			if (self.length==0) return false;
				
			var default_config={
				spaces		:true,
				time		:500,
				delaytime	:100,
				class_change:".change",
				"top"		:	150
			}
			
			$.extend(default_config,config)
			
			var win_width		=	$(window).width(),
				 self_h			=	self.outerHeight(),
				 time_delay		=	null,
				 spaces_name	=	self.attr("id")+"_",
				 time			=	default_config.time,
				 delaytime		=	default_config.delaytime
				if ($("#"+spaces_name).length==0 && default_config.spaces==true){self.before("<span id='"+spaces_name+"' style='display:none;width:100%;height:"+self_h+"px'></span>");}
			$(window).unbind("scroll")
			$(window).bind("scroll",function(){
				clearTimeout(time_delay)
				time_delay = setTimeout(function(){
							var scrolltop=$(document).scrollTop();	
							if (scrolltop>default_config.top)
							{
								if (self.css("position")!="fixed")
								{
									if (default_config.spaces==true)
									{$("#"+spaces_name).css({"display":"block"})}
									
									
									if (typeof (default_config.class_change)!="undefined")
									{
										self.addClass(default_config.class_change)	
									}
									self.css({"z-index":50000,"position":"fixed","left":"0","top":"0","width":"100%","top":-(self_h+10)}).stop(true,false).animate({"top":"0"},time)
								}
							}
							else
							{
								if (self.css("position")=="fixed")
								{
									self.stop(true,false)
									.animate({"top":-(self_h+10)},0,function(){
										
										$("#"+spaces_name).css({"display":"none"});
										$(this).css({"position":"relative","top":0});
										if (typeof (default_config.class_change)!="undefined")
										{
											self.removeClass(default_config.class_change)	
										}
									}
									)
								}
							}
					
				}, delaytime);
			})
		}


$.fn.gamelist=function(){
	var time_delay	=	null,
		time_delay2	=	null,
		GameList	=	$("#GameList"),
		top			=	$("#top"),
		btnmore		=	$("#more");
		
		if (top.length===0){
		$('#loading_header').load('top/top.html',function(){
					GameList	=	$("#GameList");
					top			=	$("#top");
					btnmore		=	$("#more");
		
					if (typeof($.fn.hover_animate)!="undefined"){
							$("#GameList ul li").find(".photo").append('<span class="border_top"></span><span class="border_right"></span><span class="border_bottom"></span><span class="border_left"></span>');	
							$("#GameList ul li").hover_animate(
										{
										  aniobj:
										  [
											 
											  [
												  "self",					//应用对象
												  "",//初始CSS
												  "top:-12px;",		//mouseenter动画CSS
												  "top:0;",			//mouseleave动画css
												  "200",					//mouseenter 时间
												  "200"						//mouseleave 时间
											  ],[
												  ".border_top",					//应用对象
												  "",//初始CSS
												  "width:100%;left:0;",		//mouseenter动画CSS
												  "width:0px;left:50%;",			//mouseleave动画css
												  "600",					//mouseenter 时间
												  "300"						//mouseleave 时间
											  ],
											  [
												  ".border_bottom",					//应用对象
												  "",//初始CSS
												  "width:100%;left:0;",		//mouseenter动画CSS
												  "width:0px;left:50%;",			//mouseleave动画css
												  "600",					//mouseenter 时间
												  "300"						//mouseleave 时间
											  ],
											  [
												  ".border_left",					//应用对象
												  "",//初始CSS
												  "height:100%;top:0;",		//mouseenter动画CSS
												  "height:0px;top:50%;",			//mouseleave动画css
												  "600",					//mouseenter 时间
												  "300"						//mouseleave 时间
											  ],
											  [
												  ".border_right",					//应用对象
												  "",//初始CSS
												  "height:100%;top:0;",		//mouseenter动画CSS
												  "height:0px;top:50%;",			//mouseleave动画css
												  "600",					//mouseenter 时间
												  "300"						//mouseleave 时间
											  ]
										  ]
										}
										
									)
					}
	
			})
		}
		
			/*悬停效果*/
			$('body').on("mouseenter",btnmore.selector,function(){
					var self=$(this)
					clearTimeout(time_delay)	
					time_delay=setTimeout(function(){
								if(!self.is(":animated"))
								{
									self.addClass("hovermore");
									GameList.css({"display":"block","opacity":0}).animate({"opacity":1,"height":"372px"},{duration:800,easing:'easeInOutExpo'});
								}
					},100)
				
			}).on('mouseleave',btnmore.selector,function(){
				   clearTimeout(time_delay)	;
				   time_delay2	=	setTimeout(function(){
							var self=$(this)
							if (self.is(".hovermore"))
							{		
									GameList.animate({"height":"0"},300);
									self.removeClass("hovermore");
							}
					  })
			})
		
			$("body").on("mouseenter",GameList.selector,function(){
					clearTimeout(time_delay2);
					GameList.bind("mouseleave",function(){
						btnmore.removeClass("hovermore");
						$(this).stop(true,false).animate({"height":"0"},300);
					});
			});
	
};

