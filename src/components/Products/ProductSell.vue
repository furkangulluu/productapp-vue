<template>
  <div>
    <div class="container">
      <div class="loading" :style="isLoading">
        <div class="lds-ripple">
          <div></div>
          <div></div>
       </div>
      </div>
      <div class="row">
        <div class="col-6 offset-3 pt-3 card mt-5 shadow">
          <div class="card-body">
            <h3>Ürün Çıkışı</h3>
            <hr />
            <div class="form-group">
              <label>Ürün Adı</label>
              <select class="form-control" v-model="selectedProduct" @change="getProductPreview">
                <option value="0" selected="selected">Seçiniz</option>
                <option :value="product.id" v-for="product in getProductList" :key="product.id" :disabled="product.count==0">{{product.title}}</option>
              </select>
            </div>
            <transition class="slide">
              <div class="card mb-2 border border-danger" v-if="showSelectedPreview">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 text-center">
                      <div class="mb-3">
                        <span class="badge badge-info">Stok : {{product.count}}</span>
                        <span class="badge badge-primary">Fiyat :{{product.price | currency}}</span>
                      </div>
                      <p class="border border-warning p-2 text-secondary">
                        {{product.description}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <div class="form-group">
              <label>Adet</label>
              <input type="text" class="form-control" v-model="sellCount" placeholder="Ürün adetini giriniz.." />
            </div>
            <hr />
            <button class="btn btn-primary" :disabled="saveEnabled" @click="sellProduct">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      saveButtonClicked: false,
      showSelectedPreview: false,
      selectedProduct:null,
      product:null,
      sellCount:0
    }
  },
  methods: {
    getProductPreview(){
      let product = this.$store.getters.getProductById(this.selectedProduct);
      if(product!=null){
        this.product=product
        this.showSelectedPreview=true
      }else{
        this.product=null
        this.showSelectedPreview=false
      }
    },
    sellProduct(){
      let payload={
        id:this.selectedProduct,
        count:this.sellCount
      }
      this.$store.dispatch("sellProduct",payload)
    }
  },
  computed: {
    ...mapGetters(["getProductList"]),
    isLoading(){
      if (this.saveButtonClicked) {
        return{
          display:"block"
        }
      } else {
        return{
          display:"none"
        }
      }
    },
    saveEnabled(){
      if(this.sellCount > 0 && this.showSelectedPreview){
        return false;
      }else{
        return true;
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if(this.selectedProduct != null || this.sellCount > 0 ){
        if(window.confirm("Kaydedilmemiş değişiklikler var çıkmak istediğinize emin misiniz?")){
          next();
        }    
    }else{
      next();
    }
  }
};
</script>

<style>
.border-danger {
  border-style: dashed !important;
}

.slide-enter{

}
.slide-enter-active{

}
.slide-leave{

}
.slide-leave-active{

}
</style>