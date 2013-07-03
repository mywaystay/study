var coflag=0;
var nflag=0;
var l1=null;

var commonkey=document.form1.commentid;
var keywordvalue=document.form1.commentid.value;
var a=null;
var oResult=null;
var ka=true;
var X=true;
var ca=null;
var Ea=false;
var ma=null;
if(keywordvalue==""){
	keywordvalue==" "
}
document.form1.commentid.onfocus=lc;
document.form1.commentid.onblur=Wb;
window.onresize=Mb; 

function kc(){
	a=document.form1.commentid;
	a.autocomplete="off";
	var oResult	= document.createElement('div');
	oResult.id= 'sugmaindivname';
	rightandleft=1;
	topandbottom=1;
	oResult.style.zIndex="2000";
	oResult.style.paddingRight="0";
	oResult.style.paddingLeft="0";
	oResult.style.paddingTop="0";
	oResult.style.paddingBottom="0";
	oResult.style.visibility="hidden";
	da(oResult);
	oResult.style.position="absolute";
	oResult.style.backgroundColor="white";
	oResult.style.border="1px solid #b2b2b2";
	document.body.appendChild(oResult);
}
function Mb(){
	if(GetObjValue('sugmaindivname')){
		da(document.getElementById("sugmaindivname"));
	}
}
function Wb(){
	if(GetObjValue('sugmaindivname')){
		document.getElementById("sugmaindivname").style.visibility="hidden";
	}
}
function lc(){
	if(Ea==false){
		kc();
		Ea=true;
    }
}
te01();
function te01(){
	testnetb = new Date();
	begintime=testnetb.getTime();
	//document.f.tag.value="n";
	var keywordrand=Math.floor((Math.random())*10000);
	daend = new Date();
	endtime=daend.getTime();
	xiewenxiu=endtime-begintime;
	if(xiewenxiu<500){
		setTimeout("everytenms()",10);
		document.body.onkeydown=onlyNum; 
	}else {}
}
	
var agt = navigator.userAgent.toLowerCase();
var is_ie5 = (agt.indexOf("msie 5") != -1);

