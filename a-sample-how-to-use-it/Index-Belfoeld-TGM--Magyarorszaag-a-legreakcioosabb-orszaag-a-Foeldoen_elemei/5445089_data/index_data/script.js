var bannerWidth = 640;
var bannerHeight = 360;

var loopDuration = 15;
var pauseLastLoopAfter = 14.9;

var loopNumber = 0;

var whiteoutSpeed = 0.5;

var enableTerms = true;

var enableCtaPause = false;
var ctaPauseAfter = 30000;

var ctaSolid = false;

var disclaimerEnable = false;

var preloadImages = [];
var images100 = [];
var images = [];

var tl_Frame = [];


var tl;
var bgTL = new TimelineMax({repeat: -1});

tl_Frame[1] = function() {    
    
    if(Dynamic_Content.Background === "Altitude") {
        //clouds animation ---------------------------------------
        
        //clouds animation end -----------------------------------   
    }

    if(Dynamic_Content.Background === "Coast") {
        //coast animation ---------------------------------------
        var bgAnim = function() {    
            bgTL.set(flare, {rotation: 17.3},0);
            bgTL.to(flare, 40, {rotation: -60, ease:Linear.easeNone},0);
            bgTL.to(flare, 20, {opacity: 1, ease:Linear.easeNone},0);
            bgTL.to(flare, 40*5, {rotation: -360, ease:Linear.easeNone, onComplete: function() { console.log("restart bg");bgTL.restart(); }},40);
        
            return bgTL;
        }
        bgAnim();
        //coast animation end -----------------------------------   
    }

    if(Dynamic_Content.Background === "Inland") {
        //inland animation ---------------------------------------
      
        //inland animation end -----------------------------------   
    }


    tl = new TimelineMax();

    tl.set([copy_1,copy_2,copy_3,copy_4,copy_5],{opacity:0},0);
        

    // frame 1
    tl.to(copy_1, 1, {opacity: 1}, 1);
    tl.to(copy_1, 1, {opacity: 0}, 6);
    

    // tl.to(cta_all, 0.8, {opacity: 1}, 8.7);

    return tl;
}

// frame with disclaimer - priceFrame === "false"
tl_Frame[2] = function() { 

    var tl = new TimelineMax();

    if(Dynamic_Content.PriceFrame == false) {   
        
        tl.to([carName,copy_3,copy_4,copy_5], 1, {opacity: 1}, 1);

        tl.to([cta_all,disclaimer], 1, {opacity: 1}, 1.5);

        if (enableTerms) {
            tl.to(terms_copy, 1, {opacity: 1}, 1.5);
            tl.set(terms_btn, {display: "block"}, 1.5);
        }   
   
    }
    return tl;
}

//price frame - priceFrame === "true"
tl_Frame[3] = function() {
    
    var tl = new TimelineMax();
    if(Dynamic_Content.PriceFrame == true) {   

        tl.to([carName,from,price,copy_5], 1, {opacity: 1}, 1);
        tl.to(cta_all, 1, {opacity: 1}, 1.5);
        
        if (enableTerms) {
            tl.to(terms_copy, 1, {opacity: 1}, 1.5);
            tl.set(terms_btn, {display: "block"}, 1.5);
        }        

    }
    return tl;
} 


// ============================== clicktag, cta, terms (mouse events) ============================== //

function clicktag_Click(e) {
    if (dcSelect) {
//       Enabler.exit("Exit Click");
//       Enabler.counter("Counter Click");

        var exitURL = Dynamic_Content.Exit_Url.Url;
        Enabler.exitOverride("Exit Clicked", exitURL);
    } else {
        window.open(window.clickTag);
    }
}

function mouseEnter() {
    if (!ctaStop) {
        var cta_2_bg = document.getElementById("cta_2_bg");
        cta_2_bg.style.animation = "cta_animation_in 0.01s 0s linear forwards";

        if (!ctaSolid) {
            var cta_1 = document.getElementById("cta_1");
            cta_1.style.color = "#1b394e";
        }
    }
}

