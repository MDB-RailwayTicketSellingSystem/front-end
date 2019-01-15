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
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import PureRenderMixin from "react-addons-pure-render-mixin";
import {Link} from "react-router-dom";
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Background from '../img/wallhaven-210908.jpg';
import axios from 'axios';
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

class ResultsTable extends Component {

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

ResultsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    ResultsTable,
);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    card:{
        display: 'flex',
        flexWrap: 'wrap',
    },
});


class Results extends React.Component {
    state = {
        rows: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
        page: 0,
        rowsPerPage: 5,
        open:false,

        trainnumber:'',
        startstation:'',
        arrivestation:'',
        leavetimeresult:'',
        arrivetimeresult:'',

        remainingseat:'',
        price:'',

        date:'',

        name:'',
        IDCard:'',
        success:false
    };
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleOpen = (row) => {
        this.setState({ trainnumber: row.trainnumber });
        this.setState({ startstation: row.startstation });
        this.setState({ arrivestation: row.arrivestation });
        this.setState({ leavetimeresult: row.leavetimeresult });
        this.setState({ arrivetimeresult: row.arrivetimeresult });

        this.setState({ remainingseat: row.remainingseat });
        this.setState({ price: row.price });
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleBook=()=>{
        //订票接口
        axios.get('http://localhost:8080/trainorder/createOrder'
            +"?accountid="+this.props.match.params.accountID
            +"&trainnumber="+this.state.trainnumber
            +"&traindate="+this.props.match.params.date
            +"&startlocation="+this.state.startstation
            +"&arrivelocation="+this.state.arrivestation
            +"&name="+this.state.name
            +"&passengercard="+this.state.IDCard)
              .then((response) =>{
                       console.log(response.data);

                   })
                   .catch(function (error) {
                       console.log(error);
                   });
        this.setState({ open: false });
        this.setState({success:true});
    };

    handleSuccess=(event,reason)=>{
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ success: false });
    };
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        let trains=[];
        let i=0;

        //查询列车接口
        axios.get('http://localhost:8080/time/findTrain'
            +"?start="+this.props.match.params.start
            +"&arrive="+this.props.match.params.end
            +"&date="+this.props.match.params.date)
              .then((response) =>{
                console.log(response.data);
                i=0;
                while (i<response.data.length) {
                    trains[i]=response.data[i];
                    i++;
                }
                this.setState({rows:trains});
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    componentDidMount(){
        var myChart = echarts.init(document.getElementById('charts'));
        myChart.setOption({
            title: { text: 'Oracle与TimesTen 查询列车 时间对比（单位：s）' },
            tooltip: {},
            xAxis: {

            },
            yAxis: { data: ["Oracle", "TimesTen"]},
            series: [{
                name: '查询时间',
                type: 'bar',
                data: [0.078, 0.112]
            }]
        });
    }
    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
         const accountID = this.props.match.params.accountID;
        const start = this.props.match.params.start;
        const end = this.props.match.params.end;
        const date = this.props.match.params.date;
        return(
            <div style={{background: `url(${Background})` ,width:"100%",height:1700,position:"absolute"}}>

                    <div >
                        <Paper style={{marginLeft:50,marginRight:50,marginTop:10,marginBottom:10}}>
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
                        <Paper style={{marginLeft:50,marginRight:50,marginTop:10,marginBottom:10,padding:20}} elevation={1}>
                            <Typography variant="h5" component="h3" style={{textJustify:"center"}}>
                                {start}-->{end}({date})
                            </Typography>
                            <Typography component="p">
                                共计{rows.length}个车次
                            </Typography>
                        </Paper>
                    </div>

                    <div >
                    <Paper style={{marginLeft:50,marginRight:50}}>
                    <Table style={{minWidth: 500}}>
                        <TableHead >
                            <TableRow>
                                <TableCell>车次</TableCell>
                                <TableCell align="right">出发地</TableCell>
                                <TableCell align="right">到达地</TableCell>
                                <TableCell align="right">出发时间</TableCell>
                                <TableCell align="right">到达时间</TableCell>

                                <TableCell align="right">剩余座位</TableCell>
                                <TableCell align="right">价格</TableCell>
                                <TableCell name="book" align="right">订票</TableCell>
                            </TableRow>
                        </TableHead>

                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                        return (
                                    <TableRow rowKey={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.trainnumber}
                                        </TableCell>
                                        <TableCell align="right">{row.startstation}</TableCell>
                                        <TableCell align="right">{row.arrivestation}</TableCell>
                                        <TableCell align="right">{row.leavetimeresult}</TableCell>
                                        <TableCell align="right">{row.arrivetimeresult}</TableCell>

                                        <TableCell align="right">{row.remainingseat}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={()=>this.handleOpen(row)}>订票</Button>
                                        </TableCell>
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
                    </Paper>
                    </div>
                    <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.modal}>
                        <Typography variant="h6" id="modal-title">
                            订票
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            请确认订单信息，并填写乘客信息。（点击页面外取消）
                        </Typography>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                            <TextField
                                id="standard-read-only-input"
                                label="车次"
                                defaultValue={this.state.trainnumber}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                                <TextField
                                    id="standard-read-only-input"
                                    label="出发日期"
                                    defaultValue={date}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                            <div>
                            <TextField
                                id="standard-start"
                                label="出发站"
                                defaultValue={this.state.startstation}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                id="standard-end"
                                label="到达站"
                                defaultValue={this.state.arrivestation}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            </div>
                            <div>
                                <TextField
                                    id="standard-starttime"
                                    label="出发时间"
                                    defaultValue={this.state.leavetimeresult}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="standard-endtime"
                                    label="到达时间"
                                    defaultValue={this.state.arrivetimeresult}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>

                            <TextField
                                required
                                id="standard-name"
                                label="乘客姓名"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />

                            <TextField
                                required
                                id="standard-IDCard"
                                label="乘客身份证号"
                                className={classes.textField}
                                value={this.state.IDCard}
                                onChange={this.handleChange('IDCard')}
                                margin="normal"
                            />
                            <div>
                            <Typography variant="h6" color="secondary">
                                价格：
                            </Typography>
                            <Typography variant="h4" color="secondary">
                                ¥{this.state.price}
                            </Typography>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleBook}
                                className={classes.button}>
                                确认订单
                            </Button>
                        </form>
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
                    message={<span id="message-id">订票成功</span>}
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

Results.propTypes = {
    classes: PropTypes.object.isRequired,
};
                                export default withStyles(styles)(Results);
