import Vue from 'vue'

//Firebase'e trade resultları pushlayacağız (çünkü bizim dış dünya ile asenkron şekilde çalışan işlerimizi actionsta yapıyorduk)
export const setTradeResult= ({state, commit}, tradeResult) => { //state yazmamın sebebi: hiç bir commit işlemi olmayacağı için direkt stateden güncel veriyi alıp firebase'e datayı yazacağım için
    commit("updateTradeResult",tradeResult)
    let tradeData={
        purchase:state.purchase,
        sale:state.sale
    }
    Vue.http.put("https://urun-islemleri-prodd.firebaseio.com/trade-result.json", tradeData)
    .then((response) => {
        console.log(response)
    })
}

export const getTradeResult = ({commit}) => { //bunuda mutationdaki updateTradeResult'a commitleyip oradan gerekli ürünlerin state'ime eklenmesini sağlayacağım yani statelerimi güncel tutacağım
    Vue.http.get("https://urun-islemleri-prodd.firebaseio.com/trade-result.json")
    .then((response) => {
        commit("updateTradeResult",response.body)
    })
}