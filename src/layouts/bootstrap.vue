<script lang="ts">
import AuthMiddleware from './middleware/auth'
import CompanyMiddleware from './middleware/company'
import BootstrapMiddleware from './middleware/bootstrap'
import RoleRedirectMiddleware from './middleware/role-redirect'
import RefreshTokenMiddleware from './middleware/refresh-token'

export default {
  async preFetch(ctx: any) {
    await RefreshTokenMiddleware(ctx)
    await AuthMiddleware(ctx)
    await CompanyMiddleware(ctx)
    await BootstrapMiddleware(ctx)
    await RoleRedirectMiddleware(ctx)
  },
}
</script>

<template>
  <div class="bootstrap-layout">
    <RouterView />
  </div>
</template>
