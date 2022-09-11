import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext, useState } from 'react';
import Delete from '../../assets/delete-icon.png';
import Edit from '../../assets/edit-icon.png';
import UserContext from '../../contexts/UserContext';
import DeleteRegister from '../DeleteRegister';
import EditRegister from '../EditRegister';
import PhoneIcon from '../../assets/phone.svg'
import DialerSipIcon from '@mui/icons-material/DialerSip';
import './style.css';


export default function DenseTable() {

    const { arrayTransaction, setUpdateList } = useContext(UserContext)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [id, setId] = useState()

    function handleEditRegister(id) {
        setId(id)
        setShowEditModal(true)
    }

    function handleDeleteRegister(id) {
        setId(id)
        setShowDeleteModal(true)
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead className='table-header'>
                    <TableRow >
                        <TableCell >Nome</TableCell>
                        <TableCell align="left">E-mail</TableCell>
                        <TableCell align="left">Telefone</TableCell>
                        <TableCell align="left"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody >
                    {arrayTransaction.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell align="left">{row.email}</TableCell >
                            <TableCell align="left">{row.telefone}</TableCell>
                            <TableCell align="right">
                                <a href={`sip:` + row.telefone}>
                                    <DialerSipIcon />
                                </a>


                                <img className='img-icon' onClick={() => handleEditRegister(row.id)} src={Edit} alt='Editar' />
                                {showEditModal && <EditRegister
                                    id={id}
                                    setShowEditModal={setShowEditModal} />}
                                <img className='img-icon' onClick={() => handleDeleteRegister(row.id)} src={Delete} alt='Excluir' />
                                {showDeleteModal && <DeleteRegister
                                    id={id}
                                    setShowDeleteModal={setShowDeleteModal} />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}