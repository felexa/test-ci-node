import React from "react";
import PropTypes from "prop-types";

import MainLayout from "app/desktop/layouts/main/Main";
import Error from "desktop/components/error/Error";
import ErrorBoundary from "desktop/components/errorBoundary/ErrorBoundary";

import ProtectedComponent from "components/protectedComponent/ProtectedComponent";
import Module from "desktop/modules/account";

class Account extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {String}
     */
    getView() {
        return Module.getView(
            Module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        let {promoBanner, hasError} = this.props;

        return (
            <ErrorBoundary>
                <MainLayout breadcrumbs={[]} promoBanner={promoBanner}>
                    {hasError && <Error />}

                    {!hasError && (
                        <ErrorBoundary>
                            <ProtectedComponent enableRedirect hasLoader className="protected-element--account">
                                {this.getView()}
                            </ProtectedComponent>
                        </ErrorBoundary>
                    )}
                </MainLayout>
            </ErrorBoundary>
        );
    }
}

/**
 * @example
 *
 * props = {
 *   pageInfo: Object,
 *   pageProps: {
 *       breadcrumbs: Array,
 *       initialData: Object
 *   }
 * }
 *
 * @static
 * @method getInitialProps
 * @param context {Object}
 * @param props {Object}
 * @returns {*}
 */
Account.getInitialProps = function (context, props) {
    return Module.getServerSideProps(context, props);
};

Account.propTypes = {
    hasError: PropTypes.bool,
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

Account.defaultProps = {
    hasError: false,
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default Account;
