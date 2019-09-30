import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';

import { useRouter } from 'next/router';

import StatusBullet from './StatusBullet';
import { Grid } from '@material-ui/core';

const statusColors = {
	delivered: 'success',
	pending: 'info',
	refunded: 'danger'
};

const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: theme.palette.success.main,
		height: 75,
		width: 75
	},
	icon: {
		height: 32,
		width: 32
	},
	title: {
		fontSize: '5rem'
	},
	statusbullet: {
		marginRight: 5
	}
}));

const CustomerInfo = ({ customer }) => {
	const classes = useStyles();
	const router = useRouter();

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar className={classes.avatar}>
						<PeopleIcon className={classes.icon} />
					</Avatar>
				}
				title={<Typography variant="h3">{customer.name}</Typography>}
				subheader={
					<Typography variant="subtitle1">
						<Icon size="inherit">
							<StatusBullet
								className={classes.statusbullet}
								color={statusColors['delivered']}
								size="md"
							/>
						</Icon>
						<span>{customer.url}</span>
					</Typography>
				}
			/>

			<CardContent>
				{/* <Grid item> */}
				{/* <Grid container spacing={2}> */}
				{/* <Grid item>
              <Icon edge="end" size="small">
                <StatusBullet color={statusColors['delivered']} size="sm" />
              </Icon>
            </Grid> */}

				{/* </Grid> */}
				{/* </Grid> */}
			</CardContent>
		</Card>
	);
};

export default CustomerInfo;
