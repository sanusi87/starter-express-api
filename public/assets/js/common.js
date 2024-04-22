jQuery(function($){
	$('#file-generated-modal').on('show.bs.modal', () => {
		var value = localStorage.getItem('fg');
		try {
			var body = JSON.parse(value);
			$('#file-generated-modal .modal-body .list-group').empty();
			for(var i in body){
				$('#file-generated-modal .modal-body .list-group').append(`<a class="list-group-item" href="${body[i]}" target="_blank"><i class="uil uil-download-alt"></i> Download File<br />
					<small>${body[i]}</small>
				</a>`)
			}
		} catch (err) {
			console.log(err);
		}
	})
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

	$.fn.addFile = function(file){
		var t = $(this);

		t.append(`<div class="list-group-item">
			<div class="row">
				<div class="col-md-8 col-sm-8">
					<div class="mb-2"><i class="uil uil-file-alt"></i> <span>${file.name}</span></div>
					<small class="file-date text-danger">${file.created_at}</small>
				</div>
				<div class="col-md-4 col-sm-4 text-end">
					<button class="btn btn-sm btn-outline-danger px-1 py-0" data-file-name="${file.name}" type="button">
						<i class="uil uil-times"></i>
					</button>
				</div>
			</div>
		</div>`);

		t.children(':last').click(function(){
			console.log( file );

			$('#delete-confirmation-modal').modal('show', file);

			return false;
		});

		return t;
	}
})(jQuery)