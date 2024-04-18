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
})(jQuery)