function mouseLeave() {
     if (!ctaStop) {
        var cta_2_bg = document.getElementById("cta_2_bg");
        cta_2_bg.style.animation = "cta_animation_out 0.01s 0s linear forwards";

        if (!ctaSolid) {
            var cta_1 = document.getElementById("cta_1");
            cta_1.style.color = "#ffffff";
        }
     }
}

function termsEnter() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_over 0.3s 0s linear forwards";
    terms_text.style.animation = "terms_text_animation_over 0.3s 0s linear forwards";
    
    mouseEnter(); // cta on state
    animationsPause();

    bgTL.pause();

    TweenMax.to(cta_all, 0.3, {opacity:0, ease: Power0.easeNone});
}

function termsLeave() {
    terms_overlay.style.animation = undefined;
    terms_overlay.style.animation = "terms_overlay_animation_out 0.3s 0s linear forwards";
    terms_text.style.animation = "terms_text_animation_out 0.3s 0s linear forwards";

    if (!stopAnimations) {         
        animationsPlay();
    }

    bgTL.play();

    TweenMax.to(cta_all, 0.3, {opacity:1, ease: Power0.easeNone});
}

// ============================== others ============================== //









// ============================== Do not edit ============================== //

var mTL,content,loopCount=1,stopAnimations=false,ctaStop=false,imagesLoad = false,Dynamic_Content,cssIsLoaded = false,bgPosDone = false,flarePosDone = false,flareDone = false,bgScale,copiesLeft = 25,bgLeft = 0,bgTop=0;
var autoScaleRan = false;
// preloading images
if (!preloadImages) var preloadImages = [];


// ---------- special functions ---------- //

function ctaPause() {
    if (enableCtaPause) {
        setTimeout(function() {
            mouseLeave();
            
            ctaStop = true;
        }, ctaPauseAfter);   
    }
}



// ---------- (06) - main animation ---------- //

function startMainTimeLine() {
    for (var i = 1; i < tl_Frame.length; i++) {
        mTL.add(tl_Frame[i]());   
    }

    mTL.to(whiteout, whiteoutSpeed, {opacity: 0}, 0);
    
    mTL.set({}, {onComplete: runWhiteout}, loopDuration - whiteoutSpeed - 0.1);
    

    mTL.set({}, {onComplete: pauseMainTimeLine}, pauseLastLoopAfter);
    mTL.set({}, {onComplete: resetMainTimeLine}, loopDuration);
}

function runWhiteout() {
    if (loopCount !== loopNumber) {
        TweenMax.to(whiteout, whiteoutSpeed, {opacity: 1});
    }
}

function pauseMainTimeLine() {
    if (loopCount == loopNumber) {
        console.log("animation stop");
        stopAnimations = true;
        animationsPause();
    }
}

function resetMainTimeLine() {
    if (loopCount !== loopNumber) {
        loopCount++;
        if(loopCount == loopNumber) {
            whiteout.style.display = "none";
        }
        mTL.restart();
    }
}

function animationsPause() {
    mTL.pause();
}

function animationsPlay() {
    mTL.play(); 
}



// ---------- (05) - init ---------- //

