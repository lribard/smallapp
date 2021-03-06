﻿function buildData()
{
	var lastNames, firstNames, compNames;
	var nbEmpToCreate = 100000;
	var nbCompToCreate = 1000;
	
	function importCompaniesNames()
	{
		var result = [];
		var file = File(getFolder().path+"dataToImport/Companies.txt");
		var text = loadText(file);
		if (text != null)
		{
			var arr = text.split("\r");
			arr.forEach(function(item) {
				item.split("\t").forEach(function(compName) {
					result.push(compName);
				});
			});
		}
		return result;
	}
	
	
	function importLastNames()
	{
		var file = File(getFolder().path+"dataToImport/LastNames.txt");
		var result = null;
		var text = loadText(file);
		if (text != null)
		{
			var arr = text.split("\r");
			result = arr;
		}
		
		return result;
	}


	function importFirstNames()
	{
		var file = File(getFolder().path+"dataToImport/FirstNames.txt");
		var result = null;
		var text = loadText(file);
		if (text != null)
		{
			var arr = text.split("\r");
			result = { men: [], women:[] };
			arr.forEach(function(item)
			{
				var subarr = item.split("\t");
				if (subarr.length > 1)
				{
					if (subarr[1] == "1")
						result.women.push(subarr[0]);
					else
						result.men.push(subarr[0]);
				}
				
			});
		}
		
		return result;
	}
	
	function createRandomEmp(comp, manager)
	{
		var lastname = lastNames.getRandomElement();
		var sex = rangedRandom(0,1);
		var firstname = (sex == 1) ? firstNames.women.getRandomElement() : firstNames.men.getRandomElement();
		
		var emp = new ds.Employee({
			firstname: firstname,
			lastname: lastname,
			woman: (sex == 1),
			birthdate: new Date(rangedRandom(1940, 1990), rangedRandom(0, 11), rangedRandom(0,27)),
			salary: rangedRandom(220, 800) * 100,
			employer: comp
			
		});
		
		if (manager != null)
			emp.manager = manager;
			
		return emp;
	}
	
	//  --------------------- ---------------------
	
	
	lastNames = importLastNames();
	firstNames = importFirstNames();
	compNames = importCompaniesNames();
		
	if (compNames != null)
	{
		for (var i = 0; i < nbCompToCreate; ++i)
		{
			var comp, compName;
			do
			{
				compName = compNames.getRandomElement()+" "+compNames.getRandomElement()+" "+compNames.getRandomElement();
				comp = ds.Company({name: compName });
			} while (comp != null);
			
			comp = new ds.Company({
				name: compName,
				revenues: rangedRandom(5, 100) * 1000000,
				creationDate: new Date(rangedRandom(1900, 2011), rangedRandom(0, 11), rangedRandom(0,27))
			});
			comp.save();
		}
	}
	
	if (lastNames != null && firstNames != null)
	{
		var allCompanies = ds.Company.all();
		allCompanies.forEach(function(comp) {
			var nbLevels = rangedRandom(1,5);
			var manager = createRandomEmp(comp);
			for (var i = 0; i < nbLevels; ++i)
			{
				
			}
		});
			
		for (var i = 0; i < nbEmpToCreate; ++i)
		{
			var lastname = lastNames.getRandomElement();
			var sex = rangedRandom(0,1);
			var firstname = (sex == 1) ? firstNames.women.getRandomElement() : firstNames.men.getRandomElement();
			var comp = allCompanies[rangedRandom(0,allCompanies.length-1)];
			
			var emp = new ds.Employee({
				firstname: firstname.capitalize(),
				lastname: lastname.capitalize(),
				woman: (sex == 1),
				birthdate: new Date(rangedRandom(1940, 1990), rangedRandom(0, 11), rangedRandom(0,27)),
				salary: rangedRandom(220, 800) * 100,
				employer: comp
			});
			emp.save();
		}
		
		allCompanies.forEach(function(comp) {
			var emps = comp.employees;
			var nbemp = emps.length;
			var nblevels = Math.round(Math.LOG10E*Math.log(nbemp));
			var curManager = null;
			var curemp = 1;
			for (var k = 0; k < nblevels-1; ++k)
			{
				
			}
		});
	}
	


}


