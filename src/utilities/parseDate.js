export const PST = "T20:00:00";
export const toPST = (basicDate) =>
	basicDate.toLocaleString("en-US", { timeZone: "PST" });
