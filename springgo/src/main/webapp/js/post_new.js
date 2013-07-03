
var isSource = true;
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
    //changetopic();
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

function do_preview2(formObj){
    changesource();
    checkSource();
    if (!isSource) {
        alert("你所填写的来源不在媒体库列表中。请与主编、总监联系。");
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

function do_submit(formObj){
    changesource();
    checkSource();
    if (!isSource) {
        alert("你所填写的来源不在媒体库列表中。请与主编、总监联系。");
        return false;
    }

    changesource();
    formObj.action="";
    formObj.target="";
    formObj.preview.checked = false;
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
function setDialog(URLStr) {
 window.showModelessDialog(URLStr,window,'dialogWidth:500px;dialogHeight:400px;status:no;scroll:yes;help:no;');
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
function resetBody()
{
    mobileEditor.setValue("");
}
function pasteAll()
{
    var data = clipboardData.getData("Text");
    if (data.indexOf("[^^]\n")>-1)
    {
        var datalit = data.split("[^^]\n");
        var i=0;
        var title = datalit[i++];
        var stitle = datalit[i++];
        var topicids1 = datalit[i++];
        var topicids = datalit[i++];
        var source = datalit[i++];
        var dkeys = datalit[i++];
        var relatespkey = datalit[i++];
        var relatekey = datalit[i++];
        var content = datalit[i++];
        var lspri = datalit[i++];
        var digest = datalit[i++];
        var imgsrc = datalit[i++];
        document.form1.title.value=title;
        document.form1.stitle.value=stitle;
        document.form1.topicids1.value=topicids1;
        document.form1.topicids.value=topicids;
        document.form1.source.value=source;
        document.form1.dkeys.value=dkeys;
        document.form1.relatespkey.value=relatespkey;
        document.form1.relatekey.value=relatekey;
        mobileEditor.setValue(content);
        document.form1.lspri.value=lspri;
        document.form1.digest.value=digest;
        document.form1.imgsrc.value=imgsrc;
    }
}
function copyAll()
{
    try
    {
        var copytext="";
        copytext+=form1.title.value+"[^^]\n";
        copytext+=form1.stitle.value+"[^^]\n";
        copytext+=form1.topicids1.value+"[^^]\n";
        copytext+=form1.topicids.value+"[^^]\n";
        copytext+=form1.source.value+"[^^]\n";
        copytext+=form1.dkeys.value+"[^^]\n";
        copytext+=form1.relatespkey.value+"[^^]\n";
        copytext+=form1.relatekey.value+"[^^]\n";
        copytext+=mobileEditor.getFinalCode()+"[^^]\n";
        copytext+=form1.lspri.value+"[^^]\n";
        copytext+=form1.digest.value+"[^^]\n";
        copytext+=form1.imgsrc.value+"[^^]\n";
        clipboardData.setData('Text',copytext);
    }
    catch(e)
    {}
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

function publish()
{
    var uploadhtml = "";    
    var uploadhtml=mobileEditor.getFinalCode();
    uploadhtml = uploadhtml.replace(/<div[^>]*>/ig, "");
    uploadhtml = uploadhtml.replace(/<\/div[^>]*>/ig, "");
    uploadhtml = uploadhtml.replace(/<a.*?href="([^"]*)"[^>]*>/ig,"<a href=\"$1\" target=\"_blank\">");
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

function checkSource() {
    var channelid = document.getElementById("channelid").value;
    var sourcekey = document.getElementById("source").value;

    if (channelid != null && sourcekey != null)
    {
        if (sourcekey == "")
        {
            // 移动
            if (channelid != "0034")
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