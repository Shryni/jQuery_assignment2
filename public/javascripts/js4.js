	$(function () {
		var $added = $('#added');
		var $inform = $('#inform');
		var $upform = $('#upform');
		var $box = $('#box');
		var $sform_list = $('#sform_list');
		var $search_input = $('#search_input');

		var $name = $('#name');
		var $id = $('#id');
		var $age = $('#age');
		var $city = $('#city');
		var $company = $('#company');
		var $contact = $('#contact');

		var $uname = $('#uname');
		var $uid = $('#uid');
		var $uage = $('#uage');
		var $ucity = $('#ucity');
		var $ucompany = $('#ucompany');
		var $ucontact = $('#ucontact');

		var $gID;
		var records = 9;
		var min = 0;
		var max = records+min;

		function addPerson(value)
		{
			$box.hide();
			var one = '<tr> <td>' + value.id + '</td>';
			var two = '<td>' + value.Name + '</td>';
			var thr = '<td>' + value.Age + '</td>';
			var fou = '<td>' + value.Company + '</td>';
			var fiv = '<td>' + value.City + ' </td>';
			// var six = '<td>' + value.Contact + ' </td>';
			var sev  = '<td> <button type="button" class = "btn btn-success update"><span class="glyphicon glyphicon-ok"></span></button>';
			var eig  = '<button type="button" class = "btn btn-danger delete"> <span class="glyphicon glyphicon-trash"></span></button> </td> </tr>';
			
			$added.append(one + two + thr + fou + fiv  + sev + eig);
		}
		$('#ref').click(function(){
	   	 location.reload();
		});
		$.ajax
		({
			type:'GET',
			url:'http://localhost:3000/information',
			success: function(data)
			{
				//var temp = data.Search;
				var th = "<tr><td><strong>ID</strong></td><td><strong>Name</strong></td><td><strong>Age</strong></td><td><strong>Company</strong></td><td><strong>City</strong></td><td><strong>Updt/Del</strong></td></tr>";
				$added.append(th);
				for(var i = min ; i<=max ;i++)
				//$.each(data,function(index,value)
				{
					addPerson(data[i]);
					//console.log(data[i].id);
				};
			},
			error: function()
			{
				$added.append("not found");
			}
		});
		$('#next').on('click',function ()
		{
			min = min+records+1;
			max = max+records+1;

			$added.empty();
			$.ajax({
			type:'GET',
			url:'http://localhost:3000/information',
			//url:'http://www.omdbapi.com/?s=title',
			success:function(data) 
			{
				var th = "<tr><td><strong>ID</strong></td><td><strong>Name</strong></td><td><strong>Age</strong></td><td><strong>Company</strong></td><td><strong>City</strong></td><td><strong>Updt/Del</strong></td></tr>";
				$added.append(th);
				for(var i=min ; i<=max ;i++)
				//$.each(data,function(index,value)
				{
					addPerson(data[i]);
				};
			}
		});
		});
		$('#prev').on('click',function ()
		{
			
			if(min>=9)
			{
			min = min-10;
			max = max-10;
			$added.empty();
			$.ajax({
			type:'GET',
			url:'http://localhost:3000/information',
			//url:'http://www.omdbapi.com/?s=title',
			success:function(data) 
			{
				var th = "<tr><td><strong>ID</strong></td><td><strong>Name</strong></td><td><strong>Age</strong></td><td><strong>Company</strong></td><td><strong>City</strong></td><td><strong>Updt/Del</strong></td></tr>";
				$added.append(th);
				for(var i=min ; i<=max ;i++)
				//$.each(data,function(index,value)
				{
					addPerson(data[i]);
				};
			}

			});
			}
		});
		//search
		 $('#search').on('click',function(){
		 		
		 		var $search = $search_input.val();
		 		var $flag = 0;
		 		$.ajax
				({
					type:'GET',
					url:'http://localhost:3000/information',
					success: function(data)
		 			{
		 					for(var i=0 ; i<=100000 ;i++)
		 					{
		 						
		 						if($search == data[i].id )
		 						{
		 							$box.show();
		 							flag = 1;
		 							var nam =  data[i].Name ;
		 							var age =  data[i].Age;
		 							var com =  data[i].Company;
		 							var cit =  data[i].City;
		 							// var con = '<li>' + data[i].Contact + '</li>';
		 							$sform_list.empty();
		 							
			 						$sform_list.append('<i class="fa fa-info-circle" aria-hidden="true"></i> Employee <strong>' +nam +'</strong> of age <strong> '+ age + '</strong> is working in <strong> '+ com +'</strong> at <strong>' + cit + '</strong>');
		 						}
		 						
		 					}
		 					if(flag == 0)
		 					{
		 						$box.hide();
		 					}

		 				},
		 				error:function()
		 				{
		 					alert('Cannot search');
		 				}
		 		});
		 });

		$inform.delegate('.add','click',function()
			{
				var obj={};
				obj['Name']=$name.val();
				obj['id']=$id.val();
				obj['Age']=$age.val();
				obj['Company']=$company.val();
				obj['City'] = $city.val();
				// obj['Contact'] = $contact.val();
				$.ajax({
						type:'POST',
				        url:'http://localhost:3000/information',
				        data: obj,
				      	success:function(obj)
						{
							addPerson(obj);
							alert('Added Succesfully');
						},
						error:function()
						{
							alert('error adding person');
						}
				});
				$name.val('');
				$id.val('');
				$age.val('');
				$company.val('');
				$city.val('');
			});
		
		$added.delegate('.delete','click',function()
		 	{
		 		 var $tr = $(this).closest('tr');
				 var $movieID = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').prev('td').text();
				 console.log($movieID);
				 $.ajax({
		 				type:'DELETE',
		 		        url:'http://localhost:3000/information/'+ $movieID,
						success:function()
		 		        {
		 		        	$tr.fadeOut(300,function()
		 		        	 	{
		 		        	 		$(this).remove();
		 		        	 		alert('Deleted Succesfully');
		 		        	 	});
		 		 			
		 		        },
		 		        error:function()
		 		        {
		 		        	
		 		        	alert('Could not delete data');
		 		        }
		 			});
		 	});


		$added.delegate('.update','click',function()
			{
			
			var $id = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').prev('td').text();
			var $name = $(this).closest('td').prev('td').prev('td').prev('td').prev('td').text();
			var $age = $(this).closest('td').prev('td').prev('td').prev('td').text();
			var $company = $(this).closest('td').prev('td').prev('td').text();
			var $city = $(this).closest('td').prev('td').text();
			// var $contact = $(this).closest('td').text();
			
			$inform.hide();
			$upform.show();
			$uname.val($name);
			$uid.val($id);
			$uage.val($age);
			$ucompany.val($company);
			$ucity.val($city);
			// $ucontact.val($contact);
			$gID = $id;
		});
			
		$upform.delegate('.up','click',function()
			 {
				var obj1={};
			 	obj1['Name']=$uname.val();
			 	obj1['Age']=$uage.val();
			 	obj1['id']=$uid.val();
			 	obj1['Company'] = $ucompany.val();
			 	obj1['City'] = $ucity.val();
			 	// obj1['Contact'] = $ucontact.val();
			 	//var $thisrow = $(this).closest('tr');
			 	// $ajax({
			 	// 		type:'DELETE',
		 		//         url:'http://localhost:3000/Search/'+ $gID,
			 	// 		success:function()
		 		//         {
		 		//         	$tr.fadeOut(300,function()
		 		//         	 	{
		 		//         	 		$(this).remove();
		 		//         	 	});
		 		 			
		 		//         },
		 		//         error:function()
			 	// 			{
			 					
			 	// 			}

			 	// });
			 	$.ajax({
	                        type: 'PUT', // HTTP method POST or GET
	                        url: 'http://localhost:3000/information/'+ $gID, //Where to make Ajax calls
	                        data:obj1, //Form variables
	                        success:function(data)
	                        {
						       addPerson(obj1);
	                           alert("Updated");
	                           alert("IMDB ID cant be changed");
							},
			 				error:function()
			 				{
			 					alert('error updating movie');
			 				}
			 	
					});
			 	});
});