import React, { Component } from 'react';
import { Table, Button, Input, Icon } from 'antd';
const ButtonGroup = Button.Group;

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: '12',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    children: [{
      key: '123',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '133',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    }]
  },
  {
    key: '13',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  }]
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
},
{
  key: '10',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: '120',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    children: [{
      key: '1230',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '1330',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    }]
  },
  {
    key: '130',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  }]
}, {
  key: '20',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '30',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '40',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

export default class SimpleView extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false
    };
  }
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false
    });
  }
  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }
  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }
  onSearch() {
    let { searchText } = this.state;
    searchText = searchText.toUpperCase();
    const dataList = data
      .filter(data => data['name'].toUpperCase().includes(searchText));
    this.setState({
      dataList,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false
    });
  }
  onInputChange(event) {
    this.setState({ searchText: event.target.value });
  }
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const filterDropdown = (
      <div className="isoTableSearchBox">
        <Input
          id="tableFilterInput"
          ref={ele => (this.searchInput = ele)}
          placeholder="Search name"
          value={this.state.searchText}
          onChange={this.onInputChange}
          onPressEnter={this.onSearch}
        />
        <Button type="primary" onClick={this.onSearch}>
          Search
        </Button>
      </div>
    );

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe'},
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      render: (text, row, index) => {
        if (row.children) {
          return <span>{text} ({Object.keys(row.children).length})</span>;
        } 
        return <span>{text}</span>;
      },
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 300,
      render: (text, row, index) => {
        return <ButtonGroup>
                  <Button type="primary" 
                    icon="eye-o"
                    href={`./table_ant/${row.key}`}>
                    View
                  </Button>
                  <Button type="secondary"
                    icon="retweet">
                    Reset
                  </Button>
                  <Button type="danger"
                    icon="close-square-o">
                    Stop
                  </Button>
                </ButtonGroup>
      },
    }];
    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={data} scroll={{ x: 1300, y: 300 }} onChange={this.handleChange} />
      </div>
    );
  }
}