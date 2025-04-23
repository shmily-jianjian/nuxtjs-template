<script setup lang="ts">
import { loginWeb } from '~/api/auth'
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: false,
  hideInMenu: true
})

const params = useUrlSearchParams('history')
const data = JSON.parse((params.data as string) || '{}')
const { token, real_name, user_id } = data.info || {}

const userStore = useUserStore()
const router = useRouter()
const { jumpToLogin } = useLogin()

getUserAuth({ token, user_id, real_name })

async function getUserAuth(params: any) {
  try {
    const { data } = await loginWeb(params)
    if (data.value?.code === '0') {
      userStore.setUserInfo({
        token,
        user_id,
        real_name,
      })
      router.push('/')
    }
    else {
      jumpToLogin()
    }
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div />
</template>
