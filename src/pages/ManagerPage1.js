import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Charts from '../component/charts'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ManagerDrawer from '../component/ManagerDrawer'
const drawerWidth = 240;
const currencies = [
    {
        value: '0',
        label: '已完成',
    },
    {
        value: '1',
        label: '未支付',
    },
    {
        value: '2',
        label: '已取消',
    },

];
const styles = theme => ({
    root: {
        display: 'flex',
    },
    map:
        {
            height:700,
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
        startDate: '',
        endDate: '',
        status:''
    };
    constructor(props, context) {
        super(props, context);

        this.state = {
            startDate: new Date(),
            endDate: new Date()
        };

    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    handleChange=(currencies)=>
    {
        this.setState({
            status: currencies
        });
    };
    handleStartDateChange=(date)=> {
        this.setState({

            startDate: date
        });
    };
    handleEndDateChange=(date) =>{
        this.setState({
            endDate: date
        });
    };
    handleCommit=() =>{
        var start=this.state.startDate;
        var end=this.state.endDate;
        var status=this.state.status;

        var url='http://localhost:8080/admin/addCount?';
        url+='start=';
        url+=this.dateToString(start);
        url+='&end=';
        url+=this.dateToString(end);
        url+='&status=';
        url+='1';
        console.log(url);
        var myChart = echarts.init(document.getElementById('charts'));

        axios.get(url,{})
            .then((response) =>{
                console.log(JSON.stringify(response.data));
                var list=response.data.data;
                console.log(list);
                var date=[];
                var count=[];
                list.forEach(function (value, list) {
                    console.log(value);
                    console.log(value.date);
                    console.log(value.count);
                    date.push(value.date);
                    count.push(value.count)

                });
                myChart.setOption({
                    title: {
                        text: '订单统计'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: date
                    },
                    yAxis: {},
                    series: [{
                        name: '订单数',
                        type: 'line',
                        data: count
                    }]
                });

            })
            .catch(function (error) {
                console.log(error);
            });





    };
    dateToString(date){
      console.log(date.toString());
        var year = date.getFullYear().toString();
        var month =(date.getMonth() + 1).toString();
        var day = (date.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + "-" + month + "-" + day;
        return dateTime;

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

                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={12} sm={9}>
                            <Card className={classes.map}>
                                <CardContent>
                                    <div id="charts" style={{ width: 600, height: 600 }}></div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <form >
                                        <div>
                                            统计总订单
                                        </div>
                                        <br/>
                                        <font size="2">开始时间</font>
                                        <br/>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleStartDateChange}

                                        />
                                    <br/>
                                        <br/>
                                        <font size="2">结束时间</font>
                                        <br/>
                                        <DatePicker
                                            selected={this.state.endDate}

                                            onChange={this.handleEndDateChange}

                                        />
                                        <br/>

                                        <TextField
                                            id="standard-select-currency-native"
                                            select
                                            label="订单状态"
                                            className={classes.textField}
                                            value={this.state.currency}
                                            onChange={this.handleChange}
                                            SelectProps={{
                                                native: true,
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                            }}

                                            margin="normal"
                                        >
                                            {currencies.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                        <Button

                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleCommit}
                                        >
                                            查询
                                        </Button>
                                    </form>
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
