export const printObject = (obj:any) => {
	const str = JSON.stringify(obj, null, 4);
	console.log(str);
}