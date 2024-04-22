jQuery(function($){

	__loadFiles();
	function __loadFiles(){
		$.ajax({
			url: '/files/list',
			type: 'GET',
			success: function(resp){
				if( resp.status == 1 ){
					for(var i in resp.data){
						$('#fetched-files').addFile( resp.data[i] );
					}
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
	}

	$('#delete-confirmation-modal').on('show.bs.modal', (evt) => {
		$('#selected-file').text( evt.relatedTarget.name );
	});

	$('#confirm-delete').click(function(){
		var __file = $('#selected-file').text().trim();
		$.ajax({
			url: `/files/list/${__file}`,
			type: 'DELETE',
			success: function(resp){
				$('#delete-confirmation-modal').modal('hide');

				if( resp.status == 1 ){
					Swal.fire({
						title: 'File deleted?',
						text: resp.message,
						icon: 'success',
						confirmButtonText: 'OK'
					})
					$(`button[data-file-name="${__file}"]`).parents('.list-group-item').remove();
				}else{
					Swal.fire({
						title: 'File deleted!',
						text: resp.message,
						icon: 'error',
						confirmButtonText: 'OK'
					})
				}
			},
			dataType: 'json',
			contentType: 'application/json'
		});
		return false;
	});
});