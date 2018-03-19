import React, { Component } from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from '../../components/utility/pageHeader';

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <PageHeader>
	          Profile
	        </PageHeader>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
