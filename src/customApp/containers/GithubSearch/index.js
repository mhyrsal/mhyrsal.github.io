import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import { InputSearch } from '../../../components/uielements/input';
import IntlMessages from '../../../components/utility/intlMessages';
import notification from '../../../components/notification';
import GitResult from '../../components/githubResult';
import basicStyle from '../../../config/basicStyle';
import actions from '../../redux/githubSearch/actions';
import Progress from '../../../components/uielements/progress';
import './fix-create-class';
import './fix-prop-types';
import ReactDataGrid from 'react-data-grid';
//import { Toolbar, Filters: { NumericFilter, AutoCompleteFilter, MultiSelectFilter, SingleSelectFilter }, Data: { Selectors } } from 'react-data-grid-addons';
//import ReactDataGridPlugins from 'react-data-grid/addons';
import { Toolbar, Filters, Data } from 'react-data-grid-addons';
const { NumericFilter, AutoCompleteFilter, MultiSelectFilter, SingleSelectFilter } = Filters;
const { Selectors } = Data;

const { gitSearch, onPageChange } = actions;

class PercentCompleteFormatter extends Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired
  };

  render() {
    const percentComplete = this.props.value + '%';
    return (
      <Progress percent={this.props.value} status={this.props.value <= 90 ? 'exception' : (this.props.value >= 90 && this.props.value !== 100) ? 'active' : 'success'} />);
  }
}

class GitSearch extends Component {

  constructor(props) {
        super(props);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        locked: true,
        width: 50,
        filterable: true,
        filterRenderer: NumericFilter
      },
      {
        key: 'task',
        name: 'Title',
        sortable: true,
        filterable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true,
        filterRenderer: MultiSelectFilter
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        filterable: true,
        filterRenderer: SingleSelectFilter
      },
      {
        key: 'developer',
        name: 'Developer',
        filterable: true,
        filterRenderer: AutoCompleteFilter
      },
      {
        key: 'complete',
        name: '% Complete',
        formatter: PercentCompleteFormatter,
        filterable: true,
        filterRenderer: NumericFilter
      },
      {
        key: 'startDate',
        name: 'Start Date',
        sortable: true,
        filterable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        sortable: true,
        filterable: true
      }
    ];

    let originalRows = this.createRows();
    let rows = originalRows.slice(0);
    this.state = { originalRows, rows, filters: {}, expanded: {} };
    }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 100; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        developer: ['James', 'Tim', 'Daniel', 'Alan'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1)),
        children: [
          {id: i + '_0',
            task: 'Task ' + i + '_0',
            complete: Math.min(100, Math.round(Math.random() * 110)),
            priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
            issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
            developer: ['James', 'Tim', 'Daniel', 'Alan'][Math.floor((Math.random() * 3) + 1)],
            startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
            completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))}
        ]
      });
    }
    return rows;
  };

  onSearch = value => {
    if (value && value.length > 0) {
      this.props.gitSearch(value);
    } else {
      notification('error', 'Please type something');
    }
  };

  componentDidMount() {
    this.onSearch(this.props.GitSearch.searcText);
    //this.createRows();
  }

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : Selectors.getRows(this.state).sort(comparer);

    this.setState({ rows: rows, expanded: {} });
  };

  rowGetter = (index) => {
    return Selectors.getRows(this.state)[index];
  };

  rowsCount = () => {
    return Selectors.getRows(this.state).length;
  };

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters, expanded: {} });
  };

  getValidFilterValues = (columnId) => {
    let values = Selectors.getRows(this.state).map(r => r[columnId]);
    return values.filter((item, i, a) => { return i === a.indexOf(item); });
  };

  handleOnClearFilters = () => {
    this.setState({ filters: {} });
  };

  getSubRowDetails = (rowItem) => {
    let isExpanded = this.state.expanded[rowItem.task] ? this.state.expanded[rowItem.task] : false;
    return {
      group: rowItem.children && rowItem.children.length > 0,
      expanded: isExpanded,
      children: rowItem.children,
      field: 'task',
      treeDepth: rowItem.treeDepth || 0,
      siblingIndex: rowItem.siblingIndex,
      numberSiblings: rowItem.numberSiblings
    };
  };

  onCellExpand = (args) => {
    let rows = Selectors.getRows(this.state).slice(0);
    let rowKey = args.rowData.task;
    let rowIndex = rows.indexOf(args.rowData);
    let subRows = args.expandArgs.children;

    let expanded = Object.assign({}, this.state.expanded);
    if (expanded && !expanded[rowKey]) {
      expanded[rowKey] = true;
      this.updateSubRowDetails(subRows, args.rowData.treeDepth);
      rows.splice(rowIndex + 1, 0, ...subRows);
    } else if (expanded[rowKey]) {
      expanded[rowKey] = false;
      rows.splice(rowIndex + 1, subRows.length);
    }

    this.setState({ expanded: expanded, rows: rows });
  };

  updateSubRowDetails = (subRows, parentTreeDepth) => {
    let treeDepth = parentTreeDepth || 0;
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1;
      sr.siblingIndex = i;
      sr.numberSiblings = subRows.length;
    });
  };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { onPageChange, GitSearch } = this.props;
    
    return (
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id="sidebar.githubSearch" />
        </PageHeader>
        <ReactDataGrid
          enableCellSelect={true}
          onGridSort={this.handleGridSort}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.rowsCount()}
          minHeight={500}
          getSubRowDetails={this.getSubRowDetails}
          onCellExpand={this.onCellExpand}
          toolbar={<Toolbar enableFilter={true}/>}
          onAddFilter={this.handleFilterChange}
          getValidFilterValues={this.getValidFilterValues}
          onClearFilters={this.handleOnClearFilters} />
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <InputSearch
                placeholder="Github Search"
                defaultValue={GitSearch.searcText}
                onSearch={this.onSearch}
              />
              <GitResult
                GitSearch={GitSearch}
                defaultValue={GitSearch.searcText}
                onPageChange={onPageChange}
              />
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
function mapStateToProps(state) {
  return { 
    GitSearch: state.githubSearch.toJS()
  };
}
export default connect(mapStateToProps, { gitSearch, onPageChange })(GitSearch);
