// JavaScript Document
var PostEditor;
window.onload=function(){
	PostEditor = new CMSEditor("CMSEditor","Editor1");
	MakeBodyMask();
}

function CMSEditor(root,editorid){
	this.EditorRoot=document.getElementById(root);	
	var foo=this;
	var oIFrame=document.createElement("iframe");
	oIFrame.id=editorid;
	oIFrame.src="editorcom/editor.html";
	oIFrame.className="EditorFrame";
	oIFrame.frameBorder="0";
	oIFrame.scrolling="no";
	oIFrame.onreadystatechange =function(){
		if(this.readyState=="complete"){
			foo.onEditorFrameLoad();
			oIFrame.onreadystatechange=null;
		}
	}
	this.EditorID=editorid;
	this.EditorIFrameElm=oIFrame;
	this.EditorFrame=null;
	this.EditorRoot.appendChild(oIFrame);
	
	this.incwindir="editorcom/incwin/";
	this.imagesdir="/images";
	this.LoginUserName=LoginUserName;
	this.ChanelID=ChanelID;
	this.DocTitle=form1.title;
	this.window=window;
}
CMSEditor.prototype.onEditorFrameLoad=function(){
	this.EditorFrame=document.frames[this.EditorID];
	this.EditorFrame.initFromParent(this);
}

CMSEditor.prototype.setEditorHeight=function(h){
	this.EditorIFrameElm.style.height=h+"px";
	this.EditorFrame.window.setEditorHeight(h);
}

CMSEditor.prototype.IncEditorHeight=function(){
	this.setEditorHeight(this.EditorRoot.offsetHeight+50);	
}
CMSEditor.prototype.DecEditorHeight=function(){
	if(this.EditorRoot.offsetHeight<=300) return;
	this.setEditorHeight(this.EditorRoot.offsetHeight-50);	
}
CMSEditor.prototype.SwitchFullScreen=function(bFullScreen){
	if(bFullScreen){
		window.parent.parent.document.all("maintop").rows="0,*";
		window.parent.minSizeLeft();
		this.EditorRoot.style.position="absolute";
		this.EditorRoot.style.left="0px";
		this.EditorRoot.style.top="0px";		
		this.EditorRoot.style.width=document.body.clientWidth+"px";
		this.setEditorHeight(document.body.clientHeight);
	}else{
		window.parent.parent.document.all("maintop").rows="38,*";
		window.parent.resumeLeft();		
		this.EditorRoot.style.position="";
		this.EditorRoot.style.left="";
		this.EditorRoot.style.top="";		
		this.EditorRoot.style.width="100%";
		this.setEditorHeight(400);
	}
}
CMSEditor.prototype.getEditorContentHTML=function(){
	return this.EditorFrame.window.GetEHTMLCode();
}
CMSEditor.prototype.getEditorContentText=function(){
	return this.EditorFrame.window.GetETextCode();
}
CMSEditor.prototype.setEditorContent=function(htmlcode){
	this.EditorFrame.window.$ReplaceDoc(htmlcode);
}

//////////////////////////
//Pop Up Div Window
//////////////////////////
var TopMaskLayer;
var HwndOrg;
function MakeBodyMask(){
	TopMaskLayer=document.createElement("div");
	TopMaskLayer.className="BodyMask";	
	document.body.appendChild(TopMaskLayer);
	TopMaskLayer.style.display="none";
}
function ShowBodyMask(){
	TopMaskLayer.style.display="block";
	TopMaskLayer.style.width=document.body.clientWidth;
	TopMaskLayer.style.height=document.body.clientHeight;
	var so=document.all.tags("select");
	for(var i=0;i<so.length;i++){
		so[i].style.display="none";
	}
}
function HideBodyMask(){
	TopMaskLayer.style.display="none";
	var so=document.all.tags("select");
	for(var i=0;i<so.length;i++){
		so[i].style.display="";
	}
}
var WindowDataObj;
var WindowFrame;
var WindowURL;
function showModelDivWindow(w,h,t,url,dataobj){
	WindowDataObj=dataobj;
	WindowURL=url;
	ShowBodyMask();
		HwndOrg=document.createElement("div");
		HwndOrg.className="DivWindow";
		HwndOrg.style.width=w;
		HwndOrg.style.height=h;
		HwndOrg.innerHTML="<div class='title'><label>"+t+"</label><span class='CloseIcon'></span></div><div class='body'><div id='ifr_loading' style='margin-top:80px'><center><img src='/images/loading.gif'/>   Loading...</center></div></div>";
		WindowFrame=document.createElement("iframe");
		WindowFrame.id="ModelWin";
		WindowFrame.src=url;
		WindowFrame.frameBorder="0";
		WindowFrame.style.display="none";
		WindowFrame.className="bodyframe";		
		WindowFrame.onreadystatechange=function(){
			if(this.readyState=="complete" || this.readyState=="interactive"){
				this.style.display="block";
				document.getElementById("ifr_loading").style.display='none';
				document.frames["ModelWin"].window.dataobj=dataobj;
			}
			//winframe.onreadystatechange=null;
		}
	document.body.appendChild(HwndOrg);
		HwndOrg.childNodes[1].appendChild(WindowFrame);
		HwndOrg.style.left=(TopMaskLayer.clientWidth-parseInt(HwndOrg.style.width))/2;
		HwndOrg.style.top=(TopMaskLayer.clientHeight-parseInt(HwndOrg.style.height))/2;		

	var cb=HwndOrg.firstChild.childNodes[1];
		cb.onmouseover=function(){
			this.className="CloseIconHover";
		}
		cb.onmouseout=function(){
			this.className="CloseIcon";
		}

		cb.onclick=function(){
			closeCurrentWindow();
		}
		
		Drag.init(HwndOrg.firstChild,HwndOrg);

		//HwndOrg.childNodes[1].firstChild.focus();//焦点切换到当前窗口
		//HwndOrg.childNodes[1].firstChild.onblur=function(){this.focus();}
		//会导致iframe中的flash 不能正常获得焦点 。
}
function closeCurrentWindow(){
	HideBodyMask();
	HwndOrg.innerHTML="";
	HwndOrg.removeNode();
}
function reloadCurrentWindow(){
	WindowFrame.src="";
	WindowFrame.src=WindowURL;
}
//////////////////////////
//Drag class
//////////////////////////
var Drag={
        "obj":null,
	"init":function(a, aRoot){			
			a.onmousedown=Drag.start;
			a.root = aRoot;
			if(isNaN(parseInt(a.root.style.left)))a.root.style.left="0px";
			if(isNaN(parseInt(a.root.style.top)))a.root.style.top="0px";
		},
	"start":function(){	
			Drag.obj=this;
			var c=parseInt(this.root.style.top);
			var d=parseInt(this.root.style.left);
			this.setCapture(false);
			this.lastMouseX=event.clientX;
			this.lastMouseY=event.clientY;
			this.onmousemove=Drag.drag;
			this.onmouseup=Drag.end;
			return false;
		},	
	"drag":function(){
			var c=event.clientY;
			var d=event.clientX;
			var e=parseInt(this.root.style.top);
			var f=parseInt(this.root.style.left);
			var h,g;
			h=f+d-this.lastMouseX;
			g=e+c-this.lastMouseY;
			this.root.style.left=h+"px";
			this.root.style.top=g+"px";			
			this.lastMouseX=d;
			this.lastMouseY=c;
			return false;
		},
	"end":function(){
			this.releaseCapture();
			this.onmousemove=null;
			this.onmouseup=null;
			Drag.obj=null;
		}
};