function init() {
    content = document.getElementById("content");
    var ad_size = document.querySelectorAll(".ad_size");
    var cta_all = document.getElementById("cta_all");
    var cta_1 = document.getElementById("cta_1");
    
    TweenMax.set([content, main, clicktag], {width: bannerWidth, height: bannerHeight});
    TweenMax.set(border, {width: bannerWidth-2, height: bannerHeight-2});

        // prestart adjust elements start ----------------------------------
        var ctaBig = false;
    
        if (bannerHeight > 500 && bannerWidth > 900) {
            plinth.style.width = 320 +"px";
        } else if (bannerHeight > 379 && bannerWidth > 850) {
            plinth.style.width = 220 +"px";
        } else {
            plinth.style.width = 166+"px";

            plinth.style.right = 20 + "px";
            plinth.style.bottom = 18 + "px";

            ctaBig = true;  
            
            cta_all.style.minWidth = "180px";
            cta_all.style.maxWidth = "190px";
            cta_all.style.minHeight = "32px";
            cta_all.style.maxHeight = "66px";
            
            cta_all.style.left = "25px";
            cta_all.style.bottom = "20px";

            cta_1.style.maxWidth = "190px";
            cta_1.style.minHeight = "14px";
            cta_1.style.fontSize = "14px";
            cta_1.style.lineHeight = "14px";

            copy_1.style.left = copiesLeft+"px";
            copy_2.style.left = copiesLeft+"px";
            copy_3.style.left = copiesLeft+"px";
            copy_4.style.left = copiesLeft+"px";
            copy_5.style.left = copiesLeft+"px";
           
            from.style.left =    copiesLeft+"px";
            price.style.left =   copiesLeft+"px";
            carName.style.left = copiesLeft+"px";

            if (disclaimerEnable) {
                disclaimer.style.bottom = "5px";  
            }
                      
        }        

        // prestart adjust elements end ----------------------------------
 
        
    mTL = new TimelineMax({repeat: loopNumber-1});
    
    
    copyInitUpdate();

    ctaPause();

     // new cta script start ---------------------------------------------------------------------
     const cta_1_width = parseFloat(window.getComputedStyle(cta_1).width);
     const cta_1_height = parseFloat(window.getComputedStyle(cta_1).height);
     const newCtaAllWidth = cta_1_width + 20;

     let maxWidth;
     
     if(ctaBig) {
        maxWidth = 192;
     } else {
        maxWidth = 292;
     }

     //cta edge fix
     const isEdge = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style && !window.navigator.msPointerEnabled;
     if(isEdge) {

        if(ctaBig) {
            maxWidth = 212;
        } else {
            maxWidth = 312;
        }

     }

     if (newCtaAllWidth < maxWidth) {
         cta_all.style.width = newCtaAllWidth + "px";
     } else {
         cta_1.style.whiteSpace = "initial";
     }

     if(ctaBig) {
        cta_all.style.height = parseFloat(window.getComputedStyle(cta_1).height) + 14 + "px";
     } else {
        cta_all.style.height = parseFloat(window.getComputedStyle(cta_1).height) + 22 + "px";
     }
    
     //IE fix
        cta_1.style.width = parseFloat(window.getComputedStyle(cta_all).width) - 20 + "px";
        cta_all.style.height = parseFloat(window.getComputedStyle(cta_1).height) + 14 + "px";
    
     // new cta script end ----------------------------------------------------------------------
    
    

        // auto adjusting start ---------------------------------------------------------------------------------------------------- 

        const space = (bannerHeight/100) * 0.15; //copies space

        if (Dynamic_Content.PriceFrame === false) {
            copy_3.style.top = parseFloat(window.getComputedStyle(carName).fontSize) + (bannerHeight/100 * 9.5) + "px";
            price.style.top =  parseFloat(window.getComputedStyle(carName).fontSize) + parseFloat(window.getComputedStyle(copy_3).fontSize) + (bannerHeight/100 * 9.5) + "px";
            copy_5.style.top = parseFloat(window.getComputedStyle(price).top) + parseFloat(window.getComputedStyle(price).fontSize) + "px";
        }

        if (Dynamic_Content.PriceFrame === true) {            
            from.style.top = (parseFloat(window.getComputedStyle(carName).fontSize) *1.13) + (parseFloat(window.getComputedStyle(carName).top)) + space + "px";         
            price.style.top =  (parseFloat(window.getComputedStyle(from).fontSize)*1.1) + parseFloat(window.getComputedStyle(from).top)  + space + "px";
            copy_5.style.top = parseFloat(window.getComputedStyle(price).top) + (parseFloat(window.getComputedStyle(price).fontSize)) + space + "px";
        }

        if(disclaimerEnable === true) { 
            disclaimer.style.left = cta_all.getBoundingClientRect().left + 1 + "px";     
            if(parseFloat(window.getComputedStyle(disclaimer).fontSize) > 12) {
                disclaimer.style.fontSize = 11 + "px";
            }
        }
        
        if (enableTerms) {
            if (copy_5.innerText.length < 2) {
                terms_copy.style.top = parseFloat(window.getComputedStyle(price).top) + (parseFloat(window.getComputedStyle(price).fontSize)*1.7 ) + space + "px";
            } else {
                terms_copy.style.top = parseFloat(window.getComputedStyle(copy_5).top)+ (parseFloat(window.getComputedStyle(copy_5).fontSize)*1.5 ) + space + "px";
            }
                
            // terms_btn.style.width = terms_copy.offsetWidth + 10 + "px";
            // terms_btn.style.height = terms_copy.offsetHeight + 9 + "px";
            // terms_btn.style.top = parseFloat(window.getComputedStyle(terms_copy).top) - 4 + "px"; //same as terms copy -2
            // terms_btn.style.left = parseFloat(window.getComputedStyle(terms_copy).left) - 5 + "px"; //same as terms copy -2
        

            //overlay centering
            terms_text.style.height = "auto";
       
        }
 
        // backgrounds

        // bg1
        if (Dynamic_Content.Background === "Altitude") {
        
        }

        // bg2
        if (Dynamic_Content.Background === "Coast") {

            console.log("flare.getBoundingClientRect().width)   - " + flare.getBoundingClientRect().width);

            function setFlareScale() {
                bg2_flare.style.transform = "scale(" + bannerHeight/90/5.9 + ")";
                flarePosDone = true;
            }           
            setFlareScale();

            console.log("flare.getBoundingClientRect().width)   - " + flare.getBoundingClientRect().width);
        
            function setFlare() {
                if (bg_blank.getBoundingClientRect().width !== 0 && flare.getBoundingClientRect().width !== 0 && bg_blank.getBoundingClientRect().width !== 0 && cssIsLoaded && bgPosDone && flarePosDone) {
                    console.log("flare.getBoundingClientRect().width)   - " + flare.getBoundingClientRect().width);
                    
                    flare.style.top = - (bg2_flare.offsetHeight/2)*1 + "px";
                    flare.style.left = bannerWidth - (bg2_flare.offsetWidth/2)*1 + "px";

                    flareDone = true;
                } else {
                    console.log("waiting for flare & bg to be loaded");
                    setTimeout(setFlare,20);
                }            
            }
            setFlare();
        }
        
        // bg3 
        if (Dynamic_Content.Background === "Inland") {
            // bg3_gradient.width = bannerWidth; bg3_sky.width = bannerWidth;
            // bg3_gradient.height = bannerWidth;

            // bg3Wrapper.style.transform = "scale(" + (bannerHeight/333) + ")";              
            // bg3CloudsSmall.style.top = 137 * 0.7 * (bannerHeight/333) * (333/bannerHeight) + "px";
        }

        //copies exclusions
        if (bannerHeight < 280) {
            copy_1.style.width = "45%";
        }


         if (enableTerms && ctaBig) {
            terms_copy.style.left = "25px";
            terms_text.style.left = "26px";
            terms_text.style.width = bannerWidth-52+"px";
            terms_text_container.style.height = terms_copy.getBoundingClientRect().y + "px";
        }  

        // auto adjusting end ----------------------------------------------------------------------------------------------------

        
    function startBanner() {
            
        if (Dynamic_Content.Background === "Coast") {
            console.log("flare.getBoundingClientRect().width)   - " + flare.getBoundingClientRect().width);
                if (flarePosDone && flareDone) {
                    content.style.opacity = 1;
                    startMainTimeLine();  
                } else {
                    setTimeout(startBanner,10);
                }
        } else {
            content.style.opacity = 1;
            startMainTimeLine();  
        }             
    }

    setTimeout(startBanner, 10);
}

