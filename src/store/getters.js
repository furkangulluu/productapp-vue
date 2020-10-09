export const getTradeResult = (state) => { //statelerimdeki güncel datamı çekmeye yarayan getters (mutation tarafından güncellenmiş datalarımın son halini çekecek ve viewda kullanılacak - view'a get edilecek)
    return {
       purchase: state.purchase,
       sale: state.sale,
       balance: state.balance 
    }
}