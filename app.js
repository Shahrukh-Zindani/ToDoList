var Post;


var task = {
    name : "",
    id   : ""
}

$( document ).ready(function() {
    console.log( "ready!" );
    Parse.initialize("tk0fyyUtmDo4XixZlBB8lasknm0DQKGKkYsoSU3N", "S6MKatlAaMBo1peSThLpuTNeiCmXaeJjoKD3M8NN");
    Post = Parse.Object.extend("Post");
   // win();
});



$("#addButton").click(function() {



    var newPost = new Post();
    newPost.set("task",($("#inputName").val()));
    newPost.save(null, {
        success: function(newPost) {
            console.log("task created!: " + newPost.id)
            var newtask = task;
            newtask.id = newPost.id;
            newtask.name = $("#inputName").val();
            
        },
        error: function(newPost, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
    console.log("button clicked");
    win();


});






function win()
{   console.log("shahruk");
 var query = new Parse.Query(Post);

 console.log($("#inputName").val());
 var tasks = $('#taskName');
 query.find({
     success: function(results){
         for(var i in results){
             var title = results[i].get("task");
             console.log(results[i].id);
             tasks.append('<li> '+title+' <label  class = "pull-right"> <input  type="checkbox" class = "checkBox" name="terms" style="margin: 0 4px 0 4px;"/></label><button type="button" class="btn btn-danger btn-xs delButton pull-right" id= "let" ><i class="fa fa-trash-o"></i></button>&nbsp;&nbsp;&nbsp;');
         }
     }
 });

}

$(".delButton").live("click", function(){
    console.log("delete");
    var Post = Parse.Object.extend("Post");
    var query = new Parse.Query(Post);
    console.log($(this).parent().text());
    var tobedeleted= $(this).parent().text();
    console.log(tobedeleted);
    var x= query.get(tobedeleted,{
        success: function(yourObj){
            yourObj.destroy({});
        },



    });


});


$('.checkBox').change(function(){
    if ($( "input:checked" )){
        console.log("checked as");
        var input = $(this).text;
        if(this.checked)
            $(this).parent().parent().addClass('completed');
        else
            $(this).parent().parent().removeClass('completed');

    }
});

