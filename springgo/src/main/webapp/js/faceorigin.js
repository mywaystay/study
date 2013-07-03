NTES.util.simpleParse = function(tpl, values) {
   return values ? String(tpl).replace(/<#=(\w+)#>/g, function($1, $2) {
      return values[$2] != null ? values[$2] : $1;
   }) : tpl;
};
///设置textarea光标位置
function setCaretTo(obj, posEnd) {
   if(obj.createTextRange) {
      var range = obj.createTextRange();
      range.move('character', posEnd);
      range.select();
   } else {
      obj.focus();
      obj.setSelectionRange(posEnd, posEnd);
   };
};
window.setCaretTo = setCaretTo;
/*
* 获取光标的位置(不影响选区工作)
* @function APP.getSelectPosiTion
* @param {object}oElement
* @return {}
*/
getSelectPosiTion = function(oElement) {
   if (!document.selection) return oElement.selectionStart;
   var er = document.selection.createRange(), er1 = document.body.createTextRange(), s = 0;
   try {// 脚本控制oElement触发focus后立刻再focus其他元素，js会获取错oElement选区
      er1.moveToElementText(oElement);
      for (s; er1.compareEndPoints("StartToStart", er) < 0; s++) {
         er1.moveStart("character", 1);
      }
   } catch (e) {
      s = 0;
   }
   return s;
};
window.getSelectPosiTion = getSelectPosiTion;
function FaceWin(textElem,btnElem){
	var templates = {};
templates["faceList"] = "<table class=\"winlayer-table\">\r\n\t<tbody>\r\n    <tr>\r\n\t\t<td class=\"winlayer-top-left\"></td>\r\n\t\t<td class=\"winlayer-top-center\"><em class=\"winlayer-arrow\"></em></td>\r\n\t\t<td class=\"winlayer-top-right\"></td>\r\n\t</tr>\r\n    <tr>\r\n       <td class=\"winlayer-middle-left\"></td>\r\n       <td class=\"winlayer-middle-center\">\r\n\t\t\t\t<div class=\"insertFace-titleBar\">\r\n\t\t\t\t\t<ul class=\"insertFace-title\"><li><strong>\u5e38\u7528\u8868\u60c5</strong></li></ul>\r\n\t\t\t\t\t<a href=\"#\" title=\"\u5173\u95ed\" onclick=\"return false;\" class=\"default-close-icon close\"></a>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"bd insertFace-content\"><span class=\"loading\"></span></div>\r\n\t\t\t</td>\r\n       <td class=\"winlayer-middle-right\"></td>\r\n    </tr>\r\n    <tr>\r\n\t\t<td class=\"winlayer-bottom-left\"></td>\r\n\t\t<td class=\"winlayer-bottom-center\"></td>\r\n\t\t<td class=\"winlayer-bottom-right\"></td>\r\n\t</tr>\r\n    </tbody>\r\n</table>";
templates["faceSingle"] = "<li><img src=\"<#=link#>\" title=\"<#=name#>\" alt=\"<#=name#>\" /></li>";
templates["faceTab"] = "<li><strong><#=type#></strong></li>";

   var t = this;

   t.textElem = textElem;
   t.textElem.insertPosition = 0;
   t.btnElem = btnElem;
   t.btnElem.open = false;
   t.winElem = NTES("#faces-list-dialog");// 表情弹窗对象

   t.hide = function(){
      t.btnElem.open = false;
      t.winElem && t.winElem.addCss("visibility:hidden");
   };
   t.show = function(){
      t.btnElem.open = true;
      t.winElem.addCss("visibility:visible");
      t.winElem.handle = t;
      t.winElem.btnElem = t.btnElem;
      t.winElem.textElem = t.textElem;
      t.winElem.insertPosition = t.textElem.insertPosition;
      setCaretTo(t.textElem[0], t.textElem.insertPosition);
      t.winElem.textElem.focus();
      t.resize();
   }
   t.resize = function(){
      //pos = NTES.style.getAbsPosition(t.btnElem[0]);
     // t.winElem && t.winElem.addCss("left:"+(pos.x -15)+"px;top:"+ (pos.y + t.btnElem.offsetHeight + 3) +"px;");
   	 offset = t.btnElem.offset();
      t.winElem && t.winElem.addCss("left:"+(offset.left -15)+"px;top:"+ (offset.top + t.btnElem.height() + 3) +"px;");
   }
   // 绑定输入动作
   t.bindOptionFn = function(){
      var tabs = NTES("li",t.tabsElem),
      lists = NTES("ul",t.listsElem),
      imgs = NTES("img",t.listsElem);
      tabs && tabs[0] && NTES(tabs[0]).addCss("current");
      lists && lists[0] && NTES(lists[0]).addCss("current");
      t.tabSlide = new NTES.ui.Slide(tabs, lists, "current", "click");
      imgs.addEvent("click", function(){
         if(t.winElem.textElem!=null){
            var elem = t.winElem.textElem,
            textareaValue =  elem.val(),
            isertTxt = this.alt, nowSelectPlace = elem.insertPosition;
            elem.val( textareaValue.substring(0, nowSelectPlace) + isertTxt + textareaValue.substring(nowSelectPlace,textareaValue.length));
            elem.insertPosition = nowSelectPlace + isertTxt.length;
            setCaretTo(elem[0], elem.insertPosition);
            t.hide();
         }
      });
   }

   //创建表情专用弹窗
   t.creatHtml = function(){
      t.winElem = NTES("#faces-list-dialog");
      if(t.winElem){
         return t.winElem;
      }
      t.winElem = NTES(document.createElement("div"));
      t.winElem.id = "faces-list-dialog";
      t.winElem.className = "insertFaceWin";
      t.winElem.style.visibility = "hidden";
      t.winElem.innerHTML = templates["faceList"];
      t.winElem.btnElem = t.winElem.textElem = null;
      t.winElem.handle = t;
      t.winElem.addEvent("click",function(){
         t.winElem.textElem.focus();
      });
      NTES(".close",t.winElem).addEvent("click", function(){
         t.winElem.handle.hide();
      });
      NTES(window).addEvent("resize", t.resize.bind(t));

      t.closeElem = NTES(".default-close-icon",t.winElem);
      t.tabsElem = NTES.one(".insertFace-title",t.winElem);
      t.listsElem = NTES.one(".insertFace-content",t.winElem);

      var result = [{"type":"表情1","emotions":[{"name":"E001"},{"name":"E002"},{"name":"E003"},{"name":"E004"},{"name":"E005"},{"name":"E006"},{"name":"E007"},{"name":"E008"},{"name":"E009"},{"name":"E00A"},{"name":"E00B"},{"name":"E00C"},{"name":"E00D"},{"name":"E00E"},{"name":"E00F"},{"name":"E010"},{"name":"E011"},{"name":"E012"},{"name":"E013"},{"name":"E014"},{"name":"E015"},{"name":"E016"},{"name":"E017"},{"name":"E018"},{"name":"E019"},{"name":"E01A"},{"name":"E01B"},{"name":"E01C"},{"name":"E01D"},{"name":"E01E"},{"name":"E01F"},{"name":"E020"},{"name":"E021"},{"name":"E022"},{"name":"E023"},{"name":"E024"},{"name":"E025"},{"name":"E026"},{"name":"E027"},{"name":"E028"},{"name":"E029"},{"name":"E02A"},{"name":"E02B"},{"name":"E02C"},{"name":"E02D"},{"name":"E02E"},{"name":"E02F"},{"name":"E030"},{"name":"E031"},{"name":"E032"},{"name":"E033"},{"name":"E034"},{"name":"E035"},{"name":"E036"},{"name":"E037"},{"name":"E038"},{"name":"E039"},{"name":"E03A"},{"name":"E03B"},{"name":"E03C"},{"name":"E03D"},{"name":"E03E"},{"name":"E03F"},{"name":"E040"},{"name":"E041"},{"name":"E042"},{"name":"E043"},{"name":"E044"},{"name":"E045"},{"name":"E046"},{"name":"E047"},{"name":"E048"},{"name":"E049"},{"name":"E04A"},{"name":"E04B"},{"name":"E04C"},{"name":"E04D"},{"name":"E04E"},{"name":"E04F"},{"name":"E050"},{"name":"E051"},{"name":"E052"},{"name":"E053"},{"name":"E054"},{"name":"E055"},{"name":"E056"},{"name":"E057"},{"name":"E058"},{"name":"E059"},{"name":"E05A"},{"name":"E101"},{"name":"E102"},{"name":"E103"},{"name":"E104"},{"name":"E105"},{"name":"E106"},{"name":"E107"},{"name":"E108"},{"name":"E109"},{"name":"E10A"}]},{"type":"表情2","emotions":[{"name":"E10B"},{"name":"E10C"},{"name":"E10D"},{"name":"E10E"},{"name":"E10F"},{"name":"E110"},{"name":"E111"},{"name":"E112"},{"name":"E113"},{"name":"E114"},{"name":"E115"},{"name":"E116"},{"name":"E117"},{"name":"E118"},{"name":"E119"},{"name":"E11A"},{"name":"E11B"},{"name":"E11C"},{"name":"E11D"},{"name":"E11E"},{"name":"E11F"},{"name":"E120"},{"name":"E121"},{"name":"E122"},{"name":"E123"},{"name":"E124"},{"name":"E125"},{"name":"E126"},{"name":"E127"},{"name":"E128"},{"name":"E129"},{"name":"E12A"},{"name":"E12B"},{"name":"E12C"},{"name":"E12D"},{"name":"E12E"},{"name":"E12F"},{"name":"E130"},{"name":"E131"},{"name":"E132"},{"name":"E133"},{"name":"E134"},{"name":"E135"},{"name":"E136"},{"name":"E137"},{"name":"E138"},{"name":"E139"},{"name":"E13A"},{"name":"E13B"},{"name":"E13C"},{"name":"E13D"},{"name":"E13E"},{"name":"E13F"},{"name":"E140"},{"name":"E141"},{"name":"E142"},{"name":"E143"},{"name":"E144"},{"name":"E145"},{"name":"E146"},{"name":"E147"},{"name":"E148"},{"name":"E149"},{"name":"E14A"},{"name":"E14B"},{"name":"E14C"},{"name":"E14D"},{"name":"E14E"},{"name":"E14F"},{"name":"E150"},{"name":"E151"},{"name":"E152"},{"name":"E153"},{"name":"E154"},{"name":"E155"},{"name":"E156"},{"name":"E157"},{"name":"E158"},{"name":"E159"},{"name":"E15A"},{"name":"E201"},{"name":"E202"},{"name":"E203"},{"name":"E204"},{"name":"E205"},{"name":"E206"},{"name":"E207"},{"name":"E208"},{"name":"E209"},{"name":"E20A"},{"name":"E20B"},{"name":"E20C"},{"name":"E20D"},{"name":"E20E"},{"name":"E20F"},{"name":"E210"},{"name":"E211"},{"name":"E212"},{"name":"E213"},{"name":"E214"}]},{"type":"表情3","emotions":[{"name":"E215"},{"name":"E216"},{"name":"E217"},{"name":"E218"},{"name":"E219"},{"name":"E21A"},{"name":"E21B"},{"name":"E21C"},{"name":"E21D"},{"name":"E21E"},{"name":"E21F"},{"name":"E220"},{"name":"E221"},{"name":"E222"},{"name":"E223"},{"name":"E224"},{"name":"E225"},{"name":"E226"},{"name":"E227"},{"name":"E228"},{"name":"E229"},{"name":"E22A"},{"name":"E22B"},{"name":"E22C"},{"name":"E22D"},{"name":"E22E"},{"name":"E22F"},{"name":"E230"},{"name":"E231"},{"name":"E232"},{"name":"E233"},{"name":"E234"},{"name":"E235"},{"name":"E236"},{"name":"E237"},{"name":"E238"},{"name":"E239"},{"name":"E23A"},{"name":"E23B"},{"name":"E23C"},{"name":"E23D"},{"name":"E23E"},{"name":"E23F"},{"name":"E240"},{"name":"E241"},{"name":"E242"},{"name":"E243"},{"name":"E244"},{"name":"E245"},{"name":"E246"},{"name":"E247"},{"name":"E248"},{"name":"E249"},{"name":"E24A"},{"name":"E24B"},{"name":"E24C"},{"name":"E24D"},{"name":"E24E"},{"name":"E24F"},{"name":"E250"},{"name":"E251"},{"name":"E252"},{"name":"E253"},{"name":"E301"},{"name":"E302"},{"name":"E303"},{"name":"E304"},{"name":"E305"},{"name":"E306"},{"name":"E307"},{"name":"E308"},{"name":"E309"},{"name":"E30A"},{"name":"E30B"},{"name":"E30C"},{"name":"E30D"},{"name":"E30E"},{"name":"E30F"},{"name":"E310"},{"name":"E311"},{"name":"E312"},{"name":"E313"},{"name":"E314"},{"name":"E315"},{"name":"E316"},{"name":"E317"},{"name":"E318"},{"name":"E319"},{"name":"E31A"},{"name":"E31B"},{"name":"E31C"},{"name":"E31D"},{"name":"E31E"},{"name":"E31F"},{"name":"E320"},{"name":"E321"},{"name":"E322"},{"name":"E323"},{"name":"E324"},{"name":"E325"}]},{"type":"表情4","emotions":[{"name":"E326"},{"name":"E327"},{"name":"E328"},{"name":"E329"},{"name":"E32A"},{"name":"E32B"},{"name":"E32C"},{"name":"E32D"},{"name":"E32E"},{"name":"E32F"},{"name":"E330"},{"name":"E331"},{"name":"E332"},{"name":"E333"},{"name":"E334"},{"name":"E335"},{"name":"E336"},{"name":"E337"},{"name":"E338"},{"name":"E339"},{"name":"E33A"},{"name":"E33B"},{"name":"E33C"},{"name":"E33D"},{"name":"E33E"},{"name":"E33F"},{"name":"E340"},{"name":"E341"},{"name":"E342"},{"name":"E343"},{"name":"E344"},{"name":"E345"},{"name":"E346"},{"name":"E347"},{"name":"E348"},{"name":"E349"},{"name":"E34A"},{"name":"E34B"},{"name":"E34C"},{"name":"E34D"},{"name":"E401"},{"name":"E402"},{"name":"E403"},{"name":"E404"},{"name":"E405"},{"name":"E406"},{"name":"E407"},{"name":"E408"},{"name":"E409"},{"name":"E40A"},{"name":"E40B"},{"name":"E40C"},{"name":"E40D"},{"name":"E40E"},{"name":"E40F"},{"name":"E410"},{"name":"E411"},{"name":"E412"},{"name":"E413"},{"name":"E414"},{"name":"E415"},{"name":"E416"},{"name":"E417"},{"name":"E418"},{"name":"E419"},{"name":"E41A"},{"name":"E41B"},{"name":"E41C"},{"name":"E41D"},{"name":"E41E"},{"name":"E41F"},{"name":"E420"},{"name":"E421"},{"name":"E422"},{"name":"E423"},{"name":"E424"},{"name":"E425"},{"name":"E426"},{"name":"E427"},{"name":"E428"},{"name":"E429"},{"name":"E42A"},{"name":"E42B"},{"name":"E42C"},{"name":"E42D"},{"name":"E42E"},{"name":"E42F"},{"name":"E430"},{"name":"E431"},{"name":"E432"},{"name":"E433"},{"name":"E434"},{"name":"E435"},{"name":"E436"},{"name":"E437"},{"name":"E438"},{"name":"E439"},{"name":"E43A"},{"name":"E43B"},{"name":"E43C"}]},{"type":"表情5","emotions":[{"name":"E43D"},{"name":"E43E"},{"name":"E43F"},{"name":"E440"},{"name":"E441"},{"name":"E442"},{"name":"E443"},{"name":"E444"},{"name":"E445"},{"name":"E446"},{"name":"E447"},{"name":"E448"},{"name":"E449"},{"name":"E44A"},{"name":"E44B"},{"name":"E44C"},{"name":"E501"},{"name":"E502"},{"name":"E503"},{"name":"E504"},{"name":"E505"},{"name":"E506"},{"name":"E507"},{"name":"E508"},{"name":"E509"},{"name":"E50A"},{"name":"E50B"},{"name":"E50C"},{"name":"E50D"},{"name":"E50E"},{"name":"E50F"},{"name":"E510"},{"name":"E511"},{"name":"E512"},{"name":"E513"},{"name":"E514"},{"name":"E515"},{"name":"E516"},{"name":"E517"},{"name":"E518"},{"name":"E519"},{"name":"E51A"},{"name":"E51B"},{"name":"E51C"},{"name":"E51D"},{"name":"E51E"},{"name":"E51F"},{"name":"E520"},{"name":"E521"},{"name":"E522"},{"name":"E523"},{"name":"E524"},{"name":"E525"},{"name":"E526"},{"name":"E527"},{"name":"E528"},{"name":"E529"},{"name":"E52A"},{"name":"E52B"},{"name":"E52C"},{"name":"E52D"},{"name":"E52E"},{"name":"E52F"},{"name":"E530"},{"name":"E531"},{"name":"E532"},{"name":"E533"},{"name":"E534"},{"name":"E535"},{"name":"E536"},{"name":"E537"}]}],
               rLen=result.length;

               t.tabsElem.innerHTML = t.listsElem.innerHTML = '';
               for(var i=0; i<rLen; i++){
                  var single = result[i].emotions;
                  singleLen = single.length,
                  ul = document.createElement('ul');
					var ulhtml = "";
                  while(singleLen > 0){
                     singleLen--;
                     //ul.innerHTML = NTES.util.simpleParse(templates["faceSingle"], { link : single[singleLen].link , name : "["+single[singleLen].name+"]" }) + ul.innerHTML;
                     ulhtml = NTES.util.simpleParse(templates["faceSingle"], { link : "/image/emoji/"+single[singleLen].name+".png" , name : "["+single[singleLen].name+"]" }) + ulhtml;
                  }
                  ul.innerHTML = ulhtml;
                  t.tabsElem.innerHTML += NTES.util.simpleParse(templates["faceTab"],{type:result[i].type});
                  t.listsElem.appendChild(ul);
               };
               rLen > 0 && t.bindOptionFn();

      NTES.ready(function (NTES) {
         NTES(document.body).appendChild(t.winElem);
      });
   }

   setTimeout(function(){// 延迟fix同时创建获取不到已有弹窗的bug
      t.creatHtml();
   },0);
   if( t.textElem.attr("autoPostion") != "true" ){
      t.textElem.attr("autoPostion","true");
      t.textElem.bind("keyup",function(){
         t.textElem.insertPosition = getSelectPosiTion(t.textElem[0]);
      });
      t.textElem.bind("click",function(){
         t.textElem.insertPosition = getSelectPosiTion(t.textElem[0]);
      });
   }
   t.textElem.bind("focus",function(){
      if(t.winElem && t.winElem.clearTimeId){
         (t.winElem.textElem == t.textElem) && clearTimeout(t.winElem.clearTimeId);
      }
   });
   t.textElem.bind("blur",function(){
      t.winElem && ( t.winElem.clearTimeId = setTimeout(function(){t.winElem.handle.hide();},300) )
   });
   t.btnElem.bind("click",function(){
      if(t.winElem.textElem != t.textElem){
         t.show();
      } else if(t.btnElem.open){
         t.hide();
      } else {
         t.show();
      }
   });
};
window.FaceWin = FaceWin;