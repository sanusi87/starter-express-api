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
});