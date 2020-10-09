export const updateTradeResult = (state, payload) => { //eğer tradeResultta bir değişim olursa aşağı tarafı güncelleyecek
    if (payload.count) { //eğer count varsa update işlemidir
        state.purchase += parseFloat(payload.purchase) * parseInt(payload.count)
        state.sale += parseFloat(payload.sale) * parseInt(payload.count)
        state.balance = parseFloat(state.purchase) - parseFloat(state.sale)
    } else { //count yoksa created olduğunda statelerimi footer'a set eden işlemdir
        state.purchase = payload.purchase
        state.sale = payload.sale
        state.balance = parseFloat(payload.purchase) - parseFloat(payload.sale)
    }
}