// ---------- (04) - dynamic ---------- //

function initDynamicContent() {
    Dynamic_Content = dynamicContent.CCL_Shopper_2018_08_HU_Sheet1[0];

    if (Dynamic_Content.Background === "Altitude") {
        bg_blank.src = "bg1_altitude/bg1_"+Dynamic_Content.Nameplate+".jpg";
    }
    if (Dynamic_Content.Background === "Coast") {
        bg_blank.src = 'bg2_coast/bg2_'+Dynamic_Content.Nameplate+'.jpg';  
        bg2_flare.src = 'bg2_coast/bg2_sun.png'; 
    }
    if (Dynamic_Content.Background === "Inland") {
        bg_blank.src = "bg3_inland/bg3_"+Dynamic_Content.Nameplate+".jpg";  
    }


    from.innerHTML = Dynamic_Content.From;
    price.innerHTML = "<span>" + Dynamic_Content.Price + "</span><span id='priceEnd'>"+Dynamic_Content.Copy2+"</span>";

    cta_1.innerHTML = Dynamic_Content.Cta;

    carName.innerHTML = Dynamic_Content.CarName;

    copy_1.innerHTML = Dynamic_Content.Copy1;
    copy_3.innerHTML = Dynamic_Content.Copy3;
    copy_4.innerHTML = Dynamic_Content.Copy4;
    copy_5.innerHTML = Dynamic_Content.Copy5;
    

    
    if (disclaimerEnable == true) {
        disclaimer.innerHTML = Dynamic_Content.Disclaimer; 
    } else {
        disclaimer.style.height = 0;
    }
       
    // exitURL = Dynamic_Content.exitURL;

    if (enableTerms) {
        // terms_copy.innerHTML = Dynamic_Content.TermsButton;

        function setNbsp(text) {
            if (text.indexOf("a ") !== -1) {
                text = text.replace("a ", "a&nbsp;");
                setNbsp(text);
            } else if (text.indexOf("A ") !== -1) {
                text = text.replace("A ", "A&nbsp;");
                setNbsp(text);
            } else if (text.indexOf("CO2") !== -1) {
                text = text.replace("CO2", "CO<sub>2</sub> ");
                setNbsp(text);
            } else {
                terms_text.innerHTML = text;
                return;        
            }
        }

        setNbsp(Dynamic_Content.Terms);
    }
}

