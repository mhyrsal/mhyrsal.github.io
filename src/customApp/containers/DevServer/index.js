import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import IsoWidgetsWrapper from '../../../containers/Widgets/widgets-wrapper';
import StickerWidget from '../../../containers/Widgets/sticker/sticker-widget';
import { InputSearch } from '../../../components/uielements/input';
import IntlMessages from '../../../components/utility/intlMessages';
import notification from '../../../components/notification';
import GitResult from '../../components/githubResult';
import basicStyle from '../../../config/basicStyle';
import actions from '../../redux/githubSearch/actions';
import Progress from '../../../components/uielements/progress';
import '../GithubSearch/fix-create-class';
import '../GithubSearch/fix-prop-types';
import ReactDataGrid from 'react-data-grid';
import { Tabs, Button } from 'antd';
import { GoogleChart } from '../../../containers/Charts/googleChart/';
import * as googleChartConfigs from '../../../containers/Charts/googleChart/config';

//import { Toolbar, Filters: { NumericFilter, AutoCompleteFilter, MultiSelectFilter, SingleSelectFilter }, Data: { Selectors } } from 'react-data-grid-addons';
//import ReactDataGridPlugins from 'react-data-grid/addons';
import { Toolbar, Filters, Data } from 'react-data-grid-addons';
const { NumericFilter, AutoCompleteFilter, MultiSelectFilter, SingleSelectFilter } = Filters;
const { Selectors } = Data;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
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

class ButtonFormatter extends Component {
  render() {
    return (
      <ButtonGroup>
        <Button type="secondary"
          icon="retweet">
          Reset
        </Button>
        <Button type="danger"
          icon="close-square-o">
          Stop
        </Button>
      </ButtonGroup>
    )
  }
}

class GitSearch extends Component {

  constructor(props) {
        super(props);
    let columns = [
      {
        key: 'task',
        name: 'Services',
        sortable: true,
        locked: true,
        filterable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        filterable: true,
        filterRenderer: MultiSelectFilter,
      },
      {
        key: 'issueType',
        name: 'Current SLA',
        filterable: true,
        filterRenderer: SingleSelectFilter,
      },
      {
        key: 'developer',
        name: 'Health',
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      },
      {
        key: 'complete',
        name: 'Availibility [24 hrs]',
        formatter: PercentCompleteFormatter,
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      },
      {
        key: 'risk',
        name: 'Risk',
        filterable: true,
        filterRenderer: MultiSelectFilter,
      },
      {
        key: 'launch',
        name: 'Launch To',
        formatter: ButtonFormatter
      }
    ];

    let originalRows = this.createRows();
    let rows = originalRows.slice(0);
    this.state = { columns, originalRows, rows, filters: {}, expanded: {}, selectedIndexes: [] };
    }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = () => {
    let rows = [];
    let something = 0;
    for (let i = 1; i < Math.floor(Math.random() * 30) + 5; i++) {
      let children = [];
      something = 0;
      rows.push({
        task: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '_' + i,
        complete: something,
        priority: ['Critical', 'High', 'Medium', 'Low', 'Unspecified'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story', ' '][Math.floor((Math.random() * 3) + 1)],
        developer: Math.min(100, Math.round(Math.random() * 110)),
        risk: ['Critical', 'High', 'Medium', 'Low', 'Unspecified'][Math.floor((Math.random() * 3) + 1)],
        children: children
      });
      let dia = 0;
      let l = 0;
      for (l; l < Math.floor(Math.random() * 30) + 0; l++) {
        
        children.push({
          task: 'Task ' + i + '_' + l,
          complete: Math.min(100, Math.round(Math.random() * 110)),
          priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
          issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
          developer: Math.min(100, Math.round(Math.random() * 110)),
          risk: ['Critical', 'High', 'Medium', 'Low', 'Unspecified'][Math.floor((Math.random() * 3) + 1)],
        });
        dia += children[l].complete;
      }
      something = Math.ceil((dia / l) * 100)/100;
      rows[i-1].complete = isNaN(something) ? 100 : something;
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
    console.log('args',args);
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

  stickerClick = (index) => {
    let newView = [this.state.originalRows[index]];
    console.warn(this.state, newView[0].task);
    let lol = newView[0].task;
    this.setState({ rows: newView, filters: {}, expanded: {lol : true} });
  };

  onRowsSelected = (rows) => {
    console.warn('rows',rows);
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
  };

  onRowsDeselected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  };

  onRowClick = (i) => {
    console.warn('row',Selectors.getRows(this.state)[i]);
    let selectedRow = Selectors.getRows(this.state)[i];
    this.setState({selectedIndexes: this.state.selectedIndexes.splice(0, 1)});
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(i)});
    console.warn('row',this.state);
  };

