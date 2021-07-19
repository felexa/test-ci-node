import React from "react";
import PropTypes from "prop-types";

import Johnson from "desktop/modules/card/vendor/johnson";
import Farkos from "desktop/modules/card/vendor/farkos";

import VendorIdTypesEnum from "app/core/utilites/enum/vendorCard/pages";

import MainLayout from "app/desktop/layouts/main/Main";
import Error from "app/desktop/components/error/Error";
import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class VendorCardPage extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {Object|null}
     */
    _getView() {
        let module = VendorCardPage.getModuleByVendorId(this.props.initialData.vendorId);

        return module && module.getView(
            module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        let {promoBanner, breadcrumbs, hasError} = this.props;

        return (
            <ErrorBoundary>
                <MainLayout breadcrumbs={breadcrumbs} promoBanner={promoBanner}>
                    {hasError && <Error />}
                    {!hasError && <ErrorBoundary>{this._getView()}</ErrorBoundary>}
                </MainLayout>
            </ErrorBoundary>
        );
    }
}

/**
 * @static
 * @method getModuleByVendorId
 * @param id {string}
 * @returns {Object|null}
 */
VendorCardPage.getModuleByVendorId = function (id) {
    let result = null,
        VendorId = VendorIdTypesEnum.getInstance();

    switch (id) {
        case VendorId.getFarkosAsValue():
            result = Farkos;

            break;
        case VendorId.getJjAsValue():
            result = Johnson;

            break;
        default:
            break;
            // result = Farkos;
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
VendorCardPage.getInitialProps = function (context, props) {
    let module = VendorCardPage.getModuleByVendorId(context.query.vendorId);

    return module && module.getServerSideProps(context, props);
};

VendorCardPage.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

VendorCardPage.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default VendorCardPage;
