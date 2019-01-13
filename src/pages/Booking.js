import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Background from '../img/wallhaven-210908.jpg';
import { Link } from 'react-router-dom';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({

});

class Booking extends React.Component {
    state={
        start: '',
        end: '',
        date:'',
        startDate:new Date()
    };

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChange1(date) {
        this.setState({
            startDate: date
        });
    }

    render(){
        const {classes} = this.props;
        const accountID = this.props.match.params.accountID;
        return (
            <div style={{background: `url(${Background}) no-repeat` ,width:"100%",height:700,position:"absolute"}}>
                <div >
                    <Paper style={{margin:10}}>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"

                    >
                        <Typography style={{marginRight:300,marginTop:10,marginLeft:50}} variant="h5" component="p">
                            欢迎您，{accountID}
                        </Typography>
                        <div>
                            <Link to={'/Booking/'+accountID}>
                                <SendIcon /><Tab label="查询车票" />
                            </Link>
                            <Link to={'/Orders/'+accountID}>
                                <DraftsIcon /><Tab label="历史订单" />
                            </Link>
                        </div>
                    </Tabs>
                </Paper>
                </div>
                <div>
                        <Paper style={{width:300,left:100,position:"absolute",top:120}}>
                        <Grid container
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              >
                            <Grid item xs={12}>
                                <Grid item>
                                <FormControl margin="normal" required>
                                    <InputLabel htmlFor="start">出发地</InputLabel>
                                    <Input
                                        id="start"
                                        name="start"
                                        autoComplete="start"
                                        autoFocus
                                        value={this.state.start}
                                        onChange={this.handleChange('start')}/>
                                </FormControl>
                            </Grid>
                                <Grid item>
                                    <FormControl margin="normal" required >
                                        <InputLabel htmlFor="end">到达地</InputLabel>
                                        <Input
                                            id="end"
                                            name="end"
                                            type="end"
                                            value={this.state.end}
                                            onChange={this.handleChange('end')}/>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                <div style={{margin:10}}>
                                    <Typography component="p">
                                        请选择出发日期：
                                    </Typography>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange1}
                                    />
                                </div>
                            </Grid>
                                <Grid item>
                                    <div>
                                    <Link to={'/Results/'+accountID+'/'+this.state.start+'/'+this.state.end+'/'+moment(this.state.startDate).format('YYYY-MM-DD')}>
                                        <Button
                                            type="search"
                                            style={{marginTop:10,marginBottom:10}}
                                            fullWidth
                                            variant="contained"
                                            color="primary">
                                            查询
                                        </Button>
                                    </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                     </Paper>
                </div>
            </div>
        );
    }
}

Booking.propTypes = {
    classes: PropTypes.object.isRequired,
};
Booking.contextTypes = {router:()=> React.PropTypes.func.isRequired };
export default withStyles(styles)(Booking);