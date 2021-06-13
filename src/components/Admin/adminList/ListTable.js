import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));

export default function ListTable({users}) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table 
            className={classes.table} 
            aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center">No.</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{user.name}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
