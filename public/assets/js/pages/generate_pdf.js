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
					var value = localStorage.getItem('fg');
					if( value == null ){
						localStorage.setItem('fg', JSON.stringify([resp.file]));
					}else{
						try {
							var body = JSON.parse(value);
							body.push( resp.file );
							localStorage.setItem('fg', JSON.stringify(body));
						} catch (err) {
							console.log(err);
						}
					}

					$('#file-generated-modal').modal('show');
				}else{
					Swal.fire({
						title: 'Error!',
						text: resp.message,
						icon: 'error',
						confirmButtonText: 'OK'
					})
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