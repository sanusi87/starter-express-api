jQuery(function($){
	$('#start-generate').click(function(){
		var data = {
			font_size: $('#font-size').val(),
			content: []
		};

		$('#pdf-row-list').children().each(function(i,e){
			data.content.push( $(e).find('textarea').val() );
		});

		$.ajax({
			url: '/generate/pdf',
			type: 'post',
			data: JSON.stringify(data),
			success: function(resp){
				if( resp.status == 1 ){
					window.open(resp.file, '_blank');
				}else{

				}
			},
			dataType: 'json',
			contentType: 'application/json'
		});
	});

	$('#pdf-row-list').addContent();

	$('#add-row').click(function(){
		$('#pdf-row-list').addContent();
		return false;
	});
});

(function($){
	$.fn.addContent = function(){
		var t = $(this);

		t.append(`<div class="form-floating mb-4">
			<textarea name="pdf-content[]" class="form-control" placeholder="Content" style="height: 100px"></textarea>
			<label for="pdf-content">Content</label>
		</div>`);

		return t;
	}
})(jQuery)