function everytenms(){
	var qnowvalue=document.form1.commentid.value;
	if(qnowvalue==""){
		qnowvalue==" "
	}
	if(keywordvalue==qnowvalue || anum1=="1" || qnowvalue=="ÇëÊäÈë²éÑ¯´Ê" || is_ie5)
	{}
	else if(
		qnowvalue=="" || anum=="1"){
		if(GetObjValue("sugmaindivname")){
			document.getElementById("sugmaindivname").style.visibility="hidden";
		}
		keywordvalue=qnowvalue;
	}else {
	//more than 1 char input
		if(qnowvalue.length>1){
			newresult=getContent(qnowvalue);
			if(nflag==0){
				//document.f.tag.value="u";
			}
			keywordvalue=qnowvalue;
			keynum=0;
		}
	}
	if(is_ie5){}
	else {
		setTimeout("everytenms()",10);
	}
	return true;
}
function keyfun(){
	document.getElementById("suggestspan1").style.backgroundColor='#3366cc';
}
function getContent(keyword,test){
	if(keyword!=""){
		if(l1&&l1.readyState!=0){
			l1.abort()
		}
		var xmlhttp=null;
		try{
			xmlhttp=new ActiveXObject("Msxml2.XMLHTTP")
		}catch(e){
				try{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
				}catch(sc){
						xmlhttp=null
				}
		}
		if(!xmlhttp&&typeof XMLHttpRequest!="undefined"){
			xmlhttp=new XMLHttpRequest()
		}
		l1=xmlhttp;
		if (window.RegExp && window.encodeURIComponent) {
			var newStrComment = encodeURIComponent(keyword);
		} else {
			var newStrComment =keyword;
	    }
		l1.Open("GET", "/post/loadkeyword.jsp?kw="+keyword, true);
		l1.onreadystatechange=function(){
			if(l1.readyState==4){
				ee=l1.responseText;
				if(test!="test"){
					var everydata=ee.split("\n");
					var everydatal=everydata.length;
					var data;
					if(everydatal<1){
						data="";
					}else {
						nflag=1;
						data="<div class=\"ls_t\" style=\"background-image:url(/images/kwlistbg.jgif)\"><table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr><td height=\"14\" class=\"f12\"style=\"padding-left:2px\"></td><td width=\"20\" align=\"center\"><img align=\"absmiddle\" src=\"/images/kwclose.jgif\" border=\"0\" width=\"12\" height=\"12\" class=\"img_close\" onClick=\"sugmaindivname.style.visibility='hidden'\"></td></tr></table></div><div class=\"ls_c\" style=\"border:1px solid #b2b2b2; margin:3px; cursor:hand;\">";
						if(everydatal-1>50){
							noweverydatal=50;
						}else {
							//noweverydatal=everydatal-1;
							noweverydatal=everydatal;
						}
						for(i=0;i<noweverydatal;i++){
							var neweveryword=everydata[i];
							if(neweveryword=="\r" || neweveryword=="\n"){
								continue;
							}
							if(neweveryword.length==0){
								continue;
							}
								if(i<everydatal-1){
								j=i-1;newword=neweveryword.replace("'","\\'");
								data+="<div  id=\"keyword"+j+"\"><table class=\"f12\" width=98% border=0 cellpadding=0 cellspacing=0 bgColor=\"#f5f5f5\" height=\"20\" onmousedown=\"cc('"+newword+"')\" ><tr><td align=left class=\"f12\"  id=\"td"+j+"_1\" style=\"padding-left:2px\">"+neweveryword+"</td></tr></table></div>";
								data=data.replace("undefined","");
							}
						}
						
						data+="</div>";
					}
					if(GetObjValue("sugmaindivname")){
						if(data==""){
							document.getElementById("sugmaindivname").style.visibility="hidden";
						}else {
							document.getElementById("sugmaindivname").style.visibility="visible";
						}
						document.getElementById("sugmaindivname").innerHTML=data;
					}
				}
			}else {
				ee="";
			}
		};
		l1.Send(null);
		return keyword;
	}else {
		return keyword;
	}
}
function cc(num){
	document.form1.commentid.value=num;
	//document.f.tag.value="d";
	if(GetObjValue("sugmaindivname")){
		document.getElementById("sugmaindivname").style.visibility="hidden";
	}
	anum="1";
	document.form1.commentid.focus();
	//document.f.submit();
}
function cckeydown(num){
	if(GetObjValue("sugmaindivname")){
		document.getElementById("sugmaindivname").style.visibility="hidden";
	}
	anum="1";
	document.form1.commentid.focus();
}
function da(oResult){
	if(oResult){
		a=document.form1.commentid;
		oResult.style.left=zb(a)+"px";
		oResult.style.top=Yb(a)+a.offsetHeight-1+"px";
		oResult.style.width=Ta(a)+"px"
	}
}
function zb(s){
	return kb(s,"offsetLeft")
}
function Yb(s){
	return kb(s,"offsetTop")
}
function kb(s,na){
	var wb=0;
	while(s){
		wb+=s[na];
		s=s.offsetParent
	}
	return wb
}
function Ta(a){
	if(navigator&&navigator.userAgent.toLowerCase().indexOf("msie")==-1){
		return a.offsetWidth-ea*2
	}else{
		return a.offsetWidth
	}
}
var keynum=0;
anum="0";
anum1="0";
var realkeynum;
function onlyNum(){
	if(event.keyCode==40){
		coflag=1;
		if(coflag==1){
			//document.f.tag.value="k";
		}
		if(keynum!=-1){
			t="keyword"+keynum;
			numt="td"+keynum+"_1";
			numt2="td"+keynum+"_2";
			t1="keyword"+keynum;
		} else {
			minkeynum=keynum+1;
			numt="td"+keynum+"_1";
			numt2="td"+keynum+"_2";
			t="keyword"+keynum;
			t1="keyword"+minkeynum;
		}
		if(GetObjValue(t1)){
			GetObjValue(t).childNodes[0].style.backgroundColor='#73b945';
			GetObjValue(numt).style.color='#FFFFFF';
			GetObjValue(numt2).style.color='#FFFFFF';
			document.form1.commentid.value=GetObjValue(t).childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText;
			anum1="1";
			if(keynum>0){
				var lastkeynum=keynum-1;
				var lastt="keyword"+lastkeynum;
				var lastnumt="td"+lastkeynum+"_1";
				var lastnumt2="td"+lastkeynum+"_2";
				GetObjValue(lastt).childNodes[0].style.backgroundColor='#f5f5f5';
				GetObjValue(lastnumt).style.color='#000000';
				GetObjValue(lastnumt2).style.color='#028100';
			}
			realkeynum=keynum;
			keynum++;	
			}else {
				if(realkeynum==""){
					realkeynum=0;
				}
			}
		}if(event.keyCode==38){
			coflag=1;
			if(coflag==1){
				//document.f.tag.value="k";
			}
			if(realkeynum!=0){
				realkeynum=realkeynum-1;
			   var upt="keyword"+realkeynum;
			   var numupt="td"+realkeynum+"_1";
			   var numupt2="td"+realkeynum+"_2";
			   if(GetObjValue(upt)){
				   if(realkeynum<9){
					   var nextkeynum=realkeynum+1;
					   var nextt="keyword"+nextkeynum;
					   var numnextt="td"+nextkeynum+"_1";
					   var numnextt2="td"+nextkeynum+"_2";
					   GetObjValue(nextt).childNodes[0].style.backgroundColor='#f5f5f5';
					   GetObjValue(numnextt).style.color='#000000';
					   GetObjValue(numnextt2).style.color='#028100';
					   if(GetObjValue(numnextt)){}
					}
					 GetObjValue(upt).childNodes[0].style.backgroundColor='#73b945';
					 GetObjValue(numupt).style.color='#ffffff';
					 GetObjValue(numupt2).style.color='#ffffff';
					 document.form1.commentid.value=GetObjValue(upt).childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText;
					 anum1="1";keynum--;
				}
			}
		}
	    if(event.keyCode==13){
			if(GetObjValue("sugmaindivname")){
				var sugmaindivid=document.getElementById("sugmaindivname").style.visibility;
				if (document.getElementById("sugmaindivname").style.visibility=="visible" && coflag==1){
					//document.f.tag.value="k";
				} else if(nflag==0 && document.getElementById("sugmaindivname").style.visibility=="hidden"){
					//document.f.tag.value="u";
				}else {
					//document.f.tag.value="n";
				}
				document.getElementById("sugmaindivname").style.visibility="hidden";
			}else {
				var sugmaindivid="hidden";
			}
			if(sugmaindivid=="hidden" || realkeynum==null ){}
			else {
				var upt="keyword"+realkeynum;
				cckeydown(GetObjValue(upt).childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText);
			}
		}
	    if(event.keyCode!=13 && event.keyCode!=38 && event.keyCode!=40){
			anum="0";
			anum1="0";
		}
	}

