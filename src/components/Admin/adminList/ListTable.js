import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { firestore } from '../../../config/firebase';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));

export default function ListTable() {
    const classes = useStyles();

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const usersRef = firestore.collection('users');
        const snapshot = await usersRef.get();
        snapshot.docs.forEach(user => {
            setUsers(users => [...users, user.data()]);
        });
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table 
            className={classes.table} 
            aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell scope="row">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
