import React from 'react';

import Profile from '../shared/Profile';

const ProfileTab = React.createClass({

  render() {
    return <Profile isOwnProfile isViewOnly={false} />;
  },
});

module.exports = ProfileTab;