function GetObjValue(objName){
	if(document.getElementById){
		return eval('document.getElementById("' + objName + '")');
	}else{
		return eval('document.all.' + objName);
	}
}
function mon(tbl,tdline,noweverydatal){
	//alert(noweverydatal);
	for(i=1;i<noweverydatal;i++){
		j=i-1;
		var somet="keyword"+j;
		GetObjValue(somet).childNodes[0].style.backgroundColor='#f5f5f5';
		eval("td"+j+"_1.style.color = ''");
		eval("td"+j+"_2.style.color = '#028100'");
	}
	var everyt="keyword"+tdline;
	if(GetObjValue(everyt)){
		GetObjValue(everyt).childNodes[0].style.backgroundColor='#73b945';
	}else {
		tbl.bgColor = "#73b945";
	}
	eval("td"+tdline+"_1.style.color = '#FFFFFF'");
	eval("td"+tdline+"_2.style.color = '#FFFFFF'");
}
function mout(tbl,tdline){
	var everyt="keyword"+tdline;
	if(GetObjValue(everyt)){
		GetObjValue(everyt).childNodes[0].style.backgroundColor='#f5f5f5';
	}
	else {
		tbl.bgColor = "#f5f5f5";
	}
	eval("td"+tdline+"_1.style.color = ''");
    eval("td"+tdline+"_2.style.color = '#028100'");
}