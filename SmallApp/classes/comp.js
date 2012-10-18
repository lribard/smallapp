//model.Company = {
//	collectionName: "Companies",
//	
//	ID: { kind:"storage", type:"long", autoSequence:true, primKey:true },
//	name: { kind:"storage", type:"string" }
//};


comp = model.addClass("Company", "Companies")

comp.addAttribute("ID", "storage", "long", "key auto");
comp.addAttribute("name", "storage", "string", "btree").addEventListener("onSet", setToCapitalizeMultiple);
comp.addAttribute("revenues", "storage", "number");
comp.addAttribute("creationDate", "storage", "date");

comp.addAttribute("employees", "relatedEntities", "Employees", "employer", {reversePath:true});
