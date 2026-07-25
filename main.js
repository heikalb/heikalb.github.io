function respToArrowPress(e)
{
    if($(".featherlight-previous span")||$(".featherlight-next span"))
    {
        if(37==e.which)
            var n=$(".featherlight-previous span");
        else
        {
            if(39!=e.which)
                return;
            
            var n=$(".featherlight-next span");
        }
        
        n.addClass("on-arrow-press");
        
        $(document).on("keyup",function()
        {
            $(n).removeClass("on-arrow-press")
        })
    }
}

function processForm()
{
    $("#submit-button").on("click",function()
    {
        var e=document.comment_form;
        
        if(""==e.comment.value||""==e.comment.value.trim())
        {
            $(e.comment).addClass("warning");
        }
        else
        {
            var n=e.name.value, t=e.email.value, a=e.comment.value;
            $.ajax(
                    {type:"POST",
                     url:"saveComments.php",
                     data:{name:n,email:t,comment:a}
                    });
            
            e.reset();
            var i="<p id = 'thankYou' style= 'float:left'>Thank you for your thoughts.</p>";
            $("form").append(i);
            
            $("#thankYou").slideDown("slow",function()
            {
                $(this).delay(1500).slideUp("slow")
            })}
    })
}

function processLike()
{
    var e=$(".like-button");
    e.text("Like (:");
    e.addClass("highlight");
    
    $(".featherlight-previous, .featherlight-next").on("click",function()
    {
        e.text("Like"),e.removeClass("highlight")
    });
    
    $(document).on("keyup",function()
    {
        e.text("Like"),e.removeClass("highlight")
    });
    
    var n=$(".featherlight img.featherlight-image").attr("src").split("/");
    var t=n[n.length-1],a=$(".featherlight .legend").text();
    $.ajax({type:"POST",url:"saveLikes.php",data:{image_name:t,image_caption:a}})
}

function blink_load(e)
{
    $(e).parent().css("animation","none")
}

$(document).ready(function()
{
    // Set theme based on computer's local time
    // var e=new Date, n=e.getHours();
    // (n >= 7 && n <= 17)&&$(".darkable").removeClass("darkened");

    $("img").unveil(200,function()
    {
        $(this).css("opacity","1")
    });
    
    // Make Featherlight responsive to arrow button presses
    $(document).on("keydown",function(e)
    {
        respToArrowPress(e)
    });
    
    // Process contact form
    // $("form #submit-button").css("display","block");
    //processForm();
    //$(document.comment_form.comment).on("click",function(){$(comment_form.comment).removeClass("warning")});
    
    
    $(".gallery img").on("load",function()
    {
        $(this).parent().css("animation","none")
    });
    
    // Make theme buttons responsive to clicks
    $("#dark-theme-button").on("click",function()
    {
        $(".darkable").addClass("darkened");
    });
    
    $("#light-theme-button").on("click",function()
    {
        $(".darkable").removeClass("darkened")
    })
    
})

$(".thumbnail-gallery").featherlightGallery(
{
    filter:"a",
    loading:'<div class = "loading-animation"><span></span><span></span><span></span><span></span><span></span></div>',
    nextIcon:">",
    previousIcon:"<",
    afterContent:function()
    {
        this.$legend=this.$legend||$('<span class="legend"/>').insertAfter(this.$content),this.$legend.text(this.$currentTarget.find('img').attr("alt"));
        //var e='<span class = "like-button" type = "button" onclick = "processLike()">Like</span>';
        //this.$like=this.$like||$(e).insertAfter(this.$legend);
        var n='<div class = "loading-animation"><span></span><span></span><span></span><span></span><span></span></div>';
        this.$loadingPicture=this.$loadingPicture||$(n).insertBefore(this.$content),$(".featherlight .featherlight-close-icon").css("display","block")}
});