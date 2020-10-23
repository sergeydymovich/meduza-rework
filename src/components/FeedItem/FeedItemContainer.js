import React from "react";
import FeedItem from "./FeedItem.js";

function FeedItemContainer({ article }) {

	return (
		<FeedItem article={article} />
	);
}

export default React.memo(FeedItemContainer);