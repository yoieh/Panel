import fetch from 'isomorphic-unfetch';

const fetchCustomers = async baseUrl => {
	const res = await fetch(`${baseUrl}/api/customer`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});
	const data = await res.json();
	return data;
};

const Page = ({ customers }) => {
	return <div>test</div>;
};

Page.getInitialProps = async ({ req }) => {
	const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	const customers = await fetchCustomers(baseUrl);
	return { customers };
};

export default Page;
