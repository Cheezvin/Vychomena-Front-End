<template>
</template>
<script>
export default {
    mounted() {
      localStorage.removeItem("token")
      this.$router.push({ path : "login"})
    },
}
</script>