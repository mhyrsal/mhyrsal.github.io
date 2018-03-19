import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/uielements/menu';
import IntlMessages from '../components/utility/intlMessages';

export default function(url, submenuColor) {
  const sidebars = [];
  sidebars.push(
    <Menu.Item key="production">
      <Link to={`${url}/production`}>
        <span className="isoMenuHolder" style={submenuColor}>
          <i className="ion-android-globe" />
          <span className="nav-text">
            Production
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
  sidebars.push(
    <Menu.Item key="development">
      <Link to={`${url}/development`}>
        <span className="isoMenuHolder" style={submenuColor}>
          <i className="ion-pull-request" />
          <span className="nav-text">
            Development
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
  sidebars.push(
    <Menu.Item key="blank_page">
      <Link to={`${url}/blank_page`}>
        <span className="isoMenuHolder" style={submenuColor}>
          <i className="ion-document" />
          <span className="nav-text">
            <IntlMessages id="sidebar.blankPage" />
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
  sidebars.push(
    <Menu.Item key="profile">
      <Link to={`${url}/profile`}>
        <span className="isoMenuHolder" style={submenuColor}>
          <i className="ion-document" />
          <span className="nav-text">
            Profile
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
  return sidebars;
}
