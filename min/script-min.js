$(document).ready(function(){function e(){C.addClass("invisible"),setTimeout(n,I)}function n(){C.empty();for(var e=p[V],n="icon character"+(V?"":" vowel"),i=w[V],t=0;t<e.length;t++){var o=e[t];C.append('<div class="'+n+'">'+o+"</div>")}$("#nav-circles .selected").removeClass("selected"),$("#nav-circles #"+i).addClass("selected"),$(".character").unbind(m),$(".character").bind(m,s),C.removeClass("invisible")}function s(){var e=$(this).text();o(e),i()}function i(){V>0&&(V=0,e())}function t(){V++,V>=p.length&&(V=0),e()}function o(e){" "==e&&(e="&nbsp;"),k.html(k.html()+e)}function a(){var e=k.html(),n=e.length,s=e.substring(n-6);e="&nbsp;"==s?e.substring(0,n-6):e.substring(0,n-1),k.html(e)}function r(){$("#instructions").removeClass("cleared"),$(this).addClass("showing"),o(" "),V=0,i()}var c=/ipad/gi.test(navigator.appVersion),d=window.devicePixelRatio&&window.devicePixelRatio>1,l=/iphone/gi.test(navigator.appVersion),u=/android/gi.test(navigator.appVersion),v=l||c||u,g=/Firefox/.test(navigator.userAgent),h=/MSIE/.test(navigator.userAgent),m=v?"touchstart":"mousedown",b=v?"touchmove":"mousemove",f=v?"touchend":"mouseout",p=["aeiou","wtdc","pb","fghjk","lmnqrs","vxyz"],w=["one","two","three","four","five","six"],C=$("#letters-inner"),x=$("#message-in-progress"),k=$("#before-cursor"),y=$("#after-cursor"),V=0,A=!1,I=250;setInterval(function(){A?(k.removeClass("blinking"),A=!1):(k.addClass("blinking"),A=!0)},500),$("#next").bind(m,t),$("#backspace").bind(m,a),$("#show-instructions p").bind(m,r),$("#dismiss-instructions").bind(m,function(){$("#instructions").addClass("cleared"),$("#show-instructions").removeClass("showing")}),e()});