import React from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import LoadingComponent from "../Loading";
const WithAuth = (WrappedComponent) => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      // Check if Page has a `getInitialProps`; if so, call it.
      const pageProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));
      // Return props.
      return { ...pageProps };
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        isAuth: false,
      };
    }

    componentDidMount() {
      const token = Cookie.get("token");
      console.log(token);
      if (token) {
        this.setState({ isLoading: false });
      } else {
        setTimeout(() => {
          Router.replace("/signin");
        }, 2000);
      }
    }

    render() {
      const { isLoading, isAuth } = this.state;
      if (isLoading) return <LoadingComponent />;

      if (!isAuth) {
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WithAuth;
