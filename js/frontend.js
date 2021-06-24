window.addEventListener('load', function(event)
{
	document.querySelector('input.wpcf7-submit').addEventListener("click", function()
	{
		// delete previous div
		var prevDiv = this.form.querySelector('.wpcf7-pdf-forms-response-output');
		if(prevDiv)
			prevDiv.parentNode.removeChild(prevDiv);
	});
	
	document.addEventListener('wpcf7submit', function(event)
	{
		if(typeof event.detail !== 'object'
		|| typeof event.detail.unitTag === 'undefined'
		|| typeof event.detail.apiResponse !== 'object'
		|| typeof event.detail.apiResponse.wpcf7_pdf_forms_data !== 'object'
		|| event.detail.apiResponse.wpcf7_pdf_forms_data === null)
			return;
		
		var unitTag = event.detail.unitTag;
		var formDiv = document.getElementById(unitTag);
		
		if(!formDiv)
			return;
		
		// delete previous div
		var prevDiv = formDiv.querySelector('.wpcf7-pdf-forms-response-output');
		if(prevDiv)
			prevDiv.parentNode.removeChild(prevDiv);
		
		if(typeof event.detail.apiResponse.wpcf7_pdf_forms_data.downloads === 'object')
		{
			var data = event.detail.apiResponse.wpcf7_pdf_forms_data.downloads;
			if(data.length > 0)
			{
				var downloads = document.createElement('div');
				downloads.className = 'wpcf7-pdf-forms-response-output';
				var alldownloadlink = false;

				for(var i=0; i<data.length; i++)
				{
					var autodownload = data[i]['options']['auto_download'];
					var downloadlink = data[i]['options']['download_link'];
					var pdfviewer = data[i]['options']['pdf_viewer'];
					var download = document.createElement('div');
					download.innerHTML = "<span class='dashicons dashicons-download'></span><a href='' download></a> <span class='file-size'></span>";

					var link = download.querySelector('a');
					link.href = data[i]['url'];
					link.innerText = data[i]['filename'];
					download.querySelector('.file-size').innerText = "(" + data[i]['size'] + ")";

					var pdfview = document.createElement("iframe");
					pdfview.setAttribute("src", link.href);
					pdfview.style.width = "100%";
					pdfview.style.height = "650px";
					pdfview.style.margin = "10px 0px";
					
					if( autodownload == true )
						link.click();

					if( downloadlink == true )
					{
					downloads.appendChild(download);
					alldownloadlink=true;	
					}

					if( pdfviewer == true )
					downloads.appendChild(pdfview);
				}
				
				if( alldownloadlink == true )
				{
				var form = formDiv.querySelector('.wpcf7-form');
				if(form)
					form.appendChild(downloads);
				}
			}
		}
		
	}, false);
});
