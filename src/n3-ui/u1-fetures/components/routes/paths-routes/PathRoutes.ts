export const PATH = {
   HOME_PAGE_PATH: '/',
   LOGIN_PATH: '/login',
   REGISTRATION_PATH: '/registration',
   PROFILE_PATH: '/profile',
   ERROR_PATH: '/404',
   PASSWORD_RECOVERY_PATH: '/password-recovery',
   CHECK_EMAIL_PATH: '/check-email',
   ENTER_NEW_PASSWORD_PATH: '/set-new-password/:token',
   SUPER_COMPONENT_TEST_PATH: '/super-components-test',
   USER_CARD_PATH: `/user-card`,
   CURRENT_URL: window.location.href.split('#')[0]
} as const
