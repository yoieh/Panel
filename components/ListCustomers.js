import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '@material-ui/core/Icon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';

import { useRouter } from 'next/router';

import StatusBullet from '../components/StatusBullet';

const statusColors = {
	delivered: 'success',
	pending: 'info',
	refunded: 'danger'
};

const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: theme.palette.success.main,
		height: 45,
		width: 45
	},
	icon: {
		height: 32,
		width: 32
	}
}));

const ListCustomers = ({ items }) => {
	const classes = useStyles();
	const router = useRouter();

	return (
		<Card>
			{/* <CardHeader subtitle={`${items.length} in total`} title="Customers" /> */}
			<List>
				{items.map((item, i) => (
					<ListItem
						key={item._id}
						button
						divider={i < items.length - 1}
						onClick={() => router.push(`/customer/${item._id}`)}
					>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<PeopleIcon className={classes.icon} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={item.name} secondary={item.url} />
						<Icon edge="end" size="small">
							<StatusBullet color={statusColors['delivered']} size="sm" />
						</Icon>
					</ListItem>
				))}
			</List>
		</Card>
	);
};

export default ListCustomers;
