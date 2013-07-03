
var isSource = true;
function publish()
{
    var uploadhtml = "";
    var uploadhtml=mobileEditor.getFinalCode();
    uploadhtml = uploadhtml.replace(/<div[^>]*>/ig, "");
    uploadhtml = uploadhtml.replace(/<\/div[^>]*>/ig, "");
    //uploadhtml = uploadhtml.replace(/<a.*?href="([^"]*)"[^>]*>/ig,"<a href=\"$1\" target=\"_blank\">");
    uploadhtml = uploadhtml.replace(/<a.*?href="([^"]*)"[^>]*>/ig,"<a href=\"$1\">");
     //add by yqtian@，内文支持自定义的@@xxx@@标签，存储的时候替换成注释形式<!--@@xxx-->
    uploadhtml = uploadhtml.replace(/@@([^@<>]*)@@/g,"<!--@@$1-->");
    form1.content.value = uploadhtml;
    try
    {
        if (form1.copybody.checked)
        {
            copyAll();
        }
    }
    catch(e)
    {}
    form1.submit();
}

function speicalArticleModeChanged(){
	var visible = false;
	if(document.form1.specialArticle.checked || document.form1.specialArticle.checked=='checked'){
		visible = true;
	}
	mobileEditor.layout.setSpecialToolbarsVisible(visible);
}

function searchsource()
{
    isSource = true;
    var sourcekey = document.form1.source.value;
    for (var i=0;i<document.form1.sources.options.length;i++)
    {
        if (document.form1.sources.options[i].text.indexOf(sourcekey)==4
            && document.form1.sources.options[i].text.substring(4) == sourcekey)
        {
            document.form1.sources.options[i].selected=true;
            return;
        }
    }
    for (var i=0;i<document.form1.sources.options.length;i++)
    {
        if (document.form1.sources.options[i].text.indexOf(sourcekey)>-1)
        {
            document.form1.sources.options[i].selected=true;
            return;
        }
    }
    document.form1.sources.options[0].selected=true;
    isSource = false;
}
function changesource()
{
    changetopic();
    var source = document.form1.sources.value;
    if (source!="")
    {
        document.form1.source.value = source;
    }
}
function searchtopic()
{
    var topickey = document.form1.topicids1.value;
    for (var i=0;i<document.form1.topicidlist.options.length;i++)
    {
        if (document.form1.topicidlist.options[i].text.replace(/-/ig,"").replace(/  /ig," ").indexOf(topickey)==0)
        {
            document.form1.topicidlist.options[i].selected=true;
            return;
        }
    }
    for (var i=0;i<document.form1.topicidlist.options.length;i++)
    {
        if (document.form1.topicidlist.options[i].text.indexOf(topickey)>-1 || document.form1.topicidlist.options[i].value==topickey)
        {
            document.form1.topicidlist.options[i].selected=true;
            return;
        }
    }
    document.form1.topicidlist.options[0].selected=true;
}
function changetopic()
{
    var topic = document.form1.topicidlist.value;
    if (topic!="")
    {
        document.form1.topicids1.value = topic;
    }
}
function do_preview(formObj){
    var rmsg=checkFormNeed(formObj)
    if(rmsg!="") {
        alert(rmsg+"不能为空！");
        return false;
        }
        else {
        formObj.action="previewhtml.jsp";
        formObj.target="_blank";
        publish();
        }
}
function checkFormNeed(form){
    var errmsg="";
    for(var i=0;i<form.elements.length;i++){
        if(form.elements[i].needed && form.elements[i].value=="") errmsg+=form.elements[i].label+"、";
    }
    return errmsg;
}

function do_submit(formObj){
    changesource();
    checkSource();
    if (!isSource) {
        //if (!confirm("该媒体并仍没签约，是否继续？"))
        alert("你所填写的来源不在媒体库列表中。请与主编、总监联系。");
        return false;
    }

    formObj.action="";
    formObj.target="";
    //formObj.preview.checked = false;
    if (document.getElementById("standing").checked)
    {
        formObj.target="poston";
    }
    var rmsg=checkFormNeed(formObj)
    if(rmsg!="") 
    {
        alert(rmsg+"不能为空！");
        return false;
    }
    else publish();
}