function copyInitUpdate() {

    if (Dynamic_Content.Copy5.length < 2 && bannerWidth > 1249) {
        // exlusion <-
    }
    
    // copyScale(copy_1);
    copyScale(copy_2);


    // copyScale(carName);
    var carNameRatio; 

    if (bannerHeight >= 600) { carNameRatio = 1; copiesLeft = 25; }
    else if (bannerHeight >= 400) { carNameRatio = 0.8; copiesLeft = 25; }
    else if (bannerHeight >= 360) { carNameRatio = 0.7; copiesLeft = 20;}
    else if (bannerHeight >= 300) { carNameRatio = 0.65; copiesLeft = 20;}
    else if (bannerHeight >= 250) { carNameRatio = 0.6; copiesLeft = 20;}
    //exclusions
    if (bannerHeight >= 400 && bannerWidth <= 580) { carNameRatio = 0.7; copiesLeft = 20; }
    if (bannerHeight >= 400 && bannerWidth <= 468) { carNameRatio = 0.6; copiesLeft = 20; }

    carName.style.fontSize = 52.15 * carNameRatio + "px";
    copy_1.style.fontSize = 52.15 * carNameRatio + "px";
    
    // frame with disclaimer
    if (Dynamic_Content.PriceFrame == false) {
        copyScale(copy_3);
        copyScale(copy_4);
    }

    // frame with price
    if (Dynamic_Content.PriceFrame == true) {
        copyScaleRatio(from,2.3);
        copyScaleRatio(price,0.695);
        copyScaleRatio(copy_5,2.739);

        document.getElementById("priceEnd").style.fontSize =  parseFloat(window.getComputedStyle(from).fontSize) + "px";
    }

    if (disclaimerEnable) {
        copyScaleRatio(disclaimer, 4.098);
    }

    if (enableTerms) {
        // copyScaleRatio(terms_copy,4.098);
        copyScale(terms_text); 
    }

    
}

function copyScale(copyName) { 
    var k = 1.05;
    
    function copyInit() {
        var copyFontSize = parseFloat(window.getComputedStyle(copyName).fontSize);

        copyName.style.fontSize = copyFontSize - (k=(k>0.05)?(k-0.05):0.05) + "px"; // it means -1, -0.95, -0.9, -0.85 ... -0.15, -0.1, -0.1, -0.1 ...

        if ((copyName.scrollWidth <= copyName.clientWidth+0.5) && (copyName.scrollHeight <= copyName.clientHeight+1)) {
            return;
        } else { copyInit(); }
    }
    copyInit();
}

