import React from "react";
import PropTypes from "prop-types";

import MainLayout from "app/desktop/layouts/main/Main";
import Error from "app/desktop/components/error/Error";
import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

//import TeamMemberModule from "desktop/modules/employeeCard/teamMember";
import MedicalExpertModule from "desktop/modules/employeeCard/medicalExpert";

class EmployeeCard extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {String}
     */
    getView() {
        let module = EmployeeCard.getModuleByPageType(this.props.pageInfo.type);

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
EmployeeCard.getModuleByPageType = function (/*type*/) {
    let result = MedicalExpertModule;

    // if (type === "team-member") {
    //     result = TeamMemberModule;
    // }

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
EmployeeCard.getInitialProps = function (context, props) {
    let module = EmployeeCard.getModuleByPageType(props.pageInfo.type);

    return module && module.getServerSideProps(context, props);
};

EmployeeCard.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

EmployeeCard.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default EmployeeCard;
