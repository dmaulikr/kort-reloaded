import React from 'react';

import Profile from '../shared/Profile';


const ProfileModal = ({ user }) => (<Profile user={user} />);

ProfileModal.propTypes = {
  user: React.PropTypes.object.isRequired,
};

module.exports = ProfileModal;
