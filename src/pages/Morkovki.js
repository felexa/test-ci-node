import React from "react";
import loyaltyProgramModule from "desktop/modules/landings/loyaltyProgram";
import MainLayout from "app/desktop/layouts/main/Main";
import Error from "desktop/components/error/Error";
import ErrorBoundary from "desktop/components/errorBoundary/ErrorBoundary";
import PropTypes from "prop-types";

class LoyaltyProgram extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {React.element}
     */
    getView() {
        return loyaltyProgramModule.getView(
            loyaltyProgramModule.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
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
LoyaltyProgram.getInitialProps = function (context, props) {
    return loyaltyProgramModule.getServerSideProps(context, props);
};

LoyaltyProgram.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

LoyaltyProgram.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default LoyaltyProgram;
