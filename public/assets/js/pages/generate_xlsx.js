jQuery(function($){
	$('#start-generate').click(function(){
		var data = {
			font_size: $('#font-size').val(),
			no_of_rows: $('#no-of-rows').val(),
			no_of_columns: $('#no-of-columns').val()
		};

		$.ajax({
			url: '/generate/xlsx',
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