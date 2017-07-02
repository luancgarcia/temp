import React, { PropTypes } from 'react';
import Reflux, { Component } from 'reflux';
import * as roleMatcher from './roleMatcher';

class AuthorizedComponent extends Component {

  constructor(props) {
    super(props);

    // this is placeholder for user roles (should be get during authentication)
    this.userRoles = undefined;

    // default path where to redirect when roles not match
    this.notAuthorizedPath = undefined;
  }

  componentWillMount(props) {
    // validate properties first
    this.validate();

    // when you use react-router, `routes` should be set
    const { routes } = this.props;

    // check roles
    const routeRoles = roleMatcher.getFlatterRoles(routes);
    if (roleMatcher.rolesMatched(routeRoles, this.userRoles) === false) {
      this.handleUnauthorizedRole(routeRoles, this.userRoles);
    }
    super.componentWillMount(props);
  }

  // The default implementation redirects user with inappropriate roles to {@link AuthorizedComponent.notAuthorizedPath}
  // @param routeRoles roles defending the route requested
  // @param userRoles roles of the user accessing the component
  handleUnauthorizedRole(routeRoles, userRoles) {
    const { router } = this.context;
    router.push(this.notAuthorizedPath);
  }

  // validates required properties
  validate() {
    if (typeof this.userRoles === 'undefined') {
      throw new Error('AuthorizedComponent: No user roles defined! Please define them in the constructor of your component.');
    }

    if (typeof this.notAuthorizedPath === 'undefined') {
      throw new Error('AuthorizedComponent: No not authorized path defined! Please define it in the constructor of your component.');
    }
  }
}

AuthorizedComponent.propTypes = {
  routes: PropTypes.array.isRequired
};

AuthorizedComponent.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AuthorizedComponent;
