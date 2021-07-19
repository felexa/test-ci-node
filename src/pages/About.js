import React from "react";
import PropTypes from "prop-types";

import Module from "app/desktop/modules/aboutUs";
import MainLayout from "app/desktop/layouts/main/Main";
import Error from "app/desktop/components/error/Error";
import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class AboutUs extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {React.ReactElement}
     */
    getView() {
        return Module.getView(
            Module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        let { promoBanner, breadcrumbs, hasError } = this.props;

        return (
            <ErrorBoundary>
                <MainLayout breadcrumbs={breadcrumbs} promoBanner={promoBanner}>
                    {hasError && <Error />}
                    {!hasError && <ErrorBoundary>{this.getView()}</ErrorBoundary>}
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
AboutUs.getInitialProps = function (context, props) {
    return Module.getServerSideProps(context, props);
};

AboutUs.propTypes = {
    hasError: PropTypes.bool,
    promoBanner: PropTypes.instanceOf(Object),
    breadcrumbs: PropTypes.instanceOf(Array),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

AboutUs.defaultProps = {
    hasError: false,
    promoBanner: {},
    breadcrumbs: [],
    pageInfo: {},
    initialData: {}
};

export default AboutUs;
