$(document).ready(function(){

init();
});

function add_task(id)
{
var id=id;
 $.ajax({
            type: "POST",
            url: "/tasks/create",            
            //data: {status :0, name :$("#newTask"+id).val(), project_id :id, priority :-1},
            //, user_id : usd, authenticity_token :encodeURIComponent(AUTH_TOKEN)
            data: $.param({ task: {status :0, name :$("#newTask"+id).val(), project_id :id, priority :1}}),
            success: function(data) { 
            	//console.log(data); 
            	//$("#edprj"+id).remove();
            	//$("#pr"+id).html(data);
            	$("#proj"+id).children(".panel-body").children(".row").last().after(data);
            	init();
            }
        }); 
}

function edit_project(th)
{
	//th.innerHTML='<input type="text">';
	//$("#bted"+th).attr('disabled','disabled');
	if($("div").is("#edprj"+th)) return false;
	var edl='<div class="input-group" id=edprj'+th+'><input class="form-control input-sm" value="'+$("#pr"+th).text()+'" name="new_project_text"><div class="input-group-btn"><button type="button" class="btn btn-success btn-sm" onClick=save_edit_project("'+th+'")>save</button> </div> </div>';
	$("#pr"+th).html(edl);
}

function save_edit_project(id)
{
 var id=id;
 $.ajax({
            type: "POST",
            url: "/projects/save_edit_project/",            
            data: {id :id, text :$("#edprj"+id).children("input[name='new_project_text']").val()},
            success: function(data) { 
            	//console.log(data); 
            	$("#edprj"+id).remove();
            	$("#pr"+id).html(data);
            	init();
            }
        }); 
}

function NewProject()
{
 $.ajax({
            type: "POST",
            url: "/projects/create",  
            data: $.param({ project: {name :'New'}}),          	
            success: function(data) { 
            	//console.log(data); 
            	if($(".panel").last().length==0)$("#tdl").after(data);
            	else $(".panel").last().after(data);
            	init();
            }
        }); 

}

function remove_project(id)
{
	if(confirm('Are you sure?'))
	{
		 var id=id;
		 $.ajax({
            type: "GET",
            url: "/projects/destroy",  
            success: function(data) { 
            	//console.log(data); 
            	//$("#pr"+id).remove();
            }
        }); 
	}
}

function task_edit(th)
{
	if($("div").is("#ed_task"+th)) return false;
	var edl='<div class="input-group" id=ed_task'+th+'><input class="form-control input-sm" value="'+$("#task_nm"+th).text()+'" name="new_task_text"><div class="input-group-btn"><button type="button" class="btn btn-success btn-sm" onClick=save_edit_task("'+th+'")>save</button> </div> </div>';
	$("#task_nm"+th).html(edl);
}

function save_edit_task(id)
{
	 var id=id;
 $.ajax({
            type: "POST",
            url: "/tasks/save_edit_task/",            
            data: {id :id, text :$("#ed_task"+id).children("input[name='new_task_text']").val()},
            success: function(data) { 
            	//console.log(data); 
            	$("#ed_task"+id).remove();
            	$("#task_nm"+id).html(data);
            }
        }); 
}

	function init()
	{
	
	$('div.pr').hover(
		function(){$(this).children("div.pr_vis").css("display","");},
		function(){$(this).children("div.pr_vis").css("display","none");}
		);
	$('div.div_border').hover(
		function(){$(this).children("div.but_vis").css("display","");},
		function(){$(this).children("div.but_vis").css("display","none");}
		);

	$('.delete-project').bind('ajax:complete', function(e) {
	  $(this).parents(".panel").remove();
	});

	$('.delete-task').bind('ajax:complete', function(e) {
	  $(this).parent('div').parent('.row').remove();
	});

	$('.checkbox_task').on('change', function(){ // on change of state
	   //if(this.checked) // if changed state is "CHECKED"
	   // {
	       // alert('ch');
	       var self=this;
	       var v=0;
	       if($(this).prop("checked")==true)v=1;
	       console.log($(this).prop("checked")); 
	         $.ajax({
            type: "POST",
            url: "/tasks/"+$(this).val()+"?task"+encodeURIComponent("[status]")+"="+v,            
            data: { _method :"put"},
            success: function(data) { 
            	//console.log(data); 
            	//$("#edprj"+id).remove();
            	//$("#pr"+id).html(data);
            if($(self).prop("checked")==true)$(self).parent("div").parent('div.row').css("background-color","#dbf7d9");
            else $(self).parent("div").parent('div.row').css("background-color","");
            },
            error:function(data) { 
            	
            if($(self).prop("checked")==true)$(self).prop("checked",false);
            else $(self).prop("checked",true);
            }
        }); 
	    //}
	});

	$('.tsup').on('click', function(){ // on change of state
	   var el=$(this).parent('div').parent('div.row');
	   if(!el.prev().hasClass('alert'))
	   {
	   		$.ajax({
	   			type: "POST",
	   			url: "/tasks/priority",
	   			data: {id :$(this).attr('value'), typ :'up'},
	            success: function(data) { 
	            	el.prev().before(el);
	            }
	   		});
		}
	});

	$('.tsdown').on('click', function(){ // on change of state
	   var el=$(this).parent('div').parent('div.row');
	   if(el.next().length>0)
	   {
	   	$.ajax({
	   			type: "POST",
	   			url: "/tasks/priority",
	   			data: {id :$(this).attr('value'), typ :'down'},
	            success: function(data) { 
	            	el.next().after(el);
	            }
	   		});
	   }
	});

	
	$('.glyphicon.glyphicon-calendar').datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    todayHighlight: true,
    toggleActive: true
});


$('.glyphicon.glyphicon-calendar').on("changeDate", function() {
    $(this).prev(".dp").val($(this).datepicker('getFormattedDate'));
    var dateTime = new Date($(this).datepicker("getDate"));
	var strDateTime =  dateTime.getDate() + "." + (dateTime.getMonth()+1) + "." + dateTime.getFullYear();
    //alert($(this).datepicker("getDate"));
    
	         var self=this;
	         $.ajax({
            type: "POST",
            url: "/tasks/"+$(this).attr('value')+"?task"+encodeURIComponent("[dead_line]")+"="+$(this).datepicker('getFormattedDate'),            
            data: { _method :"put"},
            success: function(data) { 
            	$(self).parent("div").parent("div").find(".date_dead_line").text(strDateTime);
            },
            error:function(data) { 
            	console.log("error="+data); 
            
            }
        }); 




});

}