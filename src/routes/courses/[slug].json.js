export const get = ({ params }) => {
	// we could get the dynamic slug from the parameter of get.
	const { slug } = params;

	const data = { metadata: { slug, title: 'ou lala' }, content: 'asdad' };
	const body = JSON.stringify(data);

	return { body };
};
