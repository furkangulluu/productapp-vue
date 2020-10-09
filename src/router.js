import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductList from './components/Products/ProductList'
import ProductPurchase from './components/Products/ProductPurchase'
import ProductSell from './components/Products/ProductSell'
import WrongPage from './components/404'

Vue.use(VueRouter)

const routes = [
    { path:"/", component:ProductList},
    { path:"/product-purchase",component:ProductPurchase },
    { path:"/product-sell", component:ProductSell },
    { path:"/404", component:WrongPage},
    { path:"*", redirect:"/404"}
]

export const router = new VueRouter({
    mode:"history",
    routes //es6 özelliği sayesinde kendi matchleyecek
})