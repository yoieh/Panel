import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import { useRouter } from 'next/router';

import fetch from 'isomorphic-unfetch';

import ListCustomers from '../../components/ListCustomers';
import CustomerInfo from '../../components/CustomerInfo';

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

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	},
	fabGreen: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.success.main,
		'&:hover': {
			backgroundColor: theme.palette.success.main
		}
	}
}));

const Page = ({ customers, customerId }) => {
	const classes = useStyles();
	const theme = useTheme();
	const router = useRouter();

	const newCustomer = url => router.push(url);

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen
	};

	return (
		<div>
			<Grid container spacing={3} direction="row-reverse">
				{customerId && (
					<Grid item md={6} xs={12}>
						<CustomerInfo customer={customers.find(c => c._id === customerId)} />
					</Grid>
				)}

				<Grid item md={6} xs={12}>
					<ListCustomers items={customers} />
				</Grid>
			</Grid>

			<Zoom
				in={true}
				timeout={transitionDuration}
				style={{
					transitionDelay: `${true ? transitionDuration.exit : 0}ms`
				}}
				onClick={() => {
					newCustomer('/customer/add/');
				}}
				unmountOnExit
			>
				<Fab aria-label="Add" className={classes.fab} color="primary">
					{/* <Router as="/customer/new" href="/customer/new"> */}
					<AddIcon />
				</Fab>
			</Zoom>
		</div>
	);
};

Page.getInitialProps = async ({ req, query: { id } }) => {
	const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	const customers = await fetchCustomers(baseUrl);
	return { customers, customerId: id };
};

export default Page;
