import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import fetch from 'isomorphic-unfetch';

import { useRouter } from 'next/router';

const New = props => {
	const router = useRouter();
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');

	const handleNameChange = e => setName(e.target.value);
	const handleUrlChange = e => setUrl(e.target.value);

	const handleSubmit = async e => {
		if (name.length > 0 && url.length > 0) {
			const res = await fetch('http://localhost:3000/api/customer', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, url })
			});

			if (res.status === 200) {
				router.push('/customer/');
			}
		}
	};
	return (
		<Card>
			<CardContent>
				<Grid container spacing={3}>
					<Grid item md={6} xs={12}>
						<TextField
							fullWidth
							label="Name"
							placeholder="Name"
							value={name}
							onChange={handleNameChange}
							variant="outlined"
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							fullWidth
							label="Url"
							placeholder="url"
							value={url}
							onChange={handleUrlChange}
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Button onClick={handleSubmit} variant="contained" color="primary">
					Add
				</Button>
			</CardActions>
		</Card>
	);
};

New.propTypes = {};

export default New;
