<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 mb-5 card mt-5 shadow">
          <div class="card-body">
            <h3>Ürün Listesi</h3>
            <hr/>
            <table class="table table-hover table-striped table-bordered"  v-if="getProductList.length>0">
              <thead>
                <th>Id</th>
                <th>Ürün Adı</th>
                <th>Adet</th>
                <th>Fiyat</th>
                <th>Açıklama</th>
              </thead>
              <tbody>
                <tr v-for="product in getProductList" :key="product.id">
                  <td class="align-middle text-center">
                    <span class="badge badge-info">{{product.id}}</span>
                  </td>
                  <td class="align-middle text-center">{{product.title}}</td>
                  <td class="align-middle text-center" :class="getCountClasses(product.count)">{{product.count}}</td>
                  <td style="width: 120px;">{{product.price | currency }}</td>
                  <td class="align-middle">{{product.description}}</td>
                </tr>
              </tbody>
            </table>
            <div class="alert alert-warning" v-else> <!--  v-if="getProductList.length==0" de yazıp kullanabilirdik aynı şey -->
              <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
              <br />
              <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  methods: {
   getCountClasses(count){ //bunu computed içinde de yazabilirdik ama computed'a parametreli bir fonksiyon yazamıyoruz
      return{
        'btn-danger text-white' : count <= 0,
        'btn-success text-white' : count > 0
      }
    } 
  },
  computed: {
    ...mapGetters(["getProductList"])
  }
};
</script>

<style>
</style>