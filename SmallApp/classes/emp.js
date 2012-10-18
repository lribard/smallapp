
var emp = model.addClass("Employee", "Employees")

emp.addAttribute("ID", "storage", "long", "key auto");

emp.addAttribute("firstname", "storage", "string", "btree").addEventListener("onSet", setToCapitalize);
emp.addAttribute("lastname", "storage", "string", "btree", { autoComplete:true }).addEventListener("onSet", setToCapitalize);
emp.addAttribute("salary", "storage", "number");

emp.addAttribute("woman", "storage", "bool", "cluster");
emp.addAttribute("birthdate", "storage", "date");
emp.addAttribute("age", "calculated", "long");
 
emp.addAttribute("hiringDate", "storage", "date");
emp.addAttribute("yearsInComp", "calculated", "long");
emp.addAttribute("hired", "calculated", "bool");

emp.addAttribute("manager", "relatedEntity", "Employee", "Employee");
emp.addAttribute("staff", "relatedEntities", "Employees", "manager", {reversePath:true});

emp.addAttribute("employer", "relatedEntity", "Company", "Company");



// ---------------------------

emp.age.onGet = function()
{
	return datetool.computeAge(this.birthdate);
}

emp.age.onSort = function(ascending)
{
	return datetool.buildSortQuery(ascending, "birthdate");
}

emp.age.onQuery = function(compareOperator, compareValue)
{
	return datetool.buildQuery(compareOperator, compareValue, "birthdate");
}


// ---------------------------

emp.yearsInComp.onGet = function()
{
	return datetool.computeAge(this.hiringDate);
}

emp.yearsInComp.onSort = function(ascending)
{
	return datetool.buildSortQuery(ascending, "hiringDate");
}

emp.yearsInComp.onQuery = function(compareOperator, compareValue)
{
	return datetool.buildQuery(compareOperator, compareValue, "hiringDate");
}

// ---------------------------

emp.hired.onGet = function()
{
	return this.hiringDate != null;
}

emp.hired.onSort = function(ascending)
{
	return "hiringDate" + (ascending ? " asc" : " desc");
}

emp.hired.onQuery = function(compareOperator, compareValue)
{
	var newOper;
	if (compareOperator === "=" || compareOperator === "==")
	{
		if (compareValue === true)
			newOper = "is not";
		else
			newOper = "is";
	}
	else
	{
		if (compareValue === true)
			newOper = "is";
		else
			newOper = "is not";
	}
	return "hiringDate "+newOper+" null";
}




