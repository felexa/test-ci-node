import React from "react";
import PropTypes from "prop-types";

import MainLayout from "app/desktop/layouts/main/Main";
import Error from "app/desktop/components/error/Error";
import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

import DrugstoresModule from "desktop/modules/drugstorePoints/drugstores";
import DrugstoreModule from "desktop/modules/drugstorePoints/drugstore";

class DrugstorePoints extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {String}
     */
    getView() {
        let module = DrugstorePoints.getModuleByPageType(this.props.pageInfo.type);

        return (
            module && module.getView(
                module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
            )
        );
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        let {promoBanner, breadcrumbs, hasError} = this.props;

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
 * @static
 * @method getModuleByPageType
 * @param type {string}
 * @returns {Object}
 */
DrugstorePoints.getModuleByPageType = function (type) {
    let result = DrugstoresModule;
    // let result = DrugstoreModule;

    if (type === "pharmacy") {
        result = DrugstoreModule;
    }

    return result;
};

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
DrugstorePoints.getInitialProps = function (context, props) {
    let module = DrugstorePoints.getModuleByPageType(props.pageInfo.type);

    return module && module.getServerSideProps(context, props);
};

DrugstorePoints.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

DrugstorePoints.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default DrugstorePoints;
