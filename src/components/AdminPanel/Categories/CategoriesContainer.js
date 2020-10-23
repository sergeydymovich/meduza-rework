import React from "react";
import CategoriesRow from "./CategoriesRow.js";

function CategoriesContainer(props) {

	return (	
		<CategoriesRow {...props} />
	);		
}

export default React.memo(CategoriesContainer);