function copyScaleRatio(copyName,ratio) { 
    var copyFontSize = parseFloat(window.getComputedStyle(carName).fontSize);

    copyName.style.fontSize = copyFontSize/ratio + "px";
}





function initStage() {
    

    
    // background scaling + positioning
    function autoScale() {

        if (cssIsLoaded) {
            
            //bgscale
            bgScale = bannerHeight / bg_blank.naturalHeight; 
            if (bannerHeight + bannerWidth > 970 && bannerHeight + bannerWidth !== 1090) { 
                bgScale = 0.9; //default value
                if (bannerHeight + bannerWidth < 1100) { bgScale = 0.66 }
                else if (bannerHeight + bannerWidth === 1000) { bgScale = 0.68 }

                 //bg top left adjustments            
                if (bannerWidth < 840 && bannerHeight < 300) { bgTop = -20; bgScale = 0.644; console.log("800x250"); }
                else if (bannerWidth < 800 && bannerHeight < 350) { bgTop = -16; bgLeft = +4; console.log("728x300"); }
                else if (bannerWidth < 600 && bannerHeight < 420) { bgTop = -6; bgLeft = -40; console.log("580x400"); }
                else if (bannerWidth < 700 && bannerHeight < 400) { bgTop = -5; bgLeft = -20; console.log("640x360"); }
                else if (bannerWidth > 900 && bannerHeight < 500) { bgTop = -27;  bgLeft = -11; console.log("980x400"); }
                
                //set bg
                bg_blank.style.transform = "scale("+bgScale+")";

                bg_blank.style.top = ( -(bg_blank.naturalHeight*bgScale - bannerHeight) / 2 ) + bgTop + "px"; // dividing natural by 2 - retina 
                bg_blank.style.left = ( -(bg_blank.naturalWidth*bgScale - bannerWidth) / 2 ) + bgLeft + "px"; // dividing natural by 2 - retina 
                bgPosDone = true;     
                
            } else {
                //exclusions
                if (bannerWidth === 468 && bannerHeight === 400) { bgLeft = -37; console.log("468x400"); }
                if (bannerWidth === 840 && bannerHeight === 250) { bgTop = -25;  console.log("840x250");}

                //scale correct for very wide resolutions
                const bgCurrentWidth = parseFloat(window.getComputedStyle(bg_blank).width) * bgScale; 
                if (bgCurrentWidth < bannerWidth) {
                    bgScale = bannerWidth/bgCurrentWidth*bgScale;
                    bg_blank.style.transform = "scale("+bgScale+")";
                    bg_blank.style.left = 0;
                    bg_blank.style.top = ( bannerHeight - (bg_blank.naturalHeight * bgScale) )/2 + "px";

                    bgPosDone = true;
                }

                // bg "hack" - wide formats position up
                var aspectRatio = bannerWidth / bannerHeight;
                if (aspectRatio > 1) {
                    var actualTop = parseFloat(window.getComputedStyle(bg_blank).top);
                    var bgToMoved = bannerHeight/19.5/aspectRatio;
                    //find out if there is enough "meat" in the picture
                    var bgHeight = bg_blank.getBoundingClientRect().height;
                    if (bgHeight - actualTop - bgToMoved >= bannerHeight) {
                        bg_blank.style.top = actualTop - bgToMoved + "px";
                    }            
                } 

                //check if the bg is not smaller then banner
                var bgHeight = bg_blank.getBoundingClientRect().height;
                if (bgHeight < bannerHeight) {
                    bg_blank.style.transform = "scale("+ (bannerHeight/bgHeight) * (bgHeight/bg_blank.naturalHeight) +")";
                    // center bg
                    bg_blank.style.top = "0px";
                    bg_blank.style.left = bg_blank.getBoundingClientRect().x - (bg_blank.getBoundingClientRect().width - bannerWidth)/2 + "px";
                }


                //set bg
                bg_blank.style.transform = "scale("+bgScale+")";

                bg_blank.style.top = ( -(bg_blank.naturalHeight*bgScale - bannerHeight) / 2 ) + bgTop + "px"; // dividing natural by 2 - retina 
                bg_blank.style.left = ( -(bg_blank.naturalWidth*bgScale - bannerWidth) / 2 ) + bgLeft + "px"; // dividing natural by 2 - retina 
                bgPosDone = true;     
            }

              

            
        } else {
            console.log("waiting for ccs to be load");
            setTimeout(autoScale,10);
        }

        
    }    
    
    //run autoscale - only once
    bg_blank.onload = function () {        
        if (!autoScaleRan) {
            autoScaleRan = true;
            autoScale();   
        }
    }

    if (bg_blank.naturalWidth !== 0 && !autoScaleRan) {
        autoScaleRan = true;
        autoScale(); 
    }

    init();
}