function do_preview2(formObj){
    changesource();
    checkSource();
    if (!isSource) {
        //if (!confirm("该媒体并仍没签约，是否继续？"))
            return false;
    }
    
    changesource();
    formObj.action="";
    formObj.target="";
    formObj.preview.checked = true;
    if (document.getElementById("standing").checked)
    {
        formObj.target="poston";
    }
    var rmsg=checkFormNeed(formObj)
    if(rmsg!="") 
    {
        alert(rmsg+"不能为空！");
        return false;
    }
    else publish();
}

function do_submit2(formObj){
    var rmsg=checkFormNeed(formObj)
    if(rmsg!="") {
        alert(rmsg+"不能为空！");
        return false;
        }
        else return true;
}
function ByteWordCount(textarea) {
  var txt = textarea.value;
  txt = txt.replace(/(<.*?>)/ig,'');
  txt = txt.replace(/([\u0391-\uFFE5])/ig,'11');
  var count = txt.length;
  titlelength.innerHTML = "<b>" + count/2 + "</b>";
}
function ByteWordCount2(textarea) {
  var txt = textarea.value;
  txt = txt.replace(/(<.*?>)/ig,'');
  txt = txt.replace(/([\u0391-\uFFE5])/ig,'11');
  var count = txt.length;
  digestlength.innerHTML = "<b>" + (count/2) + "</b>";
}
function ByteWordCount3(textarea) {
  var txt = textarea.value;
  txt = txt.replace(/(<.*?>)/ig,'');
  txt = txt.replace(/([\u0391-\uFFE5])/ig,'11');
  var count = txt.length;
  stitlelen.innerHTML = "<b>" + (count/2) + "</b>";
}

function setDialog(URLStr){
	try {
		window.showModelessDialog(URLStr, window, "dialogWidth:500px;dialogHeight:400px;status:no;scroll:yes;help:no;");
	} catch(e) {
		var win = window.open(URLStr, "popup", "height=400,width=500,resizable=no,scrollbars=yes,modal=yes");
		win.focus();
	} 
}
function boxclick(box)
{
    if(box.checked){
        if (box.value!="" && document.form1.topicids.value.indexOf(box.value)<0)
        {
            document.form1.topicids.value += ";" + box.value;
        }
    }else{
        document.form1.topicids.value = document.form1.topicids.value.replace(";"+box.value,"");
    }


}

function channelchoose(channelid) {
    var checkchannel = document.form1.checkedchannel.value;
    var pos = checkchannel.indexOf(channelid);
    if (pos < 0) {
        document.form1.checkedchannel.value = checkchannel + channelid + ";";       
    } else {
        document.form1.checkedchannel.value = checkchannel.substring(0, pos) + checkchannel.substring(pos + 5);
    }
}

function resetBody()
{
    target.document.body.innerHTML="";
}
try{ByteWordCount(document.form1.title);}catch(e){}
try{ByteWordCount2(document.form1.digest);}catch(e){}

function checkSource() {
    var channelid = document.getElementById("channelid").value;
    var sourcekey = document.getElementById("source").value;

    if (channelid != null && sourcekey != null)
    {
        if (sourcekey == "")
        {
            // 新闻 娱乐 体育 汽车 科技 手机 数码 财经 女人
            if (channelid != "0001" && channelid != "0003"
                && channelid != "0005" && channelid != "0008"
                && channelid != "0009" && channelid != "0011"
                && channelid != "0016" && channelid != "0025"
                && channelid != "0026")
            {
                isSource = true;
            }
            else
            {
                isSource = false;
            }
        }
        else
        {
            searchsource()
        }
    }
    else
    {
        isSource = false;
    }
}