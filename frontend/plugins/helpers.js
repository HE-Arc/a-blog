import Vue from "vue";
import Helpers from "../assets/js/Helpers"
import Faker from 'faker'


Vue.prototype.$Helpers =  () => Helpers;
Vue.prototype.$Faker = () => Faker;
