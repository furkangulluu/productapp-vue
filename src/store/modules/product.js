import Vue from 'vue'
import {router} from '../../router'
const state={
    products:[]
}

const getters={
    getProductList(state){
        return state.products
    },
    getProductById:(state) => (id) => { 
        //id ye göre product bilgilerini çekeceğiz
        return state.products.find(x=>x.id===id)
    }
}

const mutations={
    updateProductList(state, product){
        state.products.push(product)
    }
}

const actions={
    initApp({commit}){
        Vue.http.get("https://urun-islemleri-prodd.firebaseio.com/products.json")
        .then(response => {
            let data= response.body
            for(let key in data){
                data[key].id = key
                commit("updateProductList",data[key])
            }
        })
    },
    saveProduct({commit, state, dispatch}, product){
        Vue.http.post("https://urun-islemleri-prodd.firebaseio.com/products.json",product)
        .then((response) => {
            if (response.status == 200) {
                product.id= response.body.name //firebase'deki oluşan id sini de product arrayimize ek olarak ekledik
                commit("updateProductList",product)
                console.log(response)

                /*bakiye bilgilerini güncelleme*/
                let tradeResult={
                    purchase:product.price,
                    sale:0,
                    count:product.count
                }
                dispatch("setTradeResult",tradeResult)
                router.replace("/")

            } else {
                alert("hata oluştu")
            }
        }) 
    },
    sellProduct({commit,dispatch}, payload){

        //pass by reference
        //pass by value...
        let product = state.products.filter(element=>{
            return element.id==payload.id
        })
        if(product){
            let totalCount= product[0].count - payload.count < 0 ? 0 : product[0].count - payload.count;
            Vue.http.patch("https://urun-islemleri-prodd.firebaseio.com/products/"+payload.id+".json", { count : totalCount}) //count'un yerine benim totalCount'ımı yaz
            .then(response => {
                product[0].count=totalCount; 
                //sayfa yenilenmediği sürece içerideki products array'imiz(ürün listemiz) yenilenmeyeceği için
                //biz elimiz ile ilgili product'ın count'ını güncelledik
            })
            let tradeResult={
                purchase:0,
                sale:product[0].price,
                count:payload.count
            }
            dispatch("setTradeResult",tradeResult)
            router.replace("/")
        }
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}