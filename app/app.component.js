"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.topicData = [];
        this.topicsListShowing = true;
    }
    /**
     * This method is just a setter for passing data along to topic-post-component
     * @param {object} data Data fetched from topics.service
     */
    AppComponent.prototype.passTopicData = function (data) {
        console.log('data', data);
        this.topicData = data;
    };
    AppComponent.prototype.toggleTopicList = function () {
        this.topicsListShowing = !this.topicsListShowing;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'topic-study-app',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map