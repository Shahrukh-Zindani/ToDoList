var Post;


var task = {
    taskname : "",
    taskid   : ""
}

$( document ).ready(function() {
    console.log( "ready!" );
    Parse.initialize("tk0fyyUtmDo4XixZlBB8lasknm0DQKGKkYsoSU3N", "S6MKatlAaMBo1peSThLpuTNeiCmXaeJjoKD3M8NN");
    Post = Parse.Object.extend("Post");
    win();
});



$("#addButton").click(function() {


    $("#spinner").show();
    var newPost = new Post();
    newPost.set("task",($("#inputName").val()));
    newPost.save(null, {
        success: function(newPost) {
            console.log("task created!: " + newPost.id)

            //clear all tasks ul and query parse to get the new list, and show the tasks in decsending order
            $("#taskName").empty();
            win(function(){
                //callback, when win method is finished
                console.log("hidden");
                $("#spinner").hide();
            });




        },
        error: function(newPost, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
    console.log("button clicked");



});






function win(callback)


{  
    console.log("shahruk");
    var query = new Parse.Query(Post);

    console.log($("#inputName").val());
    var tasks = $('#taskName');
    query.find({
        success: function(results){
            for(var i=results.length-1; i>=0; i--){
                var title = results[i].get("task");
                console.log(JSON.stringify(results[i],null,2));
                var id = results[i].id; 
                //console.log(id); 
                tasks.append('<li> '+title+'<label  class = "pull-right"> <input  type="checkbox" class = "checkBox" name="terms" style="margin: 0 4px 0 4px;"/></label><button type="button" class="btn btn-danger btn-xs delButton pull-right" id= "let" ><i class="fa fa-trash-o"></i></button>&nbsp;&nbsp;&nbsp;<span style= "display:none">' + id +'</span>');
            }
            if(callback){
                callback();
            }
        }
    });

}

$(document).on('click','.delButton', function(){
    $("#spinner").show();
    // console.log("delete");
    var Post = Parse.Object.extend("Post");
    var query = new Parse.Query(Post);
    var id= $(this).siblings("span").html();
    console.log(id);

    query.get(id,{

        success:function(task){
            task.destroy({
                success: function(myObject) {
                    $("#taskName").empty();
                    win(function(){
                        //callback, when win method is finished
                        console.log("hidden");
                        $("#spinner").hide();
                    });
                },
                error: function(myObject, error) {
                    // The delete failed.
                    // error is a Parse.Error with an error code and message.
                }

            });
        },
        error:function(object,error){

        }
    })

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
