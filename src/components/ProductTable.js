import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useQuery } from '@apollo/client';
import { LOAD_PRODUCTS } from '../graphql/Queries';

const ProductTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  // const [page, setPage] = useState(1);

  const {data, loading, refetch} = useQuery(LOAD_PRODUCTS, {
    variables: {
      limit: 10, 
      skip: 0, 
    },
  });

  useEffect(() => {
    console.log(data)
  }, [data])

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {confirm(); setSearchText(selectedKeys[0]); setSearchedColumn(dataIndex);};
  const handleReset = (clearFilters) => { clearFilters(); setSearchText('');};
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{padding: 8,}} onKeyDown={(e) => e.stopPropagation()}>
        <Input ref={searchInput} placeholder={`Search ${dataIndex}`} value={selectedKeys[0]} onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])} onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{marginBottom: 8, display: 'block',}}/>
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{width: 90,}}>
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{width: 90,}}>
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => {confirm({closeDropdown: false,}); setSearchText(selectedKeys[0]); setSearchedColumn(dataIndex);}}>
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => {close();}}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (<SearchOutlined style={{color: filtered ? '#1677ff' : undefined,}}/>),
    onFilter: (value, record) =>record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {if (visible) {setTimeout(() => searchInput.current?.select(), 100); }},
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter highlightStyle={{backgroundColor: '#ffc069', padding: 0,}} searchWords={[searchText]} autoEscape
                     textToHighlight={text ? text.toString() : ''}/>) : (text),});

  const columns = [
    {title: 'Product Code', dataIndex: 'code', key: 'code', width: '20%', ...getColumnSearchProps('code'),},
    {title: 'Product Name', dataIndex: 'name', key: 'name', width: '30%', ...getColumnSearchProps('name'),},
    {title: 'Brand Name', dataIndex: 'brand', key: 'brand', ...getColumnSearchProps('brand'),},
    {title: 'Price', dataIndex: 'price', key: 'price', 
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],},
  ];

  const handlePageChange = (page, pageSize) => {
    const skip = (page - 1) * 10;

    refetch({
      variables: {
        limit: 10,
        skip: skip,
      },
    });
    console.log(skip)
  }

  return <Table 
      columns={columns} 
      dataSource={data?.GetProducts} 
      size="small" 
      lineHeight='20'
      loading={loading}
      pagination={{
        // total:10,
        pageSize: 9,
        onChange:handlePageChange ,
      }}
    />;
};
export default ProductTable;