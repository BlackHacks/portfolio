jQuery(document).ready(function(e) {
  	/*sidebars */
	jQuery('ul#lay_gen li:not(li.nothover,li.content)').click(function(e) {
		var get_position=jQuery(this).attr('id');
		jQuery('img.sdloading').show();
		var li_status=jQuery(this);
		var val_sides=li_status.parent('ul');//chqueanlo los lados left and right
		var pos_containner="";
		if (val_sides.hasClass('horinzontal')){
			count=0;
			jQuery('ul.horinzontal li').each(function(index, element) {
                if (jQuery(this).hasClass('selected')){
					count++;
				}
            });
			if (li_status.hasClass('selected')){
				count--;
			}
			if(count===2){
				alert('You can select up to 2 sides');
				jQuery('img.sdloading').hide();			
				return false;
			}
		}
		var width='0';
		switch (get_position){
			case 'left_1':
			case 'left_2':	
			case 'right_1':
			case 'right_2':										
				switch (count){
					case 0:
						jQuery('div.main_content').css('width','620px');
						jQuery('div.sidebar_left,div.sidebar_right').css('width','300px');
						width='300';
					break;
					case 1:
						width=(li_status.hasClass('selected'))?'300':'220';
						width_content=(li_status.hasClass('selected'))?'620':'460';
						jQuery('div.main_content').css('width',width_content+'px');
						jQuery('div.sidebar_left,div.sidebar_right').css('width',width+'px');	
					break;						
				}
	
			break;		
		}
		if (li_status.hasClass('selected')){
			li_status.removeClass('selected');
			jQuery('div[data-pos="'+get_position+'"]').remove();
			lefts=jQuery('div[data-pos*="left"]').length;
			rights=jQuery('div[data-pos*="right"]').length
			get_value_hor=lefts+rights;
			switch (get_value_hor){
				case 0:
					jQuery('div.main_content').css('width','940px');				
				break;
				case 1:
					jQuery('div.main_content').css('width','620px');
					jQuery('div.sidebar_left,div.sidebar_right').css('width','300px');					
				break;
				case 2:
					jQuery('div.main_content').css('width','460px');
					jQuery('div.sidebar_left,div.sidebar_right').css('width','220px');						
				break;								
				
			}
		}
		else{
			var data='sidepos='+get_position+'&width='+width;
			var element='';
			var type='';
			switch (get_position){
				case 'Top_1':
					var top_1=jQuery('div[data-pos*="Top"]');
					if (top_1.length==1){
						element='div[data-pos="Top_2"]';
						type="before";
					}
					else{
						var left_p=jQuery('div[data-pos*="left"]');
						if (left_p.length===0){
							element="div.main_content";
							type="before";						
						}else{
							element=get_element_data(left_p,left_p.length);
							type="before";
						}
					}
				break;
				case 'Top_2':
					var top_2=jQuery('div[data-pos*="Top"]');
					if (top_2.length==1){
						element='div[data-pos="Top_1"]';
						type="after";
					}
					else{
						var left_p=jQuery('div[data-pos*="left"]');
						if (left_p.length===0){
							element="div.main_content";
							type="before";						
						}else{
							element=get_element_data(left_p,left_p.length);
							type="before";
						}
					}
				break;
				case 'left_1':
					var left_1=jQuery('div[data-pos*="left"]');
						type="before";					
					if (left_1.length==0){
						element="div.main_content";
					}
					else{
						element='div[data-pos="left_2"]';
					}
				break;
				case 'left_2':
					type="before";					
					element="div.main_content";
				break;
				case 'right_1':
					type="after";					
					element="div.main_content";
				break;				
				case 'right_2':
					var right_2=jQuery('div[data-pos*="right"]');
					type="after";					
					if (right_2.length==0){
						element="div.main_content";
					}
					else{
						element='div[data-pos="right_1"]';
					}				
				break;
				case 'Bottom_1':

					var bottom_1=jQuery('div[data-pos*="Bottom"]');
					if (bottom_1.length==1){
						element='div[data-pos="Bottom_2"]';
						type="before";
					}
					else{
						var right_p=jQuery('div[data-pos*="right"]');
						if (right_p.length===0){
							element="div.main_content";
							type="after";						
						}else{
							element=get_element_data(right_p,right_p.length);
							type="after";
						}
					}
				
				break;
				case 'Bottom_2':
					var bottom_2=jQuery('div[data-pos*="Bottom"]');
					if (bottom_2.length==1){
						element='div[data-pos="Bottom_1"]';
						type="after";
					}
					else{
						var right_p=jQuery('div[data-pos*="right"]');
						if (right_p.length===0){
							element="div.main_content";
							type="after";						
						}else{
							element=get_element_data(right_p,right_p.length);
							type="after";
						}
					}
				break;
			}
			ajax_sidebar(data,element,type);				
			li_status.addClass('selected');
		}
		jQuery('img.sdloading').hide();					
    });	
	function get_element_data(element,length){
		var element_selected="";
		element.each(function(index, element) {
			switch(length){
				case 1:
					if (index===0){http://www.wpthemegenerator.com/
						element_selected='div[data-pos="'+jQuery(this).attr('data-pos')+'"]';
					}
				break;
				case 2:
					if (index===1){
						element_selected='div[data-pos="'+jQuery(this).attr('data-pos')+'"]';
					}									
				break;
			}
		});
		return element_selected;
	}
	function ajax_sidebar(data,element,type){
		jQuery.post(document.URL,data,
			function(data) {
				switch (type){
					case 'after':
						jQuery(element).after(data);
					break;
					case 'before':
						jQuery(element).before(data);					
					break;
				}
				featured_thumb();
				jQuery('img.sdloading').hide();
			return false;
			//quitar imagen aqui;
			}
		);
	}	
	/*end sidebars*/
});