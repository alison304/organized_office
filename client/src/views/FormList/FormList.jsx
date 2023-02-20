import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeUser, getUserList } from "../../services/user.service";
import { Box } from '@mui/material';
import { Space, Button, Table, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import "./formlist.css"

const FormList = (props) => {
    const [userList, setUserList] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});    

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

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
        ...getColumnSearchProps('name'),    
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

    const dataSource = userList?.map(user => ({...user, key: user._id}));
    
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
            <Button className="btn-home" to="/users/new" onClick={() => navigate("/register")}> + Agregar un cliente</Button>            
            </Box>
            <Button className="btn-home" onClick={clearFilters}>Clear filters</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="btn-home" onClick={clearAll}>Clear filters and sorters</Button>
            <br/><br/>            
            <Table columns={columns} dataSource={dataSource} onChange={handleChange} />
            <Link className="home" to="/">Back to home</Link>       
        </div>
    )
}

export default FormList;