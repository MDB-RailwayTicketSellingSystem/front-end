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
    render() {
        return (
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
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            Sign in
                        </Button>
                    </form>
                    </CardContent>
                    </Card>
                </Grid>

            </Grid>

        );
    }
}




export default SignIn;
