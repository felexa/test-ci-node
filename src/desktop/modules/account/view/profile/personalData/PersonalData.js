import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Validator from "app/core/utilites/validator/Validator";
import Algorithms from "app/core/utilites/validator/Algorithms";
import BlobFileReader from "app/core/utilites/blobFileReader/BlobFileReader";
import ElementTypeEnum from "app/core/utilites/enum/account/elementType";
import LanguageEnum from "app/core/utilites/enum/language";

import Image from "desktop/components/image/Image";

import Item from "./Item";

class PersonalData extends React.Component {
    constructor(props) {
        super(props);

        this.Algorithms = Algorithms;

        /**
         * @property BlobFileReader
         * @type {BlobFileReader}
         */
        this.BlobFileReader = new BlobFileReader();

        /**
         * @property defaultAvatarUrl
         * @type {string}
         */
        this.defaultAvatarUrl = "https://i.apteka24.ua/user-profile/Group+1814.png";

        /**
         * @property elementTypeEnum
         * @type {Enum}
         */
        this.elementTypeEnum = ElementTypeEnum.getInstance();

        /**
         * @property ref
         * @type {{component: Object}}
         */
        this.ref = {
            component: React.createRef()
        };

        /**
         * @property stringsResource
         * @type {Resource}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property languageEnum
         * @type {Enum}
         */
        this.languageEnum = LanguageEnum.getInstance();

        this.state = {
            defaultItems: this._createItemsData(),
            items: this._createItemsData(),
            isEdit: false,
            viewItems: [],
            isUpdateError: false
        };

        this.Validator = Validator;

        this.updateItems = this.updateItems.bind(this);
        this._toggleEditMode = this._toggleEditMode.bind(this);
        this._saveChanges = this._saveChanges.bind(this);
        this._cancelChanges = this._cancelChanges.bind(this);
        this._changeAvatar = this._changeAvatar.bind(this);
        this._setAvatar = this._setAvatar.bind(this);
        this._setErrorStatus = this._setErrorStatus.bind(this);
    }

