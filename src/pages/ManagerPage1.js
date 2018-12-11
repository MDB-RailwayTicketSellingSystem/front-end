import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import Grid from '@material-ui/core/Grid';
import ManagerDrawer from '../component/ManagerDrawer'
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    card: {
        height:700,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        paddingBottom: '30px',
    },

});

class ManagerPage1 extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>

                <ManagerDrawer experimentName='【管理员】查询订单总量 '/>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Grid
                        container
                        spacing={8}
                        direction="row"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <form >

                                        <TextField
                                            id="startDate"
                                            label="起始日期"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField

                                            id="startDate"
                                            label="结束日期"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"

                                        >
                                            查询
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={9}>
                            <Card className={classes.card}>
                                <CardContent>
                                  <img src="https://wx3.sinaimg.cn/crop.0.577.2048.1150.1000/971cb82fgy1fms8rtbi9pj21kw2gawvj.jpg"></img>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </main>
            </div>
        );
    }
}

ManagerPage1.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ManagerPage1);
