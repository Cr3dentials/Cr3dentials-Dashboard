import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const TransactionList = ({ onSignOut, web3auth }) => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', description: 'Lorem ipsum', amount: 50, status: 'active' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'inactive' },
    { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'active' },
    { id: 4, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'inactive' },
    { id: 5, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'active' },
    { id: 6, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'inactive' },
    { id: 7, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'inactive' },
    { id: 8, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'inactive' },
    { id: 9, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'inactive' },
    { id: 10, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '987-654-3210', description: 'Dolor sit amet', amount: 30, status: 'inactive' },
    { id: 11, name: 'John Smith', email: 'john.smith@example.com', phone: '111-222-3333', description: 'Another user', amount: 40, status: 'active' },
    { id: 12, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '444-555-6666', description: 'Yet another user', amount: 25, status: 'inactive' },
  ]);
  const [provider, setProvider] = useState(null);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [selectedItems, setSelectedItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      const isAsc = order === 'asc';
      if (a[orderBy] < b[orderBy]) {
        return isAsc ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  };

  const handleSignOut = async () => {
    try {
      if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
      }
  
      const web3authProvider = await web3auth.logout();
      setProvider(web3authProvider);
      onSignOut();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleCheckboxChange = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((item) => item.id);
      setSelectedItems(newSelecteds);
      return;
    }
    setSelectedItems([]);
  };

  const isItemSelected = (id) => selectedItems.indexOf(id) !== -1;

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    closeMenu();
  };

  const handleDelete = () => {
    closeMenu();
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const renderStatusCell = (status) => {
    const statusStyle = {
      backgroundColor: status === 'active' ? 'rgba(236, 253, 243, 1)' : 'rgba(242, 244, 247, 1)',
    };

   
  
    return (
      <TableCell>
        <div style={statusStyle} className="activeTableRow">
          <FiberManualRecordIcon style={{ color: status === 'active' ? 'rgba(20, 186, 109, 1)' : 'rgba(108, 119, 139, 1)', marginRight: '5px' }} />
          <div>{status}</div>
        </div>
      </TableCell>
    );
  };

  return (
    <div className='transactionOuter'>
       {/* <div className="credit-header-container">
        <div>
        <h2 className="credit-title">Transaction List</h2>
        </div>
        <div>
        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
        </div>
       </div> */}
      <div className='transactionOuterContainer'>
        <h2>Transaction List</h2>
        <p>View All Your Transactions Here</p>
      </div>
      <div className='transactionListContainer'>
        <div className='transactionHeaderContainer'>
          <div className='transactionHeader'>
            <h2>Invoices</h2>
            <p>Full Rolodex</p>
          </div>
          <div className='transactionHeaderBtns'>
            <Button
              variant="text"
              style={{ color: 'rgba(52, 64, 84, 1)' }}
              onClick={() => {
                console.log('Delete');
              }}
            >
              <DeleteIcon />
              Delete
            </Button>
            <Button
              variant="text"
              style={{ color: 'rgba(52, 64, 84, 1)' }}
              onClick={() => {
                console.log('Filter');
              }}
            >
              <FilterListIcon />
              Filter
            </Button>
            <Button variant="outlined" startIcon={<ImportExportIcon />}>
              Export
            </Button>
            <Link to="/create-invoice">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Add New
            </Button>
            </Link>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                    checked={selectedItems.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'phone'}
                    direction={orderBy === 'phone' ? order : 'asc'}
                    onClick={() => handleSort('phone')}
                  >
                    Phone Number
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? order : 'asc'}
                    onClick={() => handleSort('description')}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? order : 'asc'}
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortData()
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((item) => (
                  <TableRow key={item.id} hover role="checkbox" selected={isItemSelected(item.id)}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    {renderStatusCell(item.status)}
                    <TableCell>
                      <IconButton onClick={openMenu}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                      >
                        <MenuItem onClick={handleEdit}>
                          <EditIcon /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                          <DeleteIcon /> Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination-container">
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
