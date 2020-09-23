<template>
  <div id="menu-container">
    <nav id="menu">
      <router-link class="menu-item" to="/activities">Atividades</router-link>
      <router-link class="menu-item" to="/">Logout</router-link>
    </nav>
  </div>
</template>

<style scoped>
  #menu-container {
    max-width: 125px;
    width: fit-content;
    position: fixed;
    top: 30%;
    left: 0;
    background-color: white;
    box-shadow: 0 0 3px 1px black;
  }
  #menu {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: fit-content;
  }

  .menu-item {
    font-size: 20px;
    border-radius: 3px;
    color: #333;
    margin: 10px 0;
    padding-bottom: 4px;
    border-bottom: 1px solid #61616177;
    transition-property: box-shadow;
    transition-duration: .3s;
  }

  .menu-item:hover, .menu-item:focus {
    box-shadow: 0px 1.5px 1px 0px #3337;
  }
</style>
