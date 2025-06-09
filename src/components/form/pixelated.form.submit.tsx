 

export async function emailFormData(e: Event, callback: (e: Event) => void) {
	// const sendmail_api = "https://nlbqdrixmj.execute-api.us-east-2.amazonaws.com/default/sendmail";
	const sendmail_api = "https://sendmail.pixelated.tech/default/sendmail";
	const target = e.target as HTMLFormElement;
	const myform = document.getElementById(target.id);
	e.preventDefault();
	const myFormData: { [key: string]: any } = {};
	const formData = new FormData(myform as HTMLFormElement);
	for (const [key, value] of formData.entries()) {
		myFormData[key] = value ;
	}
	myFormData.Date = new Date().toLocaleDateString() ;
	myFormData.Status = "Submitted" ;
	await fetch(sendmail_api, {
		method: 'POST',
		mode: 'cors', 
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(myFormData),
	})
		.then((response) => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json();
		}); 
	callback(e);
}