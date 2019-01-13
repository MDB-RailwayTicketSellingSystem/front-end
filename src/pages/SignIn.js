import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Background from '../img/wallhaven-147627.jpg';
import axios from "axios";

const card = {

    minWidth: 275,
    margin: 'auto',
position: 'absolute',
    width:200

};

const bullet= {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    };

   const title= {
        fontSize: 14
    };
  const  pos= {
        marginBottom: 12
    };


class SignIn extends React.Component {
    state={
        accountID: '',
        password: '',
        success:false
    };

    handleClick=()=>{
        /* 登录接口
        axios.post('http://localhost:8080/user/login',{"accountID":this.state.accountID,"password":this.state.password})
             .then((response) =>{
                 console.log(response.data);
                 if (response.data.data=="登录成功")
                     this.prop.history.push('/Home');
             })
             .catch(function (error) {
                 console.log(error);
             });
 */
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div style={{background: `url(${Background}) no-repeat` ,width:"100%",height:"100%",position:"absolute"}}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item xs={3}>
                        <Card>
                            <CardContent>
                                <form >
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="accountID">Account ID</InputLabel>
                                        <Input
                                            id="accountID"
                                            name="accountID"
                                            autoComplete="accountID"
                                            value={this.state.accountID}
                                            onChange={this.handleChange('accountID')}
                                            autoFocus />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={this.state.password}
                                            onChange={this.handleChange('password')}/>
                                    </FormControl>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"/>
                                    <Link to={'/Booking/'+this.state.accountID}>
                                        <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary">
                                            Sign in
                                    </Button>
                                    </Link>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}




export default SignIn;
