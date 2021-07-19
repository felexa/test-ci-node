import React from "react";
import PropTypes from "prop-types";

import howWeWorksModule from "desktop/modules/landings/howWeWork";
import MainLayout from "app/desktop/layouts/main/Main";
import Error from "desktop/components/error/Error";
import ErrorBoundary from "desktop/components/errorBoundary/ErrorBoundary";

class howWeWork extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {React.element}
     */
    getView() {
        return howWeWorksModule.getView(
            howWeWorksModule.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        let {breadcrumbs, promoBanner, hasError} = this.props;

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
 * @method getInitialProps
 * @param context {Object}
 * @param props {Object}
 * @returns {*}
 */
howWeWork.getInitialProps = function (context, props) {
    return howWeWorksModule.getServerSideProps(context, props);
};

howWeWork.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

howWeWork.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default howWeWork;
