/* Indavideó és Facebook Videó Picture in Picture */
function isScrolledIntoView(i){var e=$(window).scrollTop(),t=e+$(window).height(),a=$(i).offset().top;return a+$(i).height()<=t+$(i).height()/1.5&&a>=e-$(i).height()/1.5+43}$(document).ready(function(){function i(i){$.each(n,function(e,t){e!==i&&t.pauseVideo()}),$.each(a,function(e,t){e!==i&&t.pause()}),$.each(d,function(e,t){e!==i&&t.pauseVideo()}),targetpipContainer=$("#"+i).closest(".pipContainer"),targetpipContainer.hasClass("active")||($(".pipContainer").removeClass("active show playing"),$(".pipContainer").find(".video").removeAttr("style"),$(".pipContainer").find(".pip").removeAttr("style"),targetpipContainer.addClass("active")),targetpipContainer.addClass("playing")}function e(i){targetpipContainer=$("#"+i).closest(".pipContainer"),targetpipContainer.removeClass("playing"),targetpipContainer.hasClass("show")||targetpipContainer.removeClass("active")}var t=$("body").hasClass("cimlap"),a=new Object,n=new Object,d=new Object;Common.fixIndaIframes(),$(".fb-video, iframe[src*='indavideo.hu'], iframe[src*='youtube.com']").wrap("<div class='pipContainer'><div class='pip'><div class='video'></div></div><div class='video_placeholder'></div></div>"),$("[data-pipvideo-external]").wrap("<div class='pipContainer pipContainer_static active playing'><div class='pip'><div class='video'></div></div></div>").css({width:function(){return $(this).data("pipvideo-width")},height:function(){return $(this).data("pipvideo-height")}}),t?$("article.embedded-video").each(function(){url=$(this).find("h1.cikkcim>a").attr("href").replace(/(\/x.php\?id=).*(&)/,"/x.php?id=pipvideo&"),cim=$(this).find("h1.cikkcim>a").text(),$(this).find(".pipContainer .pip").prepend("<h1 class='title'><a href='"+url+"'>"+cim+"</a><div class='close'></div></h1>")}):$(".pipContainer .pip").prepend("<div class='close'></div>"),$(".pipContainer .pip .close").click(function(){pipContainerToClose=$(this).closest(".pipContainer"),pipContainerToClose.removeClass("active show"),pipContainerToClose.find(".video").removeAttr("style"),pipContainerToClose.find(".pip").removeAttr("style"),frameId=pipContainerToClose.find(".fb-video, iframe[src*='indavideo.hu'], iframe[src*='youtube.com']").first().attr("id"),a[frameId]&&a[frameId].pause(),n[frameId]&&n[frameId].pauseVideo(),d[frameId]&&d[frameId].pauseVideo()}),$(".fb-video").attr("id",function(i){return"fbvideos-"+i}),$("iframe[src*='youtube.com']").attr("id",function(i){return"ytvideos-"+i}),$.getScript("https://assets.indavideo.hu/js/src/ivApi.js",function(){$("iframe[src*='indavideo.hu']").each(function(){id=$(this).attr("id"),n[id]=new IndavideoControl(id,this,"ivc")}),ivlisteners=new IndavideoControl,ivlisteners.addEventListener("onPlayStartedEvent",function(e){i(e.frameid)},!1),ivlisteners.addEventListener("onResumedEvent",function(e){i(e.frameid)},!1),ivlisteners.addEventListener("onPausedEvent",function(i){e(i.frameid)},!1),ivlisteners.addEventListener("onPlayEndedEvent",function(i){e(i.frameid)},!1)}),Common.fbEnsureInit(function(){FB.Event.subscribe("xfbml.ready",function(t){"video"===t.type&&(a[t.id]=t.instance,a[t.id].subscribe("startedPlaying",function(e){i(t.id)}),a[t.id].subscribe("finishedPlaying",function(i){e(t.id)}),a[t.id].subscribe("paused",function(i){e(t.id)}))})}),$.getScript("https://www.youtube.com/iframe_api"),window.onYouTubeIframeAPIReady=function(){var t=[];$("iframe[src*='youtube.com']").each(function(){id=$(this).attr("id"),d[id]=new YT.Player(id,{events:{onStateChange:function(a){frame_id=$(a.target.getIframe()).attr("id"),a.data!=YT.PlayerState.PLAYING||t[frame_id]?a.data!=YT.PlayerState.PAUSED&&a.data!=YT.PlayerState.ENDED||(t[frame_id]=!1,e(frame_id)):(t[frame_id]=!0,i(frame_id))}}})})},$(window).scroll(_.throttle(function(){if($(".pipContainer.active").length&&!(window.innerWidth<=700)){var i=$(".pipContainer.active").first(),e=i.find("[data-pipvideo-external]").data("pipvideo-external");if(isScrolledIntoView(e?$("#"+e):i)){if(!i.hasClass("show")||i.hasClass("fadeOut"))return;i.addClass("fadeOut"),i.find(".pip").fadeTo(200,0,function(){i.removeClass("show"+(i.hasClass("playing")?"":" active")),i.find(".video").css({width:"",height:""}),i.find(".pip").css({width:""}),i.css({height:""}),i.find(".pip").fadeTo(200,1,function(){i.removeClass("fadeOut")})})}else{if(i.hasClass("show")||i.hasClass("fadeIn"))return;size={width:i.find(".video>*").width(),height:i.find(".video>*").height()},ratio=400/Math.max(size.width,size.height),i.addClass("fadeIn"),i.find(".pip").fadeTo(100,0,function(){i.find(".video_placeholder").length&&i.css("height",size.height).find(".video_placeholder").css({width:size.width,height:size.height}),i.find(".video").css({width:size.width*ratio,height:size.height*ratio}),i.find(".pip").css({width:size.width*ratio}),i.addClass("show");for(var e=i.find(".title a");$(e).outerHeight()>72;)$(e).text(function(i,e){return e.replace(/\W*\s(\S)*$/,"...")});i.find(".pip").fadeTo(200,1,function(){i.removeClass("fadeIn")})})}}},600))});