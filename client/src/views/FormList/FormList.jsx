import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser, getUserList } from "../../services/user.service";
import { Box } from '@mui/material';
import { Space, Button, Table } from 'antd';
import "./formlist.css"

const FormList = (props) => {
    const [userList, setUserList] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});    

    const columns = [
      {
        title: 'Nombres',
        dataIndex: 'name',
        key: 'name',
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        ellipsis: true,    
      },
      {
        title: 'Apellidos',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Edad',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
      },  
      {
        title: 'Dirección',
        dataIndex: 'address',
        key: 'address',
      },    
      {
        title: 'País',
        dataIndex: 'country',
        key: 'country',
      },      
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Link to={`/user/${record._id}`}>Edit</Link><span>&nbsp;&nbsp;</span>|<span>&nbsp;&nbsp;</span>
            <Link onClick={() => removeUserFromService(record._id)}>Delete</Link>            
          </Space>
        ),
      },      
    ];
    
    const navigate = useNavigate();

    const getUserListFromService = async () => {
        try {
            const data = await getUserList();
            console.log(data);
            setUserList(data.data.userList);
        } catch (error) {
            console.log("getUserListFromService", error);            
        }
    };

    const removeUserFromService = async (id) => {
        try {
            await removeUser(id);
            const newUserList = userList.filter(user => user._id !== id);
            setUserList(newUserList);
        } catch (error) {
            console.log("removeUserFromService", error);            
        }
    }

    const handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      setFilteredInfo(filters);
      setSortedInfo(sorter);
    };
    const clearFilters = () => {
      setFilteredInfo({});
    };
    const clearAll = () => {
      setFilteredInfo({});
      setSortedInfo({});
    };

    useEffect(() => {
        getUserListFromService();
    },[props.render]);
    

    return (
        <div className="form-list">
            <img src="/assets/Logo/Organized_office.png" alt="logo" width="250" height="100" onClick={() => navigate("/")}/>
            <h1>Clientes</h1>
            <br/>
            <h5>Aqui se encuentran los datos de cada contacto</h5>            
            <Box display="flex" justifyContent="flex-end">
            <Button className="home" to="/pets/new" onClick={() => navigate("/register")}> + Agregar un cliente</Button>            
            </Box>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>            
            <Table columns={columns} dataSource={userList} onChange={handleChange} />
            <Link className="home" to="/">Back to home</Link>       
        </div>
    )
}

export default FormList;