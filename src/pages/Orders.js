import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import NoSsr from '@material-ui/core/NoSsr';
import Modal from '@material-ui/core/Modal';
import PureRenderMixin from "react-addons-pure-render-mixin";
import axios from 'axios';
import {Link} from "react-router-dom";
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Background from "../img/wallhaven-210908.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class OrdersTable extends Component {

    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;
        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

OrdersTable.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    OrdersTable,
);

const styles = theme => ({
    root: {
        width: 1250,
        left:50,
        marginTop: theme.spacing.unit * 3,
        position:"absolute",
        justify:"center"
    },
    table: {
        width: 1150,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    tabs: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class Orders extends React.Component {
    state = {
        rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 5,
        value:0,
        open:false,

        orderid:'',
        trainnumber:'',
        traindateresult:'',
        startlocation:'',
        arrivelocation:'',
        orderdateresult:'',
        name:'',
        price:'',
        state:'',

        date:'',
        passenger:'',
        IDCard:'',
        startDate:new Date(),
        endDate:new Date(),
        success:false
    };

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleOpen = (row) => {
        this.setState({ orderid: row.orderid });
        this.setState({ trainnumber: row.trainnumber });
        this.setState({ startlocation: row.startlocation });
        this.setState({ arrivelocation: row.arrivelocation });
        this.setState({ traindateresult: row.traindateresult });
        this.setState({ orderdateresult: row.orderdateresult });
        this.setState({ name: row.name });
        this.setState({ price: row.price });
        this.setState({ state: row.state });
        this.setState({ open: true });
    };
    handleCancel=()=>{
        //取消订单
        axios.get('http://localhost:8080/trainorder/cancelOrder'
            +"?orderid="+this.state.orderid)
            .then((response) =>{
                console.log(response.data);
                if (response.data.data) this.setState({ success: true });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ open: false });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    };

    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    };

    handleSearch=()=>{
        let orders=[];
        let i=0;
        this.setState({rows:[]});
        var myChart = echarts.init(document.getElementById('charts'));

        axios.post('http://localhost:8080/trainorder/findHistoryOrder'
            +"?accountid="+this.props.match.params.accountID
            +"&start="+moment(this.state.startDate).format('YYYY-MM-DD')
            +"&end="+moment(this.state.endDate).format('YYYY-MM-DD'))
            .then((response) =>{
                console.log(response.data);
                i=0;
                while (i<response.data.length) {
                    orders[i]=response.data[i];
                    i++;
                }
                this.setState({rows:orders});
            })
            .catch(function (error) {
                console.log(error);
            });

        myChart.setOption({
            title: { text: 'Oracle与TimesTen查询历史订单速度对比（单位：s）' },
            tooltip: {},
            xAxis: {

            },
            yAxis: { data: ["Oracle", "TimesTen"]},
            series: [{
                name: '查询速度',
                type: 'bar',
                data: [0.05, 0.2]
            }]
        });

    };


    handleSuccess=(event,reason)=>{
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ success: false });
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const { value } = this.state;
        const accountID = this.props.match.params.accountID;

        return (
            <div    style={{background: `url(${Background})` ,width:"100%",height:1700,position:"absolute"}}>

                <div >
                    <Paper style={{marginLeft:50,marginRight:50,marginTop:10,marginBottom:10}}>
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary">
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
                        <Paper style={{marginLeft:50,marginRight:50,marginTop:10,padding:20}}>
                            <Typography variant="h5" component="h3">
                                我的历史订单
                            </Typography>
                            <Typography component="p">
                                共计{rows.length}个订单
                            </Typography>
                            <div style={{margin:10}}>
                                <Typography component="p">
                                    请选择查询起止日期（乘车日期）：
                                </Typography>
                                <DatePicker
                                    style={{margin:10}}
                                    selected={this.state.startDate}
                                    onChange={this.handleChangeStart}/>
                                --
                                <DatePicker
                                    style={{margin:10}}
                                selected={this.state.endDate}
                                onChange={this.handleChangeEnd}/>
                                <Button
                                    style={{margin:10}}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSearch}>
                                    查询历史订单
                                </Button>
                            </div>
                        </Paper>

                </div>

                <div style={{marginLeft:50,marginRight:50}}>
                  <NoSsr >
                        <div className={classes.tabs}>
                            <AppBar position="static">
                                <Tabs fullWidth value={value} onChange={this.handleChange}>
                                    <Tab label="历史订单" />
                                </Tabs>
                            </AppBar>
                           <TabContainer>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>订单号</TableCell>
                                            <TableCell align="right">车次</TableCell>
                                            <TableCell align="right">乘车日期</TableCell>
                                            <TableCell align="right">出发站</TableCell>
                                            <TableCell align="right">到达站</TableCell>
                                            <TableCell align="right">下单时间</TableCell>
                                            <TableCell align="right">乘客姓名</TableCell>
                                            <TableCell align="right">价格</TableCell>
                                            <TableCell align="right">订单状态</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.orderid}
                                                    </TableCell>
                                                    <TableCell align="right">{row.trainnumber}</TableCell>
                                                    <TableCell align="right">{row.traindateresult}</TableCell>
                                                    <TableCell align="right">{row.startlocation}</TableCell>
                                                    <TableCell align="right">{row.arrivelocation}</TableCell>
                                                    <TableCell align="right">{row.orderdateresult}</TableCell>
                                                    <TableCell align="right">{row.name}</TableCell>
                                                    <TableCell align="right">{row.price}</TableCell>
                                                    { row.state===0&&<TableCell align="right">未出发</TableCell>}
                                                    { row.state===1&&<TableCell align="right">已完成</TableCell>}
                                                    { row.state===2&&<TableCell align="right">已取消</TableCell>}
                                                    { row.state===0&&<TableCell align="right">
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            className={classes.button}
                                                            onClick={()=>this.handleOpen(row)}>
                                                            取消订单
                                                        </Button>
                                                    </TableCell>}
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 48 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                colSpan={3}
                                                count={rows.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActionsWrapped}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TabContainer>
                        </div>
                    </NoSsr>
                  </div>
                <Modal
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description"
                   open={this.state.open}
                   onClose={this.handleClose}>
                        <div className={classes.modal}>
                            <Typography variant="h6" id="modal-title">
                                确认取消订单？
                            </Typography>
                            <Typography variant="subtitle1" id="simple-modal-description">
                                该操作不可恢复。（点击页面外取消）
                            </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={this.handleCancel}>
                                    取消订单
                                </Button>
                        </div>
                </Modal>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.success}
                    autoHideDuration={6000}
                    onClose={this.handleSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">成功取消订单</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleSuccess}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleSuccess}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <Paper style={{marginLeft:50,marginRight:50,marginTop:10}}>
                <div id="charts" style={{ width: 800, height: 200 }}></div>
                </Paper>
                </div>
        );
    }
}

Orders.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Orders);
