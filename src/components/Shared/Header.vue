<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
      <router-link to="/" tag="a" class="navbar-brand">Ürün Listesi</router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" to="/product-purchase" class="nav-item">
            <a class="nav-link" href="#">Ürün İşlemleri</a>
          </router-link>
          <router-link tag="li" to="/product-sell" class="nav-item">
            <a class="nav-link" href="#">Ürün Çıkışı</a>
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>