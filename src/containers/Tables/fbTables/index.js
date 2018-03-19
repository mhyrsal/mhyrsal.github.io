import React, { Component } from 'react';
import fakeData from '../fakeData';
import FacebookDataTable from './facebookDataTable';
import tableinfos from './configs';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import TableDemoStyle from '../antTables/demo.style';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

const dataList =  new fakeData(10);

export default class FbTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList,
    };
  }
  
  render() {

    return (
      <LayoutContentWrapper>
        <TableDemoStyle className="isoLayoutContent">
      <Tabs  type="card">
        {tableinfos.map(tableInfo => <TabPane
          tab={tableInfo.title}
          key={tableInfo.value}
        >
          <FacebookDataTable
            tableInfo={tableInfo}
            dataList={dataList}
          />
        </TabPane>)}   
      </Tabs>
    </TableDemoStyle>
      </LayoutContentWrapper>
    );
  }
}