  generateContent(row) {
    console.log('row',row);
    return (
      <div className="card-container">
        <PageHeader>
          {row.task}
        </PageHeader>
        <Tabs type="card">
          <TabPane tab="Quality" key={row.task + '_1'}><GoogleChart {...googleChartConfigs.ComboChart} /></TabPane>
          <TabPane tab="Risk" key="2"><GoogleChart {...googleChartConfigs.TrendLines} /></TabPane>
          <TabPane tab="Availibility" key="3"><GoogleChart {...googleChartConfigs.BarChart} /></TabPane>
          <TabPane tab="Alerts" key="4"><GoogleChart {...googleChartConfigs.Table} /></TabPane>
          <TabPane tab="SLA" key="5"><GoogleChart {...googleChartConfigs.Waterfall} /></TabPane>
        </Tabs>
      </div>
    )
  }

  getBGColor = (number) => {
    let color = '';
    console.warn('number', number);
    if (number >= 0 && number < 20) {
      color = '#a5a3a5';
    } else if (number >= 0 && number <= 20) {
      color = '#6a0940';
    } else if (number >= 20 && number <= 40) {
      color = '#f5222d';
    } else if (number >= 40 && number <= 60) {
      color = '#e78e11';
    } else if (number >= 60 && number <= 80) {
      color = '#e3d323';
    } else if (number >= 80 && number <= 99) {
      color = '#4482FF';
    } else if (number > 99) {
      color = '#52c41a';
    }
    return color;
  };

  getTextColor = (number) => {
    let color = '';
    console.warn('number', number);
    if (number >= 0 && number < 20) {
      color = '#191919';
    } else if (number >= 0 && number <= 20) {
      color = '#FFF5F1';
    } else if (number >= 20 && number <= 40) {
      color = '#000000';
    } else if (number >= 40 && number <= 60) {
      color = '#271603';
    } else if (number >= 60 && number <= 80) {
      color = '#3C3808';
    } else if (number >= 80 && number <= 99) {
      color = '#051903';
    } else if (number > 99) {
      color = '#081502';
    }
    return color;
  };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { onPageChange, GitSearch } = this.props;

    return (
      <LayoutWrapper>
        <PageHeader>
          Development Servers
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          {this.state.originalRows.map((array, i) => {
          return (<Col md={6} sm={12} xs={24} style={colStyle} key={i}>
            <IsoWidgetsWrapper onClick={this.stickerClick}>
              {/* Sticker Widget */}
              <div onClick={() => this.stickerClick(i)}>
              <StickerWidget
                number={array.task}
                text={array.children.length + ' Servers'}
                icon="ion-soup-can-outline"
                fontColor={this.getTextColor(array.complete)}
                bgColor={this.getBGColor(array.complete)}
              >
              <p>lol</p>
              </StickerWidget>
              </div>
            </IsoWidgetsWrapper>
          </Col>)
          }
        )}
        </Row>
        
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
              <ReactDataGrid
                rowKey="task"
                enableCellSelect={true}
                onGridSort={this.handleGridSort}
                columns={this.state.columns}
                rowGetter={this.rowGetter}
                rowsCount={this.rowsCount()}
                getSubRowDetails={this.getSubRowDetails}
                onCellExpand={this.onCellExpand}
                toolbar={<Toolbar enableFilter={true}/>}
                onAddFilter={this.handleFilterChange}
                getValidFilterValues={this.getValidFilterValues}
                onClearFilters={this.handleOnClearFilters}
                onRowClick={this.onRowClick}
                rowSelection={{
                  showCheckbox: false,
                  enableShiftSelect: true,
                  onRowsSelected: this.onRowsSelected,
                  onRowsDeselected: this.onRowsDeselected,
                  selectBy: {
                    indexes: this.state.selectedIndexes
                  }
                }} />
          </Col>
        </Row>
        {this.state.selectedIndexes.length &&
          <Row style={rowStyle} gutter={0} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {this.state.rows[this.state.selectedIndexes[0]] !== undefined ? this.generateContent(this.state.rows[this.state.selectedIndexes[0]]) : ''}
              </IsoWidgetsWrapper>
            </Col>
          </Row>
        }
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