// ---------- (03) - images/styles load ---------- //


function loadStyles() {
    initDynamicContent();

    var extCSS = document.createElement("link");
    extCSS.setAttribute("rel", "stylesheet");
    extCSS.setAttribute("type", "text/css");
    extCSS.setAttribute("href", "style.css");
    document.getElementsByTagName("head")[0].appendChild(extCSS);

    extCSS.onerror = initStage; 

    extCSS.onload = function() {
        cssIsLoaded = true;
    }

    var plinthSVG = document.createElement("script");
    plinthSVG.setAttribute("type", "text/javascript");
    plinthSVG.setAttribute("src", "ford_logo.js");
    document.getElementsByTagName("head")[0].appendChild(plinthSVG);

    var font_01 = new FontFaceObserver("FordAntenna-Light");
    var font_02 = new FontFaceObserver("Ford_Antenna_Cond_ExtraLight");

    Promise.all([font_01.load(), font_02.load()]).then(function () {
        console.log("Ford_Antenna_Font => OK");
        initStage(); // callback
    }
    ,function(){
        console.log("Ford_Antenna_Font => NO");
        initStage(); // if font preloading fails, banner will start
    });
}

function preLoadImages() {
    // preload images inside array preloadImages
    var newImages = [], l = preloadImages.length;
    for (var i = 0; i < preloadImages.length; i++) {
        newImages[i] = new Image();
        newImages[i].src = preloadImages[i];
        newImages[i].onerror = function() { l-- }
        newImages[i].onload = function() { if(!--l) {
            loadStyles(); // <- callback
        }}
    } if (!l) loadStyles(); // <- callback if array empty
}

function createImages(images, trida){
    function initImage(id, src) {
        var image = document.createElement("img");
        image.setAttribute("id", id);
        image.setAttribute("class", trida);
        image.setAttribute("src", src);
        main.appendChild(image);
    }
    var newImages = [], l = images.length;
    for (var i = 0; i < images.length; i++) {
        var imageId = images[i].split(".");
        initImage(imageId[0], images[i]);

        // preload images inside array images
        newImages[i] = new Image();
        newImages[i].src = images[i];
        newImages[i].onerror = function() { l--; document.getElementById(this.attributes.src.value.slice(0, -4)).style.display = "none"}
        newImages[i].onload = function() { if(!--l) {
            if (imagesLoad) { preLoadImages(); // <- callback
            } else { imagesLoad = true; }
        }}
    } if (!l && imagesLoad) { preLoadImages(); } else { imagesLoad = true; }// <- callback if array empty
}



// ---------- (02) - DC/ST/polite load ---------- //
function preloadingStage() {    
    createImages(images, "images");
    createImages(images100, "images100");
//    preLoadImages(); // if skip createImages
}

function stLoad() {
    console.log("ready-Standalone");
    
    preloadingStage();
}

function dcLoad() {
    if (Enabler.isInitialized()) {
        enablerInitHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
    }
}

function enablerInitHandler() {
    console.log("ready-DoubleClick");
    
    if (politeLoad) {
        if (Enabler.isPageLoaded()) {
            pageLoadedHandler();
        } else {
            Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
        }
    } else {
        preloadingStage();
    }
}

function pageLoadedHandler() {
    console.log("ready-polite");
    
    preloadingStage();
}



// ---------- (01) - first stage ---------- //
window.onload = function start() {
    if (typeof TimelineMax !== 'undefined') {
        if (dcSelect) {
            dcLoad();
        } else {
            stLoad();
        }
    } else {
        console.log("TimelineMax is not defined, trying to reload");
        setTimeout(function(){
            start();
        }, 200);
    }
}