$(document).ready(function(){
	window.setTimeout(function(){
		window.location = '#home';
	}, 2000);

	var $loader = '<center><img src="img/loader.gif" /></center>';
	var $base_url = 'http://www.varunshrivastava.in';

	function getBlogs(){
    	var listBlogs = $('#list_blogs');
    	var $url = "http://www.varunshrivastava.in/site/getAsyncBlogs";
    	var $homeListView = $('#home_listview');
    	$homeListView.append($loader);

	    	$.ajax({
	        url: $url,
	        type: 'GET',
	        success: function(data){
	            data = $.parseJSON(data);
	            $homeListView.html('');
	            $.each(data, function(index, value){
	                var li = '<li><a id="blog_link" href="#blog" data-blog-id="'+value.id+'" data-blog-heading="'+value.heading+'" data-ajax="false">'+value.heading+'</a></li>';
	                $homeListView.append(li);
	                $homeListView.listview("refresh");
	            })
	        },
	        error: function(xhr, status, msg){
	            console.log(xhr.responseText);
	        }
	    });
    }

    getBlogs();

	$('document, body').on('click', '#blog_link', function(){
		var $url = $base_url+'/site/getBlog/'+$(this).attr('data-blog-id');
		var $blogContent = $('#blog_content');
		$blogContent.html($loader);

		$.ajax({
			url: $url,
			type: 'GET',
			success: function(data){
				data = $.parseJSON(data);
				$blogContent.html(data[0].content);
			},
			error: function(xhr, status, msg){
			console.log(xhr.responseText);
			}
		})
	});

})