    componentDidMount() {
        this._updateViewItems();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.profile !== this.props.profile) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(() => ({
                defaultItems: this._createItemsData(),
                items: this._createItemsData()
            }), this._updateViewItems);
        }
    }

    /**
     * @private
     * @method _isValidData
     * @returns {boolean}
     */
    _isValidData() {
        let report = new this.Validator(this.state.items, this._getValidateAlgorithms()).validate();

        this.Validator.toggleValidateErrors(report, this.ref.component.current);

        return !report.hasError();
    }

    /**
     * @private
     * @method _isImageAsLink
     * @param imageLink {string}
     * @returns {boolean}
     */
    _isImageAsLink(imageLink) {
        return /^https/.test(imageLink);
    }

    /**
     * @private
     * @method _cancelChanges
     * @returns {PersonalData}
     */
    _cancelChanges() {
        this.setState((state) => ({
            items: state.defaultItems
        }));

        this._toggleEditMode();

        return this;
    }

    /**
     * @private
     * @method _changeAvatar
     * @returns {PersonalData}
     */
    _changeAvatar(e) {
        this.BlobFileReader.readAsData(e.target.files[0], this._setAvatar);

        return this;
    }

    /**
     * @method _createViewItems
     * @returns {Array}
     * @private
     */
    _createViewItems() {
        return [
            {
                id: "lastName",
                label: this.stringsResource.lastName,
                text: this.state.items.lastName || this.stringsResource.notField,
                type: this.elementTypeEnum.getTextAsValue(),
                maxLength: 50
            },
            {
                id: "name",
                label: this.stringsResource.name,
                text: this.state.items.name || this.stringsResource.notField,
                type: this.elementTypeEnum.getTextAsValue(),
                maxLength: 50

            },
            {
                id: "middleName",
                label: this.stringsResource.middleName,
                text: this.state.items.middleName || this.stringsResource.notField,
                type: this.elementTypeEnum.getNotRequiredTextAsValue(),
                maxLength: 50
            },
            // {
            //     id: "birthday",
            //     label: this.stringsResource.birthday,
            //     text: this.state.items.birthday || this.stringsResource.notField,
            //     type: this.elementTypeEnum.getDateAsValue()
            // },
            // {
            //     id: "gender",
            //     label: this.stringsResource.gender,
            //     text: this.state.items.gender || this.stringsResource.notField,
            //     type: this.elementTypeEnum.getSelectAsValue(),
            //     options: [this.stringsResource.male, this.stringsResource.female]
            // },
            {
                id: "language",
                label: this.stringsResource.communicationLanguage,
                text: this.stringsResource[this.state.items.language] || this.stringsResource.notField,
                type: this.elementTypeEnum.getSelectAsValue(),
                options: [
                    // eslint-disable-next-line max-len
                    {id: this.languageEnum.getRuAsValue(), name: this.stringsResource[this.languageEnum.getRuAsValue()]},
                    {id: this.languageEnum.getUaAsValue(), name: this.stringsResource[this.languageEnum.getUaAsValue()]}
                ]
            },
            {
                id: "about",
                label: this.stringsResource.about,
                text: this.state.items.about || this.stringsResource.notField,
                type: this.elementTypeEnum.getTextareaAsValue(),
                maxLength: 1000
            }
        ];
    }

    /**
     * @private
     * @method _createValidateStructure
     * @returns {Array}
     */
    _createValidateStructure() {
        return this.state.viewItems.map((item) => ({
            type: item.type,
            name: item.id,
            selector: `.error-${item.id}-field`
        }));
    }

    /**
     * @private
     * @method _createItemsData
     * @returns {Object}
     */
    _createItemsData() {
        return {
            name: this.props.profile.getName(),
            lastName: this.props.profile.getLastName(),
            middleName: this.props.profile.getMiddleName(),
            // birthday: /\d+-?\/?/.test(this.props.profile.getBirthDayAsText())
            //? this.props.profile.getBirthDayAsText() : "",
            // gender: this.props.profile.getGender() || null,
            language: this.props.profile.getLanguage() || null,
            about: this.props.profile.getAbout(),
            image: this.props.profile.getAvatar().getMedium()
        };
    }

    /**
     * @private
     * @method _getValidateAlgorithms
     * @returns {Object}
     */
    _getValidateAlgorithms() {
        return new this.Algorithms().getAlgorithms(this._createValidateStructure());
    }

    /**
     * @private
     * @method _setErrorStatus
     * @returns {void}
     */
    _setErrorStatus() {
        this.setState(() => ({
            isUpdateError: true
        }), this._setDefaultValuesToItems);
    }

    /**
     * @private
     * @method _setDefaultValues
     * @returns {void}
     */
    _setDefaultValuesToItems() {
        this.setState((state) => ({
            items: state.defaultItems
        }));
    }

    /**
     * @private
     * @method _setAvatar
     * @param avatar {string}
     * @returns {void}
     */
    _setAvatar(avatar) {
        this.setState(() => ({
            items: this._setValueById("image", avatar)
        }), () => this._updateProfile(this._setErrorStatus));
    }

    /**
     * @private
     * @method _toggleEditMode
     * @returns {PersonalData}
     */
    _toggleEditMode() {
        this.setState((state) => ({
            isEdit: !state.isEdit
        }));

        return this;
    }

    /**
     * @private
     * @method _saveChanges
     * @returns {PersonalData}
     */
    _saveChanges() {
        if (this._isValidData()) {
            this._toggleEditMode();
            this._updateProfile(() => console.log("error"));
        }

        return this;
    }

    /**
     * @private
     * @method _setValueById
     * @param id {string}
     * @param value {string}
     * @returns {Array}
     */
    _setValueById(id, value) {
        let items = _.merge({}, this.state.items);

        items[id] = value;

        return items;
    }

    /**
     * @private
     * @method _getItemsForUpdatingProfile
     * @returns {Object}
     */
    _getItemsForUpdatingProfile() {
        let items = _.merge({}, this.state.items);

        if (this._isImageAsLink(items.image)) {
            items.image = this.props.profile.getAvatar().getOriginal();
        }

        return items;
    }

    /**
     * @private
     * @method _updateProfile
     * @returns {PersonalData}
     */
    _updateProfile(handleError) {
        this.props.updateProfile(
            this._getItemsForUpdatingProfile(),
            (response) => {
                this._updateDefaultItems(response);
                this._updateViewItems();
                window.location.reload();
            },
            handleError
        );

        return this;
    }

    /**
     * @private
     * @method _updateDefaultItems
     * @param newItems {Object}
     * @returns {PersonalData}
     */
    _updateDefaultItems(newItems) {
        this.setState(() => ({
            defaultItems: newItems
        }));

        return this;
    }

    /**
     * @public
     * @method updateItems
     * @param id {string}
     * @param value {string}
     * @returns {PersonalData}
     */
    updateItems(id, value) {
        this.setState(() => ({
            items: this._setValueById(id, value)
        }));

        return this;
    }

    /**
     * @private
     * @method _updateViewItems
     * @returns {PersonalData}
     */
    _updateViewItems() {
        this.setState(() => ({
            viewItems: this._createViewItems()
        }));

        return this;
    }

    render() {
        return (
            <section className="personal-data base-border rounded-10 d-flex justify-content-between">
                <div className="w-100">
                    <div className="personal-data__title d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="icon icon-user mr-12" />
                            <span className="f-weight-5">{this.stringsResource.personalData}</span>
                        </div>
                        <div className={classNames("", {"visibility-hidden": this.state.isEdit})}>
                            <button type="button" className="personal-data__to-edit btn-link d-flex align-items-center" onClick={this._toggleEditMode}>
                                <i className="icon icon-edit mr-2" />
                                <span className="personal-data__description">{this.stringsResource.edit}</span>
                            </button>
                        </div>
                    </div>

                    <div className="personal-data__avatar">
                        <Image className="personal-data__avatar-preview" src={this.state.items.image} alt="" />
                        <div className="personal-data__avatar-description">
                            <span>{this.stringsResource.profilePhoto}</span>
                            <label className="text-blue cursor-pointer">
                                {this.stringsResource.change}
                                <input type="file" name="avatar" accept="image/*" className="visibility-hidden" onChange={this._changeAvatar} />
                            </label>
                        </div>
                    </div>
                    {this.state.isUpdateError && (
                        <div className="alert-danger mt-12">
                            <span>{this.stringsResource.validation.errorAvatarUpload}</span>
                        </div>
                    )}

                    <div className="personal-data__fields d-flex flex-wrap">
                        {this.state.viewItems.map((item) => (
                            <Item
                                dataItem={this.state.items[item.id]}
                                key={item.id}
                                isEdit={this.state.isEdit}
                                item={item}
                                change={this.updateItems}
                            />
                        ))}
                    </div>

                    {this.state.isEdit && (
                    <div className="personal-data__controls d-flex">
                        <button type="button" className="personal-data__control btn-default btn-md" onClick={this._saveChanges}>
                            {this.stringsResource.save}
                        </button>
                        <button type="button" className="personal-data__control btn-link btn-md" onClick={this._cancelChanges}>
                            <span className="text-pink">{this.stringsResource.cancel}</span>
                        </button>
                    </div>
                    )}
                </div>
            </section>
        );
    }
}

PersonalData.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    updateProfile: PropTypes.func.isRequired
};

export default PersonalData;
