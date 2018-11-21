try{    
    
    webConsole0('canRunAds:'+window.canRunAds);
	
	var cd = document.location.href;
	var refdomain = cd.replace('https://','').replace('http://','').replace('www.','').split('/')[0];
	var refdomaino = refdomain;
    refdomain = refdomain.split('.');
    var domain = refdomain[0] || 'sk';
	//refdomain = refdomain[refdomain.length-2]+'.'+refdomain[refdomain.length-1];
	var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /ipod|ipad|iphone/.test(userAgent),
    ipad = /ipad/.test(userAgent),
    iphone = /ipod|iphone/.test(userAgent),
    ie = /ie|edge/.test(userAgent);
    
    if(ie){
		//throw "no IE or EDGE";
    }
    
	var deviceType = 'web';
    if(typeof(eplayaDeviceType)=='string' || typeof(eplayaDeviceType)=='number'){
		var eplayaDeviceType = parseInt(eplayaDeviceType);
		if(eplayaDeviceType>0){
			deviceType = 'mobile';
		}
	}
	
	var blockedDataSources = ['zoznam','no-ads'];
	var blockedSources = ['adocean','zoznam.sk','webnoviny.sk','topky.sk'];
	var blockedClasses = ['player5-video'];
	var blockedYoutubeIDs = ['ZcrwBECWNOE'];
	
	var blocking = [];
	if(typeof(blockedJSON)=='string'){
		blocking = JSON.parse(window.atob(blockedJSON));
	}
	var forcing = [];
	if(typeof(forcedJSON)=='string'){
		forcing = JSON.parse(window.atob(forcedJSON));
	}
	
	if(typeof(dont_touch)=='string'){
		dont_touch = dont_touch.split(',');
		if(dont_touch.length>0){
			if(typeof(blocking['blocked_class'])=='undefined'){
				blocking['blocked_class'] = [];
			}
			blocking['blocked_class'] = blocking['blocked_class'].concat(dont_touch);	
		}
	}
	
	if(typeof(eplayaBuildCnt)=='undefined'){
		var eplayaBuildCnt = 0;
	}
    
    if(typeof(defcount)=='undefined'){
        var defcount = parseInt(Math.random()*10)>5 ? 1 : 0;
        var defcount = 0;
    }
		
	webConsole0('eplayaV5.1'); 
	
	var yt=[];
	var seekDown = false;
	var volDown = false;
	var volDownStartPixel = 0;
	var volDownStart = 0;
	var seekClick = false;
	var int;  
	var adsTimeStart = 5;
	var adsTimeLimit = 20;
	var adsWaitLimit = 20;
	var startAt = [];
	var endAt = [];
	var adsShown=[];
	var adsBuild=[];
	var adsTimeout = false;
	var seekTo = [];
	var adsCur = [];
	var adsSCur = [];
	var original=[];  
	var player=[];  
	var playerOld=[];  
	var activePlayas=[];
	var activePlayasOld=[];
	var usedPlayas=[];
	var blockedOnly=[];
	var allowedOnly=[];
	var iframedlist=['youtube.com','youtu.be','youtube-nocookie.com','jwplatform.com','youbo.iprima.cz','facebook.com','uni','overflow'];
	var iframedliste=['youtube','youtube','youtube','jwplayer','youbo','facebook','uni','overflow'];
	var sourcelist=['mp4','webm'];
	var unialowed=['liveleak.com','ceknito.sk','vimeo.com','digisport.sk'];/*digisport.sk*/
	var ifrmsettings=[];
	var youtubeapi=false;
	var globalReadyInit=false;
	var allowedkeys={27:{'name':'esc'},32:{'name':'space'},37:{'name':'left'},38:{'name':'up'},39:{'name':'right'},40:{'name':'down'},70:{'name':'fullscreen'},109:{'name':'mute'}};
	var seekHover=false;
	var end=[];  
	var mutedVolume=[];
	var lastFull=false;
	var fullChanged=false;
	var inFullscreen=false;
	var lastVol=false;
	var pausedByAds=[]; 
	var autoPlayedVideo=false;  
	var playaSettings=[];
	var qualityInterval=[];
	var allSets=[];
	var availableQ=[];
	var fullInt=false;
    var playaSubs=[];
    var subPlaying=[];
    var adsBarDefaultHeight=60;
    var controlPanelDefaultHeight=30;
    var adsCount=[];
    var videoAdsRun=[];
    var noOtherAds=[];
    var maxAdsCount2=100;
    var playCheckInterval=false;
    var playCheckIntervalNum=0;
    var lastScreenValue = [];
    var oldsourcesrc = [];
    var skiptime = 2;
    var videoskipinterval = [];
    var adsShowType = [];
    var adsShowSubType = [];
    var videoOriginType = [];
    var notedVideoView = [];
    var creative = [];
	var campaign = [];
	var adstime = [];
	var tpixel = [];
    var afterClickClass = ['MWVideoBlockPreviewImgContainer'];
    var adsClosed = 0;
    var viacna = {'sk':'viac na','cz':'více na','hu':'több itt','ro':'mai multe pe','rs':'više na','bg':'show more','pl':'show more','hr':'više na','at':'mehr hier','de':'mehr hier','en':'show more'};
    var skipText = {'sk':'Preskočiť','cz':'Přeskočit','hu':'Átugrás','ro':'Skip','rs':'Preskoči','bg':'Прескочи','pl':'skip','hr':'Preskoči','at':'Skip','de':'Skip'};
    var skipText2 = {'sk':'Presko&#269;i&#357;','cz':'P&#345;esko&#269;it','hu':'&Aacute;tugr&aacute;s','ro':'Skip','rs':'Presko&#269;i','bg':'&#1055;&#1088;&#1077;&#1089;&#1082;&#1086;&#1095;&#1080;','pl':'Skip','hr':'Presko&#269;i','at':'Skip','de':'Skip'};
    var setsListeners = [];
    var firtTimePlayed = []; 
    var noViewCount = [];
    var allowPreroll = true;
    var noPreroll = [];
    var xhrTimeout = [];
    var xhrResult = [];
    var prerollData = [];
    var defRelated = 1;
    var inHackProcess = [];
    
    if(deviceType == 'mobile'){
    	if(etargetVideoReferrer!=48800){
			allowPreroll = false;	
    	}	
    }
    
    if(typeof(allPlayas)=='undefined'){
		var allPlayas = [];
    }
    if(typeof(isPlayingPlaya)=='undefined'){
		var isPlayingPlaya = false;
    }  
    
    if(typeof(allowedPlayers)=='string'){
    	if(allowedPlayers.length>0){
    		var ap = allowedPlayers.split(',');
    		if(ap.length>0){
    			var allowed = [];
    			var blocked = [];
    			for(var k in ap){
					var cap = ap[k];
					for(var kk in iframedliste){
						var ci = iframedliste[kk];
						if(ci==cap){
							if(allowed.indexOf(kk)==-1){
								allowed.push(kk);
								allowedOnly.push(ci);	
							}	
						}else{
							if(blocked.indexOf(kk)==-1){
								blocked.push(kk);
								blockedOnly.push(ci);	
							}	
						}	
					}
				}
				if(blocked.length>0){
					blocked.sort(function(a, b){return b-a});
					for(var k in blocked){
    					var indx = blocked[k];
    					if(indx>=0){
							iframedlist.splice(indx, 1);		
							iframedliste.splice(indx, 1);		
						}
    				}
				}
			}
		}
    }
    
    if(typeof(blockedPlayers)=='string'){
    	if(blockedPlayers.length>0){
    		var ap = blockedPlayers.split(',');
    		if(ap.length>0){
    			var blocked = [];
    			for(var k in ap){
					var cap = ap[k];
					for(var kk in iframedliste){
						var ci = iframedliste[kk];
						if(ci==cap){
							if(blocked.indexOf(kk)==-1){
								blocked.push(kk);    
								blockedOnly.push(ci);	
							}
						}	
					}
    			}
    			if(blocked.length>0){
    				blocked.sort(function(a, b){return b-a});
    				for(var k in blocked){
    					var indx = blocked[k];
    					if(indx>=0){
							iframedlist.splice(indx, 1);		
							iframedliste.splice(indx, 1);		
						}
    				}
				}
			}
		}
    }
    
    if(typeof(nextVideoAfterEnd)=='undefined'){
		var nextVideoAfterEnd = 0;
    }
    
    if(typeof(etargetAfterClose)=='undefined'){
		var etargetAfterClose = 0;
    }
    
    if(typeof(eplayaAutoplay)=='undefined'){
		var eplayaAutoplay=0;
	}
	
	if(typeof(skiptext)=='undefined' || !skiptext){
		var skiptext='ads by ETARGET';
	}
    
    if(afterClickClass.length>0){
		for(var key in afterClickClass){
			if(afterClickClass[key]){
				var afterClass = afterClickClass[key];
				if(typeof(afterClass)=='string'){
					var afcobj = document.getElementsByClassName(afterClass);
					var hedear = document.getElementById('header_2');
					for(var i=0; i<afcobj.length; i++){
						afcobj[i].addEventListener('click',function(){scanall(1000)},false);
					}	
				}
			}
		}
    }
    
    /*
    if(typeof(maxAdsCount)=='number'){ 
		if(maxAdsCount!=0){
			if(maxAdsCount<0){
				maxAdsCount = 0;	
			}
			maxAdsCount2=maxAdsCount;	
		}
    }
    */
	var scanall=function(timeout){
		if(typeof(timeout)=='undefined' || !timeout) timeout = 1;
		setTimeout(function(){
			if(true){
				ifrocketloader();
				scandatadiv();
				scanhtml5();	
				scanByRules();		
				scaniframed('iframe');					
				scaniframed('embed');			
				scaniframed('object');			
				/*scanjs();*/		
				if(typeof(alreadyChecked)!='undefined'){
					alreadyChecked = true;
				}
			}	
		},timeout);			
	}
	
	var ifrocketloader = function(){
		webConsole0('if-rocket');
		var scripts = document.getElementsByTagName('script');
		var rcount = 0;
		for(var k in scripts){
			var script = scripts[k];
			if(typeof(script)=='object'){
				var rocket = script.getAttribute('data-rocketsrc');
				if(rocket){
					rcount++;	
				}
			}
		}
		webConsole0('rocket:'+rcount);
		if(rcount>0){
			return false;
		}
	}
	
	var scanByRules=function(){
		
		var ifrmact = [];
		var rules = [];
		var classes = [];
		var ids = [];
		var find = [];
		var next = [];
		var pattern = [];
		var next_find = [];
		var parent_id__prefix = [];
		var url = [];
		var posibles = [];
		var poster = [];
		var finded = [];
		
		rules['playwire'] = ['div-ids','div-data_config'];
		classes['playwire'] = 'zeus_iframe';
		ids['playwire'] = 'zeus_|NUMBER_13';
		find['playwire'] = 'src';
		next['playwire'] = 'parent-by-id-from-src';
		pattern['playwire'] = ['#id=','___pv'];
		next_find['playwire'] = 'background-image-url-from-style';
		url['playwire'] = 'https://cdn.video.playwire.com/#HOSTINGID#/videos/#ID#/#POSIBLE#';
		posibles['playwire'] = ['video-sd.mp4?hosting_id=#HOSTINGID#','video-hd.mp4?hosting_id=#HOSTINGID#'];
		poster['playwire'] = 'parent||style|backgroud-image';
		
		rules['flowplayer'] = ['div-classes'];
		classes['flowplayer'] = 'fp-playlist';
		next['flowplayer'] = 'parent-a-src';
		
		var ix=0;
		for(var k in rules){
			var ptype = k;
			finded[ptype] = [];
			var rule = rules[ptype];
			var objx = [];
			for(var kx in rule){
				var currule = rule[kx];
				if(typeof(currule)=='string'){
					currule = currule.split('-');
					var objname = currule[0];
					var objwhat = currule[1];
					
					var objs = document.getElementsByTagName(objname);
					for(k2 in objs){
						var obja = objs[k2];
						switch(objwhat){
							case 'classes':
							var curclass = classes[ptype];
							var classx = obja.className;
							if(classx==curclass){
								objx.push(obja);	
							}
							break;
							case 'ids':
							if(false){
								var curids = ids[ptype].split('|');
								var curid = curids[0];
								var posfix = curids[1];
								var objid = obja.id;
								if(typeof(objid)=='string' && typeof(curid)=='string'){
									if(objid.indexOf(curid)>=0){
										var gogo = false;
										if(finded[ptype].length>0){
											if(finded[ptype].indexOf(objid)==-1){
												gogo = true;	
											}
										}else{	
											gogo = true;	
										}
										if(gogo){
											objx.push(obja);	
											finded[ptype].push(objid);
										}
									}
								}
							}
							break;
							case 'data_config':
							if(true){
								var curids = ids[ptype].split('|');
								var curid = curids[0];
								var posfix = curids[1];
								var objid = obja.id;
								if(typeof(objid)=='string' && typeof(curid)=='string'){
									if(objid.indexOf(curid)>=0){
										var gogo = false;
										if(finded[ptype].length>0){
											if(finded[ptype].indexOf(objid)==-1){
												gogo = true;	
											}
										}else{	
											gogo = true;	
										}
										if(gogo){
											var nexto = obja.nextSibling;
											if(typeof(nexto)=='object'){
												var config = nexto.getAttribute('data-config');	
												if(typeof(config)=='string'){
													obja.setAttribute('data-src',config); 
													objx.push(obja);	
													finded[ptype].push(objid);
													
												}
											}
										}
									}
								}
							}
							break;
						}
					}
				}
			}
			for(var ko in objx){
				var obj = objx[ko];
				if(obj){
					if(next[ptype]){
						switch(next[ptype]){
							case 'parent-a-src':
								var poster = '';
								var p = obj.parentNode;
								var a = obj.firstChild;
								if(typeof(a)=='object' && typeof(p)=='object'){
									var style = p.style.cssText;
									if(typeof(style)=='string'){
										var styles = style.replace(/\s+/gi,'').replace(/http(s?):/,'').replace(/url\(["']/,'').replace(/["']\)/,'').split(/[:;]/);
										for(var sk in styles){
											var cstyle = styles[sk];
											if(cstyle=='background-image'){
												poster = styles[(parseInt(sk)+1)];
												break;	
											}
										}
									}
									var src = a.getAttribute('href');
									if(typeof(src)=='string'){
										if(src.indexOf('.mp4')>0){
											var videosettings = [];
											videosettings.t = 'html5';
											videosettings.origin = p;  
											videosettings.o = p;  
											videosettings.s = src;
											videosettings.w = p.clientWidth;
											videosettings.h = p.clientHeight;
											videosettings.p = p;
											videosettings.customcss = 'display:block;';
											if(poster.length>0){
												videosettings.poster = poster;	
											}
											ix++;
											videosettings.i = parseInt('10000'+ix); 
											videosettings.v = videosettings.i;
											videosettings.remall = true;	
											if(videosettings.v){
												videoOriginType[videosettings.i] = ptype;
												ifrmact[videosettings.v] = videosettings;
											}	
										}
									}
								}
							break;
							case 'parent-by-id-from-src':
							if(typeof(obj)=='object' && obj.constructor === Array){
								var src = obj.getAttribute('src');
								var data_src = obj.getAttribute('data-src');
								var parent = false;
								if(!src){
									if(finded[ptype].indexOf(obj.id)>=0){
										parent = obj;
									}
								}else{
									var pid = src.split(pattern[ptype][0])[1].split(pattern[ptype][1])[0];
									if(typeof(parent_id__prefix[ptype])=='string'){
										pid = parent_id__prefix[ptype]+pid;	
									}
									parent = document.getElementById(pid);
								}
								if(parent && next_find[ptype]){
									switch(next_find[ptype]){
										case 'background-image-url-from-style':
										var cont_url = [];
										if(typeof(data_src)=='string'){
											var data_src_arr = data_src.split('/');
											var video_host = data_src_arr[3];
											var video_id = data_src_arr[6];
											var videourl = url[ptype].replace('#HOSTINGID#',video_host).replace('#ID#',video_id);
											for(var k3 in posibles[ptype]){
												var posibe = posibles[ptype][k3].replace('#HOSTINGID#',video_host);	
												cont_url[k3] = videourl.replace('#POSIBLE#',posibe);
											}	
										}else{
											var style = parent.getAttribute('style').replace(/[\n\r\s]/g,'');
											if(typeof(style)=='string'){
												var bgimg = style.split('background-image:url(')[1];
												if(typeof(bgimg)=='string') bgimg = bgimg.split(')')[0];
												if(typeof(bgimg)=='string'){
													var bgimg_data = bgimg.split('/');
													var video_host = bgimg_data[3];
													var video_id = bgimg_data[5];
													var videourl = url[ptype].replace('#HOSTINGID#',video_host).replace('#ID#',video_id);
													for(var k3 in posibles[ptype]){
														var posibe = posibles[ptype][k3].replace('#HOSTINGID#',video_host);	
														cont_url[k3] = videourl.replace('#POSIBLE#',posibe);
													}
												}
											}	
										}
										if(cont_url[k3]){
											var videosettings = [];
											videosettings.t = 'html5';
											videosettings.origin = obj;  
											videosettings.o = obj;  
											videosettings.s = cont_url[0];
											videosettings.w = obj.clientWidth;
											videosettings.h = obj.clientHeight;
											videosettings.p = parent;
											ix++;
											videosettings.i = parseInt('10000'+ix); 
											videosettings.v = videosettings.i;
											videosettings.remall = true;
										}
										
										break;
									}
									if(poster[ptype]){
										var poster_data = poster[ptype].split('|');
										switch(poster_data[0]){
											case 'parent':
											if(parent){
												var obj_poster = parent.style.cssText;
												if(obj_poster){
													var back = false;
													try{
														back = obj_poster.replace(/ /g,'').split('background-image:url(')[1];
														if(back){
															back = back.split(')')[0];
															if(back){
																back = back.replace(/[\"\']/g,'');
																if(back){
																	videosettings.poster = back;		
																}
															}
														}	
													}catch(e){webConsole0(e)}
												}	
											}
											break;
										}	
									}
									if(videosettings.v){
										videoOriginType[videosettings.i] = ptype;
										ifrmact[videosettings.v] = videosettings;
									}
								}
							}
							break;
						}
					}
				}
			}
			
		}
		
		for(key in ifrmact){
			var setts = ifrmact[key];
			var hash = (setts.v+setts.t);  
			if(!usedPlayas[hash]){
				usedPlayas[hash] = 1;
				allSets[setts.i] = setts;
				activePlayas[setts.i] = setts.t;
				playaSettings[setts.i] = setts;
				replaceHTML5(setts);	   
			}
		}
		
	}

	var scanjs=function(){
		var scripts=document.getElementsByTagName('script');	
		var lkey=0;
		var ix=0;
		var ifrmact=[]; 
		for(key in scripts){
			var ifrmsettings=[];
			keyc=''+(parseInt(key)+parseInt(lkey))+'';
			var script = scripts[keyc];
			var f
			 = false;
			if(script)
				fsrc = script.src;
		    if(true){//!fsrc
	    		var scriptx = document.getElementsByTagName('script')[keyc];
	    		if(scriptx){
	    			var cont = scriptx.innerHTML;
	    			if(cont){
	    				cont = cont.replace(/(?:\r\n|\r|\n|\s|\")/g,'');
	    				var match = cont.match(/jwplayer\((\w+)\)\.setup\(\{(.+)?\}\)\;/); 
	    				if(match && match.length>0){
							ifrmsettings.t = 'jwplayer';
							ifrmsettings.o = document.getElementById(match[1]);
							ifrmsettings.p = ifrmsettings.o.parentNode
							ifrmsettings.c = match[2].replace('});','');
							ifrmsettings.s = scriptx.src;
							ifrmsettings.w = ifrmsettings.p.clientWidth;
							ifrmsettings.h = ifrmsettings.p.clientHeight;
							ix++;
							ifrmsettings.i = parseInt('100'+ix); 
							var id = match[2];
	    					id = ifrmsettings.c.split('file:');
	    					id = id[1];
	    					id = id.split(',');
	    					id = id[0];
	    					ifrmsettings.v = id.replace('});','');
	    					ifrmact[ifrmsettings.v] = ifrmsettings;
						}
					}
				}
		    }
		}
	}

	var scaniframed=function(type){  
		if(!type) type='iframe';
		var iframed=document.getElementsByTagName(type);
		var lkey=0;
		var ifrmact=[];   
		var ix=0;
		var newsrc = false;
		for(key in iframed){
            var iframe = iframed[key];
            var ifid = iframe.id;
			if((ifid&&ifid.indexOf('etarget')==-1) || !ifid){
				var oiframe = iframe;
				if(type=='embed' && typeof(iframe)=='function'){
					var newiframe = new Object();
					newiframe.src = iframe.src;
					if(typeof(iframe.getAttribute)=='function'){
						newiframe.flashvars = iframe.getAttribute('flashvars');   
					}
					if(newiframe.src){	
						if(oiframe.nodeName.toLowerCase()=='embed'){
							//return false;
							if(oiframe.parentNode.nodeName.toLowerCase()=='object'){
								if(typeof(oiframe.parentNode.parentNode)=='object'){
									newiframe.rem = oiframe.parentNode.parentNode;		
								}
							}
						}
						iframe = newiframe;
					}
					//removeElement(newiframe);
					//http://www.kajman.net/nastenka/51-prispevky/112-ako-varit-a-fotit-perfektne
				}
				if(type=='object' && typeof(iframe)=='function'){
					var newiframe = new Object();
					newiframe.src = iframe.data;
					if(newiframe.src){	
						if(oiframe.nodeName.toLowerCase()=='embed'){
							//return false;
							if(oiframe.parentNode.nodeName.toLowerCase()=='object'){
								if(typeof(oiframe.parentNode.parentNode)=='object'){
									newiframe.rem = oiframe.parentNode.parentNode;		
								}
							}
						}
						iframe = newiframe;
					}	
				} 
				if(typeof(iframe)=='object'){
					fsrc = iframe.src;
				    if(fsrc){ 
                        for(key2 in iframedlist){   
                        	var curiframedlist = iframedlist[key2];
                        	var inlist = fsrc.indexOf(curiframedlist);
							if(inlist>=0 || curiframedlist=='uni'){
								var ifrmsettings=[];
								var iframeparams = fsrc.split(/[\?\&]/);
								if(curiframedlist=='facebook.com'){
									var fburl = false;
									if(fsrc.indexOf('video.php')>0){
										webConsole0(fsrc);
										if(true){//fsrc.indexOf('10157844642270725')>0
											getFBsrc(fsrc,iframe);
										}	
									}
									continue;	
								}
								
								if(curiframedlist=='uni'){   
									if(true){
										getUNIsrc(fsrc,iframe);	
									}
									continue;
								}
								if(iframeparams.length>0){
									for(ikey in iframeparams){
										if(typeof(iframeparams[ikey])=='string'){
											var curpar = iframeparams[ikey].split('=');
											if(typeof(curpar[0])!='undefined'){
												if(curpar[0]=='rel'){
													if(typeof(curpar[1])=='number'){
														ifrmsettings.r = ival;	
													}else{
														ifrmsettings.r = 0;
													}	
												}
											}
										}	
									}
								}     
								if(typeof(iframe.rem)=='object'){
									ifrmsettings.rem = iframe.rem;	
								}
								ifrmsettings.t = iframedliste[key2];
								ifrmsettings.org = oiframe;
								ifrmsettings.o = iframe;
								ifrmsettings.s = ''+iframe.src+'';
								if(newsrc){
									ifrmsettings.s = ''+newsrc+'';	
								}
								ifrmsettings.css = window.getComputedStyle(oiframe,null);  
								ifrmsettings.w = oiframe.clientWidth;
								ifrmsettings.h = oiframe.clientHeight;    
								if(typeof(ifrmsettings.oh)!='undefined'){
									if(parseInt(ifrmsettings.h)>parseInt(ifrmsettings.oh) && parseInt(ifrmsettings.oh)>0){
										ifrmsettings.h = ifrmsettings.oh;
									}
								}
								if(parseInt(ifrmsettings.w)==0 && parseInt(ifrmsettings.h)==0){
									ifrmsettings.w = parseInt(ifrmsettings.o.getAttribute('width'));
									ifrmsettings.h = parseInt(ifrmsettings.o.getAttribute('height'));
								}
								ifrmsettings.p = oiframe.parentNode;
								if(ifrmsettings.p && ifrmsettings.p.nodeName){
									if(ifrmsettings.p.clientWidth>0 && parseInt(ifrmsettings.ow)>0){
										if(parseInt(ifrmsettings.w)<parseInt(ifrmsettings.ow)){
											ifrmsettings.w = ifrmsettings.ow;
										}	
									}
									if(ifrmsettings.p.nodeName.toLowerCase()=='p' || ifrmsettings.p.nodeName.toLowerCase()=='span'){
										var otherCSS = '';
										if(!ifrmsettings.p.style.height || ifrmsettings.p.style.height==0 || ifrmsettings.p.style.height=='0' || ifrmsettings.p.style.height=='0px'){
											if(ifrmsettings.h>0){
												//otherCSS += 'height:'+ifrmsettings.h+'px !important;';		
											}else{
												otherCSS += 'height:auto !important;';		
											}	
										}
										//ifrmsettings.p.style.cssText = ifrmsettings.p.style.cssText+';padding:0px !important;'+otherCSS;
										if(ifrmsettings.p.parentNode){
											var cs = window.getComputedStyle(ifrmsettings.p.parentNode,null);
											if(cs){
												var pt = cs.getPropertyValue('padding-top') ? cs.getPropertyValue('padding-top') : cs.getPropertyValue('paddingTop');
												var pb = cs.getPropertyValue('padding-bottom') ? cs.getPropertyValue('padding-bottom') : cs.getPropertyValue('paddingBottom');
												if(pt || pb){
													ifrmsettings.p.parentNode.style.cssText = ifrmsettings.p.parentNode.style.cssText+';padding-top:0px !important;padding-bottom:0px !important;height:auto !important;';	
												}
											}
										}
									}
								}
								checkSizes(ifrmsettings);
								ix++;
								ifrmsettings.i = parseInt('1'+ix); 
								if(typeof(ifrmsettings.s)=='object'){
									if(typeof(ifrmsettings.s.src)=='string'){
										ifrmsettings.hash = ifrmsettings.s.src;		
									}else{
										if(typeof(ifrmsettings.s[0].src)){
											ifrmsettings.hash = ifrmsettings.s[0].src;		
										}
									}
								}else{
									ifrmsettings.hash = ifrmsettings.s;	
								}
								ifrmsettings.v = ifrmsettings.s.split('/');
								for(var ik in ifrmsettings.v){
									var cvx = ifrmsettings.v[ik];
									if(typeof(cvx)=='string'){
										if(cvx.indexOf('?')>0){
											ifrmsettings.v = cvx;	
											break;
										}                        
									}
								}
								if(typeof(ifrmsettings.v)=='object'){
									ifrmsettings.v = ifrmsettings.v[(ifrmsettings.v.length)-1]; 	
								} 
								ifrmsettings.v = ifrmsettings.v.replace('.html','');
								ifrmsettings.v = ifrmsettings.v.split('?');
								ifrmsettings.v = ifrmsettings.v[0];
								ifrmsettings.v = ifrmsettings.v.split('&');
								ifrmsettings.v = ifrmsettings.v[0];  
								if(notBlockedId(ifrmsettings.v) && !ifrmact[ifrmsettings.v]){
									ifrmact[ifrmsettings.v] = ifrmsettings;
								} 
							}
						}
					}
				}
		    }
		}
		for(key in ifrmact){ 
			var setts = ifrmact[key];
			var hash = (setts.hash);  
			if(!usedPlayas[hash] && setts.v.length>0){
				usedPlayas[hash] = 1;
				allSets[setts.i] = setts;
				activePlayas[setts.i] = setts.t;
				playaSettings[setts.i] = setts;
				replaceIframe(setts);	   
			}
		}
	}
	
	var tryRemove=function(sets,fromInside){
		try{
			if(typeof(sets)=='object'){
				var p = sets.p;
				if(typeof(p)=='object'){
					var pp = p.parentNode;
					var pp = false;
					if(typeof(pp)=='object'){
						var childs = pp.childNodes;
						for(var k in childs){
							var ch = childs[k];
							if(typeof(ch)=='object'){
								var cls = ch.className; 
								var pname = ch.nodeName;
								if(cls && pname){
									if(cls.indexOf('vjs-')>=0 && pname!='IFRAME' && cls.indexOf('vjs-user-inactive')<0){
										pp.removeChild(ch);
									}
								}
							}
						}
					}
					var pchilds = p.childNodes;
					for(var k in pchilds){
						var pch = pchilds[k];
						if(typeof(pch)=='object'){
							var cls = pch.className;
							var pname = pch.nodeName;    
							if(cls && pname){
								if(cls.indexOf('vjs-')>=0 && pname!='IFRAME' && cls.indexOf('vjs-user-inactive')<0){
									p.removeChild(pch);
								}
							}
						}
					}
					
				}
			}	
		}catch(e){
			webConsole0(e);
		}
		if(!fromInside){
			setTimeout(function(){
				tryRemove(sets,1);	
			},200);
		}
	}
	
	var replaceObject=function(obj,sets){
		if(typeof(sets)=='object'){
			var hash = (sets.hash)+''; 
			if((!usedPlayas[hash] || typeof(usedPlayas[hash])=='undefined') && sets.v.length>0){
				usedPlayas[hash] = 1;
				allSets[sets.i] = sets;
				activePlayas[sets.i] = sets.t;
				playaSettings[sets.i] = sets;
				replaceIframe(sets);	   
			}	
		}
	}
	
	var getFBsrc=function(url,obj){
		if(typeof(url)=='string'){
			if(url.indexOf('video.php')>=0){
				url = encodeURIComponent(url);
				var edom = etargetVideoDomain ? etargetVideoDomain : 'sk';
				var fbgeturl = "//"+edom+".search.etargetnet.com/embed/fbhack.php?link="+url;
				var unihashurl = window.btoa(fbgeturl);
				if(!inHackProcess[unihashurl]){
					inHackProcess[unihashurl] = 1;
					ajaxcall2(fbgeturl,true,function(e){
						setFBsrc(obj,e);		
					});
				}
			}
		}	
		return false;
	}
	
	var setFBsrc=function(){
		var obj = arguments[0];
		var res = arguments[1];
		if(typeof(res)=='object' && typeof(obj)=='object'){
			var response = res.response;
			if(response.length>10){
				var sets = [];
				var arr = response.split('|');
				if(arr.length>0 && typeof(arr[0])=='string'){
					var rand = Math.floor(1E4*Math.random());
					sets.o = obj;
					sets.org = obj;
					sets.i = parseInt('100000'+rand);
					sets.v = sets.i+'';
					sets.s = arr[0];
					sets.poster = arr[1];
					sets.w = obj.clientWidth;
					sets.h = obj.clientHeight;
					sets.hash = window.btoa(arr[0]).substr(0,10);
					sets.t = 'facebook';
					sendPixel('facebook','',arr[0]);
					//replaceObject(obj,sets);		
				}			
			}
		}
	}
	
	var getUNIsrc=function(url,obj){  
		//return false;       
		if(typeof(url)=='string'){
			for(var k in unialowed){
				var alowed = unialowed[k];
				webConsole0('inuni');
				webConsole0(url);
				webConsole0(alowed);
				webConsole0(url.indexOf(alowed));
				if(url.indexOf(alowed)==-1 || url.indexOf('.swf')>0){
					url2 = tryBuildUrl(url,alowed,obj);
					if(typeof(url2)=='string' && url2.length>0){
						url = url2;	
					}else{
						continue;
					}
				}
				url = encodeURIComponent(url);
				var edom = etargetVideoDomain ? etargetVideoDomain : 'sk';
				var fref = document.location.href;
				var unigeturl = "https://"+edom+".search.etargetnet.com/embed/unihack.php?link="+url+"&referer="+fref;
				var unihashurl = window.btoa(url);
				webConsole0(typeof(inHackProcess[unihashurl]));
				webConsole0(parseInt(inHackProcess[unihashurl]));
				webConsole0('----------------------------');
				if(parseInt(inHackProcess[unihashurl])!=1 || typeof(inHackProcess[unihashurl])=='undefined'){
					inHackProcess[unihashurl] = 1;
					webConsole0('before-calling');
					ajaxcall2(unigeturl,true,function(e){
						webConsole0('calling');
						setUNIsrc(obj,e);		
					});   
				}   
			}
		}	
		return false;
	}
	
	var setUNIsrc = function(){
		webConsole0('setuni');
		var obj = arguments[0];
		var res = arguments[1];
		if(typeof(res)=='object' && typeof(obj)=='object'){
			var response = res.response;     
			if(response.length>10){
				var sets = [];
				var arr = response.split('|');
				if(arr.length>1 && typeof(arr[1])=='string' && typeof(arr[0])=='string'){
					if(arr[0].length>0 && arr[1].length>0){
						webConsole0(arr);
						var rand = Math.floor(1E4*Math.random());
						sets.o = obj;
						sets.org = obj;
						sets.i = parseInt('100000'+rand);
						sets.v = sets.i+'';
						sets.s = arr[1];
						sets.poster = arr[2];
						sets.w = obj.clientWidth;
						sets.h = obj.clientHeight;
						sets.po = false;
						if(typeof(arr[3])=='string'){
							try{
								var partnerdata = JSON.parse(arr[3]);
								var partnerlink = partnerdata[0];
								var partnerimg = partnerdata[1];
								var parentw = partnerdata[2];
								var parenth = partnerdata[3];
								if(partnerlink.length>10 && partnerimg.length>10 && parentw>0 && parenth>0){
									if(parentw>sets.w){
										parenth = parseInt(sets.w/parentw*parenth);
										parentw = sets.w;			
									}
									sets.w = sets.w-parentw;
									sets.h = sets.h-parenth;	
									var poa = document.createElement('a');
									poa.href = partnerlink;
									poa.target = '_blank';
									var poi = document.createElement('img');
									poi.src = partnerimg;
									poi.style.cssText = 'width:'+parentw+'px;max-width:100%;height:'+parenth+'px;';
									sets.po = document.createElement('div');
									sets.po.className = 'player_banner';
									sets.po.style.cssText = 'width:'+parentw+'px;max-width:100%;height:'+parenth+'px;';
									poa.appendChild(poi);	
									sets.po.appendChild(poa);
								}
							}catch(e){
								webConsole0(e);	
							}
						}
						sets.hash = window.btoa(arr[1]);
						sets.t = 'uni';
						webConsole0(sets);
						sendPixel('uni',arr[0],arr[1]);
						replaceObject(obj,sets);	
					}
				}	
			}
		}
	}
	
	var tryBuildUrl = function(url,alowed,obj){
		
		var lh = document.location.href;
		if(lh.indexOf('testy')>0){
			var lh = 'http://www.ceknito.sk/video/481158';
		}
		if(lh.indexOf(alowed)>=0){
			if(typeof(obj.flashvars)=='string'){
				var val = obj.flashvars;
				if(val.length>0){
					if(val.indexOf('autostart=true')>0){
						//sets.a = 1;
					}
					var url = lh+'?'+val;
					return url;	
				}	
			}			
		}
		
		return false;
		
	}
	
	var scandatadiv = function(){
		
		var ifrmact=[];  
		var ix = 0;
		var ddivs=document.getElementsByClassName('etarget-video-player');
		for(key in ddivs){
			var ddiv = ddivs[key];
			if(typeof(ddiv)=='object' && ddiv.constructor === Array){
				var ddiv_src = ddiv.dataset.src;
				var ddiv_auto = ddiv.dataset.autoplay;
				var ddiv_auto_num = 0;
				if(ddiv_auto=='true'){
					ddiv_auto_num = 1;
				}
				if(typeof(ddiv_src)=='string'){
					if(ddiv_src.indexOf('youtu')>0){
						var sizew = parseInt(ddiv.style.width);
						var sizeh = parseInt(ddiv.style.height);
						var videosettings=[];
						videosettings.t = 'youtube';
						videosettings.o = ddiv;  
						videosettings.s = ddiv_src;
						videosettings.w = sizew;
						videosettings.h = sizeh;
						videosettings.p = ddiv;
						videosettings.a = parseInt(ddiv_auto_num);
						ix++;
						videosettings.i = parseInt('1001'+ix); 
						videosettings.v = videosettings.s.split('/');
						videosettings.v = videosettings.v[(videosettings.v.length)-1];
						videosettings.v = videosettings.v.replace('.html','');
						videosettings.v = videosettings.v.split('?');
						videosettings.v = videosettings.v[0];
						videosettings.v = videosettings.v.split('&');
						videosettings.v = videosettings.v[0];    
						ifrmact[videosettings.v] = videosettings;
					}
				}
			}
		}
		
		for(key in ifrmact){ 
			var setts = ifrmact[key];
			var hash = (setts.v+setts.t);  
			if(!usedPlayas[hash]){
				usedPlayas[hash] = 1;
				allSets[setts.i] = setts;
				activePlayas[setts.i] = setts.t;
				playaSettings[setts.i] = setts;
				replaceIframe(setts,'insert');	   
			}
		}	
		
	}

	var scanhtml5=function(){
		var videos=document.getElementsByTagName('video');	
		var lkey=0;
		var cursources=[];
		var ifrmact=[];
		var ix=0;
		for(key in videos){
			keyc=''+(parseInt(key)+parseInt(lkey))+'';
			var video = videos[keyc];
			var fsrc = false;    
			if(video){
				var vid = video.id;
				if(vid=='video_reklama_html5_api'){
					return false;
				}
				var sources = video.getElementsByTagName('source');
			    if(sources.length>0){
	    			for(key3 in sources){
	    				var source = sources[key3];
	    				var stype = source.type;
	    				if(stype && source.src){
	    					var sourceext = stype.split('/');
	    					sourceext = sourceext[sourceext.length-1];
							for(key2 in sourcelist){
								if(sourceext.indexOf(sourcelist[key2])>=0){
									cursources.push(source);
								}
							}
						}
					}
					var videosettings=[];
					if(cursources.length>0){
						var inlist = 1;  
						for(var bk in blockedOnly){
							var cbk = blockedOnly[bk];
							if(cbk.length>0){
								if(cursources.indexOf(cbk)>=0){
									inlist = 0;
									break;	
								}
							}
						}
                        if(inlist>=0){
							var parent = video.parentNode;
							var rem = false;
							var i=0;
							while((true && rem)){
								if(parent && parent.className && parent.className.indexOf('mejs')>=0){	
									rem = parent;
									parent = parent.parentNode;
								}else{
									break;
								}
								if(i>10) break;
								i++;	
							}
							var videocss = video.style.cssText;
							var styleWidth = 0;
							var styleHeight = 0;
							if(typeof(videocss)=='string'){
							 var videocssarr = videocss.split(/[:;]/);
							 for(var kix in videocssarr){
								 var videocurstyle = videocssarr[kix];
								 var kix2 = parseInt(kix)+1;
								 if(videocurstyle.indexOf('width')>=0){  
								 	styleWidth = videocssarr[kix2];	 
								 }
								 if(videocurstyle.indexOf('height')>=0){
								 	styleHeight = videocssarr[kix2];	 
								 }
							 }	
							}
							var width = parseInt(video.width ? video.width : (styleWidth ? styleWidth : video.videoWidth));
							var height = parseInt(video.height ? video.height : (styleHeight ? styleHeight : video.videoHeight));
							var pwidth = parseInt(parent.clientWidth);
							var pheight = parseInt(parent.clientHeight);
		    				videosettings.t = 'html5';
							videosettings.o = video;
							videosettings.css = window.getComputedStyle(video,null);  
							videosettings.s = cursources; 
							videosettings.w = (width < pwidth) ? pwidth : width;
							videosettings.h = (height < pheight) ? pheight : height;
							videosettings.p = parent;
							videosettings.rem = rem;
							videosettings.poster = video.getAttribute('poster');
							ix++;
							videosettings.i = parseInt('10'+ix); 
							if(typeof(videosettings.s)=='object'){
								if(typeof(videosettings.s.src)=='string'){
									videosettings.hash = videosettings.s.src;		
								}else{
									if(typeof(videosettings.s[0].src)){
										videosettings.hash = videosettings.s[0].src;		
									}
								}
							}else{
								videosettings.hash = videosettings.s;	
							}
							videosettings.v = videosettings.i;
							ifrmact[videosettings.v] = videosettings;
							break;	
                        }
					}else{
						continue;
					}
					var subs = video.getElementsByTagName('track');
					var subarr=[];
					var i=0;
					for(key4 in subs){
						var sub = subs[key4];
						if(sub.src){
							try{
								var obj=[];
								var tsrc = sub.src;
								var lang = sub.srclang;
								var label = sub.label;
								var loc = document.location;
								var protocol = loc.protocol;
								var domain = document.domain;
								var fsrc = protocol+'//'+domain;
								if(tsrc.indexOf(fsrc)==-1){
									tsrc = tsrc.replace(tsrc.replace(/(http(s)?:\/\/)?/,'').split('/')[0],domain);
								}
								var text = ajaxcall(false,tsrc);
								obj.lang = lang;
								obj.label = label;
								obj.data = parseSubs(text);
								subarr[lang?lang:label]=obj;
								i++;	
							}catch(e){
								webConsole0(e);
							}
						}
					}
					playaSubs[videosettings.i]=subarr;
			    }  
			}
		} 
		for(key in ifrmact){
			var setts = ifrmact[key];
			var hash = (setts.hash);
			if(!usedPlayas[hash]){
				usedPlayas[hash] = 1;
				allSets[setts.i] = setts;
				activePlayas[setts.i] = setts.t;
				playaSettings[setts.i] = setts;
				replaceHTML5(setts);	   
			}
		}
	}

	var replaceIframe=function(settings,insert){
		var playaID = settings.i;
		var playaObj = settings.org;
		var playaSource = settings.s;
		var playaWidth = settings.w;
		var playaHeight = settings.h;
		var playaVID = settings.v;
		webConsole0('replaceIframe'); 
		webConsole0(playaObj);
		webConsole0(playaSource);
		if(isBlocked(playaSource,playaObj,settings) || !playaSource || !playaObj){ 
			return false;    
		}  
		if(settings.t=='vimeo' || settings.t=='jwplayer' || settings.t=='youbo'){
			if(ajaxcall(settings)){
				replaceHTML5(settings);	
				return;
			}
		}else{
			if(settings.t=='facebook' || settings.t=='uni'){     
				replaceHTML5(settings);			
			}else{ 
				buildWholeDesign(playaID,playaObj,playaWidth,playaHeight,false,false,settings,insert);
			}	
		}       
	}

	var replaceHTML5=function(settings){ 
		var playaID = settings.i;
		var playaObj = settings.o;
		var playaSource = settings.s;
		var playaWidth = settings.w;
		var playaHeight = settings.h;
		var playaVID = settings.v;
		webConsole0('replaceHTML5'); 
		webConsole0(playaSource);
		webConsole0(playaSource);
		if(isBlocked(playaSource,playaObj,settings)  || !playaSource || !playaObj){
			return false;
		}
		buildWholeDesign(playaID,playaObj,playaWidth,playaHeight,playaSource,false,settings);
	}
	
	var notBlockedId=function(id){
		for(var key in blockedYoutubeIDs){
			var bid = blockedYoutubeIDs[key];
			if(bid.length>0){
				if(id==bid){
					return false;
				}
			}
		}
		return true;
	}
	
	var checkSizes = function(obj){
		/* for future */	
	}
	
	var isBlocked = function(fsrc,obj,setts){
		var blocked_source = fsrc;
		var blocked_class = [];
		var blocked_id = [];
		var blocked_attr = [];
		var blocked_video_id = '';
		if(typeof(fsrc)=='object'){
			if(typeof(fsrc[0])=='object'){
				blocked_class = blocked_class.concat(fsrc[0].className.split(' '));
				blocked_id = blocked_id.concat(fsrc[0].id.split(' '));
				blocked_attr = blocked_attr.concat(fsrc[0].attributes);	
				blocked_source = fsrc[0].src;
			}
		}
		if(typeof(obj)=='object'){
			blocked_class = blocked_class.concat(obj.className.split(' '));	
			blocked_id = blocked_id.concat(obj.id.split(' '));		
			blocked_attr = blocked_attr.concat(obj.attributes);	
		}
		if(typeof(setts)=='object'){
			blocked_video_id = setts.v;
		}
		var blokujem = false;
		
		blokujem = blockLoop(blocking,[{'blocked_source':blocked_source,'blocked_class':blocked_class,'blocked_id':blocked_id,'blocked_attr':blocked_attr,'blocked_video_id':blocked_video_id}]);
		if(!blokujem){
			blokujem = blockLoop(forcing,[{'blocked_source':blocked_source,'blocked_class':blocked_class,'blocked_id':blocked_id,'blocked_attr':blocked_attr,'blocked_video_id':blocked_video_id}],true);
		}
		return blokujem;	
	}
	
	var blockLoop=function(blocking,bdata,force){
		var blokujem = false;
		var data = bdata[0];
		if(typeof(blocking)=='object' && typeof(data)=='object'){
			for(var k in blocking){
				var blocks = blocking[k];	
				var vals = data[k];
				if(typeof(vals)!='undefined' && typeof(blocks)!='undefined'){
					if(vals.length>0 && blocks.length>0){
						for(var l in blocks){
							var block = blocks[l];
							if(typeof(vals)=='object' && typeof(block)=='string' && block.length){
								for(var m in vals){
									var val = vals[m];
									if(typeof(val)=='object'){
										for(var n in val){
											var val2 = val[n];
											if(typeof(val2)=='object'){
												var val2_name = val2.name;
												var val2_val = val2.value;
												var val2_mrg = val2_name+'='+val2_val;
												var block_mrg = block;
												if(force){
													if(val2_mrg!=block_mrg){
														blokujem = true;
													}	
												}else{
													if(val2_mrg==block_mrg){
														blokujem = true;
													}	
												}
											}
										}	
									}else if(typeof(val)=='string'){
										var aval = val.split(' ');
										if(aval.length>0){
											for(var o in aval){
												var avalx = aval[o];
												if(avalx){
													if(force){
														if(avalx!=block){
															blokujem = true;
														}		
													}else{
														if(avalx==block){
															blokujem = true;
														}		
													}
												}
											}	
										}
									}
								}	
							}else{ 
								if(typeof(vals)=='string' && vals.length>0){   
									if(force){
										var ablockx = block.split('|');
										if(ablockx.length>1){
											blokujem = true;
											for(var s in ablockx){
												var blockx = ablockx[s];
												if(vals.indexOf(blockx)!=-1){
													blokujem = false;
													break;		
												}	
											}
										}else{
											if(vals.indexOf(block)==-1){
												blokujem = true;
											}	
										}
									}else{     
										if(vals.indexOf(block)!=-1){
											blokujem = true;
										}
									}
								}      
							}
						}
					}
				}
			}
		}
		webConsole0('Blokujem:'+blokujem);
		return blokujem;
	}
	
	var canBeUsed=function(arr){
		var blockDomains = ['topky.sk','zoznam.sk'];
		var hasMatch = false;
		if(typeof(arr)=='object'){
			if(typeof(arr.poster)=='string'){
				blockDomains.forEach(function(val,i){
					if(typeof(val)=='string'){
						if(arr.poster.indexOf(val)>=0){
							hasMatch = true;
						}	
					}
				});
			}
		}
		if(hasMatch){
			return false;
		}
		return true;	
	}

	var eRollback=function(playaID){
		
		var dorollback = false;
		if(typeof(playaID)!='undefined'){
			if(playaID>0){
				if(typeof(player[playaID])!='object' && typeof(original[playaID])=='object'){
					dorollback = true;	
				}
			}
		}
		if(dorollback){	
			var beforeWhat = document.getElementById('etargetPlayerWrap_eta'+playaID+'get');
			if(typeof(beforeWhat)=='object'){
				//addElement(beforeWhat,original[playaID]);
			}
		}
		
	}
    
	var checkKeyFunction=function(e){
		var kcode = e.keyCode;
		var ccode = e.charCode;
		var active = 0;
		var obj = document.querySelector('#etargetPlayerWrap.hover');
		if(obj){
			if(obj.querySelector('#etargetSeek')){
				if(obj.querySelector('#etargetSeek').getAttribute('rel')){
					active = obj.querySelector('#etargetSeek').getAttribute('rel');	
					if(active) active = parseInt(active.replace(/\D+/g,''));
				}
			}
		}
		var kk = allowedkeys[kcode] ? allowedkeys[kcode] : allowedkeys[ccode];
		if(kk && active){
			var name=kk.name;
			var switched=false;
			var shiftkey=1
			if(e.shiftKey){
				shiftkey = 4;
			}
			switch(name){
				case 'space':
				start(active);
				switched=true;	
				break;
				case 'right':
				var cur = getCurrentTime(active);
				seek(active,parseInt(cur+5*shiftkey));
				switched=true;
				break;
				case 'left':
				var cur = getCurrentTime(active);
				seek(active,parseInt(cur-5*shiftkey));
				switched=true;
				break;
				case 'up':
				setVolume(active,'up');
				switched=true;
				break;
				case 'down':
				setVolume(active,'down');
				switched=true;
				break;
			}
			if(switched){
				e.preventDefault();
  				e.returnValue = false;
				return false;
			}
		}	
	}
	
	var liveinterval = false;
	var liveintnum = 0;
	var isLive=function(playaID){
		if(!liveinterval){
			liveinterval = setInterval(function(){
				var dur = getDuration(playaID);
				var cur = getCurrentTime(playaID);
				if(cur==dur==0){
					play(playaID);
					clearInterval(liveinterval);
				}
				liveintnum++;
				if(liveintnum>100){
					clearInterval(liveinterval);
				}	
			},100);
		}
	}
	
	var writeToEConsole=function(s){
		var cnsl = document.getElementsByClassName('html_console')[0];
		var text = document.createTextNode(s);
		if(typeof(cnsl)=='object'){
			cnsl.appendChild(text);	
		}	
	}

	var buildWholeDesign=function(playaID,playaObj,playaWidth,playaHeight,playaSource,adsType,settings,insert,retCont){ 
		var defRelated = 1;
		if(typeof(parentRelated)=='number'){
			defRelated = parentRelated;
		} 
		var sets = allSets[playaID];
		if(typeof(sets)=='undefined') sets = [];
		if(typeof(settings)=='undefined') settings = [];
		// type
		var playaType = activePlayas[playaID];
		var playaSubtype = (typeof(videoOriginType[playaID])=='string') ? videoOriginType[playaID] : '';
		// video wrap
		var playaWrapx = document.createElement('div');
		playaWrapx.id = 'videoWrap';
		// playa
		if(!playaWidth) playaWidth = '100%';
		else{
			if(playaWidth.toString().indexOf('px')==-1){
				playaWidth = playaWidth+'px';	
			}
		}
		if(!playaHeight) playaHeight = '100%';
		else{
			if(playaHeight.toString().indexOf('px')==-1){
				playaHeight = playaHeight+'px';	
			}
		}
		
		allPlayas.push(playaID);
		
		var playaWhole = document.createElement('div');
		playaWhole.id = 'content_'+playaID;
		playaWhole.setAttribute('class','player_content');
		playaWhole.setAttribute('width',playaWidth);
		playaWhole.setAttribute('height',playaHeight);
		playaWhole.setAttribute('fs',0);
		if(playaType=='html5' || playaType=='vimeo' || playaType=='jwplayer' || playaType=='youbo' || playaType=='facebook' || playaType=='overflow' || playaType=='uni'){
			defRelated = 0;
			var playaVideo = document.createElement('video');
			playaVideo.setAttribute('preload','auto');		
			if(sets.poster){
				if(deviceType=='mobile'){
					playaVideo.setAttribute('style','background-image:url('+sets.poster+');');	
				}else{	
					playaVideo.setAttribute('poster',sets.poster);	
				}
			}
			if(typeof(playaSource)=='object'){
				for(key in playaSource){
					if(typeof(playaSource[key])=='object'){
						playaVideo.appendChild(playaSource[key]);		
					}	
				}
			}else if(typeof(playaSource)=='string'){
				var playaS = document.createElement('source');
				playaS.src = playaSource;
				playaS.type = 'video/mp4';
				playaVideo.appendChild(playaS);
			}else{
				return '';
			}
			settings.o = playaVideo;
			player[playaID]=playaVideo;
			playaWhole.appendChild(playaVideo);	
			playaWhole.setAttribute('data-type','html5');	
		}
		if(playaType=='youtube'){
			playaWhole.setAttribute('data-type','youtube');	
			playaWhole.setAttribute('data-id',sets.v)
		}
		playaWrapx.appendChild(playaWhole);
		
		// playPause
		var playaPlayPause = document.createElement('div');
		playaPlayPause.id = 'playPause';
		playaPlayPause.className = 'pause';
		
		// if video ads
		var skipVideo = document.createElement('div');
		skipVideo.id = 'skipVideo';
		var skipVideoDesc = document.createElement('div');
		skipVideoDesc.id = 'skipVideoDesc';
		skipVideoDesc.innerHTML = skiptext;
		var skipVideoTime = document.createElement('div');
		skipVideoTime.id = 'skipVideoTime';
		skipVideoTime.innerHTML = skiptime;
		skipVideo.appendChild(skipVideoDesc);
		skipVideo.appendChild(skipVideoTime);
        
        // if video ads
        var gotoVideo = document.createElement('div');
        gotoVideo.id = 'gotoVideo';
        gotoVideo.className = 'hidden';
        var gotoVideoDesc = document.createElement('div');
        gotoVideoDesc.id = 'gotoVideoDesc';
        gotoVideoDesc.innerHTML = viacna[domain] || 'viac na';
        var gotoVideoText = document.createElement('div');
        gotoVideoText.id = 'gotoVideoText';
        gotoVideoText.innerHTML = 'lidl.sk';
        var gotoVideoLogo = document.createElement('div');
        gotoVideoLogo.id = 'gotoVideoLogo';
        gotoVideoLogo.style.cssText = 'background-image:url(//sk.search.etargetnet.com/img/logo/lidl_logo.jpg);';
        gotoVideo.appendChild(gotoVideoLogo);
        gotoVideo.appendChild(gotoVideoDesc);
        gotoVideo.appendChild(gotoVideoText);
		
		// adsBar
		var playaAdsClose = document.createElement('div');
		playaAdsClose.id = 'adsClose'; 
		if(typeof(eplayaXko)=='string'){
			if(eplayaXko.length>0){
				playaAdsClose.className = 'adsCloseDefSize';
				playaAdsClose.style.cssText = eplayaXko;
			}
		}
		var playaAdsBanner = document.createElement('div');
		playaAdsBanner.id = 'adsBanner';
		var playaAdsBar = document.createElement('div');
		playaAdsBar.id = 'adsBar'; 
		playaAdsBar.appendChild(playaAdsBanner); 
		playaAdsBar.appendChild(playaAdsClose);  
		
		//subs area
		var playaSubsArea = document.createElement('div');
		playaSubsArea.id = 'playaSubsArea';
		
		fheight = parseInt(parseInt(playaHeight)+4);
		// wrap
		var playaWrap = document.createElement('div');
		playaWrap.id = 'etargetPlayerWrap'; 
		playaWrap.setAttribute('rel',playaID); 
		playaWrap.appendChild(playaWrapx);
		playaWrap.appendChild(playaPlayPause);
		playaWrap.appendChild(playaSubsArea);
		playaWrap.appendChild(playaAdsBar);
        playaWrap.appendChild(skipVideo);
        playaWrap.appendChild(gotoVideo);
		
		if(true){ //!(typeof(settings.c)=='number' && settings.c==0) ak by som chcel preberat parametre
			// seek
			var playaSeekShow = document.createElement('div');
			playaSeekShow.id = 'seekShow';
			var playaSeekShowText = document.createElement('div');
			playaSeekShowText.id = 'seekShowText';
			var playaSeekShowArrow = document.createElement('div');
			playaSeekShowArrow.id = 'seekShowArrow';
			playaSeekShow.appendChild(playaSeekShowText);
			playaSeekShow.appendChild(playaSeekShowArrow);
			
			var playaSeekBall = document.createElement('div');
			playaSeekBall.id = 'seekBall';
			var playaSeekBallIn = document.createElement('div');
			playaSeekBallIn.id = 'seekBallIn';
			playaSeekBall.appendChild(playaSeekBallIn);
			
			var playaSeekLine = document.createElement('div');
			playaSeekLine.id = 'seekLine';
			var playaSeekAds = document.createElement('div');
			playaSeekAds.id = 'seekAds';
			var playaSeekLoader = document.createElement('div');
			playaSeekLoader.id = 'seekLoaded';
			var playaSeekBar = document.createElement('div');
			playaSeekBar.id = 'seekBar';
			var playaSeekWrap = document.createElement('div');
			playaSeekWrap.id = 'etargetSeek';
			playaSeekWrap.setAttribute('rel','et_'+playaID);
			playaSeekWrap.appendChild(playaSeekShow);
			playaSeekWrap.appendChild(playaSeekBall);
			playaSeekWrap.appendChild(playaSeekLine);
			playaSeekWrap.appendChild(playaSeekAds);
			playaSeekWrap.appendChild(playaSeekLoader);
			playaSeekWrap.appendChild(playaSeekBar);
			//guality
			var playaQualityAuto = document.createElement('div');
			playaQualityAuto.id = 'quality_auto';
			playaQualityAuto.className = 'default';
			playaQualityAuto.innerHTML = 'auto';
			var playaQualitySmall = document.createElement('div');
			playaQualitySmall.id = 'quality_small';
			playaQualitySmall.innerHTML = '240p';
			var playaQualityMedium = document.createElement('div');
			playaQualityMedium.id = 'quality_medium';
			playaQualityMedium.innerHTML = '360p';
			var playaQualityLarge = document.createElement('div');
			playaQualityLarge.id = 'quality_large';
			playaQualityLarge.innerHTML = '480p';
			var playaQualityHD720 = document.createElement('div');
			playaQualityHD720.id = 'quality_hd720';
			playaQualityHD720.innerHTML = '720p';
			var playaQualityHD1080 = document.createElement('div');
			playaQualityHD1080.id = 'quality_hd1080';
			playaQualityHD1080.innerHTML = '1080p';
			var playaQualityHighres = document.createElement('div');
			playaQualityHighres.id = 'quality_highres';
			playaQualityHighres.innerHTML = 'high';
			var playaQuality = document.createElement('div');
			playaQuality.id = 'playaQuality';
			playaQuality.className = 'playaIcon';
			var playaQualityList = document.createElement('div');
			playaQualityList.id = 'playaQualityList';
			playaQualityList.appendChild(playaQualityHighres);
			playaQualityList.appendChild(playaQualityHD1080);
			playaQualityList.appendChild(playaQualityHD720);
			playaQualityList.appendChild(playaQualityLarge);
			playaQualityList.appendChild(playaQualityMedium);
			playaQualityList.appendChild(playaQualitySmall);
			playaQualityList.appendChild(playaQualityAuto);
			if(activePlayas[playaID]=='youtube'){
				playaQuality.appendChild(playaQualityList);
			}
			// sets
			var playaSets = document.createElement('div');
			playaSets.id = 'playaSets';
			//volume
			var playaVol = document.createElement('div');
			playaVol.id = 'playaVol';
			playaVol.className = 'playaIcon';
			var playaVolMute = document.createElement('div');
			playaVolMute.id = 'playaVolMute';
			var playaVolBack = document.createElement('div');
			playaVolBack.id = 'playaVolBack';
			var playaVolSlideOver = document.createElement('div');
			playaVolSlideOver.id = 'playaVolSlideOverlay';
			var playaVolSlideLine = document.createElement('div');
			playaVolSlideLine.id = 'playaVolSlideLine';
			var playaVolSlide = document.createElement('div');
			playaVolSlide.id = 'playaVolSlide';
			var playaVolSlideIn = document.createElement('div');
			playaVolSlideIn.id = 'playaVolSlideIn';
			playaVolSlide.appendChild(playaVolSlideIn);
			playaVolBack.appendChild(playaVolSlideLine);
			playaVolBack.appendChild(playaVolSlide);
			playaVol.appendChild(playaVolMute);
			playaVol.appendChild(playaVolBack);
			playaVol.appendChild(playaVolSlideOver);
			//subs
			var playaSub = document.createElement('div');
			playaSub.id = 'playaSubs';
			var playaSubWrap = document.createElement('div');
			playaSubWrap.id = 'playaSubsWrap';
			if(playaSubs[playaID]){
				var i=0;
				for(key2 in playaSubs[playaID]){
					var sub = playaSubs[playaID][key2];
					var label = sub.label;
					if(label){
						var lang = sub.lang;
						if(!lang) lang=label;
						var subrow = document.createElement('div');
						if(i==0) subrow.setAttribute('class','active');
						subrow.id=lang;
						subrow.innerHTML=label;
						playaSubWrap.appendChild(subrow);
						i++
					}	
				}
				playaSub.appendChild(playaSubWrap);
			}
			//play
			var playaPlayPlay = document.createElement('div');
			playaPlayPlay.id = 'playaPlay';
			playaPlayPlay.className = 'playaIcon';
			if(deviceType=='mobile'){
				//playaPlayPlay.className = 'hidden';	
			}
			//time
			var playaSeekTime = document.createElement('div');
			playaSeekTime.id = 'seekTime';
			playaSeekTime.className = 'playaIcon';
			var playaSeekEnd = document.createElement('div');
			playaSeekEnd.id = 'seekEnd';
			playaSeekEnd.innerHTML='00:00';
			var playaSeekStart = document.createElement('div');
			playaSeekStart.id = 'seekStart';
			playaSeekStart.innerHTML='00:00';
			var playaSeekDelim = document.createElement('div');
			playaSeekDelim.id = 'seekDelim';
			playaSeekDelim.innerHTML='/';
			playaSeekTime.appendChild(playaSeekStart);
			playaSeekTime.appendChild(playaSeekDelim);
			playaSeekTime.appendChild(playaSeekEnd);
			//controls
			var playaControls = document.createElement('div');
			playaControls.id = 'playaControls';
			//fullscreen
			if(true){//!(typeof(settings.f)=='number' && settings.f==0)
				var playaFull = document.createElement('div');
				playaFull.id = 'playaScreen';
				playaFull.className = 'playaIcon';
				playaControls.appendChild(playaFull);
			}
			playaControls.appendChild(playaPlayPlay);
			playaControls.appendChild(playaQuality);
			playaControls.appendChild(playaSets);
			playaControls.appendChild(playaSub);
			playaControls.appendChild(playaSeekTime);
			//youtube
			if(activePlayas[playaID]=='youtube'){
				var playaYoutube = document.createElement('a');
				playaYoutube.id = 'playaYT';
				playaYoutube.className = 'playaIcon';
				playaYoutube.href = 'https://www.youtube.com/watch?v='+allSets[playaID].v;
				playaYoutube.target = '_blank';
				//playaControls.appendChild(playaYoutube);	
			}
			if(activePlayas[playaID]=='facebook' && typeof(allSets[playaID].org)=='object'){
				var playaYoutube = document.createElement('a');
				playaYoutube.id = 'playaYT';
				playaYoutube.className = 'facebook playaIcon';
				var urlsplit = allSets[playaID].org.src.split(/[?&]/);
				var linkurl = '';
				for(var key in urlsplit){
					var cursplit = urlsplit[key];
					if(cursplit.indexOf('videos')>0){
						linkurl = decodeURIComponent(cursplit.replace('href=',''));
						break;
					}
				}
				playaYoutube.href = linkurl;
				playaYoutube.target = '_blank';
				//playaControls.appendChild(playaYoutube);	
			}
			playaControls.appendChild(playaVol);
			// controls wrap
			var playaControlsWrap = document.createElement('div');
			playaControlsWrap.id = 'playaControlsWrap';
			playaControlsWrap.appendChild(playaSeekWrap);
			playaControlsWrap.appendChild(playaControls);
			// inWrap
			playaWrap.appendChild(playaControlsWrap);
		}
		
		var beforeWhat = playaObj;
		if(sets.rem){
			var beforeWhat = sets.rem;	
		}else{
			if(typeof(beforeWhat.parentNode)=='object'){
				var beforeWhatParent = beforeWhat.parentNode;
				if(typeof(beforeWhatParent)=='object'){
					var objWidth = beforeWhat.clientWidth;
					var objHeight = beforeWhat.clientHeight;
					var parentWidth = beforeWhatParent.clientWidth;
					var parentHeight = beforeWhatParent.clientHeight;
					if(parentWidth>0 && parentHeight>0 && objWidth>0 && objHeight>0){
						if(parentWidth==objWidth && parentHeight==objHeight){
							//toto nema zmysel
							//beforeWhat = beforeWhatParent;	
						}
					}
				}
			}
		}
		
		// all wrap
		var playaAllWrap = document.createElement('div');
		playaAllWrap.id = 'etargetPlayerWrap_eta'+playaID+'get';
		// arrts->
		var adsType = adsType ? 'etargetPlayerWrapAll '+adsType : 'etargetPlayerWrapAll';
		var wrapClass = deviceType ? adsType+' '+deviceType : adsType;
		var autoplay = typeof(settings.a)=='number' ? settings.a : (eplayaAutoplay>0 ? eplayaAutoplay : 0);
		var fullscrn = typeof(settings.f)=='number' ? settings.f : 1;
		var related = typeof(settings.r)=='number' ? settings.r : defRelated;
		var controls = typeof(settings.c)=='number' ? settings.c : 1;
		//
		var parent = beforeWhat.parentNode;
		if(typeof(parent)=='object'){
			if(typeof(parent.offsetWidth)=='number'){
				var clearWidth = parseInt(playaWidth);
				if(parent.offsetWidth>0 && parent.offsetWidth<clearWidth){
					playaWidth = parent.offsetWidth+'px';		
				}	
			}
		}
		//
        playaAllWrap.setAttribute('class',wrapClass);  
        playaAllWrap.setAttribute('data-eref',etargetVideoReferrer);  
        if(videoReferer)
            playaAllWrap.setAttribute('data-vref',videoReferer);  
		playaAllWrap.setAttribute('data-edom',etargetVideoDomain);  
		playaAllWrap.setAttribute('autoplay',autoplay);  
		playaAllWrap.setAttribute('fs',fullscrn);  
		playaAllWrap.setAttribute('rel',related);  
		var csstext = 'min-width:'+playaWidth+';min-height:'+playaHeight+';';
		/*
		if(sets.css){
			var position = sets.css.getPropertyValue('position');
			if(position!='static'){
				//if(sets.css.getPropertyValue('position')) csstext+='position:'+position+';';	
				if(sets.css.getPropertyValue('top')) csstext+='top:'+sets.css.getPropertyValue('top')+';';
				if(sets.css.getPropertyValue('right')) csstext+='right:'+sets.css.getPropertyValue('right')+';';
				if(sets.css.getPropertyValue('bottom')) csstext+='bottom:'+sets.css.getPropertyValue('bottom')+';';
				if(sets.css.getPropertyValue('left')) csstext+='left:'+sets.css.getPropertyValue('left')+';';
			}
			if(position=='absolute'){
				csstext+='max-width:inherit;';
				var css = window.getComputedStyle(parent,null);
				if(parent.style.cssText==''){
					parent.style.cssText = 'width:'+css.getPropertyValue('width')+';height:'+css.getPropertyValue('height')+';';
				}
			}
		}
		if(typeof(parent)=='object'){
			if(playaWidth=='100%'){
				var pw = parseInt(parent.clientWidth);
				if(pw<=0){
					parent.style.width = '100%';
				}
			}
			if(playaHeight=='100%'){
				var ph = parseInt(parent.clientHeight);
				if(ph<=0){
					parent.style.height = '100%';
				}
			}
		} 
		*/
		if(sets.customcss){
			csstext += sets.customcss;	
		}
		
		var csstext2 = csstext;
		if(sets.po){
			csstext2 = csstext+';max-height:'+playaHeight+';';	
		}
		csstext = 'width:100%;height:100%;';
		
		playaAllWrap.style.cssText = csstext+';color:white;';
		playaAllWrap.appendChild(playaWrap);
		
		var notif = document.createElement('img');
		notif.id = 'playaNotif';
		notif.style.cssText = 'width:1px;height:1px;position:absolute;z-index:99;top:0px;right:0px;border:none;background:transparent;display:block;';
		playaAllWrap.appendChild(notif);
		
		var clear = document.createElement('div');
		clear.style.cssText = 'width:100%;clear:both;';
		playaAllWrap.appendChild(clear);
		
		original[playaID] = playaObj;

		if(typeof(playaType)=='string'){
			var ssrc = settings.s;
			if(typeof(ssrc)=='object'){
				if(ssrc.length>1) ssrc = ssrc[0];
				if(typeof(ssrc.src)=='string'){
					ssrc = ssrc.src;	
				}
			}
			if(typeof(settings.org)=='object'){
				if(typeof(settings.org.src)=='string'){
					ssrc = settings.org.src;		
				}
			}
			if(typeof(ssrc)=='string'){
				if(ssrc.length>0 && playaType!='uni'){	
					sendPixel(playaType,playaSubtype,ssrc);
				}
			}
		}
		
		webConsole0('retcont:'+retCont);
		if(retCont) return playaAllWrap;
		
		var iframe = document.createElement('iframe');
		//iframe.src = '';
		iframe.id = 'content_iframe_'+playaID;
		iframe.className = 'content_iframe_all'; 
		iframe.style.cssText = csstext2+';border:0px;';
		iframe.setAttribute('data-id',playaID);
		iframe.setAttribute('allowFullScreen',true);
		iframe.setAttribute('webkitAllowFullScreen',true);
		iframe.setAttribute('scrolling','no');

		var remall = typeof(settings.remall)!='undefined' ? true : false; 
		addElement(beforeWhat,iframe,insert,remall,settings);
		
		if(sets.po){
			addElement(iframe,sets.po,false,false,false,true,true);	
		}
        
        var edom = etargetVideoDomain ? etargetVideoDomain : 'sk';
		              
		var style = document.createElement('link');
		style.type = 'text/css';
    	style.rel = 'stylesheet';
    	style.href = '//'+edom+'.search.etargetnet.com/embed/player/eplayaV5.1.css';
    	
    	var style_popup = document.createElement('link');
		style_popup.type = 'text/css';
    	style_popup.rel = 'stylesheet';
    	style_popup.href = '//'+edom+'.search.etargetnet.com/embed/player/ajax_popup.css';
    	
    	var jquery = document.createElement('script');
    	jquery.type = 'text/javascript';
    	jquery.async = false; 
    	jquery.src = '//'+edom+'.search.etargetnet.com/embed/player/jquery.etarget.min.js';
    	
    	var popup = document.createElement('script');
    	popup.type = 'text/javascript';
    	popup.async = false; 
    	popup.src = '//'+edom+'.search.etargetnet.com/embed/player/ajax_popup.php';
    	
    	var vpaid = document.createElement('script');
    	vpaid.type = 'text/javascript';
    	vpaid.async = false; 
    	vpaid.src = '//'+edom+'.search.etargetnet.com/embed/player/vpaidV3.2.js?t='+parseInt(Math.random()*1000);
    	
    	var handler = document.createElement('script');
    	handler.type = 'text/javascript';
    	handler.async = false; 
    	handler.src = '//'+edom+'.search.etargetnet.com/embed/player/eplayaHandlerV3.2.js?t='+parseInt(Math.random()*1000);
    	
    	var yuscript = document.createElement('script');
		yuscript.type = 'text/javascript';
		yuscript.async = false; 
		yuscript.src = 'https://www.youtube.com/iframe_api';
        
        var defscript = document.createElement('script');
        defscript.type = 'text/javascript';
        defscript.async = false; 
        defscript.innerHTML = "var ourips = '1';";
		  
        webConsole0(iframe);
		iframe.contentWindow.document.open();
		
		try{
            webConsole0('refdomaino',refdomaino);
            webConsole0('ie',ie);
            if(!ie){
                /* vyzera to tak ze tato metoda uz niei je podporovana
                iframe.contentWindow.document.domain = refdomaino;
                */
            }
		}catch(e){
			webConsole0(e);
		}
		
		iframe.contentWindow.document.write(playaAllWrap.outerHTML);
        if(typeof(ourips)=='string'){
            if(ourips=='1'){
                iframe.contentWindow.document.head.appendChild(defscript);      
            }   
        }

		iframe.contentWindow.document.head.appendChild(style);
		iframe.contentWindow.document.head.appendChild(style_popup);
		iframe.contentWindow.document.head.appendChild(yuscript);  
		iframe.contentWindow.document.head.appendChild(jquery);  
		iframe.contentWindow.document.head.appendChild(popup);  
		iframe.contentWindow.document.head.appendChild(vpaid);  
		iframe.contentWindow.document.head.appendChild(handler); 

		iframe.contentWindow.document.close(); 
        
		//resizeContent(false,playaID,playaWidth,playaHeight);
		//eRollback(playaID);
		
		eplayaBuildCnt++;
		
		tryRemove(sets);
		
	}
	
	var buildSearchQuery=function(url){
		
		var edom = etargetVideoDomain ? etargetVideoDomain : 'sk';
		var eref = etargetVideoReferrer;
		var ceuvn = '';
		try{
			if(typeof(parent)=='object'){
				ceuvn = parent.ceuvn;
			}
		}catch(e){
			webConsole0(e);	
		}                             
		var eurl = '//'+edom+'.search.etargetnet.com/';
		url = url.split(eurl);
		if(url.length==1){
			url = url[0];
		}else{
			url = url[1];
		}
		var parts = url+'&ref='+eref+'&ceuvn='+ceuvn;
		eurl = eurl+parts;	
		return eurl;
			
	}

	var getPlayerType=function(){
		if(typeof(etargetVideoType)=='string'){
			switch(etargetVideoType){
				case '1':
				return 'hoverline';
				break;
				case '2':
				return 'fullbar';
				break;
			}
		}
		return 'normal';	
	}

	var addElement=function(obj,what,insert,remall,setts,norem,after){
		webConsole0(obj);
		webConsole0(what);
		if(obj && obj.parentNode){
			if(insert){
				obj.appendChild(what);
			}else{
				if(remall){
					var parent = obj.parentNode;
					if(typeof(setts)=='object'){
						if(setts.p == setts.origin){
							parent = setts.origin;
							obj = false;
						}
					}
					while (parent.firstChild) {
					    parent.removeChild(parent.firstChild);
					}
					if(obj){
						removeElement(obj);		
					}
					parent.appendChild(what);
				}else{
					if(after){
						obj.after(what);	
					}else{
						obj.parentNode.insertBefore(what,obj);	
					}
					if(!norem){
						removeElement(obj);
					}
				}	
			}
		}
	}

	var removeElement=function(obj){
		if(obj){
			var parentNode = obj.parentNode;
			if(parentNode){
			    parentNode.removeChild(obj);
			}	
		}
	}                                                                                                                                 

	var noteVideoView=function(cur,end,playaID,skip){
		
		if(noViewCount[playaID]) return false;
		
		var cur = Math.ceil(cur);
		var end = parseInt(end);
		if(typeof(notedVideoView[playaID])=='undefined'){
			notedVideoView[playaID] = 0;
		}
		if(cur>0 && end>0){
			var time = 0;
			if(parseInt(cur/end*100)>=1 && notedVideoView[playaID]<1){
				time = 1;
				type = 1;
				notedVideoView[playaID] = 1;
			}
			if(parseInt(cur/end*100)>=25 && notedVideoView[playaID]<25){
				time = 25;
				type = 1;
				notedVideoView[playaID] = 25;			
			}
			if(parseInt(cur/end*100)>=50 && notedVideoView[playaID]<50){
				time = 50;
				type = 1;
				notedVideoView[playaID] = 50;			
			}
			if(parseInt(cur/end*100)>=75 && notedVideoView[playaID]<75){
				time = 75;
				type = 1;
				notedVideoView[playaID] = 75;			
			}	
			if(cur>=end	&& notedVideoView[playaID]<100){
				time = 100;
				type = 1;
				notedVideoView[playaID] = 100;
			}
			if(time!=0){
				var crea = creative[playaID];	
				var cmp = campaign[playaID];	
				var rand = Math.floor(1E4*Math.random());
				var edom = etargetVideoDomain ? etargetVideoDomain : 'sk';
				var eref = etargetVideoReferrer;
				var hash = (crea*rand)+"_"+(cmp*rand)+"_"+(time*rand)+"_"+(type*rand)+"_"+(eref*rand);
				var time = adstime[playaID];
				if(crea>0 && cmp>0 && hash && rand>0 && eref>0 && time>0){
					var url = '//'+edom+'.search.etargetnet.com/embed/vview.php?ref='+eref+'&h='+hash+'&rand='+rand+'&t='+time;
					ajaxcall2(url);
				}
			}
		}
	}
	
	var setCookie=function(cname,cvalue,expire,domain,path){
		var d = new Date();
	    d.setTime(d.getTime() + (expire));
	    var expires = "expires="+ d.toUTCString();
	    var cs = cname + "=" + cvalue + "; " + domain + "; " + path;
	    document.cookie = cs;
	}
	
	var getDimensions=function(ifrm,playaID){
		var ptype = activePlayas[playaID];
		var dur = [0,0];
		dur[0] = ifrm.style.width;
		dur[1] = ifrm.style.height;
		return dur;		
	}
	
	var ajaxcall2=function(src,async,callback){
		return ajaxcall(null,src,async,callback);
	}
	
	var ajaxcall=function(settings,src,async,callback){
		var xmlhttp;
		if(window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		}else{// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		if(settings){
			/*
			var ptype = activePlayas[settings.i];
			var hackurl = '//etarget.sk/rastislavs/embed/vimhack.php?type='+ptype+'&vid='+settings.v;
			var res = '';
			xmlhttp.open("GET",hackurl,async);  
			xmlhttp.send();
			settings.s = xmlhttp.responseText;
			return xmlhttp;
			*/
			return true;
		}else if(src){
			xmlhttp.open("GET",src,async);
			
			xmlhttp.onreadystatechange = function() {
				if(xmlhttp.readyState == 4) {
					if(typeof callback == "function") {
						callback(xmlhttp);
					}
				}
			}
			
			xmlhttp.send();	
			return xmlhttp;
		}
	}
	
	var parseSubs=function(text){
		var lines = text.split('\n');
		var sub=[];
		var i=0;
		for(key5 in lines){
			var line = lines[key5];
			var digit = line.replace(/\d/g,'');
			var time = line.replace(/\s/g,'').split('-->');
			if(line){
				if(!digit){
					// nepotrebujeme
				}else if(time.length==2){
					if(obj){
						sub[i]=obj;
						i++;
					}
					var obj=[];
					obj.start = parseFloat(time[0].replace(/:/g,'').replace(',','.'))*1000;
					obj.end = parseFloat(time[1].replace(/:/g,'').replace(',','.'))*1000;	
				}else{
					obj.text = line;
				}
			}
		}
		return sub;
	}

	var getPosition=function(e) {
		var offset = {x:0,y:0};
		while (e)
		{
		    offset.x += e.offsetLeft;
		    offset.y += e.offsetTop;
		    e = e.offsetParent;
		}

		if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft))
		{
		    offset.x -= document.documentElement.scrollLeft;
		    offset.y -= document.documentElement.scrollTop;
		}
		else if (document.body && (document.body.scrollTop || document.body.scrollLeft))
		{
		    offset.x -= document.body.scrollLeft;
		    offset.y -= document.body.scrollTop;
		}
		else if (window.pageXOffset || window.pageYOffset)
		{
		    offset.x -= window.pageXOffset;
		    offset.y -= window.pageYOffset;
		}
	    return offset;
	}
	
	var htmlConsole = function(text){
		
		var console = document.getElementsByClassName('html_console')[0];
		if(typeof(console)=='object'){
			console.innerHTML = console.innerHTML+text+"<br><hr>";
		}
			
	}

	var eplayaInit=function(){
		if(typeof(noautorun)=='boolean'){
			if(noautorun==true){
				scanall(1);	
			}			
		}else{
			scanall(1);	
		}		
	}
	
	var sendPixel=function(type,subtype,src){
		webConsole0('setting:'+type+':'+subtype);
		ajaxcall2(buildSearchQuery('embed/pixel.php?type='+type+'&subtype='+subtype+'&url='+encodeURIComponent(src)),true);	
	}

	eplayaInit();

}catch(e){
	//eRollback();
	webConsole0(e);
}
function eplayaTryScanAll(){
	if(typeof('scanall')=='function'){
		scanall();
	}
}
function topfind(s){
    try{
        if(typeof(window[s])=='string'){
            return window[s];
        }else{
            if(typeof(top[s]=='string')){
                return top[s];    
            }else{
                return '';
            }
        }   
    }catch(e){
        webConsole0(e);
    } 
}
var eplayaRebuildInterval = false;
var eplayaRebuildIntervalCnt = 0;
try{
	if(true){
		if(typeof(eplayaRebuildInterval)!='function' && eplayaRebuildIntervalCnt==0){
			eplayaRebuildInterval = setInterval(function(){
				if(typeof(eplayaBuildCnt)!='undefined'){
					if(eplayaBuildCnt==0){
						scanall();
					}else{
						clearInterval(eplayaRebuildInterval);		
					}	
				}else{
					if(eplayaRebuildIntervalCnt>4){
						clearInterval(eplayaRebuildInterval);	
					}	
				}
				if(eplayaRebuildIntervalCnt>9){
					clearInterval(eplayaRebuildInterval);	
				}
				eplayaRebuildIntervalCnt++;		
			},2000);
		}
	}
}catch(e){
	webConsole0(e);
}

function webConsole0(e){
    if(typeof(webConsole)=='function'){
        webConsole(e);
    }else{
        if(typeof(ourips)=='string'){
            if(ourips=='1'){
                if(arguments.length==1){
                    console.log(arguments[0]);
                }else{
                    console.log(arguments); 
                }
            }   
        }
    }   
}