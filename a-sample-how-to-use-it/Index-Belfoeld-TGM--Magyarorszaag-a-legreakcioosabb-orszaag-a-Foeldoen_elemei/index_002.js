!function(){window.Comment={author_name_pool:{},call_stack:[],data:{},comment_list:{},comment_list_ids:[],currentcomment_data:{},jq:{},pager_store:{},htmlcontent_store:{},pages_loaded:[],status:{analytics_enabled:!1,hidden:!0,history_enabled:!1,in_history:!1,initialized:!1,is_running:!1,loaded:!1,loading:!1,new_comments:0,need_to_load:0,on_last_page:!1,rendering:!1,view:"paged"},urlbase:"",addHistory:function(){if(!Comment.status.in_history){var t=Common.parsed_url.full_path;return Comment.status.hidden||("all"===Comment.status.view&&(Common.parsed_url.hash="#all-comments",t+=Common.parsed_url.hash),"paged"===Comment.status.view&&(Common.parsed_url.hash.match(/#c\d+/g)||Common.parsed_url.hash&&Common.parsed_url.hash.match(/#comments?/g)||(Common.parsed_url.hash="#comments"),t+="?cp="+Comment.status.current_page+Common.parsed_url.hash)),Comment.status.history_enabled&&document.location.href!=t&&history.pushState({content_mode:"comments",url:t},"Kommentek: "+Comment.status.current_page+"/"+Comment.data.pages+" oldal",t),Comment}},afterRender:function(){for(Comment.status.rendering=!1,Comment.status.loaded=!0,$(".pagination .show-all, .pagination .paginate").attr("data-view",Comment.status.view).text(Comment.data.config.dictionary[Comment.status.view]),$("*").css("cursor",""),Comment.handleList("show").addHistory();Comment.call_stack.length;)Comment.call_stack.shift()();Comment.jq.container.toggleClass(Comment.status.old_mode+"-comments",!1).toggleClass(Comment.status.view+"-comments",!0),Comment.status.on_last_page?Comment.status.is_running||Comment.runner():Comment.stopRunner()},alertNew:function(){if(!Comment.status.new_comments)return Comment.jq.load_button.removeClass("active");Comment.status.analytics_enabled&&Analytics.add("send",{hitType:"event",eventCategory:"comments",eventAction:"new alert",eventLabel:"show"}),Comment.jq.load_button_counter.text(Comment.status.new_comments),Comment.jq.load_button.addClass("active")},bind:{cikk:function(){Comment.jq.container.on("click",".first-line a, .second-line a",function(t){t.preventDefault();var e=$(this),n=e.attr("data-page");Common.parsed_url.hash="#"+e.attr("href").split("#").pop(),n&&Comment.setCurrentPage(n);var m=e.hasClass(".previous")?"prev":e.hasClass(".next")?"next":"number";Comment.status.analytics_enabled&&Analytics.add("send",{hitType:"event",eventCategory:"comments",eventAction:"pager",eventLabel:m})}).on("click",".show-all, .paginate",function(t){t.preventDefault();var e=$(this).attr("data-view");e=e&&"paged"!=e?"paged":"all",Comment.setView(e),Comment.status.analytics_enabled&&Analytics.add("send",{hitType:"event",eventCategory:"comments",eventAction:"pager",eventLabel:e.replace("paged","number")})}).on("click",".commentsubmit .submit",function(t){t.preventDefault(),Comment.status.on_last_page||Comment.setCurrentPage(Comment.data.pages);var e=$(".commentform"),n={renewed:Comment.data.renewed};e.find("input[type=hidden], textarea").each(function(t,e){n[e.name]=e.value}),n.szoveg.trim().length&&($(".commentform *").attr("disabled","disabled"),Comment.status.analytics_enabled&&Analytics.add("send",{hitType:"event",eventCategory:"comments",eventAction:"new comment"}),$.ajax({data:n,dataType:"json",success:function(t){if($(".commentform *").attr("disabled",null),t&&t.comment_list){$(".commentform textarea").val(""),"#comment"!==Common.parsed_url.hash&&(Common.parsed_url.hash="#comment"),Comment.call_stack.push(Comment.scrollToHash);var e="all"+Comment.data.renewed;void 0!==Comment.htmlcontent_store[e]&&delete Comment.htmlcontent_store[e],Comment.data.renewed=t.renewed,Comment.process(t,null,-1)}"inforadio.hu"==document.domain&&($(".question-has-been-sent").hasClass("isActive")||$(".question-has-been-sent").addClass("isActive"))},type:"post",url:e.attr("action")}))}),$(".add-comment-button").on("click",function(t){t.preventDefault(),Comment.jq.container.hasClass("active")||Comment.jq.comment_toggler.trigger("click"),Common.parsed_url.hash="#comment",Comment.status.history_enabled?history.pushState(null,null,Common.parsed_url.hash):document.location.hash=Common.parsed_url.hash,Comment.scrollToHash()}),Comment.jq.comment_toggler.on("click",function(t){t.preventDefault(),Comment.status.analytics_enabled&&Analytics.add("send",{hitType:"event",eventCategory:"comments",eventAction:Comment.jq.container.hasClass("active")?"hide":"show"}),Comment.setCurrentPage(null,!0)}),Comment.jq.load_button.on("click",function(t){t.preventDefault(),Comment.call_stack.push(Comment.scrollToHash),Comment.status.analytics_enabled&&Analytics.add("send",{hitType:"event",eventCategory:"comments",eventAction:"new alert",eventLabel:"click"}),Comment.showNewComments(),Comment.status.new_comments=0,Comment.alertNew()})},rovat:function(){}},checkUrl:function(t){null!==Common.parsed_url.hash&&void 0!==Common.parsed_url.hash||(Common.parsed_url.hash=""),Common.parsed_url.hash.match(/#subscribe-feed?/g)||(void 0===Common.parsed_url.params.cp||isNaN(Common.parsed_url.params.cp)?Common.parsed_url.hash&&Common.parsed_url.hash.length>1&&!Common.parsed_url.hash.match(/#(all-|)c(\d+|omments?)/g)&&(Common.parsed_url.hash="#comments",Comment.status.history_enabled?history.pushState(null,null,Common.parsed_url.hash):document.location.hash=Common.parsed_url.hash):(Comment.status.current_page=parseInt(Common.parsed_url.params.cp),Comment.status.on_last_page=Comment.status.current_page==Math.max(1,Comment.data.pages),Common.parsed_url.hash&&1!=Common.parsed_url.hash.length&&"#all-comments"!==Common.parsed_url.hash||(Common.parsed_url.hash="#comments")),Common.parsed_url.hash&&Common.parsed_url.hash.match(/#(all-|)c(\d+|omments?)/g)?Common.parsed_url.hash.match(/#c\d+/g)?$.ajax({data:{v:(new Date).getTime()},dataType:"html",success:function(t){isNaN(t)||Comment.setCurrentPage(t,!0)},url:Common.parsed_url.full_path+"commentpage/"+Common.parsed_url.hash.replace("#c","")}):Comment.status.loaded?(Comment.status.in_history=!0,"#all-comments"===Common.parsed_url.hash?Comment.setView("all"):Comment.setCurrentPage(null,!1)):("#all-comments"===Common.parsed_url.hash&&(Comment.status.view="all"),$(window).on("load",function(){Comment.jq.comment_toggler.trigger("click")})):(Comment.jq.container.toggleClass("active",!1),Comment.handleList("hide")))},getClassString:function(t,e){var n=[];if(-1!==Comment.data.user_aliases.indexOf(parseInt(t))&&n.push("owncomment"),void 0!==e)switch(e){case 1:n.push("deleted");break;case 2:n.push("to-be-approved")}return n.length?' class="'+n.join(" ")+'"':""},handleList:function(t){Comment.status.hidden="show"!==t;var e=0,n=0;return"show"===t&&($("#comment_list_container > *").each(function(){"SCRIPT"!==this.tagName&&(n+=$(this).outerHeight(!0))}),e=0),Comment.jq.comment_list.animate({height:n,"padding-top":e},384),Comment},init:function(t){if(!Comment.status.initialized&&"object"==typeof t&&"object"==typeof t.config){Comment.status.initialized=!0,Comment.status.analytics_enabled="object"==typeof Analytics&&null!==Analytics,Comment.data=t,Comment.data.config.frequency||(Comment.data.config.frequency=3e4),Comment.jq={comment_counter:$(".comments-button span").first(),comment_list:$("#comment_list_container"),comment_toggler:$(".comments-button"),container:$(".comments-container"),list:$("#comment_list"),load_button:$(".new-comments-button"),load_button_counter:$(".new-comments-button span")},Comment.data.template=Comment.jq.list.html().trim().replace(/(^<\!--|-->$)/g,""),Comment.status.current_page=Comment.data.pages,Comment.status.on_last_page=!0,(Comment.status.history_enabled=window.history&&"function"==typeof history.pushState)&&$(window).on("popstate",function(t){history.state&&history.state.url&&"comments"==history.state.content_mode&&(Common.parseUrl(),Comment.checkUrl())}),Comment.comment_list_ids=new Array(Comment.data.count);for(var e=0;e<Comment.data.count;e++)Comment.comment_list_ids[e]=0;Comment.urlbase=Common.parsed_url.host+Common.parsed_url.user+"assets/comments/"+Comment.data.config.content+"/",$("body").hasClass("rovat")?Comment.bind.rovat():Comment.bind.cikk(),Comment.checkUrl()}},loadPage:function(t,e){void 0!==e&&Comment.call_stack.push(e),Comment.pages_loaded.push(t),++Comment.status.need_to_load,$.ajax({data:{v:(new Date).getTime()},dataType:"json",success:function(e){--Comment.status.need_to_load,Comment.process(e,t)},url:Comment.urlbase+(t==Comment.data.pages?"latest":("000"+t).substr(-4))+".json"})},loadPager:function(t,e){void 0===Comment.pager_store[t]?$.ajax({data:{v:(new Date).getTime()},dataType:"html",success:function(n){Comment.pager_store[t]=n,void 0!==e&&t==Comment.status.current_page&&e(t)},url:Comment.urlbase+"pager/"+("000"+t).substr(-4)+".html"}):void 0!==e&&t==Comment.status.current_page&&e(t)},morphToBottomPager:function(t){return(""+t).replace(/#comments/g,"#comment")},process:function(t,e,n){n=void 0!==n&&n;var m=[];for(var o in t.comment_list)t.comment_list[o].szoveg=t.comment_list[o].szoveg.replace(/\n/g," <br />").replace(/<a ?(.*?)href="([^"]+)"([^>]+)>([^<]+)<\/a>/g,' <a $1 href="$2" $3 rel="nofollow" title="$2">$4</a>'),void 0===Comment.comment_list[o]?m.push(o):delete t.comment_list[o];"all"!==Comment.status.view&&delete Comment.htmlcontent_store[Comment.status.view+Comment.status.current_page],m.unshift(m.length*!n),m.unshift(n?Comment.comment_list_ids.length:(e-1)*Comment.data.config.page_size),Array.prototype.splice.apply(Comment.comment_list_ids,m),$.extend(Comment.comment_list,t.comment_list),$.extend(Comment.author_name_pool,t.author_name_pool),Comment.status.need_to_load||n||Comment.render(),n&&(n<0?Comment.showNewComments():Comment.alertNew())},render:function(){if(!Comment.status.rendering){Comment.data.count=Comment.comment_list_ids.length,Comment.status.rendering=!0;var html="",store_key=Comment.status.view+("all"!==Comment.status.view?Comment.status.current_page:Comment.data.renewed);if(void 0!==Comment.htmlcontent_store[store_key])html=Comment.htmlcontent_store[store_key];else{var start=0,end=Comment.data.count;"paged"===Comment.status.view&&(end=Math.min(Comment.data.count,end-(Comment.data.pages-Comment.status.current_page)*Comment.data.config.page_size),start=Math.max(0,end-Comment.data.config.page_size));for(var index=start;index<end;index++)Comment.currentcomment_time=Comment.comment_list_ids[index],Comment.currentcomment_data=Comment.comment_list[Comment.currentcomment_time],html+=Comment.data.template.replace(/(\{\{(.*?)\}\})/g,function(match,str){return eval(str)});Math.abs(end-start)||(html='<li class="emptylist">'+Comment.data.config.dictionary.no_comments_found+"</li>"),"all"!==Comment.status.view&&Comment.status.current_page===Comment.data.pages||(Comment.htmlcontent_store[store_key]=html)}Comment.jq.list.html(html),Comment.syncPager()}},renderPager:function(){$("#comment_list_container .pagination").remove(),Comment.jq.list.before(Comment.pager_store[Comment.status.current_page]).after(Comment.morphToBottomPager(Comment.pager_store[Comment.status.current_page])),Comment.afterRender()},runner:function(){Comment.status.is_running=!0,Comment.status.runner_number=setInterval(function(){$.ajax({data:{v:(new Date).getTime()},dataType:"html",success:function(t){if(!(isNaN(t)||Comment.data.renewed>=parseInt(t))){var e="all"+Comment.data.renewed;void 0!==Comment.htmlcontent_store[e]&&delete Comment.htmlcontent_store[e],Comment.data.renewed=parseInt(t),$.ajax({data:{v:(new Date).getTime()},dataType:"json",success:Comment.runnerTick,url:Comment.urlbase+"latest.json"})}},type:"post",url:Comment.urlbase+"renewed.time"})},Comment.data.config.frequency)},runnerTick:function(t){if("object"==typeof t&&"object"==typeof t.comment_list){var e=Comment.status.new_comments;for(var n in t.comment_list)void 0===Comment.comment_list[n]&&++Comment.status.new_comments;e!=Comment.status.new_comments?Comment.process(t,null,!0):Comment.alertNew()}},scrollToHash:function(){if(Common.parsed_url.hash.length){var t=$(Common.parsed_url.hash.replace(/^#all-/g,"#"));"#comment"===Common.parsed_url.hash&&void 0===t[0]&&(t=$("#ip_form"));var e=t.offset().top;"#comment"===Common.parsed_url.hash?e+=t.outerHeight()-$(window).innerHeight():e-=$("#_iph_fixed-header").outerHeight();var n=Math.abs($(document).scrollTop()-e),m=Math.min(768,n/2);"#comment"===Common.parsed_url.hash&&(m=0),n&&(Comment.status.in_history&&($("body").scrollTop(e),Comment.status.in_history=!1),$("body").animate({scrollTop:e+"px"},m))}},setCurrentPage:function(t,e){if(void 0!==e)if(e){var n=Comment.jq.container.hasClass("active");if(Comment.jq.container.toggleClass("active"),n)return Comment.handleList("hide").addHistory().stopRunner()}else Comment.jq.container.toggleClass("active",!0);$("*").css("cursor","wait"),isNaN(t)||!t?Comment.status.current_page||(Comment.status.current_page=Comment.data.pages):Comment.status.current_page=parseInt(t),Comment.call_stack.push(Comment.scrollToHash);var m=1,o=Comment.data.pages;"paged"===Comment.status.view&&(Comment.status.current_page=Math.max(1,Math.min(Comment.data.pages,Comment.status.current_page)),Comment.status.on_last_page=Comment.status.current_page==Math.max(1,Comment.data.pages),m=Math.max(1,Comment.status.current_page-1),o=Math.min(Comment.data.pages,Comment.status.current_page+1)),"all"===Comment.status.view&&(Comment.status.on_last_page=!0);for(var a=0,s=m;s<=o;s++)-1===Comment.pages_loaded.indexOf(s)&&(Comment.loadPage(s),++a);a||Comment.render()},setView:function(t){var e=["paged","all"];Comment.status.old_mode=Comment.status.view,Comment.status.view=e[Math.max(e.indexOf(t),0)],Comment.status.view!==Comment.status.old_mode&&Comment.setCurrentPage(null,!1)},showNewComments:function(){var t=Math.ceil(Comment.comment_list_ids.length/Comment.data.config.page_size),e=Comment.data.pages;if(Comment.status.current_page=Comment.data.pages=t,Comment.data.count=Comment.comment_list_ids.length,Comment.syncCounter(),t>e&&Comment.data.count>Comment.data.config.page_size){Comment.pager_store={};for(var n=e+1;n<=t;n++)Comment.pages_loaded.push(n),Comment.loadPager(n,Comment.renderPager)}Comment.render()},stopRunner:function(){return Comment.status.is_running=!1,clearInterval(Comment.status.runner_number)},syncCounter:function(){Comment.jq.comment_counter.text(Comment.data.count)},syncPager:function(){if(Comment.data.pages<2)return Comment.afterRender();for(var t=Math.max(1,Comment.status.current_page-1);t<=Math.min(Comment.data.pages,Comment.status.current_page+1);t++)void 0===Comment.pager_store[t]?Comment.loadPager(t,Comment.renderPager):t==Comment.status.current_page&&Comment.renderPager(